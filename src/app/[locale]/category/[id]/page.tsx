"use client";

import { use, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import data from '@/data.json';
import { ChevronRight, ChevronLeft, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TRANSLATIONS: Record<string, any> = {
  ar: {
    back: 'العودة للرئيسية',
    era: 'العصر',
    material: 'المادة',
    origin: 'المنشأ',
    audioTitle: 'الدليل الصوتي',
    audioSub: 'استمع إلى الوصف',
    next: 'التالي',
    prev: 'السابق'
  },
  en: {
    back: 'Back to Home',
    era: 'Era',
    material: 'Material',
    origin: 'Origin',
    audioTitle: 'Audio Guide',
    audioSub: 'Listen to the audio',
    next: 'Next',
    prev: 'Previous'
  },
  fr: {
    back: 'Retour à l\'accueil',
    era: 'Ère',
    material: 'Matériau',
    origin: 'Origine',
    audioTitle: 'Guide Audio',
    audioSub: 'Écoutez l\'audio',
    next: 'Suivant',
    prev: 'Précédent'
  },
  ur: {
    back: 'ہوم پر واپس جائیں',
    era: 'عہد',
    material: 'مواد',
    origin: 'اصل',
    audioTitle: 'آڈیو گائیڈ',
    audioSub: 'آڈیو سنیں',
    next: 'اگلا',
    prev: 'پچھلا'
  },
  id: {
    back: 'Kembali ke Beranda',
    era: 'Era',
    material: 'Bahan',
    origin: 'Asal',
    audioTitle: 'Panduan Audio',
    audioSub: 'Dengarkan audio',
    next: 'Berikutnya',
    prev: 'Sebelumnya'
  }
};

export default function CategoryPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = use(params);
  const router = useRouter();
  
  // 1. Find the target category info
  const category = data.categories.find(c => c.id === id);
  
  // 2. State Management
  const [activeLang, setActiveLang] = useState<string>(locale);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  // Reset image index when switching artifacts
  useEffect(() => {
    setActiveImageIndex(0);
  }, [currentIndex]);

  // Audio player — plain ref stores the Audio instance (no DOM element needed)
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Destroy audio when switching artifact or language
  useEffect(() => {
    const p = playerRef.current;
    if (p) { p.pause(); playerRef.current = null; }
    setIsPlaying(false);
    setCurrentTime(0);
    setAudioDuration(0);
  }, [currentIndex, activeLang]);

  const getAudioUrl = () => {
    const arts = data.artifacts.filter((a: any) => a.category === id);
    const art = arts[currentIndex];
    if (!art) return null;
    const raw = art.audioUrl;
    if (!raw) return null;
    if (typeof raw === 'string') return raw;
    return raw[activeLang] || raw.en || raw.ar || null;
  };

  const handleAudioBtn = async () => {
    const url = getAudioUrl();
    if (!url) return;

    // Create player on first press
    if (!playerRef.current) {
      const p = new Audio(url);
      p.addEventListener('timeupdate',    () => setCurrentTime(p.currentTime));
      p.addEventListener('loadedmetadata',() => setAudioDuration(p.duration));
      p.addEventListener('ended',         () => setIsPlaying(false));
      playerRef.current = p;
    }

    const p = playerRef.current;
    if (p.paused) {
      p.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      p.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    p.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p = playerRef.current;
    if (!p) return;
    const val = Number(e.target.value);
    p.currentTime = val;
    setCurrentTime(val);
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.en;
  const isRTL = activeLang === 'ar' || activeLang === 'ur';

  if (!category) {
    if(typeof window !== 'undefined') router.push(`/${locale}`);
    return null;
  }
  
  const categoryArtifacts = data.artifacts.filter(a => a.category === id);
  const totalItems = categoryArtifacts.length;
  const currentArtifact = categoryArtifacts[currentIndex];

  const goNext = () => { if (currentIndex < totalItems - 1) setCurrentIndex(prev => prev + 1); };
  const goPrev = () => { if (currentIndex > 0) setCurrentIndex(prev => prev - 1); };

  const langs = [
    { code: 'ar', label: 'AR' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ur', label: 'UR' },
    { code: 'id', label: 'ID' },
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Top Navigation */}
        <div className="flex justify-end mb-6">
          <Link href={`/${locale}`} className="text-slate-500 hover:text-slate-800 text-sm flex items-center gap-1 transition-colors">
            <span>{t.back}</span>
            {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Link>
        </div>

        {/* Header Title */}
        <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-slate-900">
               {category.title[activeLang as keyof typeof category.title] || category.title.en}
            </h1>
        </div>

        {/* Main Content Box (Mockup Match) */}
        <div className={`border border-slate-200 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-sm min-h-[500px] mb-8 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
          
          {/* IMAGE COLUMN */}
          <div className="w-full md:w-[45%] bg-slate-50 flex flex-col items-center justify-center border-b md:border-b-0 ltr:md:border-r rtl:md:border-l border-slate-200 p-8">
            <div className="w-full h-full relative flex items-center justify-center cursor-zoom-in group">
              {currentArtifact?.image ? (
                <>
                  <img
                    src={(currentArtifact.images && currentArtifact.images.length > 0) 
                         ? currentArtifact.images[activeImageIndex] 
                         : currentArtifact.image}
                    alt={currentArtifact.title[activeLang as keyof typeof currentArtifact.title] || currentArtifact.title.en}
                    className="max-w-full max-h-[500px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    onClick={() => setIsExpanded(true)}
                  />
                  
                  {/* Gallery Controls */}
                  {currentArtifact.images && currentArtifact.images.length > 1 && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 z-10">
                      {currentArtifact.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                          className={`w-3 h-3 rounded-full transition-all ${
                            activeImageIndex === idx ? 'bg-[#546e7a] scale-125' : 'bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Left/Right Arrows for image gallery */}
                  {currentArtifact.images && currentArtifact.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setActiveImageIndex(prev => (prev > 0 ? prev - 1 : currentArtifact.images!.length - 1)); 
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={20} className="text-slate-600" />
                      </button>
                      <button
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setActiveImageIndex(prev => (prev < currentArtifact.images!.length - 1 ? prev + 1 : 0)); 
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={20} className="text-slate-600" />
                      </button>
                    </>
                  )}

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-2 rounded-full shadow-lg pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-300 space-y-4">
                  <div className="w-24 h-24 border-2 border-dashed border-slate-200 rounded-full flex items-center justify-center">
                    <span className="text-3xl">?</span>
                  </div>
                  <p className="text-sm font-light">Coming Soon</p>
                </div>
              )}
            </div>
          </div>

          {/* DETAILS COLUMN */}
          <div className="w-full md:w-[55%] p-10 flex flex-col bg-white">
            
            {/* Title Section */}
            <div className="mb-2">
              <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">
                {currentArtifact 
                  ? (currentArtifact.title[activeLang as keyof typeof currentArtifact.title] || currentArtifact.title.en || currentArtifact.title.ar) 
                  : (isRTL ? 'قريباً...' : 'Coming Soon...')}
              </h2>
              <div className="w-full h-px bg-slate-200 mt-4 mb-6" />
            </div>

            {/* Description Section with Scrollbar */}
            <div className="mb-6 flex-grow flex flex-col overflow-hidden">
               <div className="overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 transition-colors max-h-[250px] mb-4">
                <p className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-line">
                  {currentArtifact 
                    ? (currentArtifact.description[activeLang as keyof typeof currentArtifact.description] || currentArtifact.description.en)
                    : (isRTL ? `المعلومات والصور الخاصة بالقطعة رقم ${currentIndex + 1} سيتم إضافتها قريباً.` : `Information and imagery for artifact #${currentIndex + 1} will be added shortly.`)}
                </p>
              </div>
              <div className="w-full h-px bg-slate-200 mt-auto" />
            </div>

            {/* Metadata Section */}
            {currentArtifact && (
              <div className="space-y-2 mb-10 pt-4">
                <div className="flex text-sm">
                  <span className="text-slate-700 font-medium w-24 shrink-0">{t.era}:</span>
                  <span className="text-slate-600 italic">
                    {currentArtifact.era[activeLang as keyof typeof currentArtifact.era] || currentArtifact.era.en}
                  </span>
                </div>
                <div className="flex text-sm">
                  <span className="text-slate-700 font-medium w-24 shrink-0">{t.material}:</span>
                  <span className="text-slate-600">
                     {currentArtifact.material[activeLang as keyof typeof currentArtifact.material] || currentArtifact.material.en}
                  </span>
                </div>
                <div className="flex text-sm">
                  <span className="text-slate-700 font-medium w-24 shrink-0">{t.origin}:</span>
                  <span className="text-slate-600">
                     {currentArtifact.origin[activeLang as keyof typeof currentArtifact.origin] || currentArtifact.origin.en}
                  </span>
                </div>
              </div>
            )}

            {/* Audio Section */}
            <div className="mb-10 flex flex-col items-center">
              {currentArtifact && getAudioUrl() ? (
                <div className="w-full max-w-[360px] flex flex-col items-center gap-3">
                  {/* Play/Pause Button */}
                  <button
                    onClick={handleAudioBtn}
                    className="flex items-center justify-center gap-3 bg-[#546e7a] text-white px-10 py-3 rounded-full hover:bg-slate-700 transition w-full"
                  >
                    {isPlaying ? <Pause fill="white" size={22} /> : <Play fill="white" size={22} />}
                    <span className="text-lg font-medium tracking-wide">{t.audioTitle}</span>
                  </button>

                  {/* Progress Bar + Time + Mute */}
                  <div className="w-full flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 shadow-inner">
                    <span className="text-xs text-slate-500 w-10 text-right tabular-nums shrink-0">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={audioDuration || 0}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1 accent-[#546e7a] h-1 rounded-full cursor-pointer"
                      style={{ direction: 'ltr' }}
                    />
                    <span className="text-xs text-slate-500 w-10 tabular-nums shrink-0">{formatTime(audioDuration)}</span>
                    <button onClick={toggleMute} className="text-slate-500 hover:text-slate-800 transition shrink-0">
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>

                  <p className="text-sm text-slate-500 text-center">{t.audioSub}</p>
                </div>
              ) : (
                /* Original static button — preserved exactly */
                <>
                  <button disabled={!currentArtifact} className="flex items-center justify-center gap-3 bg-[#546e7a] text-white px-10 py-3 rounded-full hover:bg-slate-700 transition w-full max-w-[280px] disabled:opacity-50">
                    <Play fill="white" size={24} />
                    <span className="text-lg font-medium tracking-wide">{t.audioTitle}</span>
                  </button>
                  <p className="text-sm text-slate-500 mt-3 text-center">
                    {t.audioSub}
                  </p>
                </>
              )}
              <div className="w-full h-px bg-slate-200 mt-8" />
            </div>

            {/* Language Switcher Section */}
            <div className="mt-auto flex justify-center">
              <div className="inline-flex border border-slate-300 rounded overflow-hidden shadow-sm">
                {langs.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setActiveLang(code)}
                    className={`px-6 py-2.5 text-sm font-semibold border-r last:border-r-0 border-slate-300 transition-colors uppercase ${
                      activeLang === code
                        ? 'bg-slate-50 text-slate-900'
                        : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* LIGHTBOX OVERLAY */}
        {isExpanded && currentArtifact?.image && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
            onClick={() => setIsExpanded(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            
             <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={(currentArtifact.images && currentArtifact.images.length > 0) 
                     ? currentArtifact.images[activeImageIndex] 
                     : currentArtifact.image}
                alt={currentArtifact.title[activeLang as keyof typeof currentArtifact.title] || currentArtifact.title.en}
                className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="text-white text-xl font-medium mb-1">
                {currentArtifact.title[activeLang as keyof typeof currentArtifact.title] || currentArtifact.title.en}
              </h3>
              <p className="text-white/40 text-sm">
                {isRTL ? "اضغط في أي مكان للإغلاق" : "Click anywhere to close"}
              </p>
            </div>
          </div>
        )}

        {/* Pagination Footer (Match original but clean) */}
        <div className={`bg-[#546e7a] text-white p-6 rounded-sm flex items-center justify-between shadow-md mb-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <button 
                onClick={goPrev} 
                disabled={currentIndex <= 0}
                className="flex items-center gap-2 px-6 py-2 rounded hover:bg-[#455a64] disabled:opacity-30 transition-colors font-medium"
            >
                {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                {t.prev}
            </button>

            <div className="flex items-center gap-4 text-slate-200 font-mono">
                <span className="font-bold text-white text-2xl">{totalItems > 0 ? currentIndex + 1 : 0}</span>
                <span className="text-slate-400 text-xl">/</span>
                <span className="text-xl">{totalItems}</span>
            </div>

            <button 
                onClick={goNext} 
                disabled={currentIndex >= totalItems - 1}
                className="flex items-center gap-2 px-6 py-2 rounded hover:bg-[#455a64] disabled:opacity-30 transition-colors font-medium"
            >
                {t.next}
                {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
        </div>

        {/* Model Search Bar */}
        <div className="flex justify-center mb-12" dir={isRTL ? 'rtl' : 'ltr'}>
           <form 
             onSubmit={(e) => { 
                e.preventDefault(); 
                const target = parseInt(searchValue, 10);
                if(target > 0 && target <= totalItems) {
                   setCurrentIndex(target - 1);
                   setSearchValue('');
                }
             }} 
             className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm border border-slate-200 w-full max-w-[300px] transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-[#546e7a]/20 focus-within:border-[#546e7a]"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
             <input 
               type="number" 
               min={1} 
               max={totalItems}
               placeholder={isRTL ? 'انتقل إلى المجسم رقم...' : 'Go to model number...'}
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               className="bg-transparent border-none outline-none w-full text-slate-700 font-medium placeholder:text-slate-300 placeholder:font-normal"
             />
             <button type="submit" disabled={!searchValue} className="text-[#546e7a] hover:text-slate-900 transition-colors disabled:opacity-30">
               {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
             </button>
           </form>
        </div>

      </div>
    </div>
  );
}
