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

function loadChunk(path) {
    try {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (e) {
        console.error(`Error loading ${path}: ${e.message}`);
        return null;
    }
}

// Fixed 1-4
const artifacts_1_4 = [
    {
      "id": "arrival-model",
      "title": { "en": "Arrival of the Prophet", "ar": "قدوم النبي", "fr": "L'Arrivée du Prophète", "ur": "نبی کی آمد", "id": "Kedatangan Nabi" },
      "category": "battles",
      "description": { 
        "en": "The Prophet and his companion Abu Bakr Al-Siddiq continued their journey to Medina, accompanied by his servant Amir bin Fuhayrah and their guide who led them on the path to the lower part of Mecca, then proceeded along the coast until the procession reached Thaniyat Al-Aair on the right of his mount.",
        "ar": "تابع النبي وصاحبه أبي بكر الصديق الطريق إلى المدينة بصحبة خادمه عامر بن فهيرة ودليلهما الذي سلك بهما الطريق إلى أسفل مكة ثم مضى بهما على الساحل حتى وصل الركب إلى ثنية العائر عن يمين ركوبه.",
        "fr": "Le Prophète et son compagnon Abu Bakr Al-Siddiq poursuivirent leur route vers Médine.",
        "ur": "نبی کریم اور ان کے ساتھی ابوبکر صدیق اپنے خادم عامر بن فہیرہ اور اپنے رہنما کے ساتھ مدینہ کی طرف اپنا سفر جاری رکھے ہوئے تھے۔",
        "id": "Nabi dan sahabatnya Abu Bakar As-Siddiq melanjutkan perjalanan ke Madinah."
      },
      "era": { "en": "Prophetic Era", "ar": "العهد النبوي", "fr": "Ère Prophétique", "ur": "عہد نبوی", "id": "Era Kenabian" },
      "material": { "en": "Diorama Model", "ar": "مجسم ديوراما", "fr": "Modèle de Diorama", "ur": "ڈیوراما ماڈل", "id": "Model Diorama" },
      "origin": { "en": "Medina, Dar Al-Madinah Museum", "ar": "المدينة المنورة، متحف دار المدينة", "fr": "Médine, Musée Dar Al-Madinah", "ur": "مدینہ، دار المدینہ میوزیم", "id": "Madinah, Museum Dar Al-Madinah" },
      "image": "/images/artifacts/arrival.jpg",
      "audioUrl": null
    },
    {
      "id": "dome-of-the-rock",
      "title": { "en": "Dome of the Rock", "ar": "قبة الصخرة", "fr": "Le Dôme du Rocher", "ur": "قبۃ الصخرہ", "id": "Kubah Batu" },
      "category": "battles",
      "description": { 
        "en": "The Dome of the Rock is considered the oldest Islamic building still standing today. Built during the reign of Caliph Abd al-Malik ibn Marwan, construction began in 68 AH / 687 AD and was completed in 72 AH / 691 AD.",
        "ar": "تعتبر قبة الصخرة من أقدم المباني الإسلامية القائمة حتى اليوم. بنيت في عهد الخليفة عبد الملك بن مروان، بدأ بناؤها عام 68هـ / 687م واكتمل عام 72هـ / 691م.",
        "fr": "Le Dôme du Rocher est considéré comme le plus ancien édifice islamique encore debout aujourd'hui.",
        "ur": "قبۃ الصخرہ کو آج تک کی قدیم ترین اسلامی عمارت سمجھا جاتا ہے۔ اسے خلیفہ عبدالملک بن مروان کے دور میں تعمیر کیا گیا تھا۔",
        "id": "Kubah Batu (Dome of the Rock) dianggap sebagai bangunan Islam tertua yang masih berdiri hingga saat ini."
      },
      "era": { "en": "Umayyad Era", "ar": "العصر الأموي", "fr": "Ère Omeyyade", "ur": "دورِ اموی", "id": "Era Umayyah" },
      "material": { "en": "Diorama Model", "ar": "مجسم ديوراما", "fr": "Modèle de Diorama", "ur": "ڈیوراما ماڈل", "id": "Model Diorama" },
      "origin": { "en": "Jerusalem, Palestine", "ar": "القدس، فلسطين", "fr": "Jérusalem, Palestine", "ur": "بیت المقدس، فلسطین", "id": "Yerusalem, Palestina" },
      "image": "/images/artifacts/dome-of-the-rock.jpg",
      "audioUrl": null
    },
    {
      "id": "nabawi-abdul-majid",
      "title": { "en": "Architecture of the Prophet's Mosque", "ar": "عمارة المسجد النبوي", "fr": "Architecture de la Mosquée du Prophète", "ur": "مسجد نبوی کی تعمیر", "id": "Arsitektur Masjid Nabawi" },
      "category": "battles",
      "description": { 
        "en": "The architecture of Sultan Abdul Majid I is considered the largest renovation ever conducted for the Prophet's Mosque during the Ottoman era.",
        "ar": "تعتبر عمارة السلطان عبد المجيد الأول أكبر عمارة جرت للمسجد النبوي الشريف في العصر العثماني.",
        "fr": "L'architecture du Sultan Abdul Majid I est considérée comme la plus grande rénovation jamais entreprise pour la Mosquée du Prophète.",
        "ur": "سلطان عبد المجید اول کی تعمیر کو عثمانی دور میں مسجد نبوی شریف کے لیے کی جانے والی سب سے بڑی تعمیراتی کوشش سمجھا جاتا ہے۔",
        "id": "Arsitektur Sultan Abdul Majid I dianggap sebagai renovasi terbesar yang pernah dilakukan untuk Masjid Nabawi pada era Utsmaniyah."
      },
      "era": { "en": "Ottoman Era", "ar": "العصر العثماني", "fr": "Ère Ottomane", "ur": "عہدِ عثمانی", "id": "Era Utsmaniyah" },
      "material": { "en": "Diorama Model", "ar": "مجسم ديوراما", "fr": "Modèle de Diorama", "ur": "ڈیوراما ماڈل", "id": "Model Diorama" },
      "origin": { "en": "Medina, Dar Al-Madinah Museum", "ar": "المدينة المنورة، متحف دار المدينة", "fr": "Médine, Musée Dar Al-Madinah", "ur": "مدینہ، دار المدینہ میوزیم", "id": "Madinah, Museum Dar Al-Madinah" },
      "image": "/images/artifacts/nabawi-abdul-majid.jpg",
      "audioUrl": null
    },
    {
      "id": "kaaba-saudi",
      "title": { "en": "The Holy Kaaba in the Saudi Era", "ar": "الكعبة المشرفة في العهد السعودي", "fr": "La Sainte Kaaba à l'ère saoudienne", "ur": "سعودی عہد میں خانہ کعبہ", "id": "Ka'bah Suci di Era Saudi" },
      "category": "battles",
      "description": { 
        "en": "The Holy Kaaba has received unprecedented care and attention during the Saudi era, starting from the reign of King Abdulaziz Al Saud.",
        "ar": "شهدت الكعبة المشرفة في العهد السعودي عناية فائقة، بدءاً من عهد الملك عبدالعزيز آل سعود.",
        "fr": "La Sainte Kaaba a reçu un soin sans précédent pendant l'ère saoudienne.",
        "ur": "سعودی عہد کے دوران خانہ کعبہ کو بے مثال دیکھ بھال حاصل رہی، جس کا آغاز شاہ عبدالعزیز آل سعود کے دور سے ہوا۔",
        "id": "Ka'bah Suci telah menerima perawatan yang belum pernah terjadi sebelumnya selama era Saudi."
      },
      "era": { "en": "Modern Saudi Era", "ar": "العهد السعودي الحديث", "fr": "Ère Saoudienne Moderne", "ur": "جدید سعودی عہد", "id": "Era Saudi Modern" },
      "material": { "en": "Diorama Model", "ar": "مجسم ديوراما", "fr": "Modèle de Diorama", "ur": "ڈیوراما ماڈل", "id": "Model Diorama" },
      "origin": { "en": "Mecca, Dar Al-Madinah Museum", "ar": "مكة المكرمة، متحف دار المدينة", "fr": "La Mecque, Musée Dar Al-Madinah", "ur": "مکہ مكرمة، متحف دار المدينة", "id": "Mekkah, Museum Dar Al-Madinah" },
      "image": "/images/artifacts/kaaba-saudi.png",
      "audioUrl": null
    }
];

const c68 = loadChunk('chunk_6_8.json');
const c911 = loadChunk('chunk_9_11.json');
const c1214 = loadChunk('chunk_12_14.json');
const c1516 = loadChunk('chunk_15_16.json');

// Revelation Hira (Model 6) - manually ensure it's in the right spot if needed
// Actually chunk_6_8 has Friday Prayer, Year of Elephant, Ansar Love.
// Wait, my previous manual count was slightly off. Let's re-verify.
// 5: Friday Prayer (c68[0])
// 6: Revelation Hira (I need to define or find it)
// 7: Year of Elephant (c68[1])
// 8: Ansar Love (c68[2])
// 9: Yathrib Inhabitants (c911[0])
// 10: Kaaba Quraysh (c911[1])
// 11: Valley Ibrahim Hill (c911[2])
// 12: Kaaba Ottoman (c1214[0])
// 13: Mosque Qibla Change (c1214[1])
// 14: Kaaba Zubayr (c1214[2])
// 15: Quranic Writing Materials (c1516[1])

const revelation_hira = {
    "id": "revelation-hira",
    "title": { "en": "Beginnings of Revelation - Cave Hira", "ar": "بدء الوحي - غار حراء", "fr": "Le début de la Révélation", "ur": "نزولِ وحی کا آغاز", "id": "Awal Mula Wahyu" },
    "category": "battles",
    "description": { "en": "The Messenger of Allah ﷺ used to spend his time in seclusion in Cave Hira...", "ar": "كان رسول الله ﷺ يخلو بنفسه في غار حراء..." },
    "era": { "en": "Prophetic Era", "ar": "العهد النبوي" },
    "material": { "en": "Diorama Model", "ar": "مجسم ديوراما" },
    "origin": { "en": "Medina, Dar Al-Madinah Museum", "ar": "المدينة المنورة، متحف دار المدينة" },
    "image": "/images/artifacts/revelation-hira.jpg",
    "audioUrl": null
};

// Update Quranic Materials category to "battles" for search/display purposes in this Museum Models context
const quran_materials = { ...c1516[1], "category": "battles" };

const final_artifacts = [
    ...artifacts_1_4,
    c68[0],          // 5: Friday Prayer
    revelation_hira, // 6: Revelation Hira
    c68[1],          // 7: Year of Elephant
    c68[2],          // 8: Ansar Love
    c911[0],         // 9: Yathrib Inhabitants
    c911[1],         // 10: Kaaba Quraysh
    c911[2],         // 11: Valley Ibrahim Hill
    c1214[0],        // 12: Kaaba Ottoman
    c1214[1],        // 13: Mosque Qibla Change
    c1214[2],        // 14: Kaaba Zubayr
    quran_materials  // 15: Quranic Materials
];

const fullData = {
    "categories": categories,
    "featuredArtifacts": featuredArtifactIds,
    "artifacts": final_artifacts
};

fs.writeFileSync('data.json', JSON.stringify(fullData, null, 2), 'utf8');
console.log("SUCCESS: data.json restored with 15 artifacts.");
final_artifacts.forEach((a, i) => console.log(`${i+1}: ${a.id}`));
