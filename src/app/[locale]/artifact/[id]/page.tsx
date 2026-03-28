"use client";

import data from '@/data.json';
import Link from 'next/link';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { use, useState, useRef, useEffect } from 'react';

const TRANSLATIONS: Record<string, any> = {
  ar: {
    back: 'العودة للرئيسية',
    era: 'العصر',
    material: 'المادة',
    origin: 'المنشأ',
    audioTitle: 'الدليل الصوتي',
    audioSub: 'استمع إلى الوصف',
    descLang: 'لغة الوصف'
  },
  en: {
    back: 'Back to Home',
    era: 'Era',
    material: 'Material',
    origin: 'Origin',
    audioTitle: 'Audio Guide',
    audioSub: 'Listen to the audio',
    descLang: 'Description Language'
  },
  fr: {
    back: 'Retour à l\'accueil',
    era: 'Ère',
    material: 'Matériau',
    origin: 'Origine',
    audioTitle: 'Guide Audio',
    audioSub: 'Écoutez l\'audio',
    descLang: 'Langue de description'
  },
  ur: {
    back: 'ہوم پر واپس جائیں',
    era: 'عہد',
    material: 'مواد',
    origin: 'اصل',
    audioTitle: 'آڈیو گائیڈ',
    audioSub: 'آڈیو سنیں',
    descLang: 'تفصیل کی زبان'
  },
  id: {
    back: 'Kembali ke Beranda',
    era: 'Era',
    material: 'Bahan',
    origin: 'Asal',
    audioTitle: 'Panduan Audio',
    audioSub: 'Dengarkan audio',
    descLang: 'Bahasa Deskripsi'
  }
};

