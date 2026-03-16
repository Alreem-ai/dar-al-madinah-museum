const fs = require('fs');

const categories = [
    {
      "id": "pottery",
      "title": { "en": "Heritage Pottery", "ar": "أواني تراثية من المدينة", "fr": "Poterie du Patrimoine", "ur": "ورثہ کے برتن", "id": "Tembikar Warisan" },
      "count": 17,
      "image": "/images/pottery.png"
    },
    {
      "id": "clothing",
      "title": { "en": "Clothing / Fashion", "ar": "أزياء", "fr": "Vêtements / Mode", "ur": "لباس", "id": "Pakaian / Mode" },
      "count": 17,
      "image": "/images/clothing.png"
    },
    {
      "id": "jewelry",
      "title": { "en": "Jewelry", "ar": "حلي", "fr": "Bijoux", "ur": "زیورات", "id": "Perhiasan" },
      "count": 17,
      "image": "/images/jewelry.png"
    },
    {
      "id": "coins",
      "title": { "en": "Coins from the Prophetic Era", "ar": "عملات من عهد النبي", "fr": "Pièces de l'Ère Prophétique", "ur": "عہد نبوی کے سکے", "id": "Koin Peninggalan Nabi" },
      "count": 6,
      "image": "/images/coins.png"
    },
    {
      "id": "battles",
      "title": { "en": "Battles of the Prophet / Models", "ar": "غزوات النبي - مجسمات", "fr": "Batailles du Prophète / Modèles", "ur": "نبی کی جنگیں / ماڈل", "id": "Pertempuran Nabi / Model" },
      "count": 35,
      "image": "/images/swords.png"
    },
    {
      "id": "manuscripts",
      "title": { "en": "Manuscripts & Prophetic Stories", "ar": "مخطوطات وقصص النبي", "fr": "Manuscrits et Histoires Prophétiques", "ur": "مخطوطات اور نبی کی کہانیاں", "id": "Manuskrip & Kisah Nabi" },
      "count": 8,
      "image": "/images/scrolls.png"
    }
];

const featuredArtifactIds = ["dome-of-the-rock", "arrival-model", "nabawi-abdul-majid"];

