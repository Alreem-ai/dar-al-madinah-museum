import json
import os

# Data for Model 6 (Reconstructed)
revelation_hira = {
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
    "audioUrl": None
}

# Data for Model 13 (Extracted from data.json clean lines)
al_qibli_mosque = {
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
        "id": "Masjid Al-Qibli, yang umumnya dikenal sebagai Masjid Al-Aqsa, terdiri dari ruang utama besar yang didukung oleh pilar marmer yang membentang dari utara ke selatan, ditutupi oleh atap pelana berlapis timah. Di sisi selatan, terdapat kubah besar berbentuk bola yang berdiri di atas empat pilar batu dan empat lengkungan. Bagian interiornya dihiasi dengan mosaik dan dekorasi yang rumit, sementara bagian eksteriornya dulunya ditutupi tembaga berlapis emas (mirip dengan Kubah Batu) namun baru-baru ini diganti dengan timah. Terletak di dalam tembok Al-Aqsa Sharif, masjid ini dibangun oleh Abd al-Malik ibn Marwan antara tahun 709 M (90 H) dan 714 M (96 H)."
    },
    "era": { "en": "Umayyad Era", "ar": "العصر الأموي", "fr": "Ère Omeyyade", "ur": "بنو امیہ کا دور", "id": "Era Umayyah" },
    "material": { "en": "Diorama Model", "ar": "مجسم ديوراما", "fr": "Modèle de Diorama", "ur": "ڈیوراما ماڈل", "id": "Model Diorama" },
    "origin": { "en": "Jerusalem, Dar Al-Madinah Museum", "ar": "القدس، متحف دار المدينة", "fr": "Jérusalem, Musée Dar Al-Madinah", "ur": "یروشلم، دار المدینہ میوزیم", "id": "Yerusalem, Museum Dar Al-Madinah" },
    "image": "/images/artifacts/al-qibli-mosque.png",
    "audioUrl": None
}

def load_chunk(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

# Load all chunks
chunk_6_8 = load_chunk('chunk_6_8.json')
chunk_9_11 = load_chunk('chunk_9_11.json')
chunk_12_14 = load_chunk('chunk_12_14.json')
temp_chunk_4 = load_chunk('temp_chunk_4.json')

# Correct the order in chunk_12_14
# Original: [kaaba-ottoman, mosque-qibla-change, kaaba-zubayr]
# We need: 12. Ottoman, 13. Al-Qibli (Manual), 14. Zubayr (from temp_chunk_4)

# Reconstruct Artifacts Array
final_artifacts = []

# 1-4: From data.json (prefix)
with open('data.json', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    prefix = "".join(lines[:210])
    # The prefix ends at line 210 with "    },"
    # But it doesn't have the closing bracket for the array if we just use it as a string.
    # However, we can parse it by adding brackets.
    prefix_data = json.loads("[" + prefix + "{}]") # Add dummy to make it valid list
    final_artifacts.extend(prefix_data[:-1])

# 5: friday-prayer (from chunk_6_8 index 0)
final_artifacts.append(chunk_6_8[0])

# 6: revelation-hira (Manual)
final_artifacts.append(revelation_hira)

# 7: year-of-elephant (from chunk_6_8 index 1)
final_artifacts.append(chunk_6_8[1])

# 8: ansar-love (from chunk_6_8 index 2)
final_artifacts.append(chunk_6_8[2])

# 9: yathrib-inhabitants (from chunk_9_11 index 0)
final_artifacts.append(chunk_9_11[0])

# 10: kaaba-quraysh (from chunk_9_11 index 1)
final_artifacts.append(chunk_9_11[1])

# 11: valley-ibrahim-hill (from chunk_9_11 index 2)
final_artifacts.append(chunk_9_11[2])

# 12: kaaba-ottoman (from chunk_12_14 index 0)
final_artifacts.append(chunk_12_14[0])

# 13: al-qibli-mosque (Manual)
final_artifacts.append(al_qibli_mosque)

# 14: kaaba-zubayr (from temp_chunk_4 index 0)
final_artifacts.append(temp_chunk_4[0])

# 15: prophet-arrival (from temp_chunk_4 index 1)
final_artifacts.append(temp_chunk_4[1])

# 16: quranic-writing-materials (from temp_chunk_4 index 2)
final_artifacts.append(temp_chunk_4[2])

# Construct full data.json
full_data = {
    "categories": [
        { "id": "battles", "title": { "en": "Models", "ar": "المجسمات" } }
    ],
    "featuredArtifacts": ["dome-of-the-rock", "arrival-model", "nabawi-abdul-majid"],
    "artifacts": final_artifacts
}

# Write to output
with open('data_restored.json', 'w', encoding='utf-8') as f:
    json.dump(full_data, f, ensure_ascii=False, indent=2)

print("Successfully restored 16 artifacts to data_restored.json")
