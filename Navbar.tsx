import React from 'react';
import { 
  Sprout, LogIn, LogOut, LayoutDashboard, Globe, Menu, X, Landmark, 
  User as UserIcon, Palette, BookOpen, Sparkles, CloudSun, TrendingUp, 
  ShoppingCart, Beaker, Bot, Info, Clock, Phone, ShieldAlert
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Language, User } from './types';
import { translations } from './mockData';
import { ThemeName, THEMES } from './theme';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAuth: () => void;
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

export default function Navbar({
  language,
  setLanguage,
  user,
  setUser,
  currentTab,
  setCurrentTab,
  onOpenAuth,
  theme,
  setTheme
}: NavbarProps) {
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = React.useState(false);
  const themeColors = THEMES[theme].colors;

  const navItems = [
    { id: 'landing', label: t.navHome },
    { id: 'prices', label: t.navPrices },
    { id: 'marketplace', label: t.navMarketplace },
    { id: 'fertilizer', label: t.navFertilizer },
    { id: 'about', label: t.navAbout },
  ];

  const mobileNavItems = user ? [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard, color: 'text-emerald-400' },
    { id: 'crops', label: t.navCrops, icon: Sprout, color: 'text-emerald-400' },
    { id: 'growguide', label: t.navGrowGuide, icon: BookOpen, color: 'text-emerald-400' },
    { id: 'animal', label: t.navAnimal, icon: Sparkles, color: 'text-amber-400' },
    { id: 'security', label: t.navSecurity, icon: ShieldAlert, color: 'text-red-400' },
    { id: 'weather', label: t.navWeather, icon: CloudSun, color: 'text-blue-400' },
    { id: 'prices', label: t.navPrices, icon: TrendingUp, color: 'text-rose-400' },
    { id: 'schemes', label: t.navSchemes, icon: Landmark, color: 'text-amber-400' },
    { id: 'marketplace', label: t.navMarketplace, icon: ShoppingCart, color: 'text-emerald-300' },
    { id: 'fertilizer', label: t.navFertilizer, icon: Beaker, color: 'text-emerald-400' },
    { id: 'advisory', label: t.navAdvisory, icon: Bot, color: 'text-purple-400' },
    { id: 'about', label: t.navAbout, icon: Info, color: 'text-gray-400' },
  ] : [
    { id: 'landing', label: t.navHome, icon: Sprout, color: 'text-emerald-400' },
    { id: 'prices', label: t.navPrices, icon: TrendingUp, color: 'text-rose-400' },
    { id: 'marketplace', label: t.navMarketplace, icon: ShoppingCart, color: 'text-emerald-300' },
    { id: 'fertilizer', label: t.navFertilizer, icon: Beaker, color: 'text-emerald-400' },
    { id: 'advisory', label: t.navAdvisory, icon: Bot, color: 'text-purple-400' },
    { id: 'security', label: t.navSecurity, icon: ShieldAlert, color: 'text-red-400' },
    { id: 'about', label: t.navAbout, icon: Info, color: 'text-gray-400' },
  ];

  const handleLogout = () => {
    setUser(null);
    setCurrentTab('landing');
  };

  return (
    <nav className={`sticky top-0 z-50 ${themeColors.primaryBg} text-white shadow-md border-b-4 border-[#F9A825]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            onClick={() => setCurrentTab('landing')} 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group flex-shrink-0"
            id="nav-logo-container"
          >
            <div className="bg-[#FFFDF7] p-2 sm:p-2.5 rounded-2xl shadow-inner transition-transform group-hover:scale-105 border-2 border-[#F9A825] overflow-hidden">
              <img src="/favicon.svg" alt="SarunenaLK logo" className="h-6 w-6 sm:h-7 sm:w-7 object-contain" />
            </div>
            <div className="block min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-sans font-black text-lg sm:text-2xl tracking-tight leading-none text-[#FFFDF7]">
                  {t.title}
                </span>
                <span className={`bg-[#F9A825] ${themeColors.primaryText} text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded uppercase tracking-wider inline-flex`}>
                  SarunenaLK
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-medium text-[#FFFDF7]/80 line-clamp-1 mt-0.5">
                Smart farming for Sri Lankan communities
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center flex-shrink-0">
            <button
              id="desktop-menu-toggle"
              onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
              className="p-2.5 px-4 rounded-xl bg-[#FFFDF7]/10 text-[#FFFDF7] hover:bg-[#FFFDF7]/20 transition-all border border-[#FFFDF7]/20 flex items-center space-x-2 cursor-pointer shadow-sm hover:scale-[1.02]"
              title="Open Navigation Menu"
              aria-expanded={desktopMenuOpen}
              aria-controls="desktop-drawer-panel"
              aria-label="Toggle Desktop Menu"
            >
              <Menu className="h-5 w-5 text-[#FFFDF7]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#FFFDF7]/95">Menu</span>
            </button>
          </div>

          <div className="flex lg:hidden items-center space-x-2">
            <div className="flex items-center bg-white/10 rounded-lg px-2 py-1">
              <Globe className="h-3.5 w-3.5 text-white/80 mr-1" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-xs font-bold text-white focus:outline-none"
              >
                <option value="en" className="text-gray-900">EN</option>
                <option value="si" className="text-gray-900">සිං</option>
                <option value="ta" className="text-gray-900">தமிழ்</option>
              </select>
            </div>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-xs lg:hidden"
              id="mobile-drawer-backdrop"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className={`fixed right-0 top-0 bottom-0 w-[85%] max-w-sm h-screen ${themeColors.primaryBg} shadow-2xl z-[101] flex flex-col border-l border-white/10 text-white lg:hidden`}
              id="mobile-navigation-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="bg-[#FFFDF7] p-1.5 rounded-xl border border-[#F9A825]">
                    <Sprout className={`h-5 w-5 ${themeColors.primaryText}`} />
                  </div>
                  <div>
                    <span className="font-sans font-black text-base tracking-tight leading-none text-[#FFFDF7]">
                      {t.title}
                    </span>
                    <p className="text-[9px] uppercase font-bold text-[#F9A825] tracking-widest leading-none mt-0.5">
                      {t.nationalSmartOS || 'National Smart OS'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                  title="Close Menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-3">
                  {user ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#FFFDF7] p-2 rounded-xl">
                          <UserIcon className={`h-5 w-5 ${themeColors.primaryText}`} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#F9A825] uppercase tracking-wider">{user.role}</p>
                          <p className="text-sm font-black text-white">{user.name}</p>
                          <p className="text-[10px] text-white/60 font-medium">{user.district} District</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="p-2 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-200 transition-colors cursor-pointer"
                        title={t.logout}
                      >
                        <LogOut className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <p className="text-xs text-white/85 leading-relaxed font-semibold">
                        Sign in to access your farmer dashboard and personalized crops.
                      </p>
                      <button
                        onClick={() => {
                          onOpenAuth();
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-[#FFFDF7] ${themeColors.primaryText} font-black text-xs cursor-pointer hover:bg-white transition-all`}
                      >
                        <LogIn className="h-4 w-4" />
                        <span>{t.login} / {translations.si.login}</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F9A825] block px-1">
                    System Hub
                  </span>
                  <div className="space-y-1">
                    {mobileNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setCurrentTab(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`flex items-center space-x-3 w-full text-left px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? `bg-white ${themeColors.primaryText} font-black shadow-sm`
                              : 'text-white/90 hover:bg-white/10'
                          }`}
                        >
                          <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? themeColors.primaryText : item.color}`} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F9A825] block">
                    Quick Controls
                  </span>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/70 block uppercase">Visual Theme</label>
                    <div className="flex items-center bg-black/20 rounded-xl px-2.5 py-1.5 border border-white/10">
                      <Palette className="h-4 w-4 text-[#FFFDF7]/90 mr-1.5 shrink-0" />
                      <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as ThemeName)}
                        className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer w-full"
                      >
                        <option value="emerald" className="text-gray-900">🌿 සරු (Emerald)</option>
                        <option value="gold" className="text-gray-900">🌾 අස්වනු (Gold)</option>
                        <option value="clay" className="text-gray-900">🍂 පස (Clay)</option>
                        <option value="ocean" className="text-gray-900">💧 දියවර (Ocean)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/70 block uppercase mt-2">Language</label>
                    <div className="flex items-center bg-black/20 rounded-xl px-2.5 py-1.5 border border-white/10">
                      <Globe className="h-4 w-4 text-[#FFFDF7]/80 mr-1.5" />
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer w-full"
                      >
                        <option value="en" className="text-gray-900">English</option>
                        <option value="si" className="text-gray-900">සිංහල</option>
                        <option value="ta" className="text-gray-900">தமிழ்</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-800/40 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F9A825] block">
                    National Met Desk
                  </span>
                  <div className="flex items-center justify-between text-xs text-white/85">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-blue-400" /> Sri Lanka Time:
                    </span>
                    <span className="font-mono bg-black/30 px-2 py-0.5 rounded font-black text-[#F9A825]">
                      {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Colombo' })} SLT
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/85 pt-1.5 border-t border-white/5">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-emerald-400" /> National Helpline:
                    </span>
                    <span className="font-bold text-white hover:underline cursor-pointer">
                      1920
                    </span>
                  </div>
                </div>

              </div>

              <div className="p-4 border-t border-white/10 text-center text-[9px] text-white/40 bg-black/10">
                <p>© {new Date().getFullYear()} {t.title}</p>
                <p className="mt-0.5 leading-relaxed">{t.ministryCopyright}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Hamburger Slide-out Drawer */}
      <AnimatePresence>
        {desktopMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDesktopMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-xs"
              id="desktop-drawer-backdrop"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className={`fixed right-0 top-0 bottom-0 max-w-sm w-full h-screen ${themeColors.primaryBg} shadow-2xl z-[101] flex flex-col border-l border-white/10 text-white`}
              id="desktop-drawer-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="bg-[#FFFDF7] p-1.5 rounded-xl border border-[#F9A825]">
                    <Sprout className={`h-5 w-5 ${themeColors.primaryText}`} />
                  </div>
                  <div>
                    <span className="font-sans font-black text-lg tracking-tight leading-none text-[#FFFDF7]">
                      {t.title}
                    </span>
                    <p className="text-[10px] uppercase font-bold text-[#F9A825] tracking-widest leading-none mt-0.5">
                      {t.nationalSmartOS || 'National Smart OS'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setDesktopMenuOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                  title="Close Menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                  {user ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#FFFDF7] p-2 rounded-xl">
                          <UserIcon className={`h-5 w-5 ${themeColors.primaryText}`} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#F9A825] uppercase tracking-wider">{user.role}</p>
                          <p className="text-sm font-black text-white">{user.name}</p>
                          <p className="text-[10px] text-white/60 font-medium">{user.district} District</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDesktopMenuOpen(false);
                        }}
                        className="p-2 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-200 transition-colors cursor-pointer"
                        title={t.logout}
                      >
                        <LogOut className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <p className="text-xs text-white/85 leading-relaxed font-semibold">
                        Sign in to access your farmer dashboard and personalized crops.
                      </p>
                      <button
                        onClick={() => {
                          onOpenAuth();
                          setDesktopMenuOpen(false);
                        }}
                        className={`flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-[#FFFDF7] ${themeColors.primaryText} font-black text-xs cursor-pointer hover:bg-white transition-all`}
                      >
                        <LogIn className="h-4 w-4" />
                        <span>{t.login} / {translations.si.login}</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F9A825] block px-1">
                    System Hub
                  </span>
                  <div className="space-y-1">
                    {mobileNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setCurrentTab(item.id);
                            setDesktopMenuOpen(false);
                          }}
                          className={`flex items-center space-x-3 w-full text-left px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? `bg-white ${themeColors.primaryText} font-black shadow-sm`
                              : 'text-white/90 hover:bg-white/10'
                          }`}
                        >
                          <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? themeColors.primaryText : item.color}`} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F9A825] block">
                    Quick Controls
                  </span>
                  
                  {/* Theme Select */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/70 block uppercase">Visual Theme</label>
                    <div className="flex items-center bg-black/20 rounded-xl px-2.5 py-1.5 border border-white/10">
                      <Palette className="h-4 w-4 text-[#FFFDF7]/90 mr-1.5 shrink-0" />
                      <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as ThemeName)}
                        className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer w-full"
                      >
                        <option value="emerald" className="text-gray-900">🌿 සරු (Emerald)</option>
                        <option value="gold" className="text-gray-900">🌾 අස්වනු (Gold)</option>
                        <option value="clay" className="text-gray-900">🍂 පස (Clay)</option>
                        <option value="ocean" className="text-gray-900">💧 දියවර (Ocean)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/70 block uppercase mt-2">Language</label>
                    <div className="flex items-center bg-black/20 rounded-xl px-2.5 py-1.5 border border-white/10">
                      <Globe className="h-4 w-4 text-[#FFFDF7]/80 mr-1.5" />
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer w-full"
                      >
                        <option value="en" className="text-gray-900">English</option>
                        <option value="si" className="text-gray-900">සිංහල</option>
                        <option value="ta" className="text-gray-900">தமிழ்</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/40 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F9A825] block">
                    National Met Desk
                  </span>
                  <div className="flex items-center justify-between text-xs text-white/85">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-blue-400" /> Sri Lanka Time:
                    </span>
                    <span className="font-mono bg-black/30 px-2 py-0.5 rounded font-black text-[#F9A825]">
                      {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Colombo' })} SLT
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/85 pt-1.5 border-t border-white/5">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-emerald-400" /> National Helpline:
                    </span>
                    <span className="font-bold text-white hover:underline cursor-pointer">
                      1920
                    </span>
                  </div>
                </div>

              </div>

              <div className="p-4 border-t border-white/10 text-center text-[9px] text-white/40 bg-black/10">
                <p>© {new Date().getFullYear()} {t.title}</p>
                <p className="mt-0.5 leading-relaxed">{t.ministryCopyright}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
