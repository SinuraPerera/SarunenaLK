import React from 'react';
import { Calendar, Bell, ShieldCheck, Clipboard, Sprout, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { User, Crop } from './types';
import WeatherWidget from './WeatherWidget';
import MarketPricesView from './MarketPricesView';
import DailyReminders from './DailyReminders';
import { translations } from './mockData';

interface DashboardOverviewProps {
  user: User;
  crops: Crop[];
  setCurrentTab: (tab: string) => void;
  language: 'en' | 'si' | 'ta';
}

export default function DashboardOverview({ user, crops, setCurrentTab, language }: DashboardOverviewProps) {
  const t = translations[language];

  const [activeFarmers, setActiveFarmers] = React.useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('sarunena_registered_farmers');
      const list = saved ? JSON.parse(saved) : [
        { name: "Gunapala Gamage", district: "Anuradhapura", role: "Farmer", avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=gunapala" },
        { name: "Kandasamy Sivalingam", district: "Jaffna", role: "Farmer", avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=kandasamy" },
        { name: "Priyantha de Silva", district: "Galle", role: "Farmer", avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=priyantha" },
        { name: "Fathima Rizna", district: "Kurunegala", role: "Farmer", avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=fathima" },
        { name: "Samantha Bandara", district: "Matale", role: "Farmer", avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=samantha" }
      ];
      if (user && !list.some((f: any) => f.name === user.name)) {
        list.push({
          name: user.name.replace(/[<>"'&]/g, ''),
          district: user.district,
          role: user.role,
          avatarUrl: user.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`
        });
        try {
          localStorage.setItem('sarunena_registered_farmers', JSON.stringify(list));
          localStorage.setItem('sarunena_registered_count', list.length.toString());
        } catch (e) {
          // Silent localStorage failure
        }
      }
      return list;
    } catch {
      return [];
    }
  });

  const notifications = [
    {
      id: 'nt-1',
      title: language === 'en' ? 'Organic Fertilizer Support Deadline' : language === 'si' ? 'කාබනික පොහොර සහනාධාර අවසාන දිනය' : 'இயற்கை உர ஆதரவு காலக்கெடு',
      desc: language === 'en' ? 'Submit your Sarunena-ID application before July 20 to receive free compost bags for the Yala harvest.' : language === 'si' ? 'යල කන්නයේ අස්වැන්න සඳහා නොමිලේ කොම්පෝස්ට් බෑග් ලබා ගැනීමට ජූලි 20 ට පෙර ඔබේ සරුනැණ-හැඳුනුම්පත් අයදුම්පත ඉදිරිපත් කරන්න.' : 'யால அறுவடைக்கு இலவச மட்கிய உரப் பைகளைப் பெற ஜூலை 20 ஆம் தேதிக்கு முன் உங்கள் சருனேன-ஐடி விண்ணப்பத்தை சமர்ப்பிக்கவும்.',
      type: 'critical',
      date: language === 'en' ? 'July 20' : language === 'si' ? 'ජූලි 20' : 'ஜூலை 20'
    },
    {
      id: 'nt-2',
      title: language === 'en' ? 'Pest Advisory: Thrips Infestation' : language === 'si' ? 'පළිබෝධ උපදේශනය: පැළ මැක්කන්ගේ හානිය' : 'பூச்சி ஆலோசனை: த்ரிப்ஸ் தொற்று',
      desc: language === 'en' ? 'Farming networks report high Thrips counts in neighbouring farms. Spray organic Neem Seed extract.' : language === 'si' ? 'අසල ඇති ගොවිපලවල වැඩි වශයෙන් පැළ මැක්කන් වාර්තා වේ. කාබනික කොහොඹ ඇට සාරය ඉසින්න.' : 'அண்டை பண்ணைகளில் அதிக த்ரிப்ஸ் எண்ணிக்கை பதிவாகியுள்ளது. ஆர்கானிக் வேப்ப எண்ணெய் தெளிக்கவும்.',
      type: 'warning',
      date: language === 'en' ? 'Today' : language === 'si' ? 'අද' : 'இன்று'
    },
    {
      id: 'nt-3',
      title: language === 'en' ? 'Independent Voucher Approved' : language === 'si' ? 'ස්වාධීන වවුචරය අනුමතයි' : 'சுயாதீன வவுச்சர் அங்கீகரிக்கப்பட்டது',
      desc: language === 'en' ? 'Your fuel grant voucher of Rs. 12,500 has been certified. Collect from Gampaha Distribution Center.' : language === 'si' ? 'ඔබගේ රු. 12,500 ක ඉන්ධන ආධාර වවුචරය සහතික කර ඇත. ගම්පහ බෙදාහැරීමේ මධ්‍යස්ථානයෙන් ලබාගන්න.' : 'உங்களது ரூ. 12,500 எரிபொருள் மானிய வவுச்சர் சான்றளிக்கப்பட்டது. கம்பஹா விநியோக மையத்தில் பெற்றுக்கொள்ளவும்.',
      type: 'info',
      date: language === 'en' ? 'Yesterday' : language === 'si' ? 'ඊයේ' : 'நேற்று'
    }
  ];

  const atRiskCrops = crops.filter(c => c.healthStatus === 'At Risk' || c.healthStatus === 'Fair');

  const getStableId = (email: string) => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    return 4000 + (Math.abs(hash) % 5000);
  };

  const farmingId = getStableId(user.email);

  return (
    <div className="space-y-6 animate-fade-in" id="dashboard-overview-container">
      
      <div className="bg-[#FFFDF7] p-6 rounded-3xl border-2 border-[#2E7D32]/20 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-sans font-black text-gray-950 flex items-center gap-2">
            <span>👋 {language === 'en' ? 'Ayubowan' : language === 'si' ? 'ආයුබෝවන්' : 'ஆயுபோவன்'}, {user.name}!</span>
            <span className="bg-[#FFFDF7] border-2 border-[#F9A825] px-2 py-0.5 rounded text-[11px] font-bold text-[#2E7D32] uppercase">
              {user.role === 'Farmer' ? (language === 'en' ? 'Farmer' : language === 'si' ? 'ගොවි' : 'விவசாயி') :
               user.role === 'Officer' ? (language === 'en' ? 'Officer' : language === 'si' ? 'නිලධාරී' : 'அதிகாரி') :
               (language === 'en' ? 'Admin' : language === 'si' ? 'පරිපාලක' : 'நிர்வாகி')} {t.dbPortal}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            {t.dbRepresenting} <strong className="text-[#2E7D32]">{user.district} {t.dbDistrict}</strong> • {t.dbFarmingId} <span className="font-mono text-gray-800">SRN-LK-{farmingId}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
          <Calendar className="h-4.5 w-4.5 text-[#F9A825]" />
          <span>{t.dbFarmingSeason} <strong>{t.dbYalaCycle}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="dashboard-bento-stats">
        
        {/* Stat 1: Managed Crops */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.dbMonitoredCrops}</p>
            <p className="text-2xl font-mono font-black text-gray-900 mt-1">{crops.length}</p>
            <button 
              onClick={() => setCurrentTab('crops')}
              className="text-[10px] font-bold text-[#2E7D32] hover:underline flex items-center mt-1.5"
            >
              {t.dbManageCrops} <ArrowRight className="h-3 w-3 ml-0.5" />
            </button>
          </div>
          <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 text-[#2E7D32]">
            <Sprout className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.dbTotalArea}</p>
            <p className="text-2xl font-mono font-black text-gray-900 mt-1">
              {crops.reduce((acc, c) => acc + c.areaAcres, 0).toFixed(1)} {t.dbAcres}
            </p>
            <p className="text-[10px] text-gray-400 font-semibold mt-1.5">{t.dbAcrossPlots}</p>
          </div>
          <div className="bg-sky-50 p-3 rounded-2xl border border-sky-100 text-[#0288D1]">
            <Clipboard className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.dbSensoryAlerts}</p>
            <p className="text-2xl font-mono font-black text-rose-600 mt-1">{atRiskCrops.length}</p>
            <p className="text-[10px] text-gray-400 font-semibold mt-1.5">{t.dbCheckCrops}</p>
          </div>
          <div className={`p-3 rounded-2xl border ${atRiskCrops.length > 0 ? 'bg-rose-50 border-rose-100 text-rose-600 animate-pulse' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.dbSubsidiesPayout}</p>
            <p className="text-2xl font-mono font-black text-emerald-700 mt-1">Rs. 27,500</p>
            <button 
              onClick={() => setCurrentTab('schemes')}
              className="text-[10px] font-bold text-[#C1622D] hover:underline flex items-center mt-1.5"
            >
              {t.dbBrowseSchemes} <ArrowRight className="h-3 w-3 ml-0.5" />
            </button>
          </div>
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 text-[#C1622D]">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 space-y-6">
          <WeatherWidget defaultDistrict={user.district} />

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-md space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-3">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Sprout className="h-5 w-5 text-[#2E7D32]" />
                <span>{t.dbCropHealthSummary}</span>
              </h4>
              <button 
                onClick={() => setCurrentTab('crops')}
                className="text-xs font-bold text-[#2E7D32] hover:underline flex items-center"
              >
                {t.dbOpenCropRegistry} <ArrowRight className="h-3 w-3 ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {crops.slice(0, 2).map(crop => (
                <div key={crop.id} className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-black text-gray-900">{crop.name[language] || crop.name.en}</h5>
                    <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                      {crop.category === 'Paddy' ? (language === 'en' ? 'Paddy' : language === 'si' ? 'වී වගාව' : 'நெல்') : 
                       crop.category === 'Vegetable' ? (language === 'en' ? 'Vegetable' : language === 'si' ? 'එළවළු' : 'காய்கறி') : 
                       crop.category === 'Spice' ? (language === 'en' ? 'Spice' : language === 'si' ? 'කුළුබඩු' : 'மசாலா') : crop.category} • {crop.areaAcres} {t.dbAcres}
                    </p>
                    <div className="mt-2.5 flex items-center space-x-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${crop.healthStatus === 'Excellent' || crop.healthStatus === 'Good' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {crop.healthStatus === 'Excellent' ? (language === 'en' ? 'Excellent' : language === 'si' ? 'විශිෂ්ටයි' : 'சிறந்த') :
                         crop.healthStatus === 'Good' ? (language === 'en' ? 'Good' : language === 'si' ? 'යහපත්' : 'நல்ல') :
                         crop.healthStatus === 'Fair' ? (language === 'en' ? 'Fair' : language === 'si' ? 'සතුටුදායකයි' : 'பரவாயில்லை') :
                         (language === 'en' ? 'At Risk' : language === 'si' ? 'අවදානම්' : 'அபாயத்தில்')}
                      </span>
                      <span className="text-[10px] font-mono text-[#2E7D32] font-bold">{t.dbProgress}: {crop.progress}%</span>
                    </div>
                  </div>
                  
                  {/* Miniature progress circle */}
                  <div className="relative h-11 w-11 flex items-center justify-center font-mono text-[10px] font-black text-emerald-900 bg-white rounded-full border border-gray-100">
                    {crop.progress}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DailyReminders />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-b from-[#FFFDF7] to-white p-5 rounded-3xl border-2 border-[#F9A825]/30 shadow-md flex flex-col justify-between h-full">
            <div className="space-y-4">
              
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <Bell className="h-5 w-5 text-[#F9A825]" />
                <h4 className="text-sm font-bold text-gray-950">{t.dbBulletin}</h4>
              </div>

              <div className="space-y-3.5">
                {notifications.map((nt) => (
                  <div 
                    key={nt.id}
                    className={`p-3 rounded-xl border text-xs leading-normal space-y-1.5 ${
                      nt.type === 'critical'
                        ? 'bg-rose-50/50 border-rose-100 text-rose-950'
                        : nt.type === 'warning'
                        ? 'bg-amber-50/50 border-amber-100 text-amber-950'
                        : 'bg-emerald-50/50 border-emerald-100 text-emerald-950'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">{nt.title}</span>
                      <span className="text-[9px] font-bold uppercase text-[#C1622D]">{nt.date}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                      {nt.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center space-x-2 text-[10px] text-gray-400 font-medium">
              <ShieldCheck className="h-4 w-4 text-[#2E7D32]" />
              <span>{t.dbBulletinCompiled}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-md space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
              <span className="text-xl">👥</span>
              <h4 className="text-sm font-bold text-gray-950">{t.dbActiveFarmers} ({activeFarmers.length})</h4>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
              {activeFarmers.map((farmer, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-2 bg-slate-50/50 hover:bg-emerald-50/40 rounded-xl border border-slate-100/70 transition-all">
                  <img
                    src={farmer.avatarUrl || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${farmer.name}`}
                    alt={farmer.name}
                    className="h-8 w-8 rounded-full bg-emerald-50 border border-emerald-100/50"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-950 truncate">{farmer.name}</p>
                    <p className="text-[10px] text-gray-500 font-medium truncate">
                      {farmer.district} {t.dbDistrict} • {farmer.role === 'Farmer' ? (language === 'en' ? 'Farmer' : language === 'si' ? 'ගොවි' : 'விவசாயி') :
                                                             farmer.role === 'Officer' ? (language === 'en' ? 'Officer' : language === 'si' ? 'නිලධාරී' : 'அதிகாரி') :
                                                             (language === 'en' ? 'Admin' : language === 'si' ? 'පරිපාලක' : 'நிர்வாகி')}
                    </p>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50 shrink-0"></span>
                </div>
              ))}
            </div>
            
            <p className="text-[9px] text-gray-400 leading-normal">
              {t.dbFarmersDesc}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
