import data from '@/data.json';
import Link from 'next/link';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as keyof typeof data.categories[0]['title'];
  const isArabic = locale === 'ar';

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 relative overflow-hidden">
        {/* Original welcome message — kept hidden, not deleted */}
        <div className="hidden">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {isArabic ? 'مرحباً بكم في متحف دار المدينة' : 'Welcome to Dar Al-Madinah Museum'}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            {isArabic
              ? 'استكشف الإرث الحضاري الإسلامي وتاريخ المدينة المنورة عبر عصورها المختلفة'
              : 'Explore the Islamic cultural heritage and the history of Medina through its different eras'}
          </p>
          <Link href={`/${locale}#categories`} className="bg-slate-500 text-white px-8 py-3 rounded-full hover:bg-slate-600 transition shadow-sm font-medium inline-block">
            {isArabic ? 'استكشف الآن' : 'Explore Now'}
          </Link>
        </div>

        {/* Project Team Introduction — fully translated */}
        {(() => {
          const isRTL = locale === 'ar' || locale === 'ur';

          const content = {
            ar: {
              title: 'نبذة عن فريق المشروع',
              intro: 'نحن طالبات قسم المعلومات ومصادر التعلم بجامعة طيبة',
              college: '[كلية الآداب والعلوم الإنسانية]',
              supervisor: 'تحت إشراف الدكتورة / رحاب سويفي',
              goal: 'يهدف مشروعنا إلى تنفيذ خطة تحول رقمي متكاملة لمتحف دار المدينة، لتحديث طرق عرض التراث المحلي وتحسين وصول الجمهور إلى مقتنيات المتحف وخدماته.',
              section2: 'مضمون المشروع وأهميته',
              body: 'يركز المشروع على رقمنة مقتنيات المتحف وتصميم نظام معلوماتي تفاعلي يشمل: فهرسة رقمية للمجموعات، إنشاء قاعدة بيانات قابلة للبحث، وتصميم واجهة مستخدم لموقع إلكتروني يتيح للزوار استكشاف المقتنيات والقصص التاريخية المرتبطة بها.',
            },
            en: {
              title: 'About the Project Team',
              intro: 'We are students of the Department of Information and Learning Resources at Taibah University',
              college: '[College of Arts and Humanities]',
              supervisor: 'Under the supervision of Dr. Rehab Suwaifi',
              goal: 'Our project aims to implement a comprehensive digital transformation plan for Dar Al-Madinah Museum, modernizing the ways local heritage is presented and improving public access to the museum\'s collections and services.',
              section2: 'Project Content & Significance',
              body: 'The project focuses on digitizing the museum\'s collections and designing an interactive information system that includes: digital cataloging of collections, creating a searchable database, and designing a user interface for a website that allows visitors to explore artifacts and the historical stories associated with them.',
            },
            fr: {
              title: 'À Propos de l\'Équipe du Projet',
              intro: 'Nous sommes des étudiantes du Département des Sciences de l\'Information et des Ressources d\'Apprentissage de l\'Université de Taibah',
              college: '[Faculté des Arts et des Sciences Humaines]',
              supervisor: 'Sous la supervision de Dr. Rehab Suwaifi',
              goal: 'Notre projet vise à mettre en œuvre un plan de transformation numérique intégré pour le Musée Dar Al-Madinah, en modernisant les méthodes de présentation du patrimoine local et en améliorant l\'accès du public aux collections et services du musée.',
              section2: 'Contenu du Projet et son Importance',
              body: 'Le projet se concentre sur la numérisation des collections du musée et la conception d\'un système d\'information interactif comprenant : un catalogage numérique des collections, la création d\'une base de données consultable, et la conception d\'une interface utilisateur pour un site web permettant aux visiteurs d\'explorer les artefacts et les histoires historiques qui y sont associées.',
            },
            ur: {
              title: 'پروجیکٹ ٹیم کا تعارف',
              intro: 'ہم طیبہ یونیورسٹی میں انفارمیشن اینڈ لرننگ ریسورسز ڈیپارٹمنٹ کی طالبات ہیں',
              college: '[کالج آف آرٹس اینڈ ہیومینٹیز]',
              supervisor: 'ڈاکٹر رحاب سویفی کی نگرانی میں',
              goal: 'ہمارے پروجیکٹ کا مقصد دار المدینہ میوزیم کے لیے ایک جامع ڈیجیٹل تبدیلی کا منصوبہ نافذ کرنا ہے، تاکہ مقامی ورثے کی پیشکش کے طریقوں کو جدید بنایا جائے اور عوام کی میوزیم کے مجموعوں اور خدمات تک رسائی کو بہتر بنایا جائے۔',
              section2: 'پروجیکٹ کا مواد اور اہمیت',
              body: 'یہ پروجیکٹ میوزیم کے مجموعوں کی ڈیجیٹائزیشن اور ایک انٹرایکٹو انفارمیشن سسٹم ڈیزائن کرنے پر مرکوز ہے جس میں شامل ہیں: مجموعوں کی ڈیجیٹل فہرست سازی، قابلِ تلاش ڈیٹا بیس کی تشکیل، اور ایک ویب سائٹ کے لیے یوزر انٹرفیس ڈیزائن کرنا جو زائرین کو نوادرات اور ان سے وابستہ تاریخی کہانیاں دریافت کرنے کی اجازت دے۔',
            },
            id: {
              title: 'Tentang Tim Proyek',
              intro: 'Kami adalah mahasiswi Departemen Informasi dan Sumber Daya Pembelajaran di Universitas Taibah',
              college: '[Fakultas Seni dan Humaniora]',
              supervisor: 'Di bawah bimbingan Dr. Rehab Suwaifi',
              goal: 'Proyek kami bertujuan untuk mengimplementasikan rencana transformasi digital yang komprehensif untuk Museum Dar Al-Madinah, memodernisasi cara penyajian warisan lokal dan meningkatkan akses publik terhadap koleksi dan layanan museum.',
              section2: 'Konten Proyek dan Signifikansinya',
              body: 'Proyek ini berfokus pada digitalisasi koleksi museum dan perancangan sistem informasi interaktif yang mencakup: katalogisasi digital koleksi, pembuatan basis data yang dapat dicari, dan perancangan antarmuka pengguna untuk situs web yang memungkinkan pengunjung menjelajahi artefak dan kisah sejarah yang terkait dengannya.',
            },
          };

          const c = content[locale as keyof typeof content] || content.en;

          return (
            <div
              className="container mx-auto px-4 relative z-10 max-w-3xl text-center"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Section Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
                {c.title}
              </h1>

              {/* Team paragraph */}
              <div className={`text-slate-700 leading-loose text-base md:text-lg space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                <p>
                  {c.intro}
                  <br />
                  <span className="font-semibold text-slate-800">{c.college}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-800">{c.supervisor}</span>
                </p>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {c.goal}
                </p>
              </div>

              {/* Divider */}
              <div className="w-24 h-0.5 bg-slate-300 mx-auto my-6" />

              {/* Section Title 2 */}
              <h2 className={`text-xl md:text-2xl font-bold text-slate-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {c.section2}
              </h2>
              <p className={`text-slate-600 text-sm md:text-base leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {c.body}
              </p>

              {/* Museum Official Logo */}
              <div className="mt-10 flex justify-center">
                <img
                  src="/images/official-museum-logo.png"
                  alt="Dar Al-Madinah Museum"
                  className="h-24 md:h-32 object-contain"
                />
              </div>
            </div>
          );
        })()}
      </section>

      {/* Categories Grid */}
      <section id="categories" className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          {isArabic ? 'استكشف المزيد' : 'Explore More'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {data.categories.map((category) => (
            <Link key={category.id} href={`/${locale}/category/${category.id}`} className="museum-card flex overflow-hidden group cursor-pointer hover:shadow-md transition">
              <div className="w-1/3 bg-slate-50 ltr:border-r rtl:border-l border-slate-100 flex items-center justify-center p-4">
                {category.image ? (
                  <img src={category.image} alt={category.title.en} className="w-24 h-24 object-cover rounded-full group-hover:scale-105 transition duration-500 shadow-sm" />
                ) : (
                  <div className="w-24 h-24 bg-slate-200 rounded-full opacity-50 group-hover:scale-105 transition duration-500"></div>
                )}
              </div>
              <div className="w-2/3 p-6 flex flex-col justify-center items-start">
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-gold-600 transition">
                  {category.title[locale] || category.title.en}
                </h3>
                <span className="text-sm text-slate-500 mb-4">
                  {data.artifacts.filter(a => a.category === category.id).length} {isArabic ? 'عنصر' : 'Items'}
                </span>
                <span className="mt-auto px-4 py-1.5 bg-slate-500 text-white text-sm rounded group-hover:bg-slate-600 transition">
                  {isArabic ? 'المزيد' : 'Learn More'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Artifacts */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            {isArabic ? 'مقتنيات مختارة' : 'Featured Artifacts'}
          </h2>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x custom-scrollbar">
            {[...data.featuredArtifacts, ...data.artifacts.filter(a => !data.featuredArtifacts.includes(a.id)).sort(() => 0.5 - Math.random()).slice(0, 12).map(a => a.id)].map((artifactId, i) => {
              const artifact = data.artifacts.find(a => a.id === artifactId);
              if (!artifact) return null;
              return (
                <Link 
                  key={artifactId + i} 
                  href={`/${locale}/artifact/${artifact.id}`}
                  className="museum-card flex flex-col items-center p-4 text-center group cursor-pointer hover:shadow-md transition min-w-[220px] max-w-[220px] snap-center border border-slate-200 bg-white"
                >
                  <div className="w-full aspect-square bg-slate-100 rounded mb-4 flex items-center justify-center group-hover:bg-slate-200 transition overflow-hidden">
                    {artifact.image ? (
                      <img src={artifact.image} alt={artifact.title.en} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-slate-300 text-xs">Image</span>
                    )}
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-3 group-hover:text-gold-600 transition line-clamp-2">
                    {artifact.title[locale as keyof typeof artifact.title] || artifact.title.en}
                  </h4>
                  <span className="w-full py-1.5 bg-slate-500 text-white text-xs rounded group-hover:bg-slate-600 transition mt-auto">
                    {isArabic ? 'المزيد' : 'Learn More'}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
