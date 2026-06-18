import type { Metadata } from 'next';
import { absoluteUrl, SITE_URL } from './seo';

export interface ServicePage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  summary: string;
  image: string;
  imageAlt: string;
  lead: string;
  proof: string[];
  benefits: Array<{ title: string; text: string }>;
  process: Array<{ title: string; text: string }>;
  faq: Array<{ question: string; answer: string }>;
  related: string[];
  keywords: string[];
}

export const servicePages: ServicePage[] = [
  {
    slug: 'markizebi-batumshi',
    title: 'მარკიზები ბათუმში',
    metaTitle: 'მარკიზები ბათუმში | გასაშლელი და მოტორიზებული ჩარდახები | Alasi',
    metaDescription: 'გასაშლელი მარკიზები ბათუმში აივნებისთვის, ტერასებისთვის, ეზოებისთვის და კაფეებისთვის. უფასო აზომვა, ქსოვილების არჩევა და მონტაჟი Alasi-სგან.',
    eyebrow: 'გასაშლელი ჩარდახები · ბათუმი',
    summary: 'Alasi ამზადებს და ამონტაჟებს გასაშლელ მარკიზებს ბათუმში და აჭარაში. ვარჩევთ ზომას, ქსოვილს, მექანიზმს და მართვის ტიპს ისე, რომ ჩრდილი რეალურად იმუშაოს ზღვისპირა ქარში, მზესა და ყოველდღიურ გამოყენებაში.',
    image: '/uploads/Capture_an_architectural_shot__Nano_Banana_Pro_18949.jpg',
    imageAlt: 'გასაშლელი მარკიზა ბათუმის ტერასაზე',
    lead: 'თუ გჭირდებათ მარკიზა აივნისთვის, სახლისთვის ან კომერციული სივრცისთვის, ჩვენ ადგილზე ვზომავთ, ვგეგმავთ კონსტრუქციას და გაძლევთ ფასს წინასწარ.',
    proof: ['უფასო აზომვა ბათუმში', 'ხელით ან პულტით მართვა', 'ესპანური და ტექნიკური ქსოვილები', 'მონტაჟი დასრულებული პროექტით'],
    benefits: [
      { title: 'ზომაზე მორგებული კონსტრუქცია', text: 'მარკიზა მზადდება კონკრეტული აივნის, ტერასის ან ფასადის ზომაზე, არა სტანდარტული კომპრომისით.' },
      { title: 'მზე და წვიმა კონტროლში', text: 'ქსოვილი და დახრა ირჩევა ისე, რომ სივრცე დაიცვას პირდაპირი მზისგან და მსუბუქი წვიმისგან.' },
      { title: 'ესთეტიკა ფასადზე', text: 'ფერი, ზოლი, მექანიზმი და კასეტა თანხვედრაში მოდის შენობის სტილთან.' },
    ],
    process: [
      { title: 'აზომვა', text: 'ვნახულობთ კედელს, სამაგრებს, სიმაღლეს და გასაშლელ სივრცეს.' },
      { title: 'შეთავაზება', text: 'გაძლევთ ზომას, ქსოვილს, მართვის ვარიანტს და ზუსტ ფასს.' },
      { title: 'მონტაჟი', text: 'ვაყენებთ კონსტრუქციას, ვამოწმებთ მოძრაობას და გაძლევთ გამოყენების ინსტრუქციას.' },
    ],
    faq: [
      { question: 'რა ღირს მარკიზა ბათუმში?', answer: 'ფასი დამოკიდებულია სიგანეზე, გაშლაზე, ქსოვილზე, სისტემაზე და მოტორზე. ზუსტი ფასი ითვლება აზომვის შემდეგ.' },
      { question: 'შესაძლებელია მოტორიზებული მარკიზა?', answer: 'დიახ, შესაძლებელია პულტით მართვა და საჭიროების შემთხვევაში სენსორების დამატებაც.' },
      { question: 'რამდენ ხანში მზადდება?', answer: 'ვადა დამოკიდებულია ზომაზე და არჩეულ მასალაზე. სტანდარტულ პროექტებზე ვადას წინასწარ გიდასტურებთ.' },
    ],
    related: ['aivnis-markizebi', 'terasisa-da-kafes-tentebi', 'pergolebi-batumshi'],
    keywords: ['მარკიზები ბათუმში', 'გასაშლელი მარკიზა', 'გასაშლელი ჩარდახი', 'მოტორიზებული მარკიზა', 'awnings Batumi'],
  },
  {
    slug: 'pergolebi-batumshi',
    title: 'პერგოლები ბათუმში',
    metaTitle: 'პერგოლები ბათუმში | ეზოს და ტერასის გადახურვა | Alasi',
    metaDescription: 'პერგოლას სისტემები ბათუმში ეზოსთვის, ტერასისთვის, კაფესთვის და სასტუმროსთვის. დაჩრდილვა, გადახურვა, ტექნიკური ქსოვილები და მონტაჟი.',
    eyebrow: 'პერგოლა · ეზოს გადახურვა',
    summary: 'პერგოლა ქმნის დაცულ გარე სივრცეს სახლთან, კაფესთან ან სასტუმროსთან. Alasi გეხმარებათ სწორ სისტემაში: ზომა, ფერი, ქსოვილი, წყლის გადინება და მონტაჟის დეტალები ერთიანად იგეგმება.',
    image: '/uploads/image1.jpg',
    imageAlt: 'პერგოლას გადახურვა ეზოსა და ტერასისთვის',
    lead: 'პერგოლა განსაკუთრებით კარგია იმ სივრცეებისთვის, სადაც მხოლოდ ჩრდილი არ კმარა და საჭიროა უფრო სტაბილური, არქიტექტურული გადაწყვეტა.',
    proof: ['ეზოს და ტერასის გადახურვა', 'კომერციული სივრცეებისთვის', 'ტექნიკური ქსოვილების არჩევა', 'დაგეგმვა და მონტაჟი ერთ გუნდში'],
    benefits: [
      { title: 'გარე სივრცე მთელი სეზონისთვის', text: 'პერგოლა ტერასას აქცევს სივრცედ, რომელიც უფრო დიდხანს გამოიყენება მზიან და წვიმიან დღეებში.' },
      { title: 'გამართული კონსტრუქცია', text: 'ვაკვირდებით საყრდენებს, დახრას, წყლის მიმართულებას და მოძრაობის მექანიკას.' },
      { title: 'კომერციული ეფექტი', text: 'კაფესა და სასტუმროსთვის პერგოლა ზრდის გამოსაყენებელ ადგილს და ვიზუალურ მოწესრიგებულობას.' },
    ],
    process: [
      { title: 'სივრცის შეფასება', text: 'ვზომავთ ფართობს, ვნახულობთ საყრდენ წერტილებს და ვარჩევთ კონსტრუქციის ტიპს.' },
      { title: 'მასალის შერჩევა', text: 'ვადარებთ ქსოვილს, ფერს, სისტემას და მართვის საჭიროებას.' },
      { title: 'ინსტალაცია', text: 'ვაყენებთ ისე, რომ კონსტრუქცია იყოს სტაბილური, ფუნქციური და ვიზუალურად სუფთა.' },
    ],
    faq: [
      { question: 'პერგოლა ჯობს თუ მარკიზა?', answer: 'თუ გჭირდებათ მსუბუქი გასაშლელი ჩრდილი, მარკიზა საკმარისია. უფრო დიდი და სტაბილური გარე სივრცისთვის პერგოლა უკეთესია.' },
      { question: 'შეიძლება პერგოლა კაფესთვის?', answer: 'დიახ, პერგოლა ხშირად გამოიყენება კაფეებისა და რესტორნების ტერასებზე.' },
      { question: 'მოდის თუ არა ტექნიკური ქსოვილებით?', answer: 'დიახ, შესაძლებელია PVC, blackout, screen და სხვა ტექნიკური ქსოვილების შერჩევა.' },
    ],
    related: ['terasisa-da-kafes-tentebi', 'markizebi-batumshi', 'aivnis-markizebi'],
    keywords: ['პერგოლები ბათუმში', 'პერგოლას სისტემა', 'ეზოს გადახურვა', 'ტერასის გადახურვა', 'pergola Batumi'],
  },
  {
    slug: 'aivnis-markizebi',
    title: 'აივნის მარკიზები',
    metaTitle: 'აივნის მარკიზები | აივნის ჩარდახი და საჩრდილობელი | Alasi',
    metaDescription: 'აივნის მარკიზები და საჩრდილობლები ბათუმში. კომპაქტური გასაშლელი ჩარდახები მზისგან დასაცავად, ხელით ან მოტორიზებული მართვით.',
    eyebrow: 'აივანი · საჩრდილობელი',
    summary: 'აივნის მარკიზა იცავს სახლს პირდაპირი მზისგან, ამცირებს სიცხეს ოთახში და აივანს უფრო კომფორტულ ადგილად აქცევს. სისტემა შეიძლება იყოს მარტივი მექანიკური ან პულტით მართვადი.',
    image: '/uploads/Setting_The_elegant_soft-frame_Nano_Banana_Pro_73429.jpg',
    imageAlt: 'აივნის მარკიზა საცხოვრებელი სივრცისთვის',
    lead: 'აივნისთვის მნიშვნელოვანია კომპაქტური ზომა, სწორი დახრა და ფერი, რომელიც ფასადს არ ეჩხირება. ამ ნაწილს ადგილზე ვწყვეტთ.',
    proof: ['კომპაქტური ზომები', 'ფასადთან შეთანხმებული ფერები', 'ხელით ან მოტორით მართვა', 'ბინებისა და სახლებისთვის'],
    benefits: [
      { title: 'ნაკლები სიცხე ოთახში', text: 'ჩრდილი პირდაპირ მინაზე აღარ მოდის და სივრცე უფრო გრილი რჩება.' },
      { title: 'უფრო გამოყენებადი აივანი', text: 'აივანი ხდება ადგილი ყავისთვის, დასვენებისთვის და მცენარეებისთვისაც.' },
      { title: 'სუფთა ვიზუალი', text: 'ვარჩევთ ქსოვილს და კონსტრუქციას ისე, რომ ფასადთან მშვიდად იკითხებოდეს.' },
    ],
    process: [
      { title: 'აივნის ზომა', text: 'ვამოწმებთ სიგანეს, სიმაღლეს და მოაჯირის/კედლის მდგომარეობას.' },
      { title: 'სისტემის არჩევა', text: 'ვარჩევთ მექანიკურ ან მოტორიზებულ სისტემას და ქსოვილის ტიპს.' },
      { title: 'დაყენება', text: 'ვაყენებთ კონსტრუქციას და ვტესტავთ გახსნა-დახურვას.' },
    ],
    faq: [
      { question: 'აივნის მარკიზა პატარა აივანზეც დგება?', answer: 'დიახ, მთავარია სწორი ზომა და სამაგრი წერტილები. მცირე აივნებისთვის კომპაქტური სისტემა ირჩევა.' },
      { question: 'მეზობლებს ან ფასადს ხომ არ უშლის?', answer: 'აზომვის დროს ვამოწმებთ გაშლის მიმართულებას და ვიზუალურ ნაწილს, რომ სისტემა სწორად მოთავსდეს.' },
      { question: 'შეიძლება ფერის არჩევა?', answer: 'დიახ, Advance კოლექციაში ბევრი ფერი და ფაქტურაა.' },
    ],
    related: ['markizebi-batumshi', 'pergolebi-batumshi', 'terasisa-da-kafes-tentebi'],
    keywords: ['აივნის მარკიზები', 'აივნის ჩარდახი', 'აივნის საჩრდილობელი', 'აივნის გადახურვა', 'balcony awning Georgia'],
  },
  {
    slug: 'terasisa-da-kafes-tentebi',
    title: 'ტერასისა და კაფეს ტენტები',
    metaTitle: 'კაფეს და ტერასის ტენტები | კომერციული მარკიზები ბათუმში | Alasi',
    metaDescription: 'კაფეს, რესტორნის და ტერასის ტენტები ბათუმში. ფართო კომერციული მარკიზები, ბრენდთან შეთანხმებული ქსოვილები და გამძლე კონსტრუქციები.',
    eyebrow: 'კაფე · რესტორანი · ტერასა',
    summary: 'კომერციულ სივრცეში ჩრდილი პირდაპირ მოქმედებს სტუმრის კომფორტზე და მაგიდების რაოდენობაზე. Alasi აკეთებს მარკიზებს და ტენტებს კაფეებისთვის, რესტორნებისთვის, სასტუმროებისა და ტერასებისთვის.',
    image: '/uploads/awning-chatgpt.jpg',
    imageAlt: 'კაფეს ტერასის კომერციული მარკიზა',
    lead: 'ვარჩევთ სისტემას ისე, რომ ყოველდღიურ გახსნა-დახურვას გაუძლოს, კარგად გამოიყურებოდეს და სტუმრებისთვის რეალური ჩრდილი შექმნას.',
    proof: ['კაფეებისა და რესტორნებისთვის', 'დიდი გაშლის სისტემები', 'ბრენდთან შეთანხმებული ფერები', 'მონტაჟი სამუშაო გრაფიკის გათვალისწინებით'],
    benefits: [
      { title: 'მეტი კომფორტული მაგიდა', text: 'სწორი ჩრდილი ტერასას დღის განმავლობაში უფრო გამოყენებადს ხდის.' },
      { title: 'ბრენდის ვიზუალი', text: 'ქსოვილი და ფერი შეიძლება შეესაბამებოდეს ფასადს, ინტერიერს და ბრენდის ტონს.' },
      { title: 'გამძლე ყოველდღიურობა', text: 'კომერციული სივრცისთვის ვარჩევთ მექანიზმს, რომელიც ხშირ გამოყენებაზეა გათვლილი.' },
    ],
    process: [
      { title: 'ფასადის და ტერასის შეფასება', text: 'ვნახულობთ მაგიდების განლაგებას, მზის მიმართულებას და სამაგრ ადგილებს.' },
      { title: 'კომერციული შეთავაზება', text: 'ვაძლევთ რამდენიმე ზომისა და სისტემის ვარიანტს ფასით.' },
      { title: 'მონტაჟი', text: 'ვგეგმავთ მონტაჟს ისე, რომ სივრცემ მინიმალურად შეწყვიტოს მუშაობა.' },
    ],
    faq: [
      { question: 'შეიძლება დიდი ზომის კაფეს მარკიზა?', answer: 'დიახ, ფართო ტერასებისთვის შესაძლებელია დიდი გაშლის და რამდენიმე სისტემის კომბინაცია.' },
      { question: 'შეიძლება ქსოვილზე ბრენდის ფერის შერჩევა?', answer: 'დიახ, ვარჩევთ ფერს და ფაქტურას არსებული კოლექციებიდან.' },
      { question: 'მონტაჟი სამუშაო საათების გარეთ შეიძლება?', answer: 'კომერციულ პროექტებზე მონტაჟის დრო შეთანხმებით იგეგმება.' },
    ],
    related: ['markizebi-batumshi', 'pergolebi-batumshi', 'aivnis-markizebi'],
    keywords: ['კაფეს ტენტები', 'ტერასის ტენტები', 'კომერციული მარკიზა', 'რესტორნის ჩარდახი', 'terrace awning Batumi'],
  },
];