export default function ArtifactPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = use(params);
  
  // Find artifact by ID from the artifacts array
  const artifact = data.artifacts.find(a => a.id === id) || data.artifacts[0];

  // State
  const [activeLang, setActiveLang] = useState<string>(locale);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Audio player state
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); }
    else { audioRef.current.play(); }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const val = Number(e.target.value);
    audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
  }, [activeLang]);
  
  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.en;
  const isRTL = activeLang === 'ar' || activeLang === 'ur';

  const langs = [
    { code: 'ar', label: 'AR' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ur', label: 'UR' },
    { code: 'id', label: 'ID' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Top Navigation */}
        <div className="flex justify-end mb-6">
          <Link
            href={`/${locale}`}
            className="text-slate-500 hover:text-slate-800 text-sm flex items-center gap-1 transition-colors"
          >
            <span>{t.back}</span>
            {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Link>
        </div>

        {/* Main Content Box */}
        <div className={`border border-slate-200 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-sm min-h-[500px] ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
          
          {/* IMAGE COLUMN */}
          <div className="w-full md:w-[45%] bg-slate-50 flex flex-col items-center justify-center border-b md:border-b-0 ltr:md:border-r rtl:md:border-l border-slate-200 p-8">
            <div className="w-full h-full relative flex items-center justify-center cursor-zoom-in group">
              {artifact.image && (
                <>
                  <img
                    src={(artifact.images && artifact.images.length > 0) ? artifact.images[activeImageIndex] : artifact.image}
                    alt={artifact.title[activeLang as keyof typeof artifact.title] || artifact.title.en}
                    className="max-w-full max-h-[500px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    onClick={() => setIsExpanded(true)}
                  />

                  {artifact.images && artifact.images.length > 1 && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 z-10">
                      {artifact.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                          className={`w-3 h-3 rounded-full transition-all ${activeImageIndex === idx ? 'bg-[#546e7a] scale-125' : 'bg-slate-300 hover:bg-slate-400'}`}
                        />
                      ))}
                    </div>
                  )}

                  {artifact.images && artifact.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev > 0 ? prev - 1 : (artifact.images || []).length - 1)); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={20} className="text-slate-600" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev < (artifact.images || []).length - 1 ? prev + 1 : 0)); }}
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
              )}
              {!artifact.image && (
                <div className="text-slate-300 text-2xl font-light">Artifact Image</div>
              )}
            </div>
          </div>

          {/* DETAILS COLUMN */}
          <div className="w-full md:w-[55%] p-10 flex flex-col bg-white">
            
            <div className="mb-2">
              <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
                {artifact.title[activeLang as keyof typeof artifact.title] || artifact.title.en}
              </h1>
              <div className="w-full h-px bg-slate-200 mt-4 mb-6" />
            </div>

            <div className="mb-6 flex-grow flex flex-col overflow-hidden">
              <div className="overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 transition-colors max-h-[250px] mb-4">
                <p className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-line">
                  {artifact.description[activeLang as keyof typeof artifact.description] || artifact.description.en}
                </p>
              </div>
              <div className="w-full h-px bg-slate-200 mt-auto" />
            </div>

            <div className="space-y-2 mb-10 pt-4">
              <div className="flex text-sm">
                <span className="text-slate-700 font-medium w-24 shrink-0">{t.era}:</span>
                <span className="text-slate-600 italic">
                  {artifact.era[activeLang as keyof typeof artifact.era] || artifact.era.en}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="text-slate-700 font-medium w-24 shrink-0">{t.material}:</span>
                <span className="text-slate-600">
                   {artifact.material[activeLang as keyof typeof artifact.material] || artifact.material.en}
                </span>
              </div>
              <div className="flex text-sm">
                <span className="text-slate-700 font-medium w-24 shrink-0">{t.origin}:</span>
                <span className="text-slate-600">
                   {artifact.origin[activeLang as keyof typeof artifact.origin] || artifact.origin.en}
                </span>
              </div>
            </div>

            <div className="mb-10 flex flex-col items-center">
              {/* Show custom audio player for Arabic with audioUrl */}
              {activeLang === 'ar' && (artifact as any).audioUrl ? (
                <div className="w-full max-w-[360px] flex flex-col items-center gap-3">
                  {/* Hidden native audio element */}
                  <audio
                    ref={audioRef}
                    src={(artifact as any).audioUrl}
                    onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                    onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                    onEnded={() => setIsPlaying(false)}
                    preload="metadata"
                  />

                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="flex items-center justify-center gap-3 bg-[#546e7a] text-white px-10 py-3 rounded-full hover:bg-slate-700 transition w-full"
                  >
                    {isPlaying
                      ? <Pause fill="white" size={22} />
                      : <Play fill="white" size={22} />}
                    <span className="text-lg font-medium tracking-wide">{t.audioTitle}</span>
                  </button>

                  {/* Progress Bar + Time + Mute */}
                  <div className="w-full flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 shadow-inner">
                    <span className="text-xs text-slate-500 w-10 text-right tabular-nums shrink-0">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1 accent-[#546e7a] h-1 rounded-full cursor-pointer"
                      style={{ direction: 'ltr' }}
                    />
                    <span className="text-xs text-slate-500 w-10 tabular-nums shrink-0">{formatTime(duration)}</span>
                    <button onClick={toggleMute} className="text-slate-500 hover:text-slate-800 transition shrink-0">
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>

                  <p className="text-sm text-slate-500 text-center">{t.audioSub}</p>
                </div>
              ) : (
                /* Original button for non-Arabic or no audio */
                <>
                  <button className="flex items-center justify-center gap-3 bg-[#546e7a] text-white px-10 py-3 rounded-full hover:bg-slate-700 transition w-full max-w-[280px]">
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
      </div>

      {/* LIGHTBOX OVERLAY */}
      {isExpanded && artifact.image && (
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
              src={(artifact.images && artifact.images.length > 0) ? artifact.images[activeImageIndex] : artifact.image}
              alt={artifact.title[activeLang as keyof typeof artifact.title] || artifact.title.en}
              className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="mt-6 text-center">
             <h3 className="text-white text-xl font-medium mb-1">
               {artifact.title[activeLang as keyof typeof artifact.title] || artifact.title.en}
             </h3>
             <p className="text-white/40 text-sm">
               {isRTL ? "اضغط في أي مكان للإغلاق" : "Click anywhere to close"}
             </p>
          </div>
        </div>
      )}
    </div>
  );
}