const artifacts_1_4 = [
    {
      "id": "arrival-model",
      "title": { "en": "Arrival of the Prophet", "ar": "قدوم النبي", "fr": "L'Arrivée du Prophète", "ur": "نبی کی آمد", "id": "Kedatangan Nabi" },
      "category": "battles",
      "description": { 
        "en": "The Prophet and his companion Abu Bakr Al-Siddiq continued their journey to Medina, accompanied by his servant Amir bin Fuhayrah and their guide who led them on the path to the lower part of Mecca, then proceeded along the coast until the procession reached Thaniyat Al-Aair on the right of his mount, and the procession descended into the belly of the valley, then ascended the Harrah to descend into the depression and walk parallel to Wadi Al-Ranunah until reaching Quba.",
        "ar": "تابع النبي وصاحبه أبي بكر الصديق الطريق إلى المدينة بصحبة خادمه عامر بن فهيرة ودليلهما الذي سلك بهما الطريق إلى أسفل مكة ثم مضى بهما على الساحل حتى وصل الركب إلى ثنية العائر عن يمين ركوبه، وهبط الركب إلى بطن الوادي ثم اعتلى الحرة ليهبط إلى المنخفض ويسير محاذياً لـ وادي الرانوناء حتى وصل قباء.",
        "fr": "Le Prophète et son compagnon Abu Bakr Al-Siddiq poursuivirent leur route vers Médine, accompagnés de son serviteur Amir bin Fuhayrah et de leur guide qui les conduisit sur le chemin vers la partie basse de la Mecque, puis ils longèrent la côte jusqu'à ce que le cortège atteigne Thaniyat Al-Aair sur la droite de sa monture, et le cortège descendit au fond de la vallée, puis escalada la Harrah pour redescendre dans la dépression et longer la vallée de Wadi Al-Ranunah jusqu'à atteindre Quba.",
        "ur": "نبی کریم اور ان کے ساتھی ابوبکر صدیق اپنے خادم عامر بن فہیرہ اور اپنے رہنما کے ساتھ مدینہ کی طرف اپنا سفر جاری رکھے ہوئے تھے جس نے انہیں مکہ کے نچلے حصے کی طرف رہنمائی کی، پھر ساحل کے ساتھ چلتے رہے یہاں تک کہ قافلہ ان کی سواری کے دائیں جانب ثنیۃ العائر تک پہنچ گیا، اور قافلہ وادی کے پیٹ میں اتر گیا، پھر حرہ پر چڑھ کر نشیب میں اترا اور وادی رانوناء کے متوازی چلتا رہا یہاں تک کہ قباء پہنچ گیا۔",
        "id": "Nabi dan sahabatnya Abu Bakar As-Siddiq melanjutkan perjalanan ke Madinah, ditemani oleh pelayannya Amir bin Fuhairah dan pemandu mereka yang memimpin mereka di jalur ke bagian bawah Mekah, kemudian menyusuri pantai hingga rombongan mencapai Thaniyat Al-Aair di sebelah kanan tunggangan beliau, dan rombongan turun ke dasar lembah, kemudian mendaki Harrah untuk turun ke dataran rendah dan berjalan sejajar dengan Wadi Al-Ranunah hingga tiba di Quba."
      },
      "era": { "en": "Prophetic Era", "ar": "العهد النبوي", "fr": "Ère Prophétique", "ur": "عہد نبوی", "id": "Era Kenabian" },
      "material": { "en": "Diorama Model", "ar": "مجسم ديوراما", "fr": "Modèle de Diorama", "ur": "ڈیوراما ماڈل", "id": "Model Diorama" },
      "origin": { "en": "Medina, Dar Al-Madinah Museum", "ar": "المدينة المنورة، متحف دار المدينة", "fr": "Médine, Musée Dar Al-Madinah", "ur": "مدینہ، دار المدینہ میوزیم", "id": "Madinah, Museum Dar Al-Madinah" },
      "image": "/images/artifacts/arrival.jpg",
      "audioUrl": null
    },
    {
      "id": "dome-of-the-rock",
      "title": { 
        "en": "Dome of the Rock", 
        "ar": "قبة الصخرة", 
        "fr": "Le Dôme du Rocher", 
        "ur": "قبۃ الصخرہ", 
        "id": "Kubah Batu" 
      },
      "category": "battles",
      "description": { 
        "en": "The Dome of the Rock is considered the oldest Islamic building still standing today. Built during the reign of Caliph Abd al-Malik ibn Marwan, construction began in 68 AH / 687 AD and was completed in 72 AH / 691 AD. It is located within the walls of Al-Aqsa Sharif in Jerusalem.",
        "ar": "تعتبر قبة الصخرة من أقدم المباني الإسلامية القائمة حتى اليوم. بنيت في عهد الخليفة عبد الملك بن مروان، بدأ بناؤها عام 68هـ / 687م واكتمل عام 72هـ / 691م، وتقع داخل حرم المسجد الأقصى في القدس.",
        "fr": "Le Dôme du Rocher est considéré comme le plus ancien édifice islamique encore debout aujourd'hui. Construit sous le règne du calife Abd al-Malik ibn Marwan, sa construction a commencé en 68 AH / 687 ap. J.-C. et s'est achevée en 72 AH / 691 ap. J.-C. Il est situé dans l'enceinte d'Al-Aqsa Sharif à Jérusalem.",
        "ur": "قبۃ الصخرہ کو آج تک کی قدیم ترین اسلامی عمارت سمجھا جاتا ہے۔ اسے خلیفہ عبدالملک بن مروان کے دور میں تعمیر کیا گیا تھا؛ تعمیر کا آغاز 68ھ / 687ء میں ہوا اور 72ھ / 691ء میں تکمیل ہوئی۔ یہ بیت المقدس میں مسجد اقصیٰ کے احاطے کے اندر واقع ہے۔",
        "id": "Kubah Batu (Dome of the Rock) dianggap sebagai bangunan Islam tertua yang masih berdiri hingga saat ini. Didirikan pada masa Khalifah Abd al-Malik bin Marwan; konstruksi dimulai pada tahun 68 H / 687 M dan selesai pada tahun 72 H / 691 M. Terletak di dalam kompleks Al-Aqsa di Yerusalem." 
      },
      "era": { "en": "Umayyad Era", "ar": "العصر الأموي", "fr": "Ère Omeyyade", "ur": "دورِ اموی", "id": "Era Umayyah" },
      "material": { "en": "Diorama Model", "ar": "مجسم ديوراما", "fr": "Modèle de Diorama", "ur": "ڈیوراما ماڈل", "id": "Model Diorama" },
      "origin": { "en": "Jerusalem, Palestine", "ar": "القدس، فلسطين", "fr": "Jérusalem, Palestine", "ur": "بیت المقدس، فلسطین", "id": "Yerusalem, Palestina" },
      "image": "/images/artifacts/dome-of-the-rock.jpg",
      "audioUrl": null
    },
    {
      "id": "nabawi-abdul-majid",
      "title": { 
        "en": "Architecture of the Prophet's Mosque", 
        "ar": "عمارة المسجد النبوي", 
        "fr": "Architecture de la Mosquée du Prophète", 
        "ur": "مسجد نبوی کی تعمیر", 
        "id": "Arsitektur Masjid Nabawi" 
      },
      "category": "battles",
      "description": { 
        "en": "The architecture of Sultan Abdul Majid I is considered the largest renovation ever conducted for the Prophet's Mosque during the Ottoman era. The work continued between 1265 - 1277 AH (1848 - 1860 AD).", 
        "ar": "تعتبر عمارة السلطان عبد المجيد الأول أكبر عمارة جرت للمسجد النبوي الشريف في العصر العثماني. استمر العمل بها بين عامي (1265 - 1277 هـ / 1848 - 1860 م).", 
        "fr": "L'architecture du Sultan Abdul Majid I est considérée comme la plus grande rénovation jamais entreprise pour la Mosquée du Prophète à l'époque ottomane. Les travaux se sont poursuivis entre 1265 et 1277 AH (1848 - 1860 ap. J.-C.).", 
        "ur": "سلطان عبد المجید اول کی تعمیر کو عثمانی دور میں مسجد نبوی شریف کے لیے کی جانے والی سب سے بڑی تعمیراتی کوشش سمجھا جاتا ہے۔ اس کا کام 1265ھ سے 1277ھ (1848ء - 1860ء) کے درمیان جاری رہا۔", 
        "id": "Arsitektur Sultan Abdul Majid I dianggap sebagai renovasi terbesar yang pernah dilakukan untuk Masjid Nabawi pada era Utsmaniyah. Pengerjaannya berlangsung antara tahun 1265 - 1277 H (1848 - 1860 M)." 
      },
      "era": { "en": "Ottoman Era", "ar": "العصر العثماني", "fr": "Ère Ottomane", "ur": "عہدِ عثمانی", "id": "Era Utsmaniyah" },
      "material": { "en": "Diorama Model", "ar": "مجسم ديوراما", "fr": "Modèle de Diorama", "ur": "ڈیوراما ماڈل", "id": "Model Diorama" },
      "origin": { "en": "Medina, Dar Al-Madinah Museum", "ar": "المدينة المنورة، متحف دار المدينة", "fr": "Médine, Musée Dar Al-Madinah", "ur": "مدینہ، دار المدینہ میوزیم", "id": "Madinah, Museum Dar Al-Madinah" },
      "image": "/images/artifacts/nabawi-abdul-majid.jpg",
      "audioUrl": null
    },
    {
      "id": "kaaba-saudi",
      "title": { 
        "en": "The Holy Kaaba in the Saudi Era", 
        "ar": "الكعبة المشرفة في العهد السعودي", 
        "fr": "La Sainte Kaaba à l'ère saoudienne", 
        "ur": "سعودی عہد میں خانہ کعبہ", 
        "id": "Ka'bah Suci di Era Saudi" 
      },
      "category": "battles",
      "description": { 
        "en": "The Holy Kaaba has received unprecedented care and attention during the Saudi era, starting from the reign of King Abdulaziz Al Saud. In 1954 (1373 AH), the Kaaba's roof was replaced with a new one made of strong teak wood.", 
        "ar": "شهدت الكعبة المشرفة في العهد السعودي عناية فائقة، بدءاً من عهد الملك عبدالعزيز آل سعود. وفي عام 1373هـ، تم استبدال سقف الكعبة بآخر من خشب الزان القوي.", 
        "fr": "La Sainte Kaaba a reçu un soin sans précédent pendant l'ère saoudienne, commençant par le règne du roi Abdulaziz Al Saud. En 1954 (1373 AH), le toit a été remplacé par un nouveau en bois de teck massif.", 
        "ur": "سعودی عہد کے دوران خانہ کعبہ کو بے مثال دیکھ بھال حاصل رہی، جس کا آغاز شاہ عبدالعزیز آل سعود کے دور سے ہوا۔ 1954 (1373ھ) میں کعبہ کی چھت کو مضبوط ساگون کی لکڑی سے بنی نئی چھت سے تبدیل کیا گیا۔", 
        "id": "Ka'bah Suci telah menerima perawatan yang belum pernah terjadi sebelumnya selama era Saudi, dimulai dari masa pemerintahan Raja Abdulaziz Al Saud. Pada tahun 1954 (1373 H), atap Ka'bah diganti dengan yang baru yang terbuat dari kayu jati yang kuat." 
      },
      "era": { "en": "Modern Saudi Era", "ar": "العهد السعودي الحديث", "fr": "Ère Saoudienne Moderne", "ur": "جدید سعودی عہد", "id": "Era Saudi Modern" },
      "material": { "en": "Diorama Model", "ar": "مجسم ديوراما", "fr": "Modèle de Diorama", "ur": "ڈیوراما ماڈل", "id": "Model Diorama" },
      "origin": { "en": "Mecca, Dar Al-Madinah Museum", "ar": "مكة المكرمة، متحف دار المدينة", "fr": "La Mecque, Musée Dar Al-Madinah", "ur": "مکہ مکرمہ، دار المدینہ میوزیم", "id": "Mekkah, Museum Dar Al-Madinah" },
      "image": "/images/artifacts/kaaba-saudi.png",
      "audioUrl": null
    }
];

