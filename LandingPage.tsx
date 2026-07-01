import React, { useState, useEffect } from 'react';
import { Sprout, TrendingUp, ShieldCheck, HelpCircle, Users, Map, Landmark, ArrowRight, Star, ChevronLeft, ChevronRight, MessageSquare, CloudSun, Beaker, ShoppingCart } from 'lucide-react';
import { Language } from './types';
import { translations } from './mockData';

interface LandingPageProps {
  language: Language;
  setCurrentTab: (tab: string) => void;
  onOpenAuth: () => void;
  user: any;
}

export default function LandingPage({ language, setCurrentTab, onOpenAuth, user }: LandingPageProps) {
  const t = translations[language];

  const [farmersCount, setFarmersCount] = useState(0);
  const [districtsCount, setDistrictsCount] = useState(0);
  const [schemesCount, setSchemesCount] = useState(0);

  useEffect(() => {
    let extraFarmers = 0;
    try {
      extraFarmers = parseInt(localStorage.getItem('sarunena_registered_count') || '0', 10);
    } catch (e) {
      // Silent localStorage failure
    }

    const duration = 1500; // ms
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;
    const targetFarmers = 5 + extraFarmers;
    const targetDistricts = 25;
    const targetSchemes = 2026;

    const timer = setInterval(() => {
      step++;
      setFarmersCount(Math.min(Math.round((targetFarmers / steps) * step), targetFarmers));
      setDistrictsCount(Math.min(Math.round((targetDistricts / steps) * step), targetDistricts));
      setSchemesCount(Math.min(Math.round((targetSchemes / steps) * step), targetSchemes));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const testimonials = {
    en: [
      {
        name: "Gunapala Gamage",
        district: "Galle",
        role: "Paddy Farmer (5 Acres)",
        text: "With the Sarunena Fertilizer Calculator, I optimized my Urea splits during the last Yala season. My total costs dropped by 22% and our paddy grain yield was the heaviest we have ever weighed!",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=gunapala",
        rating: 5
      }
    ],
    si: [
      {
        name: "ගුණපාල ගමගේ",
        district: "ගාල්ල",
        role: "වී ගොවි (අක්කර 5)",
        text: "සරුනැණ පොහොර ගණකය මඟින් මට පසුගිය යාල කන්නයේදී යූරියා යෙදීම ප්‍රශස්ත කිරීමට හැකි විය. මගේ මුළු පිරිවැය 22% කින් අඩු වූ අතර අපගේ වී අස්වැන්න මෙතෙක් ලැබුණු ඉහළම අස්වැන්නයි!",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=gunapala",
        rating: 5
      }
    ],
    ta: [
      {
        name: "குணபால கமகே",
        district: "காலி",
        role: "நெல் விவசாயி (5 ஏக்கர்)",
        text: "சருனேன உர கால்குலேட்டர் மூலம், கடந்த யால பருவத்தில் எனது யூரியா பயன்பாட்டை மேம்படுத்தினேன். எனது மொத்த செலவு 22% குறைந்தது, மேலும் எங்களது நெல் மகசூல் முன்னெப்போதும் இல்லாத அளவுக்கு அதிகமாக இருந்தது!",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=gunapala",
        rating: 5
      }
    ]
  }[language];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Automated slider for testimonials
  useEffect(() => {
    const timer = setInterval(handleNextTestimonial, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 pb-16 animate-fade-in" id="landing-page-flow">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#2E7D32]/10 via-[#FFFDF7] to-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        
        {/* Subtle traditional design element patterns in background corners */}
        <div className="absolute top-10 left-10 opacity-5 text-[#2E7D32] pointer-events-none select-none text-9xl">🍃</div>
        <div className="absolute right-10 bottom-10 opacity-5 text-[#F9A825] pointer-events-none select-none text-9xl">🌾</div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-left" id="hero-left-text">
            
            <div className="inline-flex items-center space-x-2 bg-[#2E7D32]/10 px-3.5 py-1.5 rounded-full border border-[#2E7D32]/20">
              <span className="text-xs font-black text-[#2E7D32] tracking-wider uppercase">
                {language === 'en' ? "SarunenaLK Independent Smart Agricultural Initiative" : language === 'si' ? 'සරුනැණLK ස්වාධීන ස්මාර්ට් කෘෂිකාර්මික ව්‍යාපෘතිය' : 'சருனேனLK சுயாதீன ஸ்மார்ட் விவசாய முயற்சி'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-sans font-black text-gray-900 tracking-tight leading-tight">
              {t.heroHeadline}
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
              {t.heroTagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-get-started-btn"
                onClick={() => user ? setCurrentTab('dashboard') : onOpenAuth()}
                className="px-8 py-4 bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white font-black rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer border-b-4 border-emerald-800"
              >
                <span>{t.getStarted}</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                id="hero-learn-more-btn"
                onClick={() => setCurrentTab('prices')}
                className="px-8 py-4 bg-white text-[#2E7D32] hover:bg-emerald-50/50 border-2 border-[#2E7D32]/20 font-bold rounded-2xl shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t.learnMore}</span>
              </button>

              <button
                id="hero-ai-btn"
                onClick={() => setCurrentTab('advisory')}
                className="px-8 py-4 bg-[#FFFDF7] text-[#2E7D32] hover:bg-emerald-50 border-2 border-[#2E7D32]/20 font-bold rounded-2xl shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Ask Sarunena AI</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-100 bg-white/80 px-4 py-3 text-sm text-gray-700 shadow-sm backdrop-blur">
              <span className="font-semibold text-[#2E7D32]">Need help now?</span>
              <span>📞 +94 77 447 0098</span>
              <span>✉️ sinuradamsath2022@gmail.com</span>
            </div>

          </div>

          <div className="lg:col-span-5 flex justify-center" id="hero-animated-illustration">
            <div className="relative w-full max-w-sm bg-gradient-to-tr from-sky-100 to-amber-100/50 p-6 rounded-[40px] shadow-lg border-2 border-white overflow-hidden flex items-center justify-center">
              
              <div className="absolute top-8 right-8 h-16 w-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full shadow-lg opacity-80 animate-pulse"></div>
              
              <div className="absolute top-12 left-8 h-8 w-20 bg-white/70 rounded-full blur-[1px]"></div>
              
              <svg viewBox="0 0 200 200" className="w-64 h-64 overflow-visible">
                <path d="M 0,160 Q 50,140 100,160 T 200,160 L 200,200 L 0,200 Z" fill="#7CB342" opacity="0.6" />
                <path d="M 0,175 Q 60,160 120,180 T 200,175 L 200,200 L 0,200 Z" fill="#43A047" />
                
                <g transform="translate(45,135) scale(0.6)">
                  <path d="M 10,60 Q 20,30 5,0 Q 30,25 15,60" fill="none" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" className="animate-sway" />
                  <path d="M 5,20 Q -10,10 0,0 Q 5,10 5,20" fill="#7CB342" />
                  <path d="M 10,40 Q 25,30 15,15 Q 12,28 10,40" fill="#7CB342" />
                  <circle cx="5" cy="0" r="3" fill="#F9A825" />
                  <circle cx="8" cy="-5" r="3.5" fill="#FBC02D" />
                  <circle cx="2" cy="-10" r="3" fill="#F9A825" />
                </g>

                <g transform="translate(100,120) scale(0.8)">
                  <path d="M 10,60 Q 15,25 0,0 Q 25,20 15,60" fill="none" stroke="#1B5E20" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M 5,25 Q -15,15 -2,5 Q 5,15 5,25" fill="#43A047" />
                  <path d="M 10,45 Q 30,35 18,18 Q 12,30 10,45" fill="#43A047" />
                  <circle cx="0" cy="0" r="4.5" fill="#F9A825" />
                  <circle cx="5" cy="-8" r="4" fill="#FBC02D" />
                  <circle cx="-5" cy="-6" r="4" fill="#F9A825" />
                </g>

                <g transform="translate(145,140) scale(0.55)">
                  <path d="M 10,60 Q 20,30 5,0 Q 30,25 15,60" fill="none" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 5,20 Q -10,10 0,0 Q 5,10 5,20" fill="#7CB342" />
                  <path d="M 10,40 Q 25,30 15,15 Q 12,28 10,40" fill="#7CB342" />
                  <circle cx="5" cy="0" r="3" fill="#F9A825" />
                  <circle cx="8" cy="-5" r="3" fill="#FBC02D" />
                </g>
              </svg>

              <div className="absolute bottom-16 right-16 bg-[#0288D1]/20 p-2.5 rounded-full border border-[#0288D1]/40 text-[#0288D1] animate-bounce">
                💧
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#2E7D32] to-[#43A047] rounded-[32px] p-8 text-white shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-b-4 border-[#F9A825]" id="stats-banner">
          
          <div className="space-y-1">
            <div className="text-4xl font-black font-sans text-[#F9A825] tracking-tight">
              {farmersCount.toLocaleString()}+
            </div>
            <p className="text-sm font-semibold text-emerald-100">{t.farmers}</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-x border-emerald-100/20 pt-6 md:pt-0">
            <div className="text-4xl font-black font-sans text-[#F9A825] tracking-tight">
              {districtsCount}
            </div>
            <p className="text-sm font-semibold text-emerald-100">{t.districts} Monitored</p>
          </div>

          <div className="space-y-1 border-t md:border-t-0 pt-6 md:pt-0">
            <div className="text-4xl font-black font-sans text-[#F9A825] tracking-tight">
              {schemesCount.toLocaleString()}
            </div>
            <p className="text-sm font-semibold text-emerald-100">{language === 'si' ? 'සිට' : language === 'ta' ? 'தொடங்கி' : 'since'}</p>
          </div>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-sans font-black text-gray-900 tracking-tight">
            {t.suiteTitle}
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            {t.suiteSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="landing-features-grid">
          
          <div 
            onClick={() => user ? setCurrentTab('crops') : onOpenAuth()}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="bg-emerald-50 text-[#2E7D32] p-3 rounded-2xl w-fit border border-emerald-100 group-hover:scale-105 transition-transform">
                <Sprout className="h-6 w-6" />
              </div>
              <h4 className="text-md font-bold text-gray-900 font-sans group-hover:text-[#2E7D32] transition-colors">
                {t.card1Title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.card1Desc}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#2E7D32] pt-4 mt-4 border-t border-gray-50">
              <span>{t.card1Action}</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div 
            onClick={() => setCurrentTab('prices')}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="bg-red-50 text-[#C1622D] p-3 rounded-2xl w-fit border border-red-100 group-hover:scale-105 transition-transform">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h4 className="text-md font-bold text-gray-900 font-sans group-hover:text-[#C1622D] transition-colors">
                {t.card2Title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.card2Desc}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#C1622D] pt-4 mt-4 border-t border-gray-50">
              <span>{t.card2Action}</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div 
            onClick={() => setCurrentTab('weather')}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="bg-sky-50 text-[#0288D1] p-3 rounded-2xl w-fit border border-sky-100 group-hover:scale-105 transition-transform">
                <CloudSun className="h-6 w-6" />
              </div>
              <h4 className="text-md font-bold text-gray-900 font-sans group-hover:text-sky-700 transition-colors">
                {t.card3Title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.card3Desc}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#0288D1] pt-4 mt-4 border-t border-gray-50">
              <span>{t.card3Action}</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div 
            onClick={() => setCurrentTab('schemes')}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="bg-amber-50 text-[#C1622D] p-3 rounded-2xl w-fit border border-amber-100 group-hover:scale-105 transition-transform">
                <Landmark className="h-6 w-6" />
              </div>
              <h4 className="text-md font-bold text-gray-900 font-sans group-hover:text-amber-800 transition-colors">
                {t.card4Title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.card4Desc}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#C1622D] pt-4 mt-4 border-t border-gray-50">
              <span>{t.card4Action}</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div 
            onClick={() => setCurrentTab('marketplace')}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="bg-[#FFFDF7] text-[#2E7D32] p-3 rounded-2xl w-fit border-2 border-[#2E7D32]/20 group-hover:scale-105 transition-transform">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h4 className="text-md font-bold text-gray-900 font-sans group-hover:text-[#2E7D32] transition-colors">
                {t.card5Title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.card5Desc}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#2E7D32] pt-4 mt-4 border-t border-gray-50">
              <span>{t.card5Action}</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div 
            onClick={() => setCurrentTab('fertilizer')}
            className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="bg-emerald-50 text-[#2E7D32] p-3 rounded-2xl w-fit border border-emerald-100 group-hover:scale-105 transition-transform">
                <Beaker className="h-6 w-6" />
              </div>
              <h4 className="text-md font-bold text-gray-900 font-sans group-hover:text-[#2E7D32] transition-colors">
                {t.card6Title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.card6Desc}
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#2E7D32] pt-4 mt-4 border-t border-gray-50">
              <span>{t.card6Action}</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. How It Works visual section */}
      <section className="bg-gradient-to-br from-[#2E7D32]/5 to-yellow-500/5 py-16 border-y border-gray-100" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-sans font-black text-gray-900 tracking-tight">
              {t.howItWorks}
            </h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              {t.howItWorksSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="text-center space-y-3.5 relative">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#FFFDF7] border-2 border-[#F9A825] shadow-md flex items-center justify-center text-xl font-bold text-[#2E7D32] font-mono">
                01
              </div>
              <h4 className="text-sm font-bold text-gray-950 font-sans">{t.step1Title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                {t.step1Desc}
              </p>
            </div>

            <div className="text-center space-y-3.5 relative">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#FFFDF7] border-2 border-[#F9A825] shadow-md flex items-center justify-center text-xl font-bold text-[#2E7D32] font-mono">
                02
              </div>
              <h4 className="text-sm font-bold text-gray-950 font-sans">{t.step2Title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                {t.step2Desc}
              </p>
            </div>

            <div className="text-center space-y-3.5 relative">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#FFFDF7] border-2 border-[#F9A825] shadow-md flex items-center justify-center text-xl font-bold text-[#2E7D32] font-mono">
                03
              </div>
              <h4 className="text-sm font-bold text-gray-950 font-sans">{t.step3Title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                {t.step3Desc}
              </p>
            </div>

            <div className="text-center space-y-3.5 relative">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-[#FFFDF7] border-2 border-[#F9A825] shadow-md flex items-center justify-center text-xl font-bold text-[#2E7D32] font-mono">
                04
              </div>
              <h4 className="text-sm font-bold text-gray-950 font-sans">{t.step4Title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                {t.step4Desc}
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="testimonials">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-sans font-black text-gray-900 tracking-tight">
            {t.successStories}
          </h2>
          <p className="text-sm text-gray-600">
            {t.successStoriesSub}
          </p>
        </div>

        <div className="bg-[#FFFDF7] rounded-[32px] p-6 sm:p-10 border-2 border-[#F9A825]/30 shadow-lg relative">
          
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="h-24 w-24 rounded-3xl overflow-hidden border-4 border-white bg-emerald-50 shrink-0 shadow-md">
              <img
                src={testimonials[activeTestimonial].avatar}
                alt={testimonials[activeTestimonial].name}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div className="flex justify-center sm:justify-start space-x-1">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-sm sm:text-base italic text-gray-700 leading-relaxed">
                "{testimonials[activeTestimonial].text}"
              </p>

              <div>
                <h5 className="font-bold text-gray-900 text-md font-sans">
                  {testimonials[activeTestimonial].name}
                </h5>
                <p className="text-xs text-[#2E7D32] font-semibold">
                  {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].district} {language === 'en' ? 'District' : language === 'si' ? 'දිස්ත්‍රික්කය' : 'மாவட்டம்'}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6">
            <button
              onClick={handlePrevTestimonial}
              className="p-2.5 rounded-full bg-white text-gray-700 hover:text-[#2E7D32] hover:bg-emerald-50 shadow-md border border-gray-100 cursor-pointer transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6">
            <button
              onClick={handleNextTestimonial}
              className="p-2.5 rounded-full bg-white text-gray-700 hover:text-[#2E7D32] hover:bg-emerald-50 shadow-md border border-gray-100 cursor-pointer transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
