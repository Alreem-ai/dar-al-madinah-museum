import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isArabic = locale === 'ar';

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="museum-card overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* About Us Column */}
          <div className="md:w-1/2 p-8 lg:p-12 ltr:border-r rtl:border-l border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
              {locale === 'ar' ? 'من نحن' : 
               locale === 'fr' ? 'À Propos de Nous' :
               locale === 'ur' ? 'ہمارے بارے میں' :
               locale === 'id' ? 'Tentang Kami' :
               'About Us'}
            </h2>
            
            <div className="text-slate-600 mb-8 leading-relaxed space-y-6 text-justify">
              {locale === 'ar' ? (
                <>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">معارض تُخاطب الروح</h3>
                  <p>يضم Dar Al Madinah Museum أكثر من 2000 قطعة أثرية، تشمل صورًا نادرة، ومخطوطات، ونماذج مصغّرة، وقطعًا أثرية تُعيد إحياء الماضي بروح حيّة. وقد صُمِّم كل معرض بعناية ليُجسّد جانبًا مهمًا من التاريخ الإسلامي—وخاصة فترة Prophet Muhammad ﷺ في المدينة المنورة.</p>
                  
                  <p className="font-semibold text-slate-800 underline decoration-gold-500 underline-offset-4">أبرز المعارض تشمل:</p>
                  <ul className="list-disc ltr:ml-5 rtl:mr-5 space-y-2">
                    <li>نور المدينة – عرض تفصيلي يُجسّد المدينة في زمن النبي ﷺ</li>
                    <li>معرض الصحابة – تكريم لتضحيات وإسهامات الصحابة (رضي الله عنهم)</li>
                    <li>التطور العمراني للمدينة – يوضح تحوّل المدينة عبر العصور الإسلامية</li>
                    <li>المخطوطات والخط العربي – نصوص قرآنية أصلية وفنون الخط الإسلامي</li>
                    <li>التأثير العالمي للمدينة – كيف امتد نورها الروحي عبر القارات</li>
                  </ul>

                  <p>كل قاعة ليست مجرد عرض—بل خطوة داخل عالمٍ تشكّل بالوحي، وروح الجماعة، والرحمة الإلهية.</p>

                  <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">🌙 متحف بُني بالأدب والنور</h3>
                  <p>ما يميّز Dar Al Madinah Museum هو طابعه الإسلامي وأجواؤه الإيمانية. فالمتحف ليس مجرد جولة، بل تجربة أقرب إلى الذِّكر والتأمل. من لحظة الترحيب عند المدخل وحتى مساحة التأمل الختامية، يعيش الزائر في بيئة يغمرها الاحترام والسكينة والروحانية.</p>
                  <p>التصميم الداخلي يدعو الزائر إلى التمهّل، والتفكّر بعمق، واستحضار قيم التواضع، والأخوّة، والقيادة النبوية التي ميّزت بدايات الإسلام.</p>

                  <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">🕋 ربط الأجيال بالإرث النبوي</h3>
                  <p>يُعد Dar Al Madinah Museum وجهة مفضلة للعائلات والطلاب والحجّاج، حيث يشكّل جسرًا حيًا بين المعرفة والشعور. يتعرّف الأطفال على جذورهم من خلال نماذج تفاعلية، ويستعيد الكبار القيم الأصيلة، بينما يجد الباحثون والمعلمون مصدر إلهامٍ للعلم والدراسة.</p>
                </>
              ) : locale === 'fr' ? (
                <>
                  <p>Le musée Dar Al-Madinah est la mémoire de la civilisation islamique à Médine. Il incarne les chapitres de la biographie du Prophète, préserve les monuments du patrimoine de la ville, ses antiquités architecturales et ses événements historiques, offrant aux visiteurs un voyage culturel et émotionnel unique.</p>
                  <p className="font-semibold text-slate-800 mt-4 underline decoration-gold-500 underline-offset-4">Histoire et antiquités de Médine :</p>
                  <p>Le musée est l'un des monuments les plus importants de la ville, car il est le premier musée à présenter le patrimoine civilisationnel islamique à travers des méthodes créatives, des modèles réalistes et des photographies documentant le patrimoine architectural, avec un accent sur la biographie du Prophète et les collections archéologiques à travers les âges. Le musée a ouvert ses portes en 2011 dans le but de préserver les antiquités islamiques et architecturales ainsi que les inscriptions historiques retirées des environs de la mosquée du Prophète pour son agrandissement.</p>
                  <p className="font-semibold text-slate-800 mt-4 underline decoration-gold-500 underline-offset-4">Installations du musée :</p>
                  <p>Le musée comprend la salle de la biographie du Prophète, la salle du patrimoine architectural et civilisationnel, la salle d'accueil, le jardin extérieur, le bazar du patrimoine et la boutique du musée. Il expose une vaste collection d'objets rares : parties de la couverture de la Kaaba, pièces de monnaie rares de l'époque prophétique, poteries omeyyades, manuscrits islamiques, bijoux rares, objets et vêtements traditionnels de Médine.</p>
                </>
              ) : locale === 'ur' ? (
                <>
                  <p>دار المدینہ میوزیم مدینہ منورہ میں اسلامی تہذیب کی یادگار ہے۔ یہ سیرت نبوی کے ابواب کو مجسم کرتا ہے، شہر کے ورثے کے نشانات، تعمیراتی نوادرات اور تاریخی واقعات کو محفوظ رکھتا ہے، اور زائرین کو ایک منفرد ثقافتی اور جذباتی سفر فراہم کرتا ہے۔</p>
                  <p className="font-semibold text-slate-800 mt-4 underline decoration-gold-500 underline-offset-4">مدینہ کی تاریخ اور نوادرات:</p>
                  <p>یہ میوزیم شہر کے اہم ترین مقامات میں سے ایک ہے، کیونکہ یہ پہلا میوزیم ہے جو تخلیقی طریقوں، حقیقت پسندانہ ماڈلز اور تعمیراتی ورثے کو دستاویزی شکل دینے والی تصاویر کے ذریعے اسلامی تہذیبی ورثے کو پیش کرتا ہے، جس میں سیرت نبوی اور قدیم دور کے آثار قدیمہ کے مجموعوں پر توجہ دی گئی ہے۔ میوزیم کا افتتاح 2011 میں ہوا تھا جس کا مقصد اسلامی نوادرات کو محفوظ کرنا تھا جو مسجد نبوی کی توسیع کے لیے اس کے گرد و نواح سے ہٹائے گئے تھے۔</p>
                  <p className="font-semibold text-slate-800 mt-4 underline decoration-gold-500 underline-offset-4">میوزیم کی سہولیات:</p>
                  <p>میوزیم میں سیرت نبوی ہال، تعمیراتی اور تہذیبی ورثہ ہال، ہاسپیٹلٹی ہال، آؤٹ ڈور گارڈن، ہیریٹیج بازار، اور میوزیم اسٹور شامل ہیں۔ یہاں نادر نوادرات کا ایک بڑا مجموعہ نمائش کے لیے پیش کیا گیا ہے: غلاف کعبہ کے حصے، نایاب سکے، اموی دور کے مٹی کے برتن، اسلامی مخطوطات، نایاب زیورات، اور مدینہ کے روایتی لباس۔</p>
                </>
              ) : locale === 'id' ? (
                <>
                  <p>Museum Dar Al-Madinah adalah memori peradaban Islam di Madinah Al-Munawwarah. Museum ini mewujudkan bab-bab dari biografi Nabi, melestarikan tengara warisan kota, barang antik arsitektur, dan peristiwa bersejarah, menawarkan pengunjung perjalanan budaya dan emosional yang unik.</p>
                  <p className="font-semibold text-slate-800 mt-4 underline decoration-gold-500 underline-offset-4">Sejarah dan Barang Antik Madinah:</p>
                  <p>Museum ini adalah salah satu landmark terpenting di kota ini, karena merupakan museum pertama yang menampilkan warisan peradaban Islam melalui metode kreatif, model realistis, dan foto-foto yang mendokumentasikan warisan arsitektur, dengan fokus pada biografi Nabi. Museum ini dibuka pada tahun 2011 dengan tujuan melestarikan barang antik Islam dan arsitektur serta prasasti sejarah yang dipindahkan dari sekitar Masjid Nabawi.</p>
                  <p className="font-semibold text-slate-800 mt-4 underline decoration-gold-500 underline-offset-4">Fasilitas Museum:</p>
                  <p>Museum ini mencakup Aula Biografi Nabi, Aula Warisan Arsitektur dan Peradaban, Aula Perjamuan, Taman Luar Ruangan, Pasar Warisan, dan Toko Museum. Museum ini menampilkan banyak koleksi artefak langka: bagian dari kain kiswah Ka'bah, koin langka dari zaman Kenabian, tembikar Umayyah, manuskrip Islam, perhiasan langka, artefak dan pakaian tradisional Madinah.</p>
                </>
              ) : (
                <>
                  <p>Dar Al-Madinah Museum is the memory of Islamic civilization in Al-Madinah Al-Munawwarah. It embodies the chapters of the Prophet's biography, preserves the city's heritage landmarks, architectural antiquities, and historical events, offering visitors a unique cultural and emotional journey.</p>
                  <p className="font-semibold text-slate-800 mt-4 underline decoration-gold-500 underline-offset-4">History and Antiquities of Medina:</p>
                  <p>The museum is one of the city's most important landmarks, as it is the first museum to display Islamic civilizational heritage through creative methods, realistic models, and photographs documenting architectural heritage, with a focus on the Prophet's biography and archaeological collections throughout the ages. The museum opened in 2011 with the aim of preserving the Islamic and architectural antiquities and historical inscriptions that were removed from the vicinity of the Prophet's Mosque for its expansion.</p>
                  <p className="font-semibold text-slate-800 mt-4 underline decoration-gold-500 underline-offset-4">Museum Facilities:</p>
                  <p>The museum includes the Prophet's Biography Hall, the Architectural and Civilizational Heritage Hall, the Hospitality Hall, the Outdoor Garden, the Heritage Bazaar, and the Museum Store. It displays a large collection of rare artifacts: parts of the Kaaba cover, rare coins, Umayyad pottery, Islamic manuscripts, rare jewelry, traditional artifacts and clothing from Medina.</p>
                </>
              )}
            </div>
            
            {/* Image Placeholder */}
            <div className="w-full h-64 bg-slate-100 flex items-center justify-center rounded overflow-hidden relative p-4">
              <span className="text-slate-400 absolute z-0">Image</span>
              <img src="/images/official-museum-logo.png" alt="Dar Al-Madinah Museum Logo" className="w-full h-full object-contain relative z-10" />
            </div>
          </div>
          
          {/* Contact Us Column */}
          <div className="md:w-1/2 p-8 lg:p-12 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
              {locale === 'ar' ? 'اتصل بنا' : 
               locale === 'fr' ? 'Contactez-nous' :
               locale === 'ur' ? 'رابطہ کریں' :
               locale === 'id' ? 'Hubungi Kami' :
               'Contact Us'}
            </h2>
            
            <div className="space-y-6">
              {/* Get in touch */}
              <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
                <Phone className="text-slate-400 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {locale === 'ar' ? 'تواصل معنا' : 
                     locale === 'fr' ? 'Restez en Contact' :
                     locale === 'ur' ? 'رابطہ کریں' :
                     locale === 'id' ? 'Hubungi' :
                     'Get in Touch'}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">{/* +966 5X XXX XXXX */} <span dir="ltr" className="inline-block">053 477 9997</span></p>
                </div>
              </div>
              
              {/* Contact Form Placeholder */}
              <div className="pb-4 border-b border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-3">
                  {locale === 'ar' ? 'نموذج التواصل' : 
                   locale === 'fr' ? 'Formulaire de Contact' :
                   locale === 'ur' ? 'رابطہ فارم' :
                   locale === 'id' ? 'Formulir Kontak' :
                   'Contact Form'}
                </h4>
                <div className="space-y-3">
                  <input type="text" placeholder={locale === 'ar' ? 'الاسم' : locale === 'fr' ? 'Nom' : locale === 'ur' ? 'نام' : locale === 'id' ? 'Nama' : 'Name'} className="w-full text-sm p-2 border border-slate-300 rounded" />
                  <input type="email" placeholder={locale === 'ar' ? 'البريد الإلكتروني' : locale === 'fr' ? 'Email' : locale === 'ur' ? 'ای میل' : locale === 'id' ? 'Email' : 'Email'} className="w-full text-sm p-2 border border-slate-300 rounded" />
                  <textarea placeholder={locale === 'ar' ? 'رسالتك' : locale === 'fr' ? 'Votre Message' : locale === 'ur' ? 'آپ کا پیغام' : locale === 'id' ? 'Pesan Anda' : 'Message'} className="w-full text-sm p-2 border border-slate-300 rounded h-20"></textarea>
                  <button className="bg-slate-600 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 transition">
                    {locale === 'ar' ? 'إرسال' : locale === 'fr' ? 'Envoyer' : locale === 'ur' ? 'جمع کرائیں' : locale === 'id' ? 'Kirim' : 'Submit'}
                  </button>
                </div>
              </div>

              {/* Location Map */}
              <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
                <MapPin className="text-slate-400 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {locale === 'ar' ? 'موقعنا' : 
                     locale === 'fr' ? 'Notre Emplacement' :
                     locale === 'ur' ? 'ہماری جگہ' :
                     locale === 'id' ? 'Lokasi Kami' :
                     'Our Location'}
                  </h4>
                  <a href="https://www.google.com/maps/place/%D9%85%D8%AA%D8%AD%D9%81+%D8%AF%D8%A7%D8%B1+%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9%E2%80%AD/@24.477348,39.687873,16z/data=!4m15!1m8!3m7!1s0x15bd95ce0ebf7e81:0x8cc71c20e7cd1913!2z2YXYqtit2YEg2K_Yp9ixINin2YTZhdiv2YrZhtip!8m2!3d24.477161!4d39.6878556!10e1!16s%2Fg%2F11h3l3q73y!3m5!1s0x15bd95ce0ebf7e81:0x8cc71c20e7cd1913!8m2!3d24.477161!4d39.6878556!16s%2Fg%2F11h3l3q73y!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-sm text-gold-600 hover:underline flex items-center gap-1 mt-1">
                    {locale === 'ar' ? 'عرض على خرائط جوجل' : 
                     locale === 'fr' ? 'Voir sur Google Maps' :
                     locale === 'ur' ? 'گوگل میپس پر دیکھیں' :
                     locale === 'id' ? 'Lihat di Google Maps' :
                     'View on Google Maps'}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
                <Mail className="text-slate-400 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {locale === 'ar' ? 'البريد الإلكتروني' : 
                     locale === 'fr' ? 'Email' :
                     locale === 'ur' ? 'ای میل' :
                     locale === 'id' ? 'Email' :
                     'Email'}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">info@daralmadinah.com</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Project Team Introduction — fully translated */}
      <div className="mt-16 museum-card p-8 md:p-12 relative overflow-hidden bg-white">
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
              className="max-w-4xl mx-auto text-center"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
                {c.title}
              </h2>

              <div className={`text-slate-700 leading-loose text-base md:text-lg space-y-4 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                <p className="font-medium text-slate-800">
                  {c.intro}
                  <br />
                  <span className="text-gold-600">{c.college}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-900">{c.supervisor}</span>
                </p>
                <p className="text-slate-600 bg-slate-50 p-4 rounded-lg border-l-4 border-gold-500 italic">
                  {c.goal}
                </p>
              </div>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto my-8 opacity-50" />

              <h3 className={`text-xl font-bold text-slate-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {c.section2}
              </h3>
              <p className={`text-slate-600 text-sm md:text-base leading-relaxed mb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
                {c.body}
              </p>

              <div className="flex justify-center">
                <img
                  src="/images/official-museum-logo.png"
                  alt="Dar Al-Madinah Museum"
                  className="h-20 md:h-24 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
