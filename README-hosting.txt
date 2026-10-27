ALASI — alasi.ge ვებსაიტი / website
======================================

ქართული
-------
1. ამ საქაღალდის მთელი შიგთავსი (არა თვითონ საქაღალდე) ატვირთეთ საიტის ძირეულ
   საქაღალდეში (public_html / www / htdocs), ისე რომ index.html იყოს ძირში.
2. სტატიკური საიტია — PHP, მონაცემთა ბაზა ან სერვერული პროგრამა არ სჭირდება.
3. 404 გვერდი: Apache სერვერზე .htaccess ფაილი ავტომატურად აყენებს 404.html-ს.
   თუ სერვერი Nginx-ია, დაამატეთ:  error_page 404 /404.html;
   ასევე Nginx-ზე .glb ფაილებისთვის:  types { model/gltf-binary glb; }
4. .htaccess ფაილი დამალულია (წერტილით იწყება) — დარწმუნდით, რომ ისიც აიტვირთა.
5. საჭიროა HTTPS (SSL) — 3D ხედი და შრიფტები ყველაზე სტაბილურად HTTPS-ზე მუშაობს.
6. საიტი იყენებს ერთ გარე ბიბლიოთეკას: Google model-viewer (ajax.googleapis.com).

English
-------
1. Upload the CONTENTS of this folder (not the folder itself) to the web root
   (public_html / www / htdocs) so that index.html sits at the top level.
2. It is a static site — no PHP, database or server-side code is needed.
3. 404 page: on Apache the included .htaccess sets 404.html as the error page.
   On Nginx add:  error_page 404 /404.html;
   and for the 3D model files:  types { model/gltf-binary glb; }
4. .htaccess is a hidden file (starts with a dot) — make sure it is uploaded too.
5. Please enable HTTPS (SSL).
6. One external library is loaded: Google model-viewer from ajax.googleapis.com.

Pages / გვერდები
----------------
index.html     /          მთავარი გვერდი / home
pricing.html   /pricing   ფასები და კალკულატორი / prices and calculator
fabrics.html   /fabrics   ქსოვილები, 3D ხედი / fabrics with 3D preview
404.html                  გვერდი ვერ მოიძებნა / page not found

Search / ძიება
--------------
robots.txt     საძიებო სისტემების წვდომა და sitemap-ის მისამართი
sitemap.xml    ინდექსირებადი კანონიკური გვერდები / canonical indexable pages

Editing / რედაქტირება
---------------------
js/prices.js   ფასები და ონლაინ შეკვეთის ჩართვა/გამორთვა
               (window.ALASI_ORDERING_OPEN = false → „არ არის მარაგში“, true → შეკვეთა ჩართულია)
               prices and the online-ordering on/off switch

Contact: alasicorp@gmail.com · +995 591 060 426