const revelation_hira = {
    "id": "revelation-hira",
    "title": {
        "en": "The Beginnings of Revelation - Cave Hira",
        "ar": "بدء الوحي - غار حراء",
        "fr": "Le début de la Révélation - Grotte de Hira",
        "ur": "نزولِ وحی کا آغاز - غار حرا",
        "id": "Awal Mula Wahyu - Gua Hira"
    },
    "category": "battles",
    "description": {
        "en": "The Messenger of Allah ﷺ used to spend his time in seclusion in Cave Hira, worshiping and contemplating the heavens and the earth. When he reached the age of forty, Allah honored him with prophethood, which began with true dreams. While in the cave during Ramadan, Jibril (Gabriel) appeared and said: 'Read!' The Prophet ﷺ replied: 'I cannot read.' Jibril embraced him three times until he was exhausted, then said: 'Read in the name of your Lord who created—created man from a clinging substance. Read, and your Lord is the most Generous, who taught by the pen—taught man that which he knew not.' Trembling, the Prophet ﷺ returned to Khadijah, who comforted him. They visited Waraqah bin Nawfal, who confirmed: 'This is the same Angel who came to Moses. You are indeed the Prophet of this nation.'",
        "ar": "كان رسول الله ﷺ يخلو بنفسه في غار حراء، يتعبد ويتفكر في خلق السماوات والأرض. ولما بلغ الأربعين، أكرمه الله بالنبوة، وبدأت بالرؤيا الصادقة. وبينما هو في الغار في رمضان، جاءه الملك جبريل فقال: 'اقرأ'، فقال ﷺ: 'ما أنا بقارئ'. فضمه جبريل ثلاثاً حتى بلغ منه الجهد، ثم قال: {اقرأ باسم ربك الذي خلق، خلق الإنسان من علق، اقرأ وربك الأكرم الذي علم بالقلم، علم الإنسان ما لم يعلم}. عاد النبي ﷺ وهو يرجف إلى زوجته خديجة فطمأنته، وذهبا إلى ورقة بن نوفل الذي أكد له: 'هذا هو الناموس الذي نزل على موسى، وإنك لنبي هذه الأمة'.",
        "fr": "Le Messager d'Allah ﷺ passait son temps en retraite spirituelle dans la grotte de Hira, adorant et contemplant les cieux et la terre. Lorsqu'il atteignit l'âge de quarante ans, Allah l'honora de la prophétie, qui commença par des rêves véridiques. Alors qu'il se trouvait dans la grotte pendant le Ramadan, Jibril (Gabriel) apparut et dit : 'Lis !' Le Prophète ﷺ répondit : 'Je ne sais pas lire.' Jibril l'étreignit trois fois jusqu'à ce qu'il soit épuisé, puis dit : 'Lis, au nom de ton Seigneur qui a créé...'. Tremblant, le Prophète ﷺ retourna auprès de Khadija, qui le réforta. Ils rendirent visite à Waraqah bin Nawfal, qui confirma : 'C'est le même Ange qui est venu à Moïse. Tu es bel et bien le Prophète de cette nation.'",
        "ur": "رسول اللہ ﷺ غارِ حرا میں تنہائی میں وقت گزارتے، عبادت کرتے اور آسمان و زمین کی تخلیق پر غور فرماتے تھے۔ جب آپ ﷺ چالیس سال کے ہوئے تو اللہ تعالیٰ نے آپ کو نبوت سے سرفراز فرمایا، جس کا آغاز سچے خوابوں سے ہوا۔ رمضان کے مہینے میں جب آپ ﷺ غار میں تھے، حضرت جبرئیلؑ ظاہر ہوئے اور کہا: 'پڑھو!' آپ ﷺ نے جواب دیا: 'میں پڑھنا نہیں جانتا۔' جبرئیلؑ نے آپ کو تین بار بھینچا یہاں تک کہ آپ نڈھال ہو گئے، پھر کہا: 'پڑھو اپنے رب کے نام سے جس نے پیدا کیا...'۔ آپ ﷺ لرزتے ہوئے حضرت خدیجہؓ کے پاس آئے جنہوں نے آپ کو تسلی دی۔ آپ ورقہ بن نوفل کے پاس گئے جنہوں نے تصدیق کی: 'یہ وہی فرشتہ ہے جو موسیٰؑ کے پاس آیا تھا۔ آپ یقیناً اس امت کے نبی ہیں۔'",
        "id": "Rasulullah ﷺ biasa menghabiskan waktunya dengan menyendiri di Gua Hira, beribadah dan merenungkan langit dan bumi. Ketika beliau mencapai usia empat puluh tahun, Allah memuliakannya dengan kenabian, yang dimulai dengan mimpi-mimpi yang benar. Saat berada di gua selama bulan Ramadan, Jibril muncul dan berkata: 'Bacalah!' Nabi ﷺ menjawab: 'Aku tidak bisa membaca.' Jibril mendekapnya tiga kali hingga beliau kelelahan, lalu berkata: 'Bacalah dengan menyebut nama Tuhanmu yang menciptakan—menciptakan manusia dari segumpal darah. Bacalah, dan Tuhanmulah Yang Mahamulia, yang mengajar manusia dengan pena—mengajar manusia apa yang tidak diketahuinya.' Dengan hati yang gemetar, Nabi ﷺ kembali ke istrinya Khadijah, yang menenangkannya: 'Kabar gembira, demi Allah, Dia tidak akan pernah menghinakanmu.' Mereka mengunjungi Waraqah bin Nawfal, seorang sarjana kitab suci, yang menegaskan: 'Ini adalah Namus (Malaikat) yang sama yang datang kepada Musa. Engkau memang Nabi umat ini.'"
    },
    "era": { "en": "Prophetic Era", "ar": "العهد النبوي", "fr": "Ère Prophétique", "ur": "عہدِ نبوی", "id": "Era Kenabian" },
    "material": { "en": "Diorama Model", "ar": "مجسم ديوراما", "fr": "Modèle de Diorama", "ur": "ڈیوراما ماڈل", "id": "Model Diorama" },
    "origin": { "en": "Medina, Dar Al-Madinah Museum", "ar": "المدينة المنورة، متحف دار المدينة", "fr": "Médine, Musée Dar Al-Madinah", "ur": "مدینہ، دار المدینہ میوزیم", "id": "Madinah, Museum Dar Al-Madinah" },
    "image": "/images/artifacts/revelation-hira.jpg",
    "audioUrl": null
};

