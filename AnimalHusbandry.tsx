import React, { useState } from 'react';
import { ShieldCheck, Plus, Trash2, Calendar, Clipboard, Calculator, Sparkles, TrendingUp, Info } from 'lucide-react';

interface AnimalRecord {
  id: string;
  tagNo: string;
  breed: string;
  ageMonths: number;
  status: 'Healthy' | 'Under Treatment' | 'Dry';
  avgDailyYield: number; // Liters or Eggs
}

export default function AnimalHusbandry({ language = 'en' }: { language?: 'en' | 'si' | 'ta' }) {
  const [animalType, setAnimalType] = useState<'dairy' | 'poultry' | 'goats'>('dairy');
  
  const tAnimal = {
    en: {
      title: "Sri Lankan Animal Husbandry & Livestock Unit",
      subtitle: "Manage daily feed rates, veterinary vaccinations, and milk/egg yield calculators optimized for Sri Lankan dairy and backyard flocks.",
      dairy: "Dairy Cattle",
      poultry: "Poultry",
      goats: "Goats",
      tagNo: "Tag/ID Code",
      breed: "Breed Lineage",
      age: "Age (Months)",
      dailyYield: "Daily Yield",
      addAnimal: "Register Animal",
      activeHerd: "Active Dairy Herd Log",
      status: "Status",
      average: "Average Daily Yield",
      healthy: "Healthy",
      treatment: "Under Treatment",
      dry: "Dry",
      profitCalculator: "National Livestock Feed & Milk Profit Calculator",
      calculatorDesc: "Evaluate commercial concentrate pellet feeding costs against MILCO/local cooperative purchase rates.",
      cowCountLabel: "Active Milking Herd Size (Cows)",
      feedRatioLabel: "Concentrate Feed per Animal (kg/day)",
      calculateBtn: "Run Yield Projection",
      projectedYield: "Projected Daily Yield",
      totalFeedCost: "Total Feed Cost",
      netProfit: "Estimated Net Profit (Daily)",
      purchaseRateNotice: "Calculated at Rs. 185 MILCO purchase rate",
      verifiedLivestock: "Verified by Livestock Development Board, Sri Lanka",
      totalHerd: "Total herd"
    },
    si: {
      title: "ශ්‍රී ලංකා සත්ව පාලන සහ පශු සම්පත් ඒකකය",
      subtitle: "දිනපතා ආහාර අනුපාත, පශු වෛද්‍ය එන්නත් සහ කිරි/බිත්තර අස්වැන්න ගණනය කිරීම් මෙතැනින් කළමනාකරණය කරන්න.",
      dairy: "කිරි ගව ඒකකය",
      poultry: "ගෘහස්ත කුකුළු පාලනය",
      goats: "ජම්නපාරි එළු පාලනය",
      tagNo: "ටැග් / හැඳුනුම්පත් අංකය",
      breed: "ප්‍රභේදය",
      age: "වයස (මාස)",
      dailyYield: "දෛනික අස්වැන්න (ලීටර්)",
      addAnimal: "සතා ලියාපදිංචි කරන්න",
      activeHerd: "ක්‍රියාකාරී කිරි ගව ලොගය",
      status: "තත්ත්වය",
      average: "දෛනික සාමාන්‍ය අස්වැන්න",
      healthy: "නිරෝගී",
      treatment: "ප්‍රතිකාර ලබන",
      dry: "කිරි නොදෙන",
      profitCalculator: "ජාතික පශු ආහාර සහ කිරි ලාභ ගණකය",
      calculatorDesc: "මිල්කෝ හෝ දේශීය සමුපකාර මිලදී ගැනීමේ මිලට සාපේක්ෂව පශු ආහාර වියදම් සහ ලාභය ගණනය කරන්න.",
      cowCountLabel: "ක්‍රියාකාරී කිරි දෙන ගවයින් සංඛ්‍යාව",
      feedRatioLabel: "සතෙකුට දිනකට දෙන පශු ආහාර (කි.ග්‍රෑ)",
      calculateBtn: "අස්වනු ප්‍රක්ෂේපණය ධාවනය කරන්න",
      projectedYield: "දෛනික අපේක්ෂිත අස්වැන්න",
      totalFeedCost: "මුළු ආහාර වියදම",
      netProfit: "දෛනික ශුද්ධ ලාභය (අපේක්ෂිත)",
      purchaseRateNotice: "මිල්කෝ (MILCO) රු. 185 මිලදී ගැනීමේ අනුපාතය මත පදනම්ව",
      verifiedLivestock: "ශ්‍රී ලංකා පශු සම්පත් සංවර්ධන මණ්ඩලය මගින් සහතික කර ඇත",
      totalHerd: "මුළු ගවයින් සංඛ්‍යාව"
    },
    ta: {
      title: "இலங்கை கால்நடை வளர்ப்பு மற்றும் பால்பண்ணை பிரிவு",
      subtitle: "தினசரி தீவன விகிதங்கள், கால்நடை தடுப்பூசிகள் மற்றும் பால்/முட்டை மகசூல் கால்குலேட்டர்களை நிர்வகியுங்கள்.",
      dairy: "பால் பண்ணை பிரிவு",
      poultry: "வீட்டு கோழி வளர்ப்பு",
      goats: "ஜம்னாபாரி ஆடுகள்",
      tagNo: "குறிச்சொல் / அடையாள குறியீடு",
      breed: "இனம்",
      age: "வயது (மாதங்கள்)",
      dailyYield: "தினசரி மகசூல்",
      addAnimal: "கால்நடையை பதிவு செய்க",
      activeHerd: "செயலில் உள்ள பால் பண்ணை பதிவேடு",
      status: "நிலை",
      average: "சராசரி தினசரி மகசூல்",
      healthy: "ஆரோக்கியமானது",
      treatment: "சிகிச்சையில் உள்ளது",
      dry: "பால் வற்றியது",
      profitCalculator: "தேசிய கால்நடை தீவனம் மற்றும் பால் லாப கால்குலேட்டர்",
      calculatorDesc: "மில்கோ/உள்ளூர் கூட்டுறவு கொள்முதல் விகிதங்களுக்கு எதிராக வணிக தீவன செலவுகளை மதிப்பீடு செய்யுங்கள்.",
      cowCountLabel: "செயலில் உள்ள கறவை மாடுகளின் எண்ணிக்கை",
      feedRatioLabel: "ஒரு விலங்குக்கான தீவனம் (கிலோ/நாள்)",
      calculateBtn: "மகசூல் திட்டத்தை இயக்குக",
      projectedYield: "திட்டமிடப்பட்ட தினசரி மகசூல்",
      totalFeedCost: "மொத்த தீவன செலவு",
      netProfit: "மதிப்பிடப்பட்ட நிகர லாபம் (தினசரி)",
      purchaseRateNotice: "ரூ. 185 மில்கோ கொள்முதல் விகிதத்தில் கணக்கிடப்பட்டது",
      verifiedLivestock: "இலங்கை கால்நடை அபிவிருத்தி சபையினால் சரிபார்க்கப்பட்டது",
      totalHerd: "மொத்த கால்நடை"
    }
  }[language];

  const [herd, setHerd] = useState<AnimalRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sarunena_herd');
      return saved ? JSON.parse(saved) : [
        { id: 'cow-1', tagNo: 'COW-LK-0891', breed: 'Jersey Cross', ageMonths: 32, status: 'Healthy', avgDailyYield: 18 },
        { id: 'cow-2', tagNo: 'COW-LK-0422', breed: 'Friesian Pure', ageMonths: 40, status: 'Healthy', avgDailyYield: 24 },
        { id: 'cow-3', tagNo: 'COW-LK-0310', breed: 'Sahiwal Red', ageMonths: 28, status: 'Under Treatment', avgDailyYield: 12 },
      ];
    } catch {
      return [];
    }
  });

  const [newTag, setNewTag] = useState('');
  const [newBreed, setNewBreed] = useState('Jersey Cross');
  const [newAge, setNewAge] = useState('30');
  const [newYield, setNewYield] = useState('15');

  // Calculator states
  const [cowCount, setCowCount] = useState('5');
  const [feedRatio, setFeedRatio] = useState('3.5'); // kg concentrate per cow
  const [showCalculatorResults, setShowCalculatorResults] = useState(false);
  const [calcResults, setCalcResults] = useState<{ expectedMilk: number; totalCost: number; netProfit: number } | null>(null);

  const handleAddAnimal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    const sanitizedTag = newTag.trim().replace(/[<>"'&]/g, '').toUpperCase();
    const sanitizedBreed = newBreed.replace(/[<>"'&]/g, '');

    const newAnimal: AnimalRecord = {
      id: `animal-${Date.now()}`,
      tagNo: sanitizedTag,
      breed: sanitizedBreed,
      ageMonths: parseInt(newAge) || 24,
      status: 'Healthy',
      avgDailyYield: parseFloat(newYield) || 12
    };

    const updated = [newAnimal, ...herd];
    setHerd(updated);
    try {
      localStorage.setItem('sarunena_herd', JSON.stringify(updated));
    } catch (e) {
      // Silent localStorage failure
    }
    setNewTag('');
  };

  const handleDeleteAnimal = (id: string) => {
    const updated = herd.filter(a => a.id !== id);
    setHerd(updated);
    try {
      localStorage.setItem('sarunena_herd', JSON.stringify(updated));
    } catch (e) {
      // Silent localStorage failure
    }
  };

  const handleCalculateYield = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(cowCount) || 1;
    const feed = parseFloat(feedRatio) || 2.0;

    // Sri Lankan Dairy metrics
    // Standard milk per cow: 12 - 25 Liters
    // Feed impact: Concentrates raise yield by roughly 1.5 Liters per kg of high-quality feed
    const baseMilkPerCow = 10;
    const feedBonus = feed * 1.8;
    const expectedMilk = count * (baseMilkPerCow + feedBonus);

    // Costs (Concentrate price ~ Rs. 140 per kg in Sri Lanka)
    const costPerKgFeed = 145;
    const totalCost = count * feed * costPerKgFeed;

    // Selling Revenue (Standard MILCO / Nestle farm-gate buying price ~ Rs. 190 per liter)
    const pricePerLiter = 185;
    const revenue = expectedMilk * pricePerLiter;
    const netProfit = revenue - totalCost;

    setCalcResults({
      expectedMilk: parseFloat(expectedMilk.toFixed(1)),
      totalCost: Math.round(totalCost),
      netProfit: Math.round(netProfit)
    });
    setShowCalculatorResults(true);
  };

  return (
    <div className="space-y-6" id="animal-husbandry-section">
      
      {/* Header */}
      <div>
        <h3 className="text-2xl font-sans font-black text-gray-900 flex items-center gap-2">
          <span>{tAnimal.title}</span>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
            Livestock Hub
          </span>
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {tAnimal.subtitle}
        </p>
      </div>

      <div className="flex bg-gray-100/75 p-1 rounded-2xl border border-gray-200/50 max-w-sm">
        <button
          onClick={() => setAnimalType('dairy')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            animalType === 'dairy' ? 'bg-white text-[#2E7D32] shadow-sm border border-gray-200/30' : 'text-gray-600 hover:text-gray-950'
          }`}
        >
          <span>{tAnimal.dairy}</span>
        </button>
        <button
          onClick={() => setAnimalType('poultry')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            animalType === 'poultry' ? 'bg-white text-[#2E7D32] shadow-sm border border-gray-200/30' : 'text-gray-600 hover:text-gray-950'
          }`}
        >
          <span>{tAnimal.poultry}</span>
        </button>
        <button
          onClick={() => setAnimalType('goats')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            animalType === 'goats' ? 'bg-white text-[#2E7D32] shadow-sm border border-gray-200/30' : 'text-gray-600 hover:text-gray-950'
          }`}
        >
          <span>{tAnimal.goats}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-7 space-y-6">
          
          {animalType === 'dairy' && (
            <>
              <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md space-y-4">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                    <Clipboard className="h-4.5 w-4.5 text-[#2E7D32]" />
                    <span>{tAnimal.activeHerd}</span>
                  </h4>
                  <span className="text-[10px] bg-emerald-50 text-[#2E7D32] px-2 py-0.5 rounded font-black font-mono">
                    {tAnimal.totalHerd}: {herd.length}
                  </span>
                </div>

                <form onSubmit={handleAddAnimal} className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={tAnimal.tagNo}
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                    />
                  </div>
                  <div>
                    <select
                      value={newBreed}
                      onChange={(e) => setNewBreed(e.target.value)}
                      className="w-full px-2 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 cursor-pointer"
                    >
                      <option value="Jersey Cross">Jersey Cross</option>
                      <option value="Friesian Pure">Friesian Pure</option>
                      <option value="Sahiwal Red">Sahiwal Red</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      required
                      placeholder={language === 'si' ? 'අස්වැන්න (ලීටර්)' : language === 'ta' ? 'மகசூல் (லி)' : 'Yield (L/day)'}
                      value={newYield}
                      onChange={(e) => setNewYield(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-0.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>{tAnimal.addAnimal}</span>
                    </button>
                  </div>
                </form>

                <div className="space-y-2">
                  {herd.map((animal) => (
                    <div key={animal.id} className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 shadow-sm transition-all text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">🐄</span>
                        <div>
                          <strong className="text-gray-900 font-bold font-mono">{animal.tagNo}</strong>
                          <p className="text-[10px] text-gray-500">{animal.breed} • {animal.ageMonths}m old</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          animal.status === 'Healthy' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {animal.status === 'Healthy' ? tAnimal.healthy : animal.status === 'Dry' ? tAnimal.dry : tAnimal.treatment}
                        </span>
                        <div className="text-right">
                          <strong className="text-[#2E7D32] font-mono block font-black text-sm">{animal.avgDailyYield} L</strong>
                          <span className="text-[9px] text-gray-400 block">{tAnimal.average}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteAnimal(animal.id)}
                          className="text-gray-300 hover:text-rose-600 transition-colors p-1 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </>
          )}

          {animalType === 'poultry' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-6">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <span className="text-lg">🐓</span>
                <h4 className="text-sm font-bold text-gray-900">Sri Lankan Poultry Management Guide</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 space-y-2">
                  <h5 className="font-bold text-amber-950">1. Layers (Egg Production)</h5>
                  <p className="text-gray-600 leading-relaxed">
                    Popular breeds: Shaver Star Cross, Bovans Brown. Keep humidity below 70% in deep litter sheds. Feed 110-120g of Layer Mash daily. Egg collection frequency should be 3 times per day to prevent breakage.
                  </p>
                </div>

                <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100/60 space-y-2">
                  <h5 className="font-bold text-sky-950">2. Broilers (Meat Production)</h5>
                  <p className="text-gray-600 leading-relaxed">
                    Breeds: Cobb 500, Hubbard. Requires intensive ventilation and continuous clean water. Provide Starter Mash for 1-14 days, followed by Broiler Finisher. Expected weight is 2.2 kg in 38-42 days.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2 text-xs">
                <h5 className="font-bold text-gray-900 flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-[#2E7D32]" />
                  <span>Poultry Vaccination Timetable</span>
                </h5>
                <ul className="space-y-1.5 text-gray-600">
                  <li>• <strong>Day 1:</strong> Mareks Disease injection (at hatchery)</li>
                  <li>• <strong>Day 7:</strong> Newcastle Disease & Infectious Bronchitis (F strain drops)</li>
                  <li>• <strong>Day 14:</strong> Infectious Bursal Disease (Gumboro) oral drops</li>
                  <li>• <strong>Day 21:</strong> Newcastle Booster dose</li>
                </ul>
              </div>
            </div>
          )}

          {animalType === 'goats' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-6">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <span className="text-lg">🐐</span>
                <h4 className="text-sm font-bold text-gray-900">Goat Farming & Breeding Guidelines</h4>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Goat farming is highly suited for Sri Lanka's dry and intermediate zones (Jaffna, Anuradhapura, Puttalam, Kurunegala). Recommended breeds are <strong>Jamunapari Cross</strong> (high dual milk/meat yield) and local <strong>Kottukachchiya</strong> (high drought resistance).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold block">Feed Ratio</span>
                  <span className="text-sm font-black text-gray-900 block mt-1">60% Grass, 40% Leaves</span>
                  <span className="text-[9px] text-gray-400">Gliricidia, Jack leaves</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold block">Water Demand</span>
                  <span className="text-sm font-black text-gray-900 block mt-1">4 - 6 Liters</span>
                  <span className="text-[9px] text-gray-400">Fresh and clean daily</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold block">Shed Layout</span>
                  <span className="text-sm font-black text-gray-900 block mt-1">Raised Slatted Bedding</span>
                  <span className="text-[9px] text-gray-400">1.2m above ground level</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right 5 Columns: Milk Yield and Profit Simulator */}
        <div className="lg:col-span-5">
          <div className="bg-[#FFFDF7] rounded-3xl p-6 border-2 border-dashed border-[#F9A825]/30 shadow-md space-y-5 h-full">
            
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
              <Calculator className="h-5 w-5 text-[#F9A825]" />
              <h4 className="text-sm font-bold text-gray-950">{tAnimal.profitCalculator}</h4>
            </div>

            <form onSubmit={handleCalculateYield} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{tAnimal.cowCountLabel}</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={cowCount}
                  onChange={(e) => setCowCount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{tAnimal.feedRatioLabel}</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  min="0.5"
                  value={feedRatio}
                  onChange={(e) => setFeedRatio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#2E7D32] to-[#43A047] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer hover:scale-[1.01] transition-transform shadow-md"
              >
                <Sparkles className="h-4 w-4" />
                <span>{tAnimal.calculateBtn}</span>
              </button>
            </form>

            {showCalculatorResults && calcResults ? (
              <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm space-y-4 animate-scale-up text-xs">
                
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-sky-50 p-2.5 rounded-xl border border-sky-100">
                    <span className="text-[10px] text-sky-800 font-bold block uppercase">{tAnimal.projectedYield}</span>
                    <strong className="text-lg font-mono font-black text-sky-950 mt-1 block">{calcResults.expectedMilk} Liters</strong>
                  </div>

                  <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                    <span className="text-[10px] text-rose-800 font-bold block uppercase">{tAnimal.totalFeedCost}</span>
                    <strong className="text-lg font-mono font-black text-rose-950 mt-1 block">Rs. {calcResults.totalCost.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-100 text-center">
                  <span className="text-[10px] text-[#2E7D32] font-black uppercase tracking-wider block">{tAnimal.netProfit}</span>
                  <strong className="text-2xl font-mono font-black text-[#2E7D32] block mt-1">Rs. {calcResults.netProfit.toLocaleString()}</strong>
                  <span className="text-[9px] text-[#2E7D32] opacity-80 mt-1 block font-medium">{tAnimal.purchaseRateNotice}</span>
                </div>

                <div className="flex items-center space-x-1 text-[10px] text-gray-400 font-medium justify-center">
                  <TrendingUp className="h-3.5 w-3.5 text-[#2E7D32]" />
                  <span>
                    {language === 'si' ? 'තණකොළ සහ කොළ පැහැති ආහාර වැඩිපුර දීමෙන් ලාභය වැඩි කරගත හැක.' : language === 'ta' ? 'அதிக தீவனம் வழங்குவதன் மூலம் லாபத்தை அதிகரிக்கலாம்.' : 'Returns increase with high silage/forage ratios.'}
                  </span>
                </div>

              </div>
            ) : (
              <div className="text-center p-6 text-gray-400 text-xs flex flex-col items-center justify-center h-48 border border-gray-100 rounded-2xl bg-white">
                <Info className="h-7 w-7 text-gray-300 mb-1" />
                <span>
                  {language === 'si' ? 'දෛනික කිරි ආදායම සහ පශු ආහාර ලාභය ගණනය කිරීමට ඉහත දත්ත ඇතුළත් කරන්න.' : language === 'ta' ? 'தினசரி வருமானம் மற்றும் லாபத்தைக் கணக்கிட தரவை உள்ளிடவும்.' : 'Enter metrics above to simulate daily milk income and feedstock budgets.'}
                </span>
              </div>
            )}

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 text-[10px] text-amber-900 leading-normal flex items-start gap-1.5">
              <span className="text-sm">🐄</span>
              <span>
                <strong>
                  {language === 'si' ? 'එන්නත් කිරීමේ නිවේදනය:' : language === 'ta' ? 'தடுப்பூசி அறிவிப்பு:' : 'Vaccination Notice:'}
                </strong>{' '}
                {language === 'si'
                  ? 'කුර සහ මුඛ රෝග (FMD) සඳහා වන එන්නත් ප්‍රාදේශීය පශු වෛද්‍ය කාර්යාලය මගින් නොමිලයේ ලබාදෙනු ලැබේ. එන්නත් කිරීමෙන් පසු තාවකාලික කිරි අඩුවීමක් සිදුවිය හැක.'
                  : language === 'ta'
                  ? 'கோமாரி நோய் (FMD) தடுப்பூசிகள் உள்ளூர் கால்நடை மருத்துவர் அலுவலகத்தில் இலவசமாகக் கிடைக்கின்றன. தடுப்பூசிக்கு பின் தற்காலிக பால் குறைவை கண்காணிக்கவும்.'
                  : 'Foot & Mouth Disease (FMD) booster vaccines are free at local Veterinary Surgeon (VS) offices. Monitor milk drop immediately after immunizations.'}
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
