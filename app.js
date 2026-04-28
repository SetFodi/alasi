const FABRICS = [
  { id: 'green',   name: 'Classic Green Stripe',  c1: '#2F5D3A', c2: '#F7EFE5', label: 'GS-01' },
  { id: 'sand',    name: 'Sand Beige',             c1: '#C9A97A', c2: '#E8D8BC', label: 'SB-02' },
  { id: 'gray',    name: 'Coastal Gray',           c1: '#7A9AA8', c2: '#D0DFE3', label: 'CG-03' },
  { id: 'forest',  name: 'Deep Forest',            c1: '#1A3A28', c2: '#2F5D3A', label: 'DF-04' },
  { id: 'burg',    name: 'Café Burgundy',          c1: '#4A2724', c2: '#8A4A44', label: 'CB-05' },
  { id: 'navy',    name: 'Atlantic Navy',          c1: '#1E3A5F', c2: '#AEBFC3', label: 'AN-06' },
];

const PRELOADER_VIDEO_PAUSE_AT_SECONDS = 3;
const PRELOADER_SLIDE_AT_MS = 3200;
const PRELOADER_REMOVE_AFTER_SLIDE_MS = 1200;

let advanceTextures = [];
let advanceState = {
  group: 'plain',
  coating: 'normal',
  selected: null,
};

function generateStripeTexture(c1, c2) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Draw stripes
  const numStripes = 8;
  const stripeWidth = canvas.width / numStripes;
  
  for (let i = 0; i < numStripes; i++) {
    ctx.fillStyle = i % 2 === 0 ? c1 : c2;
    ctx.fillRect(i * stripeWidth, 0, stripeWidth, canvas.height);
  }
  
  // Draw scallop valance shape at the bottom for realism (optional, but good for flat mapping)
  // For now, simple vertical stripes map beautifully to the 3D model's UVs.
  return canvas;
}

async function updateModelTexture(c1, c2) {
  const modelViewer = document.getElementById('awning-model');
  if (!modelViewer || !modelViewer.model) return;
  
  const canvas = generateStripeTexture(c1, c2);
  const texture = await modelViewer.createTexture(canvas.toDataURL());
  
  // The Canvas material should be the first one based on MTL
  const material = modelViewer.model.materials.find(m => m.name === 'Canvas') || modelViewer.model.materials[0];
  if (material && material.pbrMetallicRoughness) {
    material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
  }
}

function initAwningVisualizer() {
  const modelViewer = document.getElementById('awning-model');
  if (!modelViewer) return;
  
  // Set initial texture once model is loaded
  modelViewer.addEventListener('load', () => {
    updateModelTexture(FABRICS[0].c1, FABRICS[0].c2);
  });
}

function setupFabricPicker() {
  const container = document.getElementById('fabric-chips');
  if (!container) return;
  
  FABRICS.forEach((f, idx) => {
    const btn = document.createElement('button');
    btn.className = `fabric-chip ${idx === 0 ? 'active' : ''}`;
    btn.title = f.name;
    btn.innerHTML = `
      <div style="flex:1; background:${f.c1}"></div>
      <div style="flex:1; background:${f.c2}"></div>
      <div style="flex:1; background:${f.c1}"></div>
      <div style="flex:1; background:${f.c2}"></div>
    `;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fabric-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.documentElement.style.setProperty('--awning-c1', f.c1);
      document.documentElement.style.setProperty('--awning-c2', f.c2);
      document.getElementById('visualizer-label').textContent = f.name;
      document.getElementById('visualizer-code').textContent = `Collection ref: ${f.label} · alasi.ge/fabrics`;
      updateModelTexture(f.c1, f.c2);
    });
    container.appendChild(btn);
  });
}

function getVisibleAdvanceTextures() {
  return advanceTextures.filter((item) => {
    if (item.group !== advanceState.group) return false;
    if (item.group !== 'plain') return true;
    return item.coating === advanceState.coating;
  });
}

async function updateAdvanceModelTexture(item) {
  const modelViewer = document.getElementById('advance-model');
  if (!modelViewer || !modelViewer.model || !item) return;

  const texture = await modelViewer.createTexture(item.texture);
  const material = modelViewer.model.materials.find((m) => m.name === 'Fabric') || modelViewer.model.materials[0];
  if (material && material.pbrMetallicRoughness) {
    material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
  }
}

