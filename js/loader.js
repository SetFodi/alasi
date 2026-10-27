/*
  ALASI loading screen: an awning that opens and closes, changing fabric colour each time it closes.
  Include right after <body>:  <script src="js/loader.js"></script>
  (the 404 page uses /js/loader.js). It hides itself once the page has loaded.
*/
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.currentScript && document.currentScript.dataset.root || '';
  var COLORS = ['#24533F', '#C7402D', '#1F4E79', '#CFB07C', '#E8893A', '#163829'];

  var css =
    '.alasi-loader{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#FBF8F2;transition:opacity .5s ease,transform .7s cubic-bezier(.7,0,.2,1)}' +
    '.alasi-loader.done{opacity:0;transform:translateY(-24px);pointer-events:none}' +
    '.alasi-loader .box{display:flex;flex-direction:column;align-items:center;gap:22px;width:min(320px,80vw)}' +
    '.alasi-loader svg{width:100%;height:auto;overflow:visible}' +
    '.alasi-loader .canopy,.alasi-loader .valance{animation:alasi-awning 2.6s cubic-bezier(.65,0,.35,1) infinite}' +
    '.alasi-loader .canopy{transform-origin:0 26px;transform-box:view-box}' +
    '.alasi-loader .valance{animation-name:alasi-valance}' +
    '.alasi-loader .stripe{fill:var(--fabric,#24533F);transition:fill .2s}' +
    '.alasi-loader .arm{vector-effect:non-scaling-stroke}' +
    '@keyframes alasi-awning{0%,8%{transform:scaleY(.08)}42%,62%{transform:scaleY(1)}96%,100%{transform:scaleY(.08)}}' +
    '@keyframes alasi-valance{0%,8%{transform:translateY(-68.1px)}42%,62%{transform:translateY(0)}96%,100%{transform:translateY(-68.1px)}}' +
    '.alasi-loader img{height:48px;width:auto}' +
    '.alasi-loader .bar{width:100%;height:4px;border-radius:4px;background:rgba(42,36,32,.12);overflow:hidden}' +
    '.alasi-loader .bar i{display:block;height:100%;width:30%;border-radius:4px;background:var(--fabric,#24533F);animation:alasi-bar 1.3s ease-in-out infinite;transition:background-color .2s}' +
    '@keyframes alasi-bar{0%{transform:translateX(-110%)}100%{transform:translateX(360%)}}' +
    '.alasi-loader .txt{font:500 13px/1 "SS GEO BRO",system-ui,sans-serif;letter-spacing:.18em;color:#5E554D}' +
    '@media (prefers-reduced-motion: reduce){.alasi-loader .canopy,.alasi-loader .valance,.alasi-loader .bar i{animation:none}}';

  // Awning drawn in a 240x150 box: cassette at the top, canopy hinged at y=26 (scaled to open/close),
  // scalloped valance riding on the front edge, arms from the wall to the front bar
  var stripes = '', scallops = '';
  for (var i = 0; i < 10; i++) {
    var x0 = 20 + i * 20, x1 = x0 + 20, b0 = 10 + i * 22, b1 = b0 + 22; // top 20px wide -> bottom 22px wide (perspective)
    stripes += '<path class="' + (i % 2 ? 'cream' : 'stripe') + '" d="M' + x0 + ' 26 L' + x1 + ' 26 L' + b1 + ' 100 L' + b0 + ' 100Z"' + (i % 2 ? ' fill="#F3EBDD"' : '') + '/>';
  }
  for (var s = 0; s < 10; s++) {
    var sx = 10 + s * 22;
    scallops += '<path class="' + (s % 2 ? 'cream' : 'stripe') + '" d="M' + sx + ' 99.5h22v8a11 11 0 0 1-22 0z"' + (s % 2 ? ' fill="#F3EBDD"' : '') + '/>';
  }
  var svg =
    '<svg viewBox="0 0 240 150" aria-hidden="true">' +
      '<g class="canopy">' + stripes +
        '<path d="M20 26 L220 26 L230 100 L10 100Z" fill="none" stroke="#2A2420" stroke-width="2.4" stroke-linejoin="round" class="arm"/>' +
        '<path d="M28 30 L40 98 M212 30 L200 98" stroke="#2A2420" stroke-width="3" stroke-linecap="round" class="arm"/>' +
      '</g>' +
      '<g class="valance">' + scallops +
        '<path d="M10 99.5h220v8' + (function () { var p = ''; for (var k = 0; k < 10; k++) p += 'a11 11 0 0 1-22 0'; return p; })() + 'z" fill="none" stroke="#2A2420" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<rect x="8" y="96" width="224" height="6" rx="3" fill="#FBF8F2" stroke="#2A2420" stroke-width="2.4"/>' +
      '</g>' +
      '<rect x="12" y="14" width="216" height="16" rx="6" fill="#FBF8F2" stroke="#2A2420" stroke-width="3"/>' +
    '</svg>';

  var style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
  var el = document.createElement('div');
  el.className = 'alasi-loader';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-label', 'იტვირთება');
  el.innerHTML = '<div class="box">' + svg +
    '<img src="' + root + 'brand/alasi-horizontal-colour.svg" alt="ALASI ალასი">' +
    '<div class="bar"><i></i></div><div class="txt">იტვირთება…</div></div>';
  document.body.appendChild(el);

  // Swap the fabric colour every time the awning has closed (end of each cycle)
  var c = 0;
  el.querySelector('.canopy').addEventListener('animationiteration', function () {
    c = (c + 1) % COLORS.length;
    el.style.setProperty('--fabric', COLORS[c]);
  });

  var start = Date.now(), MIN = reduce ? 0 : 900, gone = false;
  function hide() {
    if (gone) return; gone = true;
    setTimeout(function () {
      el.classList.add('done');
      setTimeout(function () { el.remove(); style.remove(); }, 800);
    }, Math.max(0, MIN - (Date.now() - start)));
  }
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
  setTimeout(hide, 6000); // never block the page for long on slow connections
})();
