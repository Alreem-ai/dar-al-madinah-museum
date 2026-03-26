import Link from 'next/link';

export default function Footer({ locale }: { locale: string }) {
  const isArabic = locale === 'ar';

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div className="flex gap-4 invisible">
          <Link href={`/${locale}/links`} className="hover:text-gold-600">
            {isArabic ? 'روابط سريعة' : 'Quick Links'}
          </Link>
          <span>|</span>
          <Link href={`/${locale}/privacy`} className="hover:text-gold-600">
            {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </Link>
          <span>|</span>
          <Link href={`/${locale}/follow`} className="hover:text-gold-600">
            {isArabic ? 'تابعنا' : 'Follow Us'}
          </Link>
        </div>
        
        <div>
          &copy; {new Date().getFullYear()} {
            locale === 'ar' ? 'متحف دار المدينة. جميع الحقوق محفوظة.' : 
            locale === 'fr' ? 'Musée Dar Al-Madinah. Tous droits réservés.' :
            locale === 'ur' ? 'دار المدینہ میوزیم۔ جملہ حقوق محفوظ ہیں۔' :
            locale === 'id' ? 'Museum Dar Al-Madinah. Seluruh hak cipta dilindungi.' :
            'Dar Al-Madinah Museum. All rights reserved.'
          }
        </div>
      </div>
    </footer>
  );
}