function selectAdvanceTexture(item, shouldRender = true) {
  if (!item) return;

  advanceState.selected = item;

  const name = document.getElementById('advance-model-name');
  const code = document.getElementById('advance-model-code');
  const selection = document.getElementById('advance-selection');
  if (name) name.textContent = `${item.name} · Desert by Gaviota`;
  if (code) code.textContent = item.code;
  if (selection) selection.textContent = `${item.name} / ${item.code}`;

  updateAdvanceModelTexture(item);
  if (shouldRender) renderAdvanceCatalog();
}

function renderAdvanceCatalog() {
  const grid = document.getElementById('advance-grid');
  if (!grid) return;

  const visible = getVisibleAdvanceTextures();
  if (!visible.length) {
    grid.innerHTML = '';
    const count = document.getElementById('advance-count');
    if (count) count.textContent = '0 colours';
    return;
  }

  if (!visible.includes(advanceState.selected)) {
    selectAdvanceTexture(visible[0], false);
  }

  const count = document.getElementById('advance-count');
  if (count) count.textContent = `${visible.length} colours`;

  grid.innerHTML = '';
  visible.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `advance-swatch ${item === advanceState.selected ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="advance-swatch-image"><img src="${item.src}" alt="${item.name} fabric"></span>
      <span class="advance-swatch-name">${item.name}</span>
      <span class="advance-swatch-code">${item.code}</span>
    `;
    btn.addEventListener('click', () => selectAdvanceTexture(item));
    grid.appendChild(btn);
  });
}

async function initAdvanceCatalog() {
  const grid = document.getElementById('advance-grid');
  if (!grid) return;

  const response = await fetch(new URL('uploads/copentek/advance-textures.json', `${window.location.origin}/`));
  advanceTextures = await response.json();

  const groupTabs = document.querySelectorAll('[data-advance-group]');
  const coatingTabs = document.querySelectorAll('[data-advance-coating]');
  const resinedButton = document.querySelector('[data-advance-coating="resined"]');

  groupTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      advanceState.group = tab.dataset.advanceGroup;
      if (advanceState.group !== 'plain') advanceState.coating = 'normal';
      groupTabs.forEach((button) => button.classList.toggle('active', button === tab));
      coatingTabs.forEach((button) => button.classList.toggle('active', button.dataset.advanceCoating === advanceState.coating));
      if (resinedButton) resinedButton.disabled = advanceState.group !== 'plain';
      renderAdvanceCatalog();
    });
  });

  coatingTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.disabled) return;
      advanceState.coating = tab.dataset.advanceCoating;
      coatingTabs.forEach((button) => button.classList.toggle('active', button === tab));
      renderAdvanceCatalog();
    });
  });

  const techButton = document.getElementById('advance-tech-toggle');
  const techPanel = document.getElementById('advance-tech-panel');
  if (techButton && techPanel) {
    techButton.addEventListener('click', () => {
      techPanel.hidden = !techPanel.hidden;
    });
  }

  const modelViewer = document.getElementById('advance-model');
  if (modelViewer) {
    modelViewer.addEventListener('load', () => {
      if (advanceState.selected) updateAdvanceModelTexture(advanceState.selected);
    });
  }

  renderAdvanceCatalog();
}

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  const video = preloader.querySelector('.preloader-video');
  if (video instanceof HTMLVideoElement) {
    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= PRELOADER_VIDEO_PAUSE_AT_SECONDS) {
        video.pause();
      }
    });
  }

  // Delay to let the awning drawing animation reach the intentional pause.
  setTimeout(() => {
    preloader.classList.add('slide-up');
    document.body.style.overflow = '';
    setTimeout(() => preloader.remove(), PRELOADER_REMOVE_AFTER_SLIDE_MS);
  }, PRELOADER_SLIDE_AT_MS);
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('preloader')) {
    document.body.style.overflow = 'hidden'; // Lock scroll during preloader
  }
  initAwningVisualizer();
  setupFabricPicker();
  initAdvanceCatalog();
});

window.addEventListener('load', hidePreloader);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
