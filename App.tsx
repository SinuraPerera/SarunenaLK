import React, { useState } from 'react';
import { 
  Sprout, LayoutDashboard, CloudSun, TrendingUp, Landmark, 
  ShoppingCart, Beaker, Bot, Info, LogOut, LogIn, Menu, Globe, User as UserIcon, ShieldCheck, BookOpen, Sparkles, ShieldAlert
} from 'lucide-react';

import { Language, User, Crop } from './types';
import { MOCK_CROPS, translations } from './mockData';

// Component Imports
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import DashboardOverview from './DashboardOverview';
import CropMonitoring from './CropMonitoring';
import WeatherWidget from './WeatherWidget';
import MarketPricesView from './MarketPricesView';
import GovSchemes from './GovSchemes';
import Marketplace from './Marketplace';
import AdvisoryChat from './AdvisoryChat';
import FertilizerCalculator from './FertilizerCalculator';
import AboutContact from './AboutContact';
import AuthModal from './AuthModal';
import Footer from './Footer';
import GrowGuides from './GrowGuides';
import AnimalHusbandry from './AnimalHusbandry';
import PlantSecurity from './PlantSecurity';
import { ThemeName, THEMES } from './theme';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sarunena_language');
      return (saved as Language) || 'en';
    } catch {
      return 'en';
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('sarunena_language', language);
    } catch (e) {
      // Silent localStorage failure
    }
  }, [language]);

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('sarunena_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [crops, setCrops] = useState<Crop[]>(() => {
    try {
      const saved = localStorage.getItem('sarunena_crops');
      return saved ? JSON.parse(saved) : MOCK_CROPS;
    } catch {
      return MOCK_CROPS;
    }
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeName>(() => {
    try {
      const saved = localStorage.getItem('sarunena_theme');
      return (saved as ThemeName) || 'emerald';
    } catch {
      return 'emerald';
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('sarunena_theme', theme);
    } catch (e) {
      // Silent localStorage failure
    }
  }, [theme]);

  React.useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('sarunena_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('sarunena_user');
      }
    } catch (e) {
      // Silent localStorage failure
    }
  }, [user]);

  React.useEffect(() => {
    try {
      localStorage.setItem('sarunena_crops', JSON.stringify(crops));
    } catch (e) {
      // Silent localStorage failure
    }
  }, [crops]);

  const t = translations[language];

  // Map tabs to panels
  const renderTabContent = () => {
    switch (currentTab) {
      case 'landing':
        return (
          <LandingPage 
            language={language} 
            setCurrentTab={setCurrentTab} 
            onOpenAuth={() => setIsAuthOpen(true)}
            user={user}
          />
        );
      case 'dashboard':
        if (!user) {
          return (
            <div className="max-w-md mx-auto text-center py-16 space-y-4">
              <span className="text-5xl">🔒</span>
              <h3 className="text-xl font-sans font-black text-gray-900">{t.restrictedTitle}</h3>
              <p className="text-sm text-gray-600">{t.restrictedSubtitle}</p>
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="px-6 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold rounded-xl text-sm shadow-md cursor-pointer"
              >
                {t.signInNow}
              </button>
            </div>
          );
        }
        return (
          <DashboardOverview 
            user={user} 
            crops={crops} 
            setCurrentTab={setCurrentTab} 
            language={language}
          />
        );
      case 'crops':
        return <CropMonitoring language={language} crops={crops} setCrops={setCrops} />;
      case 'weather':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-sans font-black text-gray-900 flex items-center gap-2">
                <CloudSun className="h-7 w-7 text-[#0288D1]" />
                <span>{t.weatherTitle}</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {t.weatherSubtitle}
              </p>
            </div>
            <WeatherWidget language={language} />
          </div>
        );
      case 'prices':
        return <MarketPricesView language={language} />;
      case 'schemes':
        return <GovSchemes language={language} />;
      case 'marketplace':
        return <Marketplace language={language} user={user} onOpenAuth={() => setIsAuthOpen(true)} />;
      case 'advisory':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-sans font-black text-gray-900 flex items-center gap-2">
                <Bot className="h-7 w-7 text-[#2E7D32]" />
                <span>{t.advisoryTitlePage}</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {t.advisorySubtitlePage}
              </p>
            </div>
            <AdvisoryChat language={language} />
          </div>
        );
      case 'fertilizer':
        return <FertilizerCalculator language={language} />;
      case 'growguide':
        return <GrowGuides language={language} />;
      case 'animal':
        return <AnimalHusbandry language={language} />;
      case 'security':
        return <PlantSecurity language={language} />;
      case 'about':
        return <AboutContact language={language} />;
      default:
        return <LandingPage language={language} setCurrentTab={setCurrentTab} onOpenAuth={() => setIsAuthOpen(true)} user={user} />;
    }
  };

  // Sidebar list items for Logged In view
  const sidebarItems = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard, color: 'text-emerald-600' },
    { id: 'crops', label: t.navCrops, icon: Sprout, color: 'text-emerald-600' },
    { id: 'growguide', label: t.navGrowGuide, icon: BookOpen, color: 'text-emerald-600' },
    { id: 'animal', label: t.navAnimal, icon: Sparkles, color: 'text-amber-600' },
    { id: 'security', label: t.navSecurity, icon: ShieldAlert, color: 'text-red-600' },
    { id: 'weather', label: t.navWeather, icon: CloudSun, color: 'text-blue-500' },
    { id: 'prices', label: t.navPrices, icon: TrendingUp, color: 'text-rose-500' },
    { id: 'schemes', label: t.navSchemes, icon: Landmark, color: 'text-amber-600' },
    { id: 'marketplace', label: t.navMarketplace, icon: ShoppingCart, color: 'text-emerald-700' },
    { id: 'fertilizer', label: t.navFertilizer, icon: Beaker, color: 'text-emerald-600' },
    { id: 'advisory', label: t.navAdvisory, icon: Bot, color: 'text-purple-600' },
    { id: 'about', label: t.navAbout, icon: Info, color: 'text-gray-500' },
  ];

  const handleAuthSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    setCurrentTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-gray-800 font-sans flex flex-col justify-between" id="app-wrapper">

      <style>{`
        :root {
          --primary-color: ${
            theme === 'emerald' ? '#1B5E20' :
            theme === 'gold' ? '#E65100' :
            theme === 'clay' ? '#795548' : '#01579B'
          };
          --primary-hover-color: ${
            theme === 'emerald' ? '#144A14' :
            theme === 'gold' ? '#BF360C' :
            theme === 'clay' ? '#5D4037' : '#014377'
          };
          --primary-light-color: ${
            theme === 'emerald' ? '#F0FDF4' :
            theme === 'gold' ? '#FFF7ED' :
            theme === 'clay' ? '#EFEBE9' : '#F0F9FF'
          };
          --primary-border-color: ${
            theme === 'emerald' ? '#DCFCE7' :
            theme === 'gold' ? '#FFEDD5' :
            theme === 'clay' ? '#D7CCC8' : '#E0F2FE'
          };
          --primary-border-alpha: ${
            theme === 'emerald' ? 'rgba(27, 94, 32, 0.2)' :
            theme === 'gold' ? 'rgba(230, 81, 0, 0.2)' :
            theme === 'clay' ? 'rgba(121, 85, 72, 0.2)' : 'rgba(1, 87, 155, 0.2)'
          };
          --gradient-start-color: ${
            theme === 'emerald' ? '#1B5E20' :
            theme === 'gold' ? '#E65100' :
            theme === 'clay' ? '#795548' : '#01579B'
          };
          --gradient-end-color: ${
            theme === 'emerald' ? '#2E7D32' :
            theme === 'gold' ? '#FF8F00' :
            theme === 'clay' ? '#8D6E63' : '#0288D1'
          };
        }

        /* Text color overrides */
        .text-\\[\\#2E7D32\\] {
          color: var(--primary-color) !important;
        }
        .text-emerald-50 {
          color: var(--primary-light-color) !important;
        }
        .text-emerald-100 {
          color: var(--primary-border-color) !important;
        }
        .text-emerald-200 {
          color: var(--primary-border-color) !important;
        }
        .text-emerald-300 {
          color: var(--primary-border-color) !important;
        }
        .text-emerald-500 {
          color: var(--primary-color) !important;
        }
        .text-emerald-600 {
          color: var(--primary-color) !important;
        }
        .text-emerald-700 {
          color: var(--primary-hover-color) !important;
        }
        .text-emerald-800 {
          color: var(--primary-hover-color) !important;
        }
        .text-emerald-950 {
          color: var(--primary-hover-color) !important;
        }

        /* Background color overrides */
        .bg-\\[\\#2E7D32\\] {
          background-color: var(--primary-color) !important;
        }
        .bg-emerald-50 {
          background-color: var(--primary-light-color) !important;
        }
        .bg-emerald-100 {
          background-color: var(--primary-border-color) !important;
        }
        .bg-emerald-500 {
          background-color: var(--primary-color) !important;
        }
        .bg-emerald-600 {
          background-color: var(--primary-color) !important;
        }
        .bg-emerald-700 {
          background-color: var(--primary-hover-color) !important;
        }
        .bg-emerald-800 {
          background-color: var(--primary-hover-color) !important;
        }
        .bg-emerald-900 {
          background-color: var(--primary-hover-color) !important;
        }
        .bg-emerald-950 {
          background-color: var(--primary-hover-color) !important;
        }
        .bg-emerald-50\\/70 {
          background-color: var(--primary-light-color) !important;
        }
        .bg-emerald-50\\/50 {
          background-color: var(--primary-light-color) !important;
        }
        .bg-emerald-900\\/40 {
          background-color: var(--primary-border-alpha) !important;
        }
        .bg-emerald-800\\/40 {
          background-color: var(--primary-border-alpha) !important;
        }
        .bg-\\[\\#2E7D32\\]\\/5 {
          background-color: var(--primary-light-color) !important;
        }
        .bg-\\[\\#2E7D32\\]\\/10 {
          background-color: var(--primary-border-alpha) !important;
        }

        /* Hover states */
        .hover\\:bg-\\[\\#1B5E20\\]:hover {
          background-color: var(--primary-hover-color) !important;
        }
        .hover\\:bg-emerald-50:hover {
          background-color: var(--primary-light-color) !important;
        }
        .hover\\:bg-emerald-600:hover {
          background-color: var(--primary-hover-color) !important;
        }
        .hover\\:bg-emerald-700:hover {
          background-color: var(--primary-hover-color) !important;
        }
        .hover\\:text-\\[\\#2E7D32\\]:hover {
          color: var(--primary-color) !important;
        }
        .hover\\:text-emerald-600:hover {
          color: var(--primary-color) !important;
        }
        .hover\\:text-emerald-700:hover {
          color: var(--primary-hover-color) !important;
        }

        /* Border colors */
        .border-\\[\\#2E7D32\\] {
          border-color: var(--primary-color) !important;
        }
        .border-\\[\\#2E7D32\\]\\/20 {
          border-color: var(--primary-border-alpha) !important;
        }
        .border-emerald-100 {
          border-color: var(--primary-border-color) !important;
        }
        .border-emerald-200 {
          border-color: var(--primary-border-color) !important;
        }
        .border-emerald-300\\/40 {
          border-color: var(--primary-border-alpha) !important;
        }
        .border-emerald-100\\/50 {
          border-color: var(--primary-border-alpha) !important;
        }
        .border-emerald-100\\/60 {
          border-color: var(--primary-border-alpha) !important;
        }
        .border-emerald-100\\/70 {
          border-color: var(--primary-border-alpha) !important;
        }
        .border-emerald-800\\/10 {
          border-color: var(--primary-border-alpha) !important;
        }

        /* Focus rings */
        .focus\\:ring-\\[\\#2E7D32\\]:focus {
          --tw-ring-color: var(--primary-color) !important;
          border-color: var(--primary-color) !important;
        }

        .from-\\[\\#2E7D32\\] {
          --tw-gradient-from: var(--gradient-start-color) !important;
          --tw-gradient-to: var(--gradient-end-color) !important;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important;
        }
        .from-emerald-900 {
          --tw-gradient-from: var(--primary-hover-color) !important;
          --tw-gradient-to: var(--primary-color) !important;
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important;
        }
        .to-\\[\\#43A047\\] {
          --tw-gradient-to: var(--gradient-end-color) !important;
        }
        .to-emerald-800 {
          --tw-gradient-to: var(--primary-color) !important;
        }

        button.bg-emerald-600 {
          background-color: var(--primary-color) !important;
        }
        button.bg-emerald-600:hover {
          background-color: var(--primary-hover-color) !important;
        }
      `}</style>

      <Navbar 
        language={language}
        setLanguage={setLanguage}
        user={user}
        setUser={setUser}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAuth={() => setIsAuthOpen(true)}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="flex-grow">
        
        {user && currentTab !== 'landing' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="dashboard-sidebar-wrapper">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="hidden lg:block lg:col-span-3 bg-white rounded-3xl p-5 border border-gray-100 shadow-md space-y-4 shrink-0" id="dashboard-sidebar">
                
                {user.role === 'Officer' && (
                  <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-950 font-semibold mb-3">
                    <p className="flex items-center gap-1 text-[#C1622D]">
                      <ShieldCheck className="h-4 w-4" /> Officer Notice:
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed font-medium">
                      You have 4 pending field audits & 2 subsidy clearances in your district center.
                    </p>
                  </div>
                )}

                {user.role === 'Admin' && (
                  <div className="bg-sky-50 p-3 rounded-2xl border border-sky-200 text-xs text-sky-950 font-semibold mb-3">
                    <p className="flex items-center gap-1 text-sky-800">
                      ⚙️ Admin Telemetry:
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed font-medium">
                      District databases synchronized. 100% gateway cluster connectivity active.
                    </p>
                  </div>
                )}

                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider px-3 mb-2">Smart OS Navigation</p>
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`sidebar-link-${item.id}`}
                        onClick={() => setCurrentTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                          isActive
                            ? 'bg-[#2E7D32] text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-white' : item.color}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setUser(null);
                      setCurrentTab('landing');
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4.5 w-4.5 shrink-0" />
                    <span>{t.logout}</span>
                  </button>
                </div>

              </div>

              <div className="lg:col-span-9 bg-transparent space-y-6 w-full overflow-hidden" id="dashboard-content-area">
                
                <div className="lg:hidden space-y-3">
                  {user.role === 'Officer' && (
                    <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-950 font-semibold">
                      <p className="flex items-center gap-1 text-[#C1622D]">
                        <ShieldCheck className="h-4 w-4" /> Officer Notice:
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed font-medium">
                        You have 4 pending field audits & 2 subsidy clearances in your district center.
                      </p>
                    </div>
                  )}

                  {user.role === 'Admin' && (
                    <div className="bg-sky-50 p-3 rounded-2xl border border-sky-200 text-xs text-sky-950 font-semibold">
                      <p className="flex items-center gap-1 text-sky-800">
                        ⚙️ Admin Telemetry:
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed font-medium">
                        District databases synchronized. 100% gateway cluster connectivity active.
                      </p>
                    </div>
                  )}
                </div>

                <div className="lg:hidden w-full bg-white rounded-3xl p-4 border border-gray-100 shadow-md space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-400">Smart OS Menu</span>
                    <span className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Swipe to view all
                    </span>
                  </div>
                  
                  <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    {sidebarItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setCurrentTab(item.id)}
                          className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                            isActive
                              ? 'bg-[#2E7D32] text-white shadow-md'
                              : 'bg-gray-50 text-gray-600 hover:bg-gray-100/80'
                          }`}
                        >
                          <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : item.color}`} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {renderTabContent()}
              </div>

            </div>
          </div>
        ) : (
          /* Public Centered Layout (Landing, Prices public page, Marketplace public page, etc.) */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="public-main-content">
            {renderTabContent()}
          </div>
        )}

      </main>

      <Footer 
        language={language}
        setLanguage={setLanguage}
        setCurrentTab={setCurrentTab}
        theme={theme}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

    </div>
  );
}
