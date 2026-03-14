"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleLang = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const navLinks = [
    { href: `/${locale}`, label: locale === 'ar' ? 'الرئيسية' : 'Home' },
    { href: `/${locale}/categories`, label: locale === 'ar' ? 'المقتنيات' : 'Artifacts' },
    { href: `/${locale}/about`, label: locale === 'ar' ? 'من نحن' : 'About Us' },
  ];

  return (
    <nav className="bg-white border-b outline-[0.2px] outline-slate-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-500 rounded flex items-center justify-center text-white font-bold">
              M
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
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 transition"
            >
              {locale === 'en' ? 'عربي' : 'EN'}
            </button>
            <button className="p-2 text-slate-500 hover:text-slate-900 transition">
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
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <button 
                  onClick={toggleLang}
                  className="px-3 py-1 text-sm border border-slate-300 rounded"
                >
                  {locale === 'en' ? 'عربي' : 'English'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
