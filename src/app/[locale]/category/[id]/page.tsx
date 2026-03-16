"use client";

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import data from '@/data.json';
import { ChevronRight, ChevronLeft, Info, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CategoryPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = use(params);
  const router = useRouter();
  const isArabic = locale === 'ar';
  
  // 1. Find the target category info
  const category = data.categories.find(c => c.id === id);
  if (!category) {
    // If invalid category, you'd usually redirect to 404, but for now we'll send them home
    if(typeof window !== 'undefined') router.push(`/${locale}`);
    return null;
  }
  
  // 2. Fetch all artifacts that belong to this category
  // In a real app, you would fetch these from a database using pagination offsets
  const categoryArtifacts = data.artifacts.filter(a => a.category === id);
  const totalItems = category.count || 35; // Default to 35 based on screenshot
  
  // 3. State Management for Pagination
  const [currentIndex, setCurrentIndex] = useState(0);

  // 4. Handle Navigation Rules
  const goNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // 5. Derive Current Artifact Data (or establish a graceful empty state)
  const currentArtifact = categoryArtifacts[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Breadcrumb */}
        <div className="mb-8">
          <Link href={`/${locale}`} className="text-slate-500 hover:text-gold-600 transition inline-flex items-center gap-2">
            {isArabic ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mt-4">
            {category.title[locale as keyof typeof category.title] || category.title.en}
          </h1>
        </div>

        {/* Artifact Showcase Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative">
          
          {/* Main Visual Content (Image + Info) */}
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left/Right: Image Area */}
            <div className="lg:w-3/5 bg-slate-100 flex items-center justify-center p-8 relative">
              
              {currentArtifact ? (
                // State: Populated Database Item
                currentArtifact.image ? (
                  <img 
                    src={currentArtifact.image} 
                    alt={currentArtifact.title.en} 
                    className="max-h-[70vh] w-full object-contain drop-shadow-md rounded-lg mx-auto"
                  />
                ) : (
                   <span className="text-slate-400 font-medium">No Image Available</span>
                )
              ) : (
                // State: Empty / Upcoming Index (Out of bounds)
                <div className="flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <div className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-full flex items-center justify-center">
                     <span className="text-4xl text-slate-300 opacity-50 block font-light">?</span>
                  </div>
                  <p>{isArabic ? 'هذه القطعة غير متاحة بعد' : 'This artifact has not been populated yet.'}</p>
                </div>
              )}

            </div>

            {/* Left/Right: Text Area */}
            <div className={`lg:w-2/5 p-8 lg:p-12 flex flex-col justify-between ${isArabic ? 'border-r' : 'border-l'} border-slate-100`}>
               {currentArtifact ? (
                 <div>
                    <span className="inline-block px-3 py-1 bg-gold-100 text-gold-800 text-xs font-semibold rounded-full mb-4">
                      {category.title[locale as keyof typeof category.title] || category.title.en}
                    </span>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">
                      {currentArtifact.title[locale as keyof typeof currentArtifact.title] || currentArtifact.title.en}
                    </h2>
                    
                    <div className="prose prose-slate prose-sm text-slate-600 mb-8 max-h-[250px] overflow-y-auto">
                      {currentArtifact.description[locale as keyof typeof currentArtifact.description] || currentArtifact.description.en}
                    </div>

                    <div className="space-y-4 text-sm mt-8 border-t border-slate-100 pt-6">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-700">{isArabic ? 'المادة / العصر' : 'Material / Era'}</p>
                          <p className="text-slate-500">
                            {currentArtifact.material[locale as keyof typeof currentArtifact.material] || currentArtifact.material.en} &middot; {currentArtifact.era[locale as keyof typeof currentArtifact.era] || currentArtifact.era.en}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 border-t border-slate-50 pt-4">
                        <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                           <p className="font-semibold text-slate-700">{isArabic ? 'المنشأ' : 'Origin'}</p>
                           <p className="text-slate-500">
                             {currentArtifact.origin[locale as keyof typeof currentArtifact.origin] || currentArtifact.origin.en}
                           </p>
                        </div>
                      </div>
                    </div>
                 </div>
               ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
                     <p className="text-xl font-medium text-slate-800 mb-2">
                       {isArabic ? 'جاري التحضير...' : 'Coming Soon...'}
                     </p>
                     <p className="text-slate-500 text-sm max-w-[250px]">
                       {isArabic 
                         ? `المعلومات والصور الخاصة بالقطعة رقم ${currentIndex + 1} سيتم إضافتها قريباً.` 
                         : `Information and imagery for artifact #${currentIndex + 1} will be added shortly.`}
                     </p>
                  </div>
               )}
            </div>
          </div>

          {/* Pagination Footer */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            
            <button 
              onClick={isArabic ? goNext : goPrev} 
              disabled={isArabic ? currentIndex >= totalItems - 1 : currentIndex <= 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-md hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors group text-sm font-medium"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 duration-200" /> 
              {isArabic ? 'التالي' : 'Previous'}
            </button>

            <div className="flex items-center gap-4 text-slate-300 font-mono text-sm tracking-wider">
               <span className="font-bold text-white text-lg">{currentIndex + 1}</span>
               <span className="text-slate-500">/</span>
               <span>{totalItems}</span>
            </div>

            <button 
              onClick={isArabic ? goPrev : goNext} 
              disabled={isArabic ? currentIndex <= 0 : currentIndex >= totalItems - 1}
              className="flex items-center gap-2 px-6 py-2.5 rounded-md hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors group text-sm font-medium"
            >
              {isArabic ? 'السابق' : 'Next'} 
              <ChevronRight size={18} className="group-hover:translate-x-1 duration-200" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
