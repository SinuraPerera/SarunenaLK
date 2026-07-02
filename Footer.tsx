import React from 'react';
import { Sprout, Phone, Mail, MapPin, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Language } from './types';
import { translations } from './mockData';
import { ThemeName } from './theme';

const logoUrl = new URL('./logo.png', import.meta.url).href;

interface FooterProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  setCurrentTab: (tab: string) => void;
  theme?: ThemeName;
}

const footerThemeStyles = {
  emerald: {
    bg: 'bg-emerald-950',
    borderTop: 'border-[#F9A825]',
    accentText: 'text-[#F9A825]',
    subText: 'text-emerald-100/70',
    links: 'text-emerald-100/80 hover:text-[#FBC02D]',
    badgeBg: 'bg-emerald-900/50 border-emerald-800/50',
    badgeText: 'text-emerald-200',
    langPickerBg: 'bg-emerald-900 border-emerald-800',
    langPickerText: 'text-emerald-200/60',
    langActive: 'text-[#F9A825]'
  },
  gold: {
    bg: 'bg-amber-950',
    borderTop: 'border-[#D84315]',
    accentText: 'text-[#FF8F00]',
    subText: 'text-amber-100/70',
    links: 'text-amber-100/80 hover:text-[#FFB300]',
    badgeBg: 'bg-amber-900/50 border-amber-800/50',
    badgeText: 'text-amber-200',
    langPickerBg: 'bg-amber-900 border-amber-800',
    langPickerText: 'text-amber-200/60',
    langActive: 'text-[#FF8F00]'
  },
  clay: {
    bg: 'bg-stone-900',
    borderTop: 'border-[#8D6E63]',
    accentText: 'text-[#A1887F]',
    subText: 'text-stone-300/70',
    links: 'text-stone-200/80 hover:text-[#D7CCC8]',
    badgeBg: 'bg-stone-800/50 border-stone-700/50',
    badgeText: 'text-stone-200',
    langPickerBg: 'bg-stone-800 border-stone-700',
    langPickerText: 'text-stone-300/60',
    langActive: 'text-[#A1887F]'
  },
  ocean: {
    bg: 'bg-slate-900',
    borderTop: 'border-[#0288D1]',
    accentText: 'text-[#03A9F4]',
    subText: 'text-slate-300/70',
    links: 'text-slate-200/80 hover:text-[#B3E5FC]',
    badgeBg: 'bg-slate-800/50 border-slate-700/50',
    badgeText: 'text-slate-200',
    langPickerBg: 'bg-slate-800 border-slate-700',
    langPickerText: 'text-slate-300/60',
    langActive: 'text-[#03A9F4]'
  }
};

export default function Footer({ language, setLanguage, setCurrentTab, theme = 'emerald' }: FooterProps) {
  const t = translations[language];
  const styles = footerThemeStyles[theme] || footerThemeStyles.emerald;

  return (
    <footer className={`${styles.bg} text-white pt-16 pb-8 border-t-8 ${styles.borderTop}`} id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-[#FFFDF7] p-2 rounded-xl border border-amber-500 overflow-hidden">
                <img src={logoUrl} alt="SarunenaLK logo" className="h-6 w-6 object-contain" />
              </div>
              <div>
                <span className="font-sans font-black text-xl tracking-tight text-white">
                  {t.title}
                </span>
                <p className={`text-[10px] uppercase font-bold ${styles.accentText} tracking-widest leading-none mt-1`}>
                  {t.nationalSmartOS || 'Smart OS'}
                </p>
              </div>
            </div>
            <p className={`text-sm ${styles.subText} leading-relaxed`}>
              {t.footerDesc}
            </p>
            <div className={`flex items-center space-x-2 ${styles.badgeBg} p-2.5 rounded-lg border`}>
              <ShieldCheck className={`h-4 w-4 ${styles.accentText}`} />
              <span className={`text-xs font-semibold ${styles.badgeText}`}>{t.govCertified}</span>
            </div>
          </div>


          <div className="space-y-4">
            <h4 className={`text-md font-bold ${styles.accentText} tracking-wide uppercase border-b-2 border-white/10 pb-2`}>
              {t.quickLinks}
            </h4>
            <ul className={`space-y-2.5 text-sm ${styles.links}`}>
              <li>
                <button 
                  onClick={() => setCurrentTab('landing')} 
                  className="hover:underline cursor-pointer flex items-center transition-colors text-left"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('prices')} 
                  className="hover:underline cursor-pointer flex items-center transition-colors text-left"
                >
                  {t.navPrices}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('marketplace')} 
                  className="hover:underline cursor-pointer flex items-center transition-colors text-left"
                >
                  {t.navMarketplace}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('fertilizer')} 
                  className="hover:underline cursor-pointer flex items-center transition-colors text-left"
                >
                  {t.navFertilizer}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('security')} 
                  className="hover:underline cursor-pointer flex items-center transition-colors text-left"
                >
                  {t.navSecurity}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentTab('about')} 
                  className="hover:underline cursor-pointer flex items-center transition-colors text-left"
                >
                  {t.navAbout}
                </button>
              </li>
            </ul>
          </div>


          <div className="space-y-4">
            <h4 className={`text-md font-bold ${styles.accentText} tracking-wide uppercase border-b-2 border-white/10 pb-2`}>
              {t.contactUs}
            </h4>
            <ul className={`space-y-3.5 text-sm ${styles.links}`}>
              <li className="flex items-start">
                <MapPin className={`h-4 w-4 mr-3 ${styles.accentText} shrink-0 mt-0.5`} />
                <span>
                  SarunenaLK Independent Farm Project<br />
                  23, Wattegedara Road, Maharagama<br />
                  {language === 'en' ? 'Sri Lanka' : language === 'si' ? 'ශ්‍රී ලංකාව' : 'இலங்கை'}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className={`h-4 w-4 mr-3 ${styles.accentText} shrink-0`} />
                <span>+94 77 447 0098 • Hotline 1920</span>
              </li>
              <li className="flex items-center">
                <Mail className={`h-4 w-4 mr-3 ${styles.accentText} shrink-0`} />
                <span>sinuradamsath2022@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>


        <div className="border-t border-white/10 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center text-xs text-white/60 gap-4">
          <div>
            <p>© {new Date().getFullYear()} {t.title}. {t.allRightsReserved}</p>
            <p className="mt-1 text-[10px] opacity-70">{t.ministryCopyright}</p>
          </div>

          <div className={`flex items-center space-x-3 ${styles.langPickerBg} px-3 py-1.5 rounded-lg border`}>
            <span className="font-bold text-white/90">{t.selectLanguage}:</span>
            <button 
              onClick={() => setLanguage('en')} 
              className={`hover:text-white transition-colors font-semibold ${language === 'en' ? `${styles.langActive} underline` : ''}`}
            >
              English
            </button>
            <span className="opacity-40">|</span>
            <button 
              onClick={() => setLanguage('si')} 
              className={`hover:text-white transition-colors font-semibold ${language === 'si' ? `${styles.langActive} underline` : ''}`}
            >
              සිංහල
            </button>
            <span className="opacity-40">|</span>
            <button 
              onClick={() => setLanguage('ta')} 
              className={`hover:text-white transition-colors font-semibold ${language === 'ta' ? `${styles.langActive} underline` : ''}`}
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