const al_qibli_mosque = {
    "id": "al-qibli-mosque",
    "title": {
        "en": "Al-Qibli Mosque in Al-Aqsa Sharif",
        "ar": "المسجد القبلي في الأقصى الشريف (المسجد الأقصى)",
        "fr": "La mosquée Al-Qibli à Al-Aqsa Sharif",
        "ur": "مسجد اقصیٰ شریف میں مسجد قبلی",
        "id": "Masjid Al-Qibli di Al-Aqsa Sharif"
    },
    "category": "battles",
    "description": {
        "en": "The Qibli Mosque, commonly known as Al-Aqsa Mosque, consists of a large central nave supported by marble columns extending from north to south, covered by a lead-plated gabled roof. To the south, it is capped by a grand spherical dome resting on four stone pillars and four arches, forming the base for the double-layered dome. The interior is adorned with intricate mosaics and decorations, while the exterior was once covered in gold-plated copper (similar to the Dome of the Rock) but was recently replaced with lead. Located within the walls of Al-Aqsa Sharif, it was built by Abd al-Malik ibn Marwan between 709 CE (90 AH) and 714 CE (96 AH).",
        "ar": "يتألف الجامع القبلي أو ما يعرف بالمسجد الأقصى من رواق أوسط كبير يقوم على أعمدة رخامية ممتدة من الشمال إلى الجنوب، تغطيه جملون مصفح بألواح الرصاص. وينتهي من الجنوب بقبة عظيمة كروية الشكل تقوم على أربعة دعامات وحجرية وأقواس، تحمل رقبة القبة المكونة من طبقتين. زينت القبة من الداخل بالزخارف والفسيفساء، ومن الخارج تمت تغطيتها بصفائح النحاس المطلية بالذهب ثم استبدلت حديثاً بالرصاص. يقع الجامع القبلي داخل رواق سور الأقصى الشريف، بناه عبد الملك بن مروان بين عامي 90 هـ (709 م) و96 هـ (714 م).",
        "fr": "La mosquée Al-Qibli, communément appelée mosquée Al-Aqsa, se compose d'une grande nef centrale soutenue par des colonnes de marbre s'étendant du nord au sud, couverte d'un toit en bâtière plaqué de plomb. Au sud, elle est surmontée d'un grand dôme sphérique reposant sur quatre piliers en pierre et quatre arches. L'intérieur est orné de mosaïques complexes, tandis que l'extérieur était autrefois recouvert de cuivre plaqué or (comme le Dôme du Rocher) mais a été récemment remplacé par du plomb. Situé dans l'enceinte d'Al-Aqsa Sharif, il a été construit par Abd al-Malik ibn Marwan entre 709 (90 AH) et 714 (96 AH).",
        "ur": "جامع قبلی، جسے عام طور پر مسجد اقصیٰ کے نام سے جانا جاتا ہے، ایک بڑے مرکزی ہال پر مشتمل ہے جو سنگ مرمر کے ستونوں پر قائم ہے جو شمال سے جنوب تک پھیلے ہوئے ہیں۔ اس کی چھت سیسے کی چادروں سے ڈھکی ہوئی ہے۔ جنوب میں ایک عظیم الشان گنبد ہے جو چار پتھریلے ستونوں اور محرابوں پر قائم ہے۔ گنبد کے اندرونی حصے کو پچی کاری اور نقش و نگار سے سجایا گیا ہے، جبکہ بیرونی حصہ پہلے سونے کے پانی چڑھے تانبے سے ڈھکا ہوا تھا (قبتہ الصخرہ کی طرح) لیکن حال ہی میں اسے سیسے سے بدل دیا گیا ہے۔ یہ مسجد اقصیٰ شریف کی حدود میں واقع ہے اور اسے عبدالملک بن مروان نے 709ء (90ھ) سے 714ء (96ھ) کے درمیان تعمیر کروایا تھا۔",
        "id": "Masjid Al-Qibli, yang umumnya dikenal sebagai Masjid Al-Aqsa, terdiri dari ruang utama besar yang didukung oleh pilar marmer yang membentang dari utara ke selatan, ditutupi oleh atap pelana berlapis timah. Di sisi selatan, terdapat kubah besar berbentuk bola yang berdiri di atas empat pilar batu dan sebuah lengkungan."
    },
    "era": { "en": "Umayyad Era", "ar": "العصر الأموي", "fr": "Ère Omeyyade", "ur": "بنو امیہ کا دور", "id": "Era Umayyah" },
    "material": { "en": "Diorama Model", "ar": "مجسم ديوراما", "fr": "Modèle de Diorama", "ur": "ڈیوراما ماڈل", "id": "Model Diorama" },
    "origin": { "en": "Jerusalem, Dar Al-Madinah Museum", "ar": "القدس، متحف دار المدينة", "fr": "Jérusalem, Musée Dar Al-Madinah", "ur": "یروشلم، دار المدینہ میوزیم", "id": "Yerusalem, Museum Dar Al-Madinah" },
    "image": "/images/artifacts/al-qibli-mosque.png",
    "audioUrl": null
};

