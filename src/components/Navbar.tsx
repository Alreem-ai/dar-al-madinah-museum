"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Search, X, ChevronDown, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const LANGUAGES = [
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ur', label: 'اردو' },
  { code: 'id', label: 'Bahasa Indonesia' },
];

export default function Navbar({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const switchLanguage = (newLocale: string) => {
    // If the path just has the locale (e.g. /en), replace it completely
    let newPath = pathname;
    if (pathname === `/${locale}`) {
      newPath = `/${newLocale}`;
    } else {
      // Replace the locale in the path
      newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
    }
    router.push(newPath);
    setLangDropdownOpen(false);
    setIsOpen(false);
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

  return (
    <nav className="bg-white border-b outline-[0.2px] outline-slate-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded flex items-center justify-center text-white font-bold overflow-hidden relative">
              <span className="absolute z-0 opacity-0">{/* M */}</span>
              <img src="/images/museum-logo-sign.png" alt="Museum Logo" className="w-full h-full object-cover relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-900">متحف دار المدينة</span>
              <span className="text-xs text-slate-500">Dar Al-Madinah Museum</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-slate-600 hover:text-gold-600 font-medium transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4 relative" ref={dropdownRef}>
            
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
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition ${locale === lang.code ? 'text-gold-600 font-bold bg-slate-50' : 'text-slate-700'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}

            <button className="p-2 text-slate-500 hover:text-slate-900 transition hidden">
              <Search size={20} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 pt-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="block text-slate-600 hover:text-gold-600 font-medium"
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
                      className={`text-sm py-2 px-3 border rounded text-left ${locale === lang.code ? 'border-gold-500 text-gold-600 bg-gold-50/50' : 'border-slate-200 text-slate-700'}`}
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
