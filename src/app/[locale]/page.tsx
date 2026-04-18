import data from '@/data.json';
import Link from 'next/link';

import HeroSearch from '@/components/HeroSearch';
import ScrollReveal from '@/components/ScrollReveal';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale as keyof typeof data.categories[0]['title'];
  const isArabic = locale === 'ar';

  return (
    <div className="bg-background">
      {/* 1. Header Hero Banner (Dark Style) */}
      <section className="relative h-[400px] w-full bg-slate-900 overflow-hidden flex flex-col justify-center items-center">
        {/* Logo centered in the dark banner */}
        <div className="relative z-10 w-full max-w-2xl px-4 flex justify-center">
          <img 
            src="/images/official-museum-logo.png" 
            alt="Dar Al-Madinah Museum" 
            className="h-40 md:h-60 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-700 hover:scale-[1.02]" 
          />
        </div>
        {/* Subtle Background pattern/gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
      </section>

      {/* 2. Welcome Content & Search (Style: Text Underneath the Picture) */}
      <section className="relative w-full bg-white pb-32 border-b border-slate-100 -mt-10 z-20">
        <div className="container mx-auto px-4">
          
          {/* Welcome Text Section */}
          <div className="text-center mb-16 pt-20">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                {isArabic ? 'مرحباً بكم في متحف دار المدينة' : 'Welcome to Dar Al-Madinah Museum'}
              </h1>
              <p className="text-xl md:text-3xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                {isArabic
                  ? 'بوابة المعرفة وعالم الحضارة الإسلامية'
                  : 'The Gateway of Knowledge and the World of Islamic Civilization'}
              </p>
            </ScrollReveal>
          </div>

          {/* Search Box - Now positioned clearly below the text */}
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <HeroSearch locale={locale} />
            </ScrollReveal>
          </div>
          
        </div>
      </section>

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
                  className="museum-card flex flex-col items-center p-5 text-center group cursor-pointer hover:shadow-lg transition min-w-[280px] max-w-[280px] snap-center border border-slate-200 bg-white rounded-xl"
                >
                  <div className="w-full aspect-square bg-slate-100 rounded-lg mb-5 flex items-center justify-center group-hover:bg-slate-200 transition overflow-hidden shadow-inner">
                    {artifact.image ? (
                      <img src={artifact.image} alt={artifact.title.en} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    ) : (
                      <span className="text-slate-400 text-sm">No Image</span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-4 group-hover:text-gold-600 transition line-clamp-2 leading-relaxed">
                    {artifact.title[locale as keyof typeof artifact.title] || artifact.title.en}
                  </h4>
                  <span className="w-full py-2.5 bg-slate-600 text-white text-sm font-medium rounded-md group-hover:bg-slate-700 transition mt-auto shadow-sm">
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
