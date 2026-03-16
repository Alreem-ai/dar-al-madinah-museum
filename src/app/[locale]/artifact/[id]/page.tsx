"use client";

import data from '@/data.json';
import Link from 'next/link';
import { use, useState } from 'react';
import { Play } from 'lucide-react';

export default function ArtifactPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = use(params);
  const isArabic = locale === 'ar';

  // Search both featuredArtifacts and artifacts arrays
  const artifact =
    data.featuredArtifacts.find(a => a.id === id) ||
    (data as any).artifacts?.find((a: any) => a.id === id) ||
    data.featuredArtifacts[0];

  const [descLang, setDescLang] = useState<keyof typeof artifact.description>(
    locale as keyof typeof artifact.description
  );

  const langs = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ur', label: 'اردو' },
    { code: 'id', label: 'Indonesia' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* Two-column flex with align-items: flex-start */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '3rem' }}
             className="flex-col md:flex-row">

          {/* LEFT COLUMN – sticky image */}
          <div
            className="w-full md:w-1/2 shrink-0"
            style={{ position: 'sticky', top: '80px', alignSelf: 'flex-start' }}
          >
            {artifact.image ? (
              <img
                src={artifact.image}
                alt={artifact.title[locale as keyof typeof artifact.title] || artifact.title.en}
                className="w-full rounded-2xl shadow-xl object-contain"
              />
            ) : (
              <div className="w-full aspect-video bg-slate-200 rounded-2xl flex items-center justify-center">
                <span className="text-slate-400 text-sm">No Image Available</span>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN – natural text flow */}
          <div className="w-full md:w-1/2 flex flex-col gap-7">

            {/* Breadcrumb */}
            <Link
              href={`/${locale}`}
              className="text-slate-500 hover:text-slate-700 text-sm transition inline-flex items-center gap-1"
            >
              {isArabic ? '→' : '←'}
              <span>{isArabic ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </Link>

            {/* Title */}
            <h1 className="text-4xl font-bold text-slate-900 leading-snug">
              {artifact.title[locale as keyof typeof artifact.title] || artifact.title.en}
            </h1>

            {/* Description — full natural flow, no scroll cap */}
            <p className="text-slate-600 leading-loose whitespace-pre-line text-base">
              {artifact.description[descLang] || artifact.description.en}
            </p>

            {/* Metadata */}
            <div className="border-t border-slate-200 pt-5 space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="font-semibold text-slate-800 w-20 shrink-0">
                  {isArabic ? 'العصر:' : 'Era:'}
                </span>
                <span className="text-slate-500">
                  {artifact.era[locale as keyof typeof artifact.era] || artifact.era.en}
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-slate-800 w-20 shrink-0">
                  {isArabic ? 'المادة:' : 'Material:'}
                </span>
                <span className="text-slate-500">
                  {artifact.material[locale as keyof typeof artifact.material] || artifact.material.en}
                </span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-slate-800 w-20 shrink-0">
                  {isArabic ? 'المنشأ:' : 'Origin:'}
                </span>
                <span className="text-slate-500">
                  {artifact.origin[locale as keyof typeof artifact.origin] || artifact.origin.en}
                </span>
              </div>
            </div>

            {/* Audio Guide */}
            <div className="border-t border-slate-200 pt-5">
              <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-700 transition text-sm font-medium">
                <Play fill="currentColor" size={14} />
                {isArabic ? 'الدليل الصوتي' : 'Audio Guide'}
              </button>
              <p className="text-xs text-slate-400 mt-2">
                {isArabic ? 'استمع إلى الوصف' : 'Listen to the description'}
              </p>
            </div>

            {/* Language Tabs */}
            <div className="border-t border-slate-200 pt-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                {isArabic ? 'لغة الوصف' : 'Description Language'}
              </p>
              <div className="flex flex-wrap gap-2">
                {langs.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setDescLang(code as keyof typeof artifact.description)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                      descLang === code
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-500 border-slate-300 hover:border-slate-600'
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
    </div>
  );
}
