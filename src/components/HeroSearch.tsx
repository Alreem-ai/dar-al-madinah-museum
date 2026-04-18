"use client";

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import data from '@/data.json';
import Link from 'next/link';

export default function HeroSearch({ locale }: { locale: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [keyword, setKeyword] = useState('');
  const [source, setSource] = useState('');

  const isRTL = locale === 'ar' || locale === 'ur';

  // Translations
  const t = {
    ar: {
      about: 'نبذة عن الموقع',
      aboutDesc: 'استكشف الإرث الحضاري الإسلامي وتاريخ المدينة المنورة عبر عصورها المختلفة من خلال قاعدتنا المعرفية الشاملة.',
      searchPlaceholder: 'أدخل كلمات البحث هنا...',
      keywords: 'الكلمات الدلالية',
      allSources: 'جميع المصادر',
      search: 'بحث',
    },
    en: {
      about: 'About the Site',
      aboutDesc: 'Explore the Islamic cultural heritage and the history of Medina through its different eras through our comprehensive knowledge base.',
      searchPlaceholder: 'Enter search keywords here...',
      keywords: 'Keywords',
      allSources: 'All Sources',
      search: 'Search',
    },
    fr: {
      about: 'À propos du site',
      aboutDesc: 'Explorez le patrimoine culturel islamique et l\'histoire de Médine à travers ses différentes époques grâce à notre base de connaissances.',
      searchPlaceholder: 'Entrez les mots-clés ici...',
      keywords: 'Mots-clés',
      allSources: 'Toutes les sources',
      search: 'Rechercher',
    },
    ur: {
      about: 'سائٹ کے بارے میں',
      aboutDesc: 'ہمارے جامع علم کے ذریعے مدینہ کی اسلامی ثقافتی ورثہ اور مختلف ادوار کی تاریخ کو دریافت کریں۔',
      searchPlaceholder: 'یہاں تلاش کے الفاظ درج کریں...',
      keywords: 'مطلوبہ الفاظ',
      allSources: 'تمام ذرائع',
      search: 'تلاش کریں',
    },
    id: {
      about: 'Tentang Situs',
      aboutDesc: 'Jelajahi warisan budaya Islam dan sejarah Madinah melalui berbagai era melalui basis pengetahuan komprehensif kami.',
      searchPlaceholder: 'Masukkan kata kunci pencarian di sini...',
      keywords: 'Kata Kunci',
      allSources: 'Semua Sumber',
      search: 'Cari',
    }
  };

  const currT = t[locale as keyof typeof t] || t.en;

  // Search Results logic
  const searchResults = searchQuery.trim().length >= 2
    ? data.artifacts.filter((artifact) => {
        const q = searchQuery.toLowerCase();
        const title = artifact.title as Record<string, string>;
        return Object.values(title).some(val => val?.toLowerCase().includes(q));
      }).slice(0, 5)
    : [];

  const getTitle = (artifact: typeof data.artifacts[0]) => {
    const titleObj = artifact.title as Record<string, string>;
    return titleObj[locale] || titleObj['en'] || titleObj['ar'] || '';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-8 max-w-4xl mx-auto -mt-8 relative z-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Brief/Introduction */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 inline-block border-b-2 border-red-600 pb-2 mb-3">
          {currT.about}
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          {currT.aboutDesc}
        </p>
      </div>

      {/* Search Form Container */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="flex flex-col gap-4">
          
          {/* Main Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currT.searchPlaceholder}
              className="w-full pl-4 pr-12 py-3 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-700"
            />
            <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} text-slate-400`}>
              <Search size={20} />
            </div>

            {/* Live Search Results Dropdown */}
            {searchQuery.trim().length >= 2 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-md shadow-xl z-50 overflow-hidden">
                {searchResults.length > 0 ? (
                  searchResults.map(artifact => (
                    <Link
                      key={artifact.id}
                      href={`/${locale}/category/${artifact.category}`}
                      className="block px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 text-slate-700 hover:text-slate-900 transition"
                    >
                      {getTitle(artifact)}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-3 text-slate-500 text-sm">{locale === 'ar' ? 'لا توجد نتائج' : 'No results found'}</div>
                )}
              </div>
            )}
          </div>

          {/* Filters & Action Button Row */}
          <div className="flex flex-col md:flex-row gap-4 justify-end items-start md:items-center">
            
            {/* Submit Button */}
            <button className="w-full md:w-auto bg-[#8b2c2c] hover:bg-[#702020] text-white px-8 py-2.5 rounded-md font-medium transition shadow-sm flex items-center justify-center gap-2">
              <Search size={18} />
              {currT.search}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
