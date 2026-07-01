import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, Radio, AlertTriangle, Eye, Activity, 
  BellRing, Volume2, Sun, Zap, HelpCircle, Flame, Plus, Trash2 
} from 'lucide-react';
import { Language } from './types';

interface PerimeterSensor {
  id: string;
  name: string;
  location: string;
  type: 'Infrared' | 'Seismic' | 'ChilliFence' | 'Acoustic';
  status: 'Active' | 'Triggered' | 'Offline';
  battery: number;
}

interface PlantSecurityProps {
  language: Language;
}

export default function PlantSecurity({ language }: PlantSecurityProps) {
  const [sensors, setSensors] = useState<PerimeterSensor[]>([
    { id: 's-1', name: 'North Boundary Beam', location: 'Paddy Border A', type: 'Infrared', status: 'Active', battery: 94 },
    { id: 's-2', name: 'Elephant Path Sensor', location: 'Forest Entry point', type: 'Seismic', status: 'Active', battery: 88 },
    { id: 's-3', name: 'South Bio-Chilli Line', location: 'Chena Boundary', type: 'ChilliFence', status: 'Active', battery: 100 },
    { id: 's-4', name: 'Acoustic Sound Horn', location: 'Coconut Nursery West', type: 'Acoustic', status: 'Offline', battery: 12 },
  ]);

  const [activeTab, setActiveTab] = useState<'elephant' | 'pests' | 'biosecurity'>('elephant');
  const [simulatedAlert, setSimulatedAlert] = useState<string | null>(null);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [soundMode, setSoundMode] = useState<'disabled' | 'bee' | 'horn' | 'chilli'>('disabled');

  const [newSensorName, setNewSensorName] = useState('');
  const [newSensorType, setNewSensorType] = useState<'Infrared' | 'Seismic' | 'ChilliFence' | 'Acoustic'>('Infrared');
  const [newSensorLoc, setNewSensorLoc] = useState('');

  const tSec = {
    en: {
      title: "Crop Security & Elephant Protection Hub",
      subtitle: "Deploy virtual tripwires, bio-fencing alerts, and dynamic deterrent schedules to protect crops from wild elephants and regional plant pathogens.",
      elephantTitle: "🐘 Human-Elephant Conflict Deterrents",
      pestTitle: "🐛 District Pest & Disease Outbreaks",
      bioTitle: "🧬 Farm Biosecurity Protocol",
      statusActive: "Active",
      statusTriggered: "INTRUSION DETECTED",
      statusOffline: "Offline",
      battery: "Battery",
      simulateIntrusion: "Simulate Elephant Entry",
      resetSystem: "Reset Security System",
      soundActive: "Sonic Deterrent Sound Active:",
      soundBee: "🐝 High-Frequency Honeybee Swarm Acoustic Stream",
      soundHorn: "📯 High-Decibel Air Horn Deterrent",
      soundChilli: "🌶️ Chilli-Smoke Thermal Dispenser Active",
      soundDisabled: "Muted / Stanby",
      borderTitle: "Active Crop Boundary Sensors",
      addSensor: "Add Border Sensor",
      sensorName: "Sensor Label Name",
      sensorType: "Sensor Type",
      sensorLoc: "Location Field",
      dangerZone: "Conflict Hotspot Alert",
      dangerZoneDesc: "Anuradhapura and Polonnaruwa regional coordinators reported heavy elephant movements near jungle corridors. Keep solar lights active.",
      pestStatus: "Crop Epidemic Warnings",
      pestArmyworm: "🍂 Fall Armyworm (Sena Catterpillar)",
      pestArmywormDesc: "Infestation alert in Kurunegala district. Recommend immediate localized neem-bio-pesticide spray and barrier weeding.",
      pestRiceBlast: "🌾 Rice Blast (Pyricularia oryzae)",
      pestRiceBlastDesc: "Spreading rapidly under humid intermediate monsoon winds in Matale. Avoid excessive synthetic nitrogen.",
      pestThrips: "🌶️ Green Chilli Thrips",
      pestThripsDesc: "Dry winds in Jaffna have increased thrips counts. Apply tobacco decoction soap mixture early morning.",
    },
    si: {
      title: "බෝග ආරක්ෂණය සහ අලි-මිනිස් ගැටුම් කළමනාකරණය",
      subtitle: "වන අලින්ගෙන් සහ වසංගත රෝගවලින් වගාවන් ආරක්ෂා කිරීම සඳහා ස්මාර්ට් ආරක්ෂක පද්ධති, වැටවල් සහ ශබ්ද තරංග පාලනය.",
      elephantTitle: "🐘 අලි-මිනිස් ගැටුම් නිරාකරණ මෙවලම්",
      pestTitle: "🐛 දිස්ත්‍රික් පළිබෝධ සහ රෝග ව්‍යාප්තිය",
      bioTitle: "🧬 ගොවිපල ජෛව ආරක්ෂණ ප්‍රොටෝකෝලය",
      statusActive: "ක්‍රියාකාරී",
      statusTriggered: "අලි ඇතුළු වීමක් හඳුනාගෙන ඇත!",
      statusOffline: "නොබැඳි (Offline)",
      battery: "බැටරිය",
      simulateIntrusion: "වන අලි ඇතුළුවීමක් අනුකරණය කරන්න",
      resetSystem: "ආරක්ෂණ පද්ධතිය යළි පිහිටුවන්න",
      soundActive: "ධ්වනි විකර්ෂණ ශබ්දය ක්‍රියාත්මකයි:",
      soundBee: "🐝 මී මැසි රංචු කෘතිම ධ්වනි තරංගය (Honeybee Acoustic)",
      soundHorn: "📯 අධි-සංඛ්‍යාත කෝච්චි හෝන් ශබ්දය (High-Decibel Horn)",
      soundChilli: "🌶️ මිරිස් දුම් තාප විසුරුම ක්‍රියාත්මකයි",
      soundDisabled: "නිහඬයි / සූදානම් මට්ටම",
      borderTitle: "ක්‍රියාකාරී බෝග සීමා සංවේදක",
      addSensor: "නව සංවේදකයක් එක් කරන්න",
      sensorName: "සංවේදකයේ නම",
      sensorType: "සංවේදක වර්ගය",
      sensorLoc: "ස්ථානය / කුඹුර",
      dangerZone: "අලි ගැටුම් අවදානම් කලාපීය නිවේදනය",
      dangerZoneDesc: "අනුරාධපුර සහ පොළොන්නරුව ප්‍රදේශවල වනාන්තර සීමා ආසන්නයේ වන අලි සංක්‍රමණය වීම් වාර්තා වී ඇත. සූර්ය බලශක්ති ලාම්පු ක්‍රියාත්මකව තබන්න.",
      pestStatus: "බෝග වසංගත අනතුරු ඇඟවීම්",
      pestArmyworm: "🍂 සේනා දළඹු වසංගතය (Sena Caterpillar)",
      pestArmywormDesc: "කුරුණෑගල දිස්ත්‍රික්කයේ ව්‍යාප්තියක් පවතී. වහාම දේශීය කොහොඹ නිස්සාරණය සහ බෝග බාධක පවත්වා ගන්න.",
      pestRiceBlast: "🌾 වී කුඩු රෝගය (Rice Blast)",
      pestRiceBlastDesc: "මාතලේ ප්‍රදේශයේ අතරමැදි සුළං සමඟ ශීඝ්‍රයෙන් පැතිරේ. අධික ලෙස කෘතිම නයිට්‍රජන් පොහොර යෙදීමෙන් වළකින්න.",
      pestThrips: "🌶️ මිරිස් කොළ කොඩවීම (Thrips)",
      pestThripsDesc: "යාපනය ප්‍රදේශයේ වියළි සුළං හේතුවෙන් කොඩවීම් වාර්තා වේ. උදෑසන කාලයේදී දුම්කොළ සබන් මිශ්‍රණය ඉසින්න.",
    },
    ta: {
      title: "பயிர் பாதுகாப்பு மற்றும் யானை மேலாண்மை மையம்",
      subtitle: "காட்டு யானைகள் மற்றும் தாவர நோய்க்கிருமிகளிடமிருந்து பயிர்களைப் பாதுகாக்க மெய்நிகர் கம்பி எச்சரிக்கைகள் மற்றும் உயிரியல் வேலி அமைப்புகள்.",
      elephantTitle: "🐘 மனித-யானை மோதல் தடுப்பு முறைகள்",
      pestTitle: "🐛 மாவட்ட பூச்சி மற்றும் நோய் பரவல்",
      bioTitle: "🧬 பண்ணை பயிர் பாதுகாப்பு நெறிமுறை",
      statusActive: "செயலில் உள்ளது",
      statusTriggered: "யானை ஊடுருவல் கண்டறியப்பட்டது!",
      statusOffline: "செயலிழந்துள்ளது",
      battery: "மின்கலம்",
      simulateIntrusion: "யானை ஊடுருவலை உருவகப்படுத்து",
      resetSystem: "பாதுகாப்பு அமைப்பை மீட்டமை",
      soundActive: "ஒலி தடுப்பு முறை செயலில் உள்ளது:",
      soundBee: "🐝 தேனீ கூட்டம் ஒலி அலைபெருக்கி",
      soundHorn: "📯 அதி-ஒலி காற்று ஹார்ன் எச்சரிக்கை",
      soundChilli: "🌶️ மிளகாய் புகை உமிழ்ப்பான் செயலில் உள்ளது",
      soundDisabled: "செயலிழந்துள்ளது / காத்திருப்பு",
      borderTitle: "செயலில் உள்ள பயிர் எல்லை சென்சார்கள்",
      addSensor: "புதிய சென்சாரைச் சேர்க்க",
      sensorName: "சென்சார் பெயர்",
      sensorType: "சென்சார் வகை",
      sensorLoc: "இடம் / வயல்",
      dangerZone: "யானை மோதல் எச்சரிக்கை வலயங்கள்",
      dangerZoneDesc: "அனுராதபுரம் மற்றும் பொலன்னறுவை காட்டுப் பகுதிகளில் யானைகளின் நடமாட்டம் அதிகரித்துள்ளது. சோலார் விளக்குகளை எரிய விடுங்கள்.",
      pestStatus: "பயிர் தொற்றுநோய் எச்சரிக்கைகள்",
      pestArmyworm: "🍂 படைப்புழு தொற்று (Sena Caterpillar)",
      pestArmywormDesc: "குருநாகல் மாவட்டத்தில் வேகமாகப் பரவுகிறது. வேப்ப எண்ணெய் கரைசல் மற்றும் தடுப்பு களைகளை உடனே மேற்கொள்ளவும்.",
      pestRiceBlast: "🌾 நெல் குலை நோய் (Rice Blast)",
      pestRiceBlastDesc: "மாத்தளையில் ஈரப்பதக் காற்று காரணமாகப் பரவுகிறது. அதிகப்படியான செயற்கை நைட்ரஜன் உரங்களைத் தவிர்க்கவும்.",
      pestThrips: "🌶️ பச்சை மிளகாய் இலைப்பேன்",
      pestThripsDesc: "யாழ்ப்பாணத்தில் வறண்ட காற்று காரணமாக இலைப்பேன் தாக்கம் அதிகரித்துள்ளது. புகையிலை சோப்புக் கரைசலை அதிகாலையில் தெளிக்கவும்.",
    }
  };

  const t = tSec[language] || tSec.en;

  const handleSimulate = () => {
    // Pick s-2 (Elephant Path Sensor) and set it to triggered
    setSensors(prev => prev.map(s => s.id === 's-2' ? { ...s, status: 'Triggered' } : s));
    setSimulatedAlert("⚠️ [ALERT] Seismic Border Sensor 's-2' registered high ground frequencies (approx. 4.2 tons dynamic pressure). Forestry corridors notified.");
    setIsAlarmActive(true);
    setSoundMode('bee'); // Bees deter elephants best!
  };

  const handleReset = () => {
    setSensors(prev => prev.map(s => s.status === 'Triggered' ? { ...s, status: 'Active' } : s));
    setSimulatedAlert(null);
    setIsAlarmActive(false);
    setSoundMode('disabled');
  };

  const handleAddSensor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSensorName || !newSensorLoc) return;
    const newS: PerimeterSensor = {
      id: `s-${Date.now()}`,
      name: newSensorName,
      location: newSensorLoc,
      type: newSensorType,
      status: 'Active',
      battery: 100
    };
    setSensors([...sensors, newS]);
    setNewSensorName('');
    setNewSensorLoc('');
  };

  const handleDeleteSensor = (id: string) => {
    setSensors(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6" id="plant-security-section">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500/10 via-amber-500/5 to-transparent p-6 rounded-3xl border border-red-500/20 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-sans font-black text-gray-900 flex items-center gap-2">
              <ShieldAlert className="h-7 w-7 text-red-600 animate-pulse" />
              <span>{t.title}</span>
            </h3>
            <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>
          <div className="flex space-x-2">
            {!isAlarmActive ? (
              <button
                onClick={handleSimulate}
                className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-transform hover:scale-[1.02] flex items-center space-x-1.5 cursor-pointer"
              >
                <span>🐘</span>
                <span>{t.simulateIntrusion}</span>
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-transform hover:scale-[1.02] flex items-center space-x-1.5 cursor-pointer animate-bounce"
              >
                <span>✅</span>
                <span>{t.resetSystem}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Alarm Banner */}
        {isAlarmActive && (
          <div className="mt-4 bg-red-600 text-white p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-2 border-red-400 animate-pulse">
            <div className="flex items-start space-x-3">
              <BellRing className="h-6 w-6 shrink-0 text-white animate-bounce mt-1" />
              <div>
                <h4 className="text-sm font-black font-sans uppercase tracking-wider">⚠️ EMERGENCY ELEPHANT INTRUSION WARNING</h4>
                <p className="text-xs text-red-100 font-semibold mt-0.5 leading-relaxed">{simulatedAlert}</p>
              </div>
            </div>
            <div className="bg-red-950/40 border border-red-400 px-3.5 py-1.5 rounded-xl text-center shrink-0">
              <span className="block text-[9px] font-bold text-red-200 uppercase tracking-widest">{t.soundActive}</span>
              <span className="text-[11px] font-black">{soundMode === 'bee' ? t.soundBee : soundMode === 'horn' ? t.soundHorn : t.soundChilli}</span>
            </div>
          </div>
        )}
      </div>

      {/* Sub tabs selector */}
      <div className="flex bg-gray-100/70 p-1 rounded-2xl border border-gray-200/50 max-w-lg shadow-inner">
        <button
          onClick={() => setActiveTab('elephant')}
          className={`flex-1 py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'elephant'
              ? 'bg-white text-red-600 shadow-sm border border-gray-200/30'
              : 'text-gray-600 hover:text-gray-950'
          }`}
        >
          <span>🐘</span>
          <span>{t.elephantTitle.split(' ')[1]}</span>
        </button>
        <button
          onClick={() => setActiveTab('pests')}
          className={`flex-1 py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'pests'
              ? 'bg-white text-amber-600 shadow-sm border border-gray-200/30'
              : 'text-gray-600 hover:text-gray-950'
          }`}
        >
          <span>🐛</span>
          <span>{t.pestTitle.split(' ')[1]}</span>
        </button>
        <button
          onClick={() => setActiveTab('biosecurity')}
          className={`flex-1 py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'biosecurity'
              ? 'bg-white text-emerald-600 shadow-sm border border-gray-200/30'
              : 'text-gray-600 hover:text-gray-950'
          }`}
        >
          <span>🧬</span>
          <span>{t.bioTitle.split(' ')[1]}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {activeTab === 'elephant' && (
          <>
            {/* Sensor Network List (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <Radio className="h-5 w-5 text-red-600" />
                    <h4 className="text-sm font-black text-gray-950">{t.borderTitle} ({sensors.length})</h4>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sensors.map((s) => (
                    <div 
                      key={s.id} 
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        s.status === 'Triggered' 
                          ? 'bg-red-50 border-red-300 ring-2 ring-red-500' 
                          : s.status === 'Offline' 
                          ? 'bg-gray-50 border-gray-200' 
                          : 'bg-slate-50/50 hover:bg-slate-50 border-slate-100/80'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-black text-gray-950">{s.name}</p>
                          <p className="text-[10px] text-gray-500 font-semibold">{s.location}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteSensor(s.id)}
                          className="text-gray-400 hover:text-red-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                          s.status === 'Triggered' 
                            ? 'bg-red-600 text-white animate-pulse' 
                            : s.status === 'Offline' 
                            ? 'bg-gray-200 text-gray-500' 
                            : 'bg-emerald-100 text-[#2E7D32]'
                        }`}>
                          {s.status === 'Triggered' ? t.statusTriggered : s.status === 'Offline' ? t.statusOffline : t.statusActive}
                        </span>
                        
                        <div className="flex items-center space-x-1.5 text-[10px] font-bold text-gray-500">
                          <span className={`h-1.5 w-3 rounded-full ${s.battery > 30 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                          <span>{t.battery}: {s.battery}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add new sensor form */}
                <form onSubmit={handleAddSensor} className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{t.sensorName}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. West Gate Ray"
                      value={newSensorName}
                      onChange={e => setNewSensorName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{t.sensorType}</label>
                    <select 
                      value={newSensorType}
                      onChange={e => setNewSensorType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    >
                      <option value="Infrared">Laser/Infrared Beam</option>
                      <option value="Seismic">Seismic Vibration Pin</option>
                      <option value="ChilliFence">Bio-Chilli Buffer Fence</option>
                      <option value="Acoustic">Acoustic Sound Horn</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">{t.sensorLoc}</label>
                    <div className="flex space-x-1.5">
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Canal Fence"
                        value={newSensorLoc}
                        onChange={e => setNewSensorLoc(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                      />
                      <button 
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-3.5 rounded-xl shadow-md cursor-pointer shrink-0"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-3xl border border-amber-200/60 shadow-md space-y-3.5">
                <div className="flex items-center space-x-2 text-amber-800">
                  <AlertTriangle className="h-5 w-5 animate-bounce" />
                  <h4 className="text-sm font-black uppercase tracking-wide">{t.dangerZone}</h4>
                </div>
                <p className="text-xs text-amber-950 font-medium leading-relaxed">
                  {t.dangerZoneDesc}
                </p>
                <div className="pt-2 border-t border-amber-200 flex flex-col gap-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-900">
                    <span>💡 Recommended action:</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-amber-800 space-y-1 pl-1">
                    <li>Maintain Chilli-Smoke smoke pots along wild corridors</li>
                    <li>Synchronize flash-light setups at 18:00 daily</li>
                    <li>Submit intrusion records using the Farmer Network</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-md space-y-3.5">
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-500" /> Bio-Fence Active Mitigations
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50/50 rounded-2xl border border-red-100 flex items-start space-x-2.5">
                    <span className="text-lg">🌶️</span>
                    <div>
                      <h5 className="text-xs font-bold text-gray-950">Chilli-Infused Rope Fence</h5>
                      <p className="text-[10px] text-gray-500 leading-normal mt-0.5">
                        Grease ropes with engine oil and crushed dried chilli seeds. Elephants have sensitive trunks and avoid this natural barrier entirely.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/40 rounded-2xl border border-emerald-100 flex items-start space-x-2.5">
                    <span className="text-lg">🐝</span>
                    <div>
                      <h5 className="text-xs font-bold text-gray-950">Beehive Hanging Fences</h5>
                      <p className="text-[10px] text-gray-500 leading-normal mt-0.5">
                        Interlink wooden beehives using wire trip cords. Disturbing the wire excites the bees; elephants fear bee stings on sensitive skin and retract safely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'pests' && (
          <div className="lg:col-span-12 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-4">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 animate-pulse" />
                <h4 className="text-sm font-black text-gray-900">{t.pestStatus}</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-orange-50/40 rounded-2xl border border-orange-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-orange-950 flex items-center gap-1">
                      <Flame className="h-4 w-4 text-red-500" /> {t.pestArmyworm}
                    </span>
                    <span className="bg-red-600 text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded">HIGH ALERT</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-normal">{t.pestArmywormDesc}</p>
                  <p className="text-[10px] text-orange-800 font-bold">Recommended action: Bio-pesticides NSKE 5% + companion bund weeds</p>
                </div>

                <div className="p-4 bg-amber-50/30 rounded-2xl border border-amber-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-amber-950 flex items-center gap-1">
                      🌾 {t.pestRiceBlast}
                    </span>
                    <span className="bg-amber-600 text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded">MEDIUM RISK</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-normal">{t.pestRiceBlastDesc}</p>
                  <p className="text-[10px] text-amber-800 font-bold">Recommended action: Balance synthetic nitrogen with gliricidia compost</p>
                </div>

                <div className="p-4 bg-red-50/20 rounded-2xl border border-red-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-red-950 flex items-center gap-1">
                      🌶️ {t.pestThrips}
                    </span>
                    <span className="bg-red-500 text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded">HIGH ALERT</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-normal">{t.pestThripsDesc}</p>
                  <p className="text-[10px] text-red-800 font-bold">Recommended action: Tobacco liquid wash early morning</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'biosecurity' && (
          <div className="lg:col-span-12 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <h4 className="text-sm font-black text-gray-950">Pre-Planting Disease Prevention</h4>
                </div>
                <ul className="space-y-3.5 text-xs text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span><strong>Seed Quarantine:</strong> Submerge local seeds in saltwater (10% brine) prior to germination to identify and discard empty disease-carrying hulls.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span><strong>Crop Rotation Intervals:</strong> Never replant Solanaceae crops (Chilli, Brinjal, Tomato) in the same field consecutively. Rotate with Legumes (green-gram) to break root pathogen cycles.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span><strong>Soil Sun Solarization:</strong> Cover ridges with clear plastic sheets for 4 weeks during peak dry seasons to heat-kill dormant root-knot nematodes naturally.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <h4 className="text-sm font-black text-gray-950">Organic Bio-pesticide Synthesis</h4>
                </div>
                
                <div className="bg-amber-50/50 p-4.5 rounded-2xl border border-amber-100 text-xs text-amber-950 space-y-3">
                  <h5 className="font-bold">DIY Neem Seed Kernel Extract (NSKE 5%)</h5>
                  <p className="leading-relaxed text-[11px] text-amber-900">
                    Shatter 50g neem seeds, wrap in fine cloth and suspend in 1 Liter water overnight. Squeeze the bundle next morning to filter out the active azadirachtin emulsion. Mix with 1ml natural soap liquid to enable leaf adhesion. Spray on leaves immediately to prevent Thrips, leaf folders, and aphids.
                  </p>
                  <p className="text-[10px] text-amber-800 font-bold italic">
                    Approved by Sri Lanka Organic Agriculture Standard Council.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
