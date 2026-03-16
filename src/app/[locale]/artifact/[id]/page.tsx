"use client";

import data from '@/data.json';
import Link from 'next/link';
import { use, useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const TRANSLATIONS: Record<string, any> = {
  ar: {
    back: 'العودة للرئيسية',
    era: 'العصر',
    material: 'المادة',
    origin: 'المنشأ',
    audioTitle: 'الدليل الصوتي',
    audioSub: 'استمع إلى الوصف',
    descLang: 'لغة الوصف'
  },
  en: {
    back: 'Back to Home',
    era: 'Era',
    material: 'Material',
    origin: 'Origin',
    audioTitle: 'Audio Guide',
    audioSub: 'Listen to the audio',
    descLang: 'Description Language'
  },
  fr: {
    back: 'Retour à l\'accueil',
    era: 'Ère',
    material: 'Matériau',
    origin: 'Origine',
    audioTitle: 'Guide Audio',
    audioSub: 'Écoutez l\'audio',
    descLang: 'Langue de description'
  },
  ur: {
    back: 'ہوم پر واپس جائیں',
    era: 'عہد',
    material: 'مواد',
    origin: 'اصل',
    audioTitle: 'آڈیو گائیڈ',
    audioSub: 'آڈیو سنیں',
    descLang: 'تفصیل کی زبان'
  },
  id: {
    back: 'Kembali ke Beranda',
    era: 'Era',
    material: 'Bahan',
    origin: 'Asal',
    audioTitle: 'Panduan Audio',
    audioSub: 'Dengarkan audio',
    descLang: 'Bahasa Deskripsi'
  }
};

export default function ArtifactPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = use(params);
  const isArabic = locale === 'ar';

  // Search both featuredArtifacts and artifacts arrays
  const artifact =
    data.featuredArtifacts.find(a => a.id === id) ||
    (data as any).artifacts?.find((a: any) => a.id === id) ||
    data.featuredArtifacts[0];

  // This state now drives EVERY piece of text on the page
  const [activeLang, setActiveLang] = useState<string>(locale);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.en;
  const isRTL = activeLang === 'ar' || activeLang === 'ur';

  const langs = [
    { code: 'ar', label: 'AR' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ur', label: 'UR' },
    { code: 'id', label: 'ID' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Top Navigation */}
        <div className="flex justify-end mb-6">
          <Link
            href={`/${locale}`}
            className="text-slate-500 hover:text-slate-800 text-sm flex items-center gap-1 transition-colors"
          >
            <span>{t.back}</span>
            {activeLang === 'ar' || activeLang === 'ur' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Link>
        </div>

        {/* Main Content Box */}
        <div className={`border border-slate-200 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-sm min-h-[500px] ${activeLang === 'ar' || activeLang === 'ur' ? 'rtl' : 'ltr'}`} dir={activeLang === 'ar' || activeLang === 'ur' ? 'rtl' : 'ltr'}>
          
          {/* IMAGE COLUMN */}
          <div className="w-full md:w-[45%] bg-slate-50 flex items-center justify-center border-b md:border-b-0 ltr:md:border-r rtl:md:border-l border-slate-200 p-8">
            <div className="w-full h-full relative flex items-center justify-center cursor-zoom-in group" onClick={() => setIsExpanded(true)}>
              {artifact.image ? (
                <>
                  <img
                    src={artifact.image}
                    alt={artifact.title[activeLang as keyof typeof artifact.title] || artifact.title.en}
                    className="max-w-full max-h-[500px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-2 rounded-full shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-slate-300 text-2xl font-light">Artifact Image</div>
              )}
            </div>
          </div>

          {/* DETAILS COLUMN */}
          <div className="w-full md:w-[55%] p-10 flex flex-col bg-white">
            
            {/* Title Section */}
            <div className="mb-2">
              <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
                {artifact.title[activeLang as keyof typeof artifact.title] || artifact.title.en}
              </h1>
              <div className="w-full h-px bg-slate-200 mt-4 mb-6" />
            </div>

            {/* Description Section with Scrollbar */}
            <div className="mb-6 flex-grow flex flex-col overflow-hidden">
              <div className="overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 transition-colors max-h-[250px] mb-4">
                <p className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-line">
                  {artifact.description[activeLang as keyof typeof artifact.description] || artifact.description.en}
                </p>
              </div>
              <div className="w-full h-px bg-slate-200 mt-auto" />
            </div>

            {/* Metadata Section */}
            <div className="space-y-2 mb-10 pt-4">
              <div className="flex text-sm">
                <span className="text-slate-700 font-medium w-24 shrink-0">{t.era}:</span>
                <span className="text-slate-600 italic">
                  {artifact.era[activeLang as keyof typeof artifact.era] || artifact.era.en}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="text-slate-700 font-medium w-24 shrink-0">{t.material}:</span>
                <span className="text-slate-600">
                   {artifact.material[activeLang as keyof typeof artifact.material] || artifact.material.en}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="text-slate-700 font-medium w-24 shrink-0">{t.origin}:</span>
                <span className="text-slate-600">
                   {artifact.origin[activeLang as keyof typeof artifact.origin] || artifact.origin.en}
                </span>
              </div>
            </div>

            {/* Audio Section */}
            <div className="mb-10 flex flex-col items-center">
              <button className="flex items-center justify-center gap-3 bg-[#546e7a] text-white px-10 py-3 rounded-full hover:bg-slate-700 transition w-full max-w-[280px]">
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
      </div>

      {/* LIGHTBOX OVERLAY */}
      {isExpanded && artifact.image && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setIsExpanded(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={artifact.image}
              alt={artifact.title[activeLang as keyof typeof artifact.title] || artifact.title.en}
              className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="mt-6 text-center">
             <h3 className="text-white text-xl font-medium mb-1">
               {artifact.title[activeLang as keyof typeof artifact.title] || artifact.title.en}
             </h3>
             <p className="text-white/40 text-sm">
               {isRTL ? "اضغط في أي مكان للإغلاق" : "Click anywhere to close"}
             </p>
          </div>
        </div>
      )}
    </div>
  );
}