function loadChunk(path) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

const chunk_6_8 = loadChunk('chunk_6_8.json');
const chunk_9_11 = loadChunk('chunk_9_11.json');
const chunk_12_14 = loadChunk('chunk_12_14.json');
const temp_chunk_4 = loadChunk('temp_chunk_4.json');

const final_artifacts = [];

// Add 1-4
final_artifacts.push(...artifacts_1_4);

// 5: friday-prayer
final_artifacts.push(chunk_6_8[0]);

// 6: revelation-hira
final_artifacts.push(revelation_hira);

// 7: year-of-elephant
final_artifacts.push(chunk_6_8[1]);

// 8: ansar-love
final_artifacts.push(chunk_6_8[2]);

// 9: yathrib-inhabitants
final_artifacts.push(chunk_9_11[0]);

// 10: kaaba-quraysh
final_artifacts.push(chunk_9_11[1]);

// 11: valley-ibrahim-hill
final_artifacts.push(chunk_9_11[2]);

// 12: kaaba-ottoman
final_artifacts.push(chunk_12_14[0]);

// 13: al-qibli-mosque
final_artifacts.push(al_qibli_mosque);

// 14: kaaba-zubayr
final_artifacts.push(temp_chunk_4[0]);

// 15: prophet-arrival
final_artifacts.push(temp_chunk_4[1]);

// 16: quranic-writing-materials
final_artifacts.push(temp_chunk_4[2]);

const fullData = {
    "categories": categories,
    "featuredArtifacts": featuredArtifactIds,
    "artifacts": final_artifacts
};

fs.writeFileSync('data_restored.json', JSON.stringify(fullData, null, 2), 'utf8');
console.log("Successfully restored 16 artifacts to data_restored.json");
