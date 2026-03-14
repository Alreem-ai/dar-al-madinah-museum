"use client";

import data from '@/data.json';
import Link from 'next/link';
import { use, useState } from 'react';
import { Play } from 'lucide-react';

export default function ArtifactPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = use(params);
  const isArabic = locale === 'ar';
  
  // Find artifact or use first one as fallback
  const artifact = data.featuredArtifacts.find(a => a.id === id) || data.featuredArtifacts[0];
  
  // Local description language state (independent of page locale)
  const [descLang, setDescLang] = useState<keyof typeof artifact.description>(locale as keyof typeof artifact.description);
  
  const langs = [
    { code: 'ar', label: 'AR' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ur', label: 'UR' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-6">
        <Link href={`/${locale}`} className="text-slate-500 hover:text-gold-600 transition">
          {isArabic ? '← العودة للرئيسية' : '← Back to Home'}
        </Link>
      </div>

      <div className="museum-card overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Artifact Image Area */}
          <div className="md:w-1/2 bg-slate-100 min-h-[400px] flex items-center justify-center ltr:border-r rtl:border-l border-slate-200">
            <span className="text-slate-400 font-medium">Artifact Image</span>
          </div>
          
          {/* Artifact Details Area */}
          <div className="md:w-1/2 p-8 lg:p-12 flex flex-col">
            <h1 className="text-3xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
              {artifact.title[locale as keyof typeof artifact.title] || artifact.title.en}
            </h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed min-h-[100px]">
              {artifact.description[descLang] || artifact.description.en}
            </p>
            
            <div className="space-y-3 mb-8 text-sm text-slate-700 pb-8 border-b border-slate-200">
              <div className="flex">
                <span className="font-medium w-24">{isArabic ? 'العصر:' : 'Era:'}</span>
                <span className="text-slate-500">{artifact.era[locale as keyof typeof artifact.era] || artifact.era.en}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-24">{isArabic ? 'المادة:' : 'Material:'}</span>
                <span className="text-slate-500">{artifact.material[locale as keyof typeof artifact.material] || artifact.material.en}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-24">{isArabic ? 'المنشأ:' : 'Origin:'}</span>
                <span className="text-slate-500">{artifact.origin[locale as keyof typeof artifact.origin] || artifact.origin.en}</span>
              </div>
            </div>

            {/* Audio Guide Component */}
            <div className="mb-8">
              <button className="flex items-center gap-2 bg-slate-600 text-white px-5 py-2.5 rounded hover:bg-slate-700 transition w-auto">
                <Play fill="currentColor" size={16} />
                <span className="font-medium">{isArabic ? 'الدليل الصوتي' : 'Audio Guide'}</span>
              </button>
              <p className="text-xs text-slate-500 mt-2">{isArabic ? 'استمع إلى الوصف' : 'Listen to the audio'}</p>
            </div>

            {/* Language Switcher for Description */}
            <div className="mt-auto flex border border-slate-300 rounded overflow-hidden max-w-max">
              {langs.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setDescLang(code as keyof typeof artifact.description)}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    descLang === code 
                      ? 'bg-slate-200 text-slate-900 border-r last:border-r-0 border-slate-300' 
                      : 'bg-white text-slate-500 hover:bg-slate-50 border-r last:border-r-0 border-slate-300'
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
  );
}
