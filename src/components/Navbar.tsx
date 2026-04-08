"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Search, X, ChevronDown, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import data from '@/data.json';

const LANGUAGES = [
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ur', label: 'اردو' },
  { code: 'id', label: 'Bahasa Indonesia' },
];

const SEARCH_PLACEHOLDER: Record<string, string> = {
  ar: 'ابحث عن مقتنى...',
  en: 'Search artifacts...',
  fr: 'Rechercher...',
  ur: 'تلاش کریں...',
  id: 'Cari artefak...',
};

export default function Navbar({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, searchRef]);

  const switchLanguage = (newLocale: string) => {
    let newPath = pathname;
    if (pathname === `/${locale}`) {
      newPath = `/${newLocale}`;
    } else {
      newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
    }
    router.push(newPath);
    setLangDropdownOpen(false);
    setIsOpen(false);
  };

  // Search logic — match against all 5 language titles
  const searchResults = searchQuery.trim().length >= 1
    ? data.artifacts.filter((artifact) => {
        const q = searchQuery.toLowerCase();
        const title = artifact.title as Record<string, string>;
        return Object.values(title).some(t => t?.toLowerCase().includes(q));
      }).slice(0, 8)
    : [];

  // Get category display name
  const getCategoryLabel = (categoryId: string) => {
    const cat = data.categories.find(c => c.id === categoryId);
    if (!cat) return categoryId;
    const t = cat.title as Record<string, string>;
    return t[locale] || t['en'] || categoryId;
  };

  // Get artifact title in current locale
  const getTitle = (artifact: typeof data.artifacts[0]) => {
    const t = artifact.title as Record<string, string>;
    return t[locale] || t['en'] || t['ar'] || '';
  };

  const navLinks = [
    { href: `/${locale}`, label: 
      locale === 'ar' ? 'الرئيسية' : 
      locale === 'fr' ? 'Accueil' : 
      locale === 'ur' ? 'ہوم' : 
      locale === 'id' ? 'Beranda' : 
      'Home' 
    },
    { href: `/${locale}#categories`, label: 
      locale === 'ar' ? 'المقتنيات' : 
      locale === 'fr' ? 'Artefacts' : 
      locale === 'ur' ? 'نوادرات' : 
      locale === 'id' ? 'Artefak' : 
      'Artifacts' 
    },
    { href: `/${locale}/about`, label: 
      locale === 'ar' ? 'من نحن' : 
      locale === 'fr' ? 'À Propos' : 
      locale === 'ur' ? 'ہمارے بارے میں' : 
      locale === 'id' ? 'Tentang Kami' : 
      'About Us' 
    },
  ];

  const isRTL = locale === 'ar' || locale === 'ur';

  return (
    <nav className="bg-white border-b outline-[0.2px] outline-slate-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">

          {/* Left: Logo + Search Bar */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center shrink-0">
              <div className="h-12 w-40 relative overflow-hidden">
                <img
                  src="/images/official-museum-logo.png"
                  alt="Dar Al-Madinah Museum"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            {/* Global Search Bar — Desktop */}
            <div className="hidden md:block relative flex-1 max-w-sm" ref={searchRef}>
              <div className={`flex items-center gap-2 border rounded-full px-4 py-2 bg-slate-50 transition-all ${searchOpen ? 'border-slate-400 ring-2 ring-slate-200 bg-white' : 'border-slate-200 hover:border-slate-300'}`}>
                <Search size={16} className="text-slate-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder={SEARCH_PLACEHOLDER[locale] || SEARCH_PLACEHOLDER.en}
                  className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder:text-slate-400"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(''); searchInputRef.current?.focus(); }} className="text-slate-400 hover:text-slate-600 transition shrink-0">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {searchOpen && searchQuery.trim().length >= 1 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl z-[200] overflow-hidden max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
                        <span className="text-xs text-slate-500 font-medium">
                          {searchResults.length} {locale === 'ar' ? 'نتيجة' : locale === 'fr' ? 'résultat(s)' : locale === 'ur' ? 'نتائج' : locale === 'id' ? 'hasil' : 'result(s)'}
                        </span>
                      </div>
                      {searchResults.map((artifact) => (
                        <Link
                          key={artifact.id}
                          href={`/${locale}/category/${artifact.category}`}
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 group"
                        >
                          {artifact.image && (
                            <img
                              src={artifact.image}
                              alt=""
                              className="w-10 h-10 object-cover rounded-md shrink-0 bg-slate-100"
                            />
                          )}
                          <div className="min-w-0 flex-1" dir={isRTL ? 'rtl' : 'ltr'}>
                            <p className="text-sm font-medium text-slate-800 truncate group-hover:text-[#546e7a]">
                              {getTitle(artifact)}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {getCategoryLabel(artifact.category)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-6 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
                      <Search size={24} className="text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">
                        {locale === 'ar' ? 'لا توجد نتائج' : locale === 'fr' ? 'Aucun résultat' : locale === 'ur' ? 'کوئی نتیجہ نہیں' : locale === 'id' ? 'Tidak ada hasil' : 'No results found'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-[#546e7a] font-medium transition whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4 relative shrink-0" ref={dropdownRef}>

            {/* Language Dropdown Button */}
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-slate-300 rounded hover:bg-slate-50 transition"
            >
              <Globe size={16} className="text-slate-500" />
              <span>{LANGUAGES.find(l => l.code === locale)?.label || 'Language'}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {/* Language Dropdown Menu */}
            {langDropdownOpen && (
              <div className="absolute top-full mt-2 rtl:left-0 ltr:right-0 bg-white border border-slate-200 rounded shadow-lg py-2 min-w-40 z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition ${locale === lang.code ? 'text-[#546e7a] font-bold bg-slate-50' : 'text-slate-700'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}

            {/* Hidden original search button — kept intact */}
            <button className="p-2 text-slate-500 hover:text-slate-900 transition hidden">
              <Search size={20} />
            </button>
          </div>

          {/* Mobile: Search icon + Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile search toggle */}
            <button
              onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(''); }}
              className="text-slate-600 p-1"
            >
              <Search size={22} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden pb-3 pt-1" ref={searchRef}>
            <div className={`flex items-center gap-2 border rounded-full px-4 py-2 bg-white border-slate-300 ring-2 ring-slate-200`}>
              <Search size={16} className="text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={SEARCH_PLACEHOLDER[locale] || SEARCH_PLACEHOLDER.en}
                className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder:text-slate-400"
                dir={isRTL ? 'rtl' : 'ltr'}
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600 transition shrink-0">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {searchQuery.trim().length >= 1 && (
              <div className="mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-72 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((artifact) => (
                    <Link
                      key={artifact.id}
                      href={`/${locale}/category/${artifact.category}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); setIsOpen(false); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                    >
                      {artifact.image && (
                        <img src={artifact.image} alt="" className="w-9 h-9 object-cover rounded-md shrink-0 bg-slate-100" />
                      )}
                      <div className="min-w-0 flex-1" dir={isRTL ? 'rtl' : 'ltr'}>
                        <p className="text-sm font-medium text-slate-800 truncate">{getTitle(artifact)}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{getCategoryLabel(artifact.category)}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-5 text-center">
                    <p className="text-sm text-slate-500">
                      {locale === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mobile Nav Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 pt-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-slate-600 hover:text-[#546e7a] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-sm font-semibold text-slate-500 mb-2 block p-2">
                  {locale === 'ar' ? 'تغيير اللغة' : locale === 'fr' ? 'Changer de langue' : locale === 'ur' ? 'زبان تبدیل کریں' : locale === 'id' ? 'Ubah Bahasa' : 'Change Language'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`text-sm py-2 px-3 border rounded text-left ${locale === lang.code ? 'border-[#546e7a] text-[#546e7a] bg-slate-50' : 'border-slate-200 text-slate-700'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
