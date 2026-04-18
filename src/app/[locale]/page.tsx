import data from '@/data.json';
import Link from 'next/link';

import HeroSearch from '@/components/HeroSearch';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as keyof typeof data.categories[0]['title'];
  const isArabic = locale === 'ar';

  return (
    <div className="bg-background">
      {/* 1. Header/Hero Banner (صورة) */}
      <section className="relative h-[300px] md:h-[400px] w-full bg-slate-900 overflow-hidden">
        {/* Background Image (using one of our museum photos or a generic pattern for now) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/images/official-museum-logo.png')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundColor: '#0f172a' }}
        />
        {/* Overlay to ensure contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* Optional Welcome Text inside the banner */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            {isArabic ? 'مرحباً بكم في متحف دار المدينة' : 'Welcome to Dar Al-Madinah Museum'}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto drop-shadow-md">
            {isArabic
              ? 'بوابة المعرفة وعالم الحضارة الإسلامية'
              : 'The Gateway of Knowledge and the World of Islamic Civilization'}
          </p>
        </div>
      </section>

      {/* 2. Information & Search (Middle) */}
      <div className="container mx-auto px-4 mb-16">
        <HeroSearch locale={locale} />
      </div>

      {/* Categories Grid */}
      <section id="categories" className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          {isArabic ? 'استكشف المزيد' : 'Explore More'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {data.categories.map((category) => (
            <Link key={category.id} href={`/${locale}/category/${category.id}`} className="museum-card flex overflow-hidden group cursor-pointer hover:shadow-md transition">
              <div className="w-1/3 bg-slate-50 ltr:border-r rtl:border-l border-slate-100 flex items-center justify-center p-4">
                {category.image ? (
                  <img src={category.image} alt={category.title.en} className="w-24 h-24 object-cover rounded-full group-hover:scale-105 transition duration-500 shadow-sm" />
                ) : (
                  <div className="w-24 h-24 bg-slate-200 rounded-full opacity-50 group-hover:scale-105 transition duration-500"></div>
                )}
              </div>
              <div className="w-2/3 p-6 flex flex-col justify-center items-start">
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-gold-600 transition">
                  {category.title[locale] || category.title.en}
                </h3>
                <span className="text-sm text-slate-500 mb-4">
                  {data.artifacts.filter(a => a.category === category.id).length} {isArabic ? 'عنصر' : 'Items'}
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
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x custom-scrollbar">
            {[...data.featuredArtifacts, ...data.artifacts.filter(a => !data.featuredArtifacts.includes(a.id)).sort(() => 0.5 - Math.random()).slice(0, 12).map(a => a.id)].map((artifactId, i) => {
              const artifact = data.artifacts.find(a => a.id === artifactId);
              if (!artifact) return null;
              return (
                <Link 
                  key={artifactId + i} 
                  href={`/${locale}/artifact/${artifact.id}`}
                  className="museum-card flex flex-col items-center p-4 text-center group cursor-pointer hover:shadow-md transition min-w-[220px] max-w-[220px] snap-center border border-slate-200 bg-white"
                >
                  <div className="w-full aspect-square bg-slate-100 rounded mb-4 flex items-center justify-center group-hover:bg-slate-200 transition overflow-hidden">
                    {artifact.image ? (
                      <img src={artifact.image} alt={artifact.title.en} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-slate-300 text-xs">Image</span>
                    )}
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-3 group-hover:text-gold-600 transition line-clamp-2">
                    {artifact.title[locale as keyof typeof artifact.title] || artifact.title.en}
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
