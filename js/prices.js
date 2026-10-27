/*
  ALASI price list — edit this file to change what the pricing page shows.

  One line per product:
    system     : 'cassette' | 'classic' | 'wintent' | 'pergola'
    width      : width in metres (სიგანე)
    projection : projection in metres (გადმოწევა)
    color      : fabric colour name, as customers should see it
    hex        : colour for the swatch
    frame      : frame colour — 'თეთრი' or 'შავი' (optional)
    price      : price in GEL (₾)

  !!! Only the first line (4 × 2, red, 1600 ₾) is a real price you gave.
  !!! Every other line is a PLACEHOLDER — replace or delete before publishing.
*/
// Online ordering switch for the pricing page.
//   false = products show "არ არის მარაგში" and ordering is temporarily unavailable (prices stay visible)
//   true  = quantities, "add to order" and WhatsApp/e-mail order sending are enabled
window.ALASI_ORDERING_OPEN = false;

window.ALASI_PRICES = [
  { system: 'classic',  width: 4,   projection: 2,   color: 'წითელი',            hex: '#C7402D', frame: 'თეთრი', price: 1600 },

  // ---- placeholders below: replace with real prices ----
  { system: 'classic',  width: 3,   projection: 2,   color: 'მწვანე ზოლი',       hex: '#2F5D3A', frame: 'თეთრი', price: 1300 },
  { system: 'classic',  width: 5,   projection: 2.5, color: 'ქვიშისფერი',        hex: '#C9A97A', frame: 'შავი',  price: 2100 },
  { system: 'cassette', width: 4,   projection: 2,   color: 'ანტრაციტი',         hex: '#3A3F44', frame: 'შავი',  price: 2400 },
  { system: 'cassette', width: 5,   projection: 3,   color: 'კრემისფერი',        hex: '#EFE6D2', frame: 'თეთრი', price: 3200 },
  { system: 'cassette', width: 6,   projection: 3,   color: 'ატლანტიკური ლურჯი', hex: '#1E3A5F', frame: 'შავი',  price: 3900 },
  { system: 'wintent',  width: 1.5, projection: 0.8, color: 'მწვანე',            hex: '#24533F', frame: 'შავი',  price: 650  },
  { system: 'wintent',  width: 2,   projection: 1,   color: 'ბორდო',             hex: '#6B3330', frame: 'თეთრი', price: 800  },
  { system: 'pergola',  width: 3,   projection: 3,   color: 'ანტრაციტი',         hex: '#3A3F44', frame: 'შავი',  price: 6500 },
  { system: 'pergola',  width: 4,   projection: 4,   color: 'თეთრი',             hex: '#F4F4F6', frame: 'თეთრი', price: 9800 }
];

// Names and photos per system (shared by all lines above)
window.ALASI_SYSTEMS = {
  cassette: { name: 'კასეტური სისტემა',  tag: 'Cassette',  img: 'img/product-cassette.jpg' },
  classic:  { name: 'კლასიკური სისტემა', tag: 'Classic',   img: 'img/product-classic.jpg' },
  wintent:  { name: 'ვინტენტის სისტემა',  tag: 'Wintent',   img: 'img/product-wintent.jpg' },
  pergola:  { name: 'პერგოლა',            tag: 'Pergola',   img: 'img/product-pergola.jpg' }
};
