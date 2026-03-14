import data from '@/data.json';
import Link from 'next/link';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as keyof typeof data.categories[0]['title'];
  const isArabic = locale === 'ar';

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 relative overflow-hidden">
        {/* Subtle background pattern could go here */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {isArabic ? 'مرحباً بكم في متحف دار المدينة' : 'Welcome to Dar Al-Madinah Museum'}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            {isArabic 
              ? 'استكشف الإرث الحضاري الإسلامي وتاريخ المدينة المنورة عبر عصورها المختلفة' 
              : 'Explore the Islamic cultural heritage and the history of Medina through its different eras'}
          </p>
          <button className="bg-slate-500 text-white px-8 py-3 rounded-full hover:bg-slate-600 transition shadow-sm font-medium">
            {isArabic ? 'استكشف الآن' : 'Explore Now'}
          </button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          {isArabic ? 'استكشف المزيد' : 'Explore More'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {data.categories.map((category) => (
            <Link key={category.id} href={`/${locale}/category/${category.id}`} className="museum-card flex overflow-hidden group cursor-pointer hover:shadow-md transition">
              <div className="w-1/3 bg-slate-50 ltr:border-r rtl:border-l border-slate-100 flex items-center justify-center p-4">
                {/* Fallback pattern for image if image doesn't exist */}
                <div className="w-24 h-24 bg-slate-200 rounded-full opacity-50 group-hover:scale-105 transition duration-500"></div>
              </div>
              <div className="w-2/3 p-6 flex flex-col justify-center items-start">
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-gold-600 transition">
                  {category.title[locale] || category.title.en}
                </h3>
                <span className="text-sm text-slate-500 mb-4">
                  {category.count} {isArabic ? 'عنصر' : 'Items'}
                </span>
                <span className="mt-auto px-4 py-1.5 bg-slate-500 text-white text-sm rounded group-hover:bg-slate-600 transition">
                  {isArabic ? 'المزيد' : 'Learn More'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Artifacts */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            {isArabic ? 'مقتنيات مختارة' : 'Featured Artifacts'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => {
              const artifact = data.featuredArtifacts[i] || data.featuredArtifacts[0];
              return (
                <Link 
                  key={i} 
                  href={`/${locale}/artifact/${artifact?.id || 1}`}
                  className="museum-card flex flex-col items-center p-4 text-center group cursor-pointer hover:shadow-md transition"
                >
                  <div className="w-full aspect-square bg-slate-100 rounded mb-4 flex items-center justify-center group-hover:bg-slate-200 transition">
                    <span className="text-slate-300 text-xs">Image</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-3 group-hover:text-gold-600 transition">
                    {artifact ? (artifact.title[locale] || artifact.title.en) : `Artifact ${i+1}`}
                  </h4>
                  <span className="w-full py-1.5 bg-slate-500 text-white text-xs rounded group-hover:bg-slate-600 transition mt-auto">
                    {isArabic ? 'المزيد' : 'Learn More'}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