export const serviceHub = {
  path: '/services',
  title: 'დაჩრდილვის სისტემები ბათუმში',
  metaTitle: 'დაჩრდილვის სისტემები ბათუმში | მარკიზები, პერგოლები და ტენტები | Alasi',
  metaDescription: 'Alasi ამონტაჟებს მარკიზებს, პერგოლებს, აივნის საჩრდილობლებს და კაფე-ტერასის ტენტებს ბათუმში და საქართველოში.',
};

export function getServicePage(slug: string) {
  return servicePages.find(page => page.slug === slug);
}

export function getServicePath(slug: string) {
  return `/services/${slug}`;
}

export function createServiceMetadata(page: ServicePage): Metadata {
  const path = getServicePath(page.slug);

  return {
    metadataBase: new URL(SITE_URL),
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: absoluteUrl(path),
      siteName: 'Alasi',
      locale: 'ka_GE',
      type: 'website',
      images: [{ url: absoluteUrl(page.image), alt: page.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
      images: [absoluteUrl(page.image)],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function getServiceJsonLd(page: ServicePage) {
  const path = getServicePath(page.slug);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${absoluteUrl(path)}#service`,
      name: page.title,
      description: page.metaDescription,
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: [
        { '@type': 'City', name: 'Batumi' },
        { '@type': 'AdministrativeArea', name: 'Adjara' },
        { '@type': 'Country', name: 'Georgia' },
      ],
      serviceType: page.title,
      url: absoluteUrl(path),
      image: absoluteUrl(page.image),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Alasi',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'სერვისები',
          item: absoluteUrl('/services'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: page.title,
          item: absoluteUrl(path),
        },
      ],
    },
  ];
}
