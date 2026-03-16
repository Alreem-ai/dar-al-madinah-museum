"use client";

import { use, useState } from 'react';
import Link from 'next/link';
import data from '@/data.json';
import { ChevronRight, ChevronLeft, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TRANSLATIONS: Record<string, any> = {
  ar: {
    back: 'العودة للرئيسية',
    era: 'العصر',
    material: 'المادة',
    origin: 'المنشأ',
    audioTitle: 'الدليل الصوتي',
    audioSub: 'استمع إلى الوصف',
    next: 'التالي',
    prev: 'السابق'
  },
  en: {
    back: 'Back to Home',
    era: 'Era',
    material: 'Material',
    origin: 'Origin',
    audioTitle: 'Audio Guide',
    audioSub: 'Listen to the audio',
    next: 'Next',
    prev: 'Previous'
  },
  fr: {
    back: 'Retour à l\'accueil',
    era: 'Ère',
    material: 'Matériau',
    origin: 'Origine',
    audioTitle: 'Guide Audio',
    audioSub: 'Écoutez l\'audio',
    next: 'Suivant',
    prev: 'Précédent'
  },
  ur: {
    back: 'ہوم پر واپس جائیں',
    era: 'عہد',
    material: 'مواد',
    origin: 'اصل',
    audioTitle: 'آڈیو گائیڈ',
    audioSub: 'آڈیو سنیں',
    next: 'اگلا',
    prev: 'پچھلا'
  },
  id: {
    back: 'Kembali ke Beranda',
    era: 'Era',
    material: 'Bahan',
    origin: 'Asal',
    audioTitle: 'Panduan Audio',
    audioSub: 'Dengarkan audio',
    next: 'Berikutnya',
    prev: 'Sebelumnya'
  }
};

export default function CategoryPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = use(params);
  const router = useRouter();
  
  // 1. Find the target category info
  const category = data.categories.find(c => c.id === id);
  
  // 2. State Management
  const [activeLang, setActiveLang] = useState<string>(locale);
  const [currentIndex, setCurrentIndex] = useState(0);

  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.en;
  const isRTL = activeLang === 'ar' || activeLang === 'ur';

  if (!category) {
    if(typeof window !== 'undefined') router.push(`/${locale}`);
    return null;
  }
  
  const categoryArtifacts = data.artifacts.filter(a => a.category === id);
  const totalItems = category.count || 35;
  const currentArtifact = categoryArtifacts[currentIndex];

  const goNext = () => { if (currentIndex < totalItems - 1) setCurrentIndex(prev => prev + 1); };
  const goPrev = () => { if (currentIndex > 0) setCurrentIndex(prev => prev - 1); };

  const langs = [
    { code: 'ar', label: 'AR' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ur', label: 'UR' },
    { code: 'id', label: 'ID' },
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Top Navigation */}
        <div className="flex justify-end mb-6">
          <Link href={`/${locale}`} className="text-slate-500 hover:text-slate-800 text-sm flex items-center gap-1 transition-colors">
            <span>{t.back}</span>
            {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Link>
        </div>

        {/* Header Title */}
        <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-slate-900">
               {category.title[activeLang as keyof typeof category.title] || category.title.en}
            </h1>
        </div>

        {/* Main Content Box (Mockup Match) */}
        <div className={`border border-slate-200 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-sm min-h-[500px] mb-8 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
          
          {/* IMAGE COLUMN */}
          <div className="w-full md:w-[45%] bg-slate-50 flex items-center justify-center border-b md:border-b-0 ltr:md:border-r rtl:md:border-l border-slate-200 p-8">
            <div className="w-full h-full relative flex items-center justify-center">
              {currentArtifact?.image ? (
                <img
                  src={currentArtifact.image}
                  alt={currentArtifact.title[activeLang as keyof typeof currentArtifact.title] || currentArtifact.title.en}
                  className="max-w-full max-h-[500px] object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-300 space-y-4">
                  <div className="w-24 h-24 border-2 border-dashed border-slate-200 rounded-full flex items-center justify-center">
                    <span className="text-3xl">?</span>
                  </div>
                  <p className="text-sm font-light">Coming Soon</p>
                </div>
              )}
            </div>
          </div>

          {/* DETAILS COLUMN */}
          <div className="w-full md:w-[55%] p-10 flex flex-col bg-white">
            
            {/* Title Section */}
            <div className="mb-2">
              <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">
                {currentArtifact 
                  ? (currentArtifact.title[activeLang as keyof typeof currentArtifact.title] || currentArtifact.title.en || currentArtifact.title.ar) 
                  : (isRTL ? 'قريباً...' : 'Coming Soon...')}
              </h2>
              <div className="w-full h-px bg-slate-200 mt-4 mb-6" />
            </div>

            {/* Description Section with Scrollbar */}
            <div className="mb-6 flex-grow flex flex-col overflow-hidden">
               <div className="overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 transition-colors max-h-[250px] mb-4">
                <p className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-line">
                  {currentArtifact 
                    ? (currentArtifact.description[activeLang as keyof typeof currentArtifact.description] || currentArtifact.description.en)
                    : (isRTL ? `المعلومات والصور الخاصة بالقطعة رقم ${currentIndex + 1} سيتم إضافتها قريباً.` : `Information and imagery for artifact #${currentIndex + 1} will be added shortly.`)}
                </p>
              </div>
              <div className="w-full h-px bg-slate-200 mt-auto" />
            </div>

            {/* Metadata Section */}
            {currentArtifact && (
              <div className="space-y-2 mb-10 pt-4">
                <div className="flex text-sm">
                  <span className="text-slate-700 font-medium w-24 shrink-0">{t.era}:</span>
                  <span className="text-slate-600 italic">
                    {currentArtifact.era[activeLang as keyof typeof currentArtifact.era] || currentArtifact.era.en}
                  </span>
                </div>
                <div className="flex text-sm">
                  <span className="text-slate-700 font-medium w-24 shrink-0">{t.material}:</span>
                  <span className="text-slate-600">
                     {currentArtifact.material[activeLang as keyof typeof currentArtifact.material] || currentArtifact.material.en}
                  </span>
                </div>
                <div className="flex text-sm">
                  <span className="text-slate-700 font-medium w-24 shrink-0">{t.origin}:</span>
                  <span className="text-slate-600">
                     {currentArtifact.origin[activeLang as keyof typeof currentArtifact.origin] || currentArtifact.origin.en}
                  </span>
                </div>
              </div>
            )}

            {/* Audio Section */}
            <div className="mb-10 flex flex-col items-center">
              <button disabled={!currentArtifact} className="flex items-center justify-center gap-3 bg-[#546e7a] text-white px-10 py-3 rounded-full hover:bg-slate-700 transition w-full max-w-[280px] disabled:opacity-50">
                <Play fill="white" size={24} />
                <span className="text-lg font-medium tracking-wide">{t.audioTitle}</span>
              </button>
              <p className="text-sm text-slate-500 mt-3 text-center">
                {t.audioSub}
              </p>
              <div className="w-full h-px bg-slate-200 mt-8" />
            </div>

            {/* Language Switcher Section */}
            <div className="mt-auto flex justify-center">
              <div className="inline-flex border border-slate-300 rounded overflow-hidden shadow-sm">
                {langs.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setActiveLang(code)}
                    className={`px-6 py-2.5 text-sm font-semibold border-r last:border-r-0 border-slate-300 transition-colors uppercase ${
                      activeLang === code
                        ? 'bg-slate-50 text-slate-900'
                        : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Pagination Footer (Match original but clean) */}
        <div className="bg-[#546e7a] text-white p-6 rounded-sm flex items-center justify-between shadow-md">
            <button 
                onClick={isRTL ? goNext : goPrev} 
                disabled={isRTL ? currentIndex >= totalItems - 1 : currentIndex <= 0}
                className="flex items-center gap-2 px-6 py-2 rounded hover:bg-[#455a64] disabled:opacity-30 transition-colors font-medium"
            >
                {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                {t.prev}
            </button>

            <div className="flex items-center gap-4 text-slate-200 font-mono">
                <span className="font-bold text-white text-2xl">{currentIndex + 1}</span>
                <span className="text-slate-400 text-xl">/</span>
                <span className="text-xl">{totalItems}</span>
            </div>

            <button 
                onClick={isRTL ? goPrev : goNext} 
                disabled={isRTL ? currentIndex <= 0 : currentIndex >= totalItems - 1}
                className="flex items-center gap-2 px-6 py-2 rounded hover:bg-[#455a64] disabled:opacity-30 transition-colors font-medium"
            >
                {t.next}
                {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
        </div>

      </div>
    </div>
  );
}
