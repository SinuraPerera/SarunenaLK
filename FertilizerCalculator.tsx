import React, { useState } from 'react';
import { 
  Beaker, Calculator, Calendar, ShieldCheck, Sprout, 
  Droplets, Grid, Leaf, ChevronRight, Info, AlertTriangle 
} from 'lucide-react';
import { Language } from './types';

interface FertilizerCalculatorProps {
  language: Language;
}

const fcTranslations = {
  en: {
    title: "SarunenaLK Smart Agronomy Calculator",
    subtitle: "Compute precise artificial (chemical), organic (bio), and integrated nutrient plans certified by agronomy experts.",
    fertTab: "Fertilizer Recipe",
    seedTab: "Seeds & Spacing",
    waterTab: "Water & Irrigation",
    cropLabel: "Target Crop Type",
    soilLabel: "Primary Soil Classification",
    acresLabel: "Total Field Size (Acres)",
    modeLabel: "Nutrient Source Mode",
    yieldLabel: "Target Yield Goal",
    computeBtn: "Compute Agronomy Plan",
    resultsTitle: "Agronomic Advice Sheet",
    resultsBadge: "Certified Reference Scale",
    artificialHeader: "Artificial (Chemical) Nutrient Split",
    organicHeader: "Organic (Bio-Manure) Alternatives",
    soilHealthHeader: "Soil Health & pH Guard",
    splitRoadmap: "Split-Dose Application Roadmap",
    certifiedDesc: "Verified independently using Department of Agriculture, Peradeniya standards.",
    noCalcTitle: "No Agronomy Calculation Yet",
    noCalcDesc: "Configure your crop, soil classification, and acreage above to compile standard schedules instantly.",
    ureaLabel: "Urea (Nitrogen - N)",
    tspLabel: "TSP (Phosphate - P)",
    mopLabel: "MOP (Potash - K)",
    secondaryLabel: "Secondary Nutrients",
    compostLabel: "Compost Manure",
    foliarLabel: "Foliar Bio-Liquid",
    targetPh: "Target Soil pH",
    limingLabel: "Soil Buffering / Dolomite",
    seedVarLabel: "Variety / Propagation Mode",
    weatherLabel: "Active Weather Condition",
    irrigationLabel: "Irrigation Method Used",
    seedKgLabel: "Seed Weight Required",
    plantDensityLabel: "Target Plant Density",
    spacingLabel: "Plantation Grid Spacing",
    rowSpacingLabel: "Between Sowing Rows",
    plantSpacingLabel: "Between Individual Plants",
    extensionTips: "Sowing Extension Tips",
    waterVolumeLabel: "Daily Irrigation Volume",
    irrigationCycleLabel: "Active Irrigation Cycle",
    scheduleLabel: "Target Irrigation Schedule",
    waterTipLabel: "Water Management Tip",
    yieldStandard: "Standard / Sustainable Yield",
    yieldHigh: "High-Yield Intensive Crop",
    modeArtificial: "Chemical/Artificial Fertilizers Only",
    modeOrganic: "100% Organic Bio-manures Only",
    modeIntegrated: "Integrated Nutrient System (IPNS) - Recommended",
    paddy: "Paddy Rice (Bg / At series)",
    coconut: "Coconut Palms (Tall/Dwarf)",
    chilli: "Green Chilli (M3 / KA2)",
    cinnamon: "Ceylon Cinnamon (Alba/C5)",
    carrot: "Up-Country Vegetables (Carrot/Onion)"
  },
  si: {
    title: "සරුනැණLK ස්මාර්ට් කෘෂි කැල්කියුලේටරය",
    subtitle: "කෘෂි විද්‍යා විශේෂඥයින් විසින් සහතික කරන ලද කෘතිම (රසායනික), කාබනික (ජෛව) සහ ඒකාබද්ධ පොහොර සැලසුම් ගණනය කරන්න.",
    fertTab: "පොහොර වට්ටෝරුව",
    seedTab: "බීජ සහ පරතරය",
    waterTab: "ජලය සහ වාරිමාර්ග",
    cropLabel: "වගා බෝග වර්ගය",
    soilLabel: "ප්‍රාථමික පස් වර්ගීකරණය",
    acresLabel: "මුළු ඉඩම් ප්‍රමාණය (අක්කර)",
    modeLabel: "පොහොර භාවිත ක්‍රමය",
    yieldLabel: "අපේක්ෂිත අස්වැන්න ප්‍රමාණය",
    computeBtn: "කෘෂි සැලසුම ගණනය කරන්න",
    resultsTitle: "කෘෂි උපදේශන පත්‍රිකාව",
    resultsBadge: "සහතික කළ යොමු පරිමාණය",
    artificialHeader: "රසායනික (කෘතිම) පොහොර අවශ්‍යතාවය",
    organicHeader: "කාබනික පොහොර විකල්පයන්",
    soilHealthHeader: "පසෙහි සෞඛ්‍යය සහ pH අගය පාලනය",
    splitRoadmap: "පොහොර කොටස් වශයෙන් යෙදීමේ කාලසටහන (දින සටහන)",
    certifiedDesc: "පේරාදෙණිය කෘෂිකර්ම දෙපාර්තමේන්තුවේ ප්‍රමිතීන්ට අනුව ස්වාධීනව සත්‍යාපනය කර ඇත.",
    noCalcTitle: "තවමත් ගණනය කිරීම් සිදු කර නැත",
    noCalcDesc: "නිවැරදි දෛනික කාලසටහන් සකස් කර ගැනීමට ඔබේ බෝගය, පස වර්ගය සහ අක්කර ප්‍රමාණය ඉහතින් තෝරන්න.",
    ureaLabel: "යූරියා (නයිට්‍රජන් - N)",
    tspLabel: "ටී.එස්.පී. (පොස්පේට් - P)",
    mopLabel: "එම්.ඕ.පී. (පොටෑෂ් - K)",
    secondaryLabel: "ද්විතීක පෝෂක කොටස්",
    compostLabel: "කාබනික කොම්පෝස්ට්",
    foliarLabel: "දියර ජීව පොහොර",
    targetPh: "පසෙහි ඉලක්කගත pH අගය",
    limingLabel: "ඩොලමයිට් / හුණු අවශ්‍යතාවය",
    seedVarLabel: "බීජ වර්ගය / ප්‍රචාරණ ක්‍රමය",
    weatherLabel: "පවතින කාලගුණ තත්ත්වය",
    irrigationLabel: "භාවිතා කරන වාරි ක්‍රමය",
    seedKgLabel: "අවශ්‍ය බීජ ප්‍රමාණය",
    plantDensityLabel: "ඉලක්කගත පැල ගහනය",
    spacingLabel: "පැල සිටුවීමේ පරතරය",
    rowSpacingLabel: "පේළි අතර පරතරය",
    plantSpacingLabel: "පැල අතර පරතරය",
    extensionTips: "බීජ හා පැල සිටුවීමේ උපදෙස්",
    waterVolumeLabel: "දෛනික ජල අවශ්‍යතාවය",
    irrigationCycleLabel: "සක්‍රීය වාරි කාලය",
    scheduleLabel: "වාරිමාර්ග කාලසටහන",
    waterTipLabel: "ජල කළමනාකරණ උපදෙස",
    yieldStandard: "සාමාන්‍ය / තිරසාර අස්වැන්න",
    yieldHigh: "වැඩි අස්වනු කෘෂිකර්මාන්තය",
    modeArtificial: "කෘතිම/රසායනික පොහොර පමණි",
    modeOrganic: "100% කාබනික පොහොර පමණි",
    modeIntegrated: "ඒකාබද්ධ පොහොර ක්‍රමය (IPNS) - නිර්දේශිතයි",
    paddy: "වී වගාව (Bg / At කාණ්ඩ)",
    coconut: "පොල් වගාව (උස/මිටි ප්‍රභේද)",
    chilli: "අමුමිරිස් වගාව (M3 / KA2)",
    cinnamon: "කුරුඳු වගාව (Alba/C5)",
    carrot: "කන්දරට එළවළු (කැරට්/ළූණු)"
  },
  ta: {
    title: "சருனேனLK ஸ்மார்ட் விவசாய கால்குலேட்டர",
    subtitle: "துல்லியமான செயற்கை (இரசாயன), இயற்கை மற்றும் ஒருங்கிணைந்த உர திட்டங்களை விவசாய வல்லுநர்களின் வழிகாட்டுதலுடன் கணக்கிடுங்கள்.",
    fertTab: "உர செய்முறை",
    seedTab: "விதை & இடைவெளி",
    waterTab: "நீர் & நீர்ப்பாசனம்",
    cropLabel: "பயிர் வகை",
    soilLabel: "மண் வகைப்பாடு",
    acresLabel: "மொத்த நிலப்பரப்பு (ஏக்கர்)",
    modeLabel: "உர முறைமை",
    yieldLabel: "எதிர்பார்க்கும் மகசூல்",
    computeBtn: "கணக்கீடு செய்க",
    resultsTitle: "விவசாய ஆலோசனை தாள்",
    resultsBadge: "சான்றளிக்கப்பட்ட குறிப்பு அளவு",
    artificialHeader: "செயற்கை (இரசாயன) உரப்பிரிப்பு",
    organicHeader: "இயற்கை உர மாற்று முறைகள்",
    soilHealthHeader: "மண் ஆரோக்கியம் & pH பாதுகாப்பு",
    splitRoadmap: "உரமிடுதல் கால அட்டவணை",
    certifiedDesc: "இலங்கை விவசாய திணைக்களத்தின் (பேராதனை) தரநிலைகளின்படி சுயாதீனமாக சரிபார்க்கப்பட்டது.",
    noCalcTitle: "கணக்கீடு எதுவும் செய்யப்படவில்லை",
    noCalcDesc: "துல்லியமான தினசரி அட்டவணைகளைப் பெற உங்கள் பயிர், மண் வகை மற்றும் ஏக்கர் அளவை மேலே தேர்ந்தெடுக்கவும்.",
    ureaLabel: "யூரியா (நைதரசன் - N)",
    tspLabel: "டி.எஸ்.பி (பொஸ்பேற்று - P)",
    mopLabel: "எம்.ஓ.பி (பொட்டாசியம் - K)",
    secondaryLabel: "துணை ஊட்டச்சத்துக்கள்",
    compostLabel: "சேதன உரம் (மக்கிய உரம்)",
    foliarLabel: "உயிர் திரவ உரம்",
    targetPh: "இலக்கு மண் pH",
    limingLabel: "டோலமைட் / சுண்ணாம்பு தேவை",
    seedVarLabel: "விதை வகை / பரப்பு முறை",
    weatherLabel: "தற்போதைய வானிலை",
    irrigationLabel: "நீர்ப்பாசன முறை",
    seedKgLabel: "தேவைப்படும் விதைகள்",
    plantDensityLabel: "இலக்கு தாவர அடர்த்தி",
    spacingLabel: "நடவு இடைவெளி",
    rowSpacingLabel: "வரிசைகளுக்கு இடைவெளி",
    plantSpacingLabel: "தாவரங்களுக்கு இடைவெளி",
    extensionTips: "விதைப்பு மற்றும் நடவு ஆலோசனைகள்",
    waterVolumeLabel: "தினசரி நீர் தேவை",
    irrigationCycleLabel: "நீர்ப்பாசன சுழற்சி நேரம்",
    scheduleLabel: "நீர்ப்பாசன அட்டவணை",
    waterTipLabel: "நீர் மேலாண்மை ஆலோசனை",
    yieldStandard: "சாதாரண / நிலையான மகசூல்",
    yieldHigh: "அதிக மகசூல் தரும் பயிர்வகை",
    modeArtificial: "செயற்கை/இரசாயன உரங்கள் மட்டும்",
    modeOrganic: "100% சேதன உரங்கள் மட்டும்",
    modeIntegrated: "ஒருங்கிணைந்த ஊட்டச்சத்து முறை (IPNS) - பரிந்துரைக்கப்படுபவை",
    paddy: "நெல் பயிர்ச்செய்கை (Bg / At வகைகள்)",
    coconut: "தென்னை பயிர்ச்செய்கை (நெட்டை/குட்டை)",
    chilli: "மிளகாய் பயிர்ச்செய்கை (M3 / KA2)",
    cinnamon: "இலவங்கப்பட்டை (Alba/C5)",
    carrot: "மலைநாட்டு காய்கறிகள் (கரட்/வெங்காயம்)"
  }
};

export default function FertilizerCalculator({ language }: FertilizerCalculatorProps) {
  const [activeSubTab, setActiveSubTab] = useState<'fertilizer' | 'seeds' | 'water'>('fertilizer');
  
  const t = fcTranslations[language] || fcTranslations.en;

  // Shared inputs
  const [crop, setCrop] = useState('Paddy');
  const [acres, setAcres] = useState('1.0');
  
  // Fertilizer state variables
  const [soilType, setSoilType] = useState('Alluvial');
  const [nutrientMode, setNutrientMode] = useState<'artificial' | 'organic' | 'integrated'>('integrated');
  const [targetYield, setTargetYield] = useState<'standard' | 'high'>('standard');
  const [showFertilizerResult, setShowFertilizerResult] = useState(false);
  const [fertilizerResults, setFertilizerResults] = useState<{
    urea: number;
    tsp: number;
    mop: number;
    secondary: string;
    compost: string;
    foliar: string;
    ph: string;
    liming: string;
    schedule: string[];
  } | null>(null);

  // Seeds State variables
  const [seedVariety, setSeedVariety] = useState('standard');
  const [showSeedResult, setShowSeedResult] = useState(false);
  const [seedResults, setSeedResults] = useState<{
    seedKg: number;
    plantDensity: number;
    rowSpacing: string;
    plantSpacing: string;
    tip: string;
  } | null>(null);

  // Water State variables
  const [weatherCondition, setWeatherCondition] = useState('Sunny');
  const [irrigationMethod, setIrrigationMethod] = useState('Drip');
  const [showWaterResult, setShowWaterResult] = useState(false);
  const [waterResults, setWaterResults] = useState<{
    dailyLiters: number;
    cycleMinutes: number;
    frequency: string;
    dynamicTip: string;
  } | null>(null);
  const calculateNutrients = (e: React.FormEvent) => {
    e.preventDefault();
    const area = parseFloat(acres) || 1.0;
    const isHighYield = targetYield === 'high';

    let ureaBase = 65;
    let tspBase = 35;
    let mopBase = 30;
    
    let secondary = "None required";
    let compost = "1.5 Metric Tonnes";
    let foliar = "Liquid Fish Amino Acids: 5L dilute spray at 4-6 weeks";
    let ph = "6.0 - 6.5 (Slightly Acidic)";
    let liming = "None required (Soil is well-buffered)";
    let schedule: string[] = [];

    const yieldMultiplier = isHighYield ? 1.3 : 1.0;

    if (crop === 'Paddy') {
      ureaBase = 75 * yieldMultiplier;
      tspBase = 40;
      mopBase = 35 * yieldMultiplier;
      secondary = "Zinc Sulphate (ZnSO4): 5.0 kg / acre basal dressing to counter bronze spot.";
      compost = isHighYield ? "4.0 Metric Tonnes (apply during initial plowing)" : "2.5 Metric Tonnes";
      foliar = "Straw Compost Tea or Neem Extract: 10L spray during vegetative flush.";
      ph = "5.5 - 6.5 (Neutral to slightly acidic)";
      
      if (soilType === 'Laterite') {
        liming = "Dolomite powder: 250 kg / acre to buffer extreme acidity before flooding.";
      } else if (soilType === 'Sandy Loam') {
        liming = "Organic Humus: 500 kg to increase cation exchange capacity.";
      } else {
        liming = "Dolomite / Gypsum: 100 kg to supplement calcium-magnesium matrix.";
      }

      schedule = language === 'si' ? [
        "මූලික යෙදීම (Basal Dressing): අවසන් හීය කැපීමට පෙර (සිටුවීමට දිනකට පෙර) 20% යූරියා + 100% TSP + 30% MOP පසට එකතු කරන්න.",
        "පළමු අතිරේක යෙදීම (1st Top Dressing): බෝගය සිටුවා සති 2-3 කින් (පැල තිළිණ වන අවස්ථාවේදී) 40% යූරියා එකතු කරන්න.",
        "දෙවන අතිරේක යෙදීම (2nd Top Dressing): සිටුවා දින 45-50 කින් (කරල් එන ආරම්භක අවස්ථාවේදී) ඉතිරි 40% යූරියා සහ 70% MOP එකතු කරන්න."
      ] : language === 'ta' ? [
        "அடி உரம் (Basal Dressing): இறுதி நில உழவின் போது 20% யூரியா + 100% TSP + 30% MOP ஆகியவற்றைச் சேர்க்கவும் (நடுகைக்கு 1 நாளுக்கு முன்).",
        "முதல் மேலுரம் (1st Top Dressing): நடுகை செய்து 2-3 வாரங்களில் (ஆரம்ப தூர்விடும் பருவம்) 40% யூரியாவைப் பயன்படுத்தவும்.",
        "இரண்டாம் மேலுரம் (2nd Top Dressing): நடுகை செய்து 45-50 நாட்களில் (கதிர் உருவாகும் பருவம்) எஞ்சிய 40% யூரியா மற்றும் 70% MOP ஆகியவற்றைச் சேர்க்கவும்."
      ] : [
        "Basal Dressing: Apply 20% Urea + 100% TSP + 30% MOP before final soil puddling (1 day before transplanting).",
        "First Top Dressing: Apply 40% Urea at early tillering stage (14-21 days after transplanting).",
        "Second Top Dressing: Apply 40% Urea + 70% MOP at panicle initiation stage (45-50 days after transplanting)."
      ];

    } else if (crop === 'Coconut') {
      ureaBase = 120 * yieldMultiplier;
      tspBase = 80;
      mopBase = 150 * yieldMultiplier;
      secondary = "Kieserite (Magnesium Sulphate): 1.5 kg per palm annually to prevent yellowing of fronds.";
      compost = "25 kg Poultry Manure or Cow Dung per palm circular trench.";
      foliar = "Coir Pith Mulch: Bury 200 husks per palm to preserve organic moisture and potassium runoff.";
      ph = "5.5 - 7.0 (Adaptable)";
      liming = "Ground Dolomite: 1.0 kg per palm applied during active monsoon showers.";
      
      schedule = language === 'si' ? [
        "වාර්ෂික මෝසම් යෙදීම: මුල් මෝසම් වැසි ආරම්භ වන විට පොල් ගස වටා මීටර් 1.5 ක් දුරින් වටකුරු වළක් කපා සියලුම පොහොර එකතු කර පස්වලින් වසන්න.",
        "ජල සංරක්ෂණය: ජලය සහ පොටෑසියම් කාන්දු වීම වැළැක්වීම සඳහා පොල් ලෙලි තට්ටු 2 ක් වළ තුළ වළලන්න."
      ] : language === 'ta' ? [
        "வருடாந்த பருவமழை உரமிடுதல்: பருவமழை ஆரம்பத்தில் தென்னை மரத்தின் தடியிலிருந்து 1.5 மீ தூரத்தில் வட்ட வடிவில் அகழ்ந்து உரம் இட்டு மூடவும்.",
        "ஈரப்பதம் பாதுகாத்தல்: உரம் கசிந்து வீணாவதைத் தடுக்க தென்னை மட்டைகள் மற்றும் உமிகளை அகழிக்குள் புதைக்கவும்."
      ] : [
        "Annual Monsoonal Application: Trench bury all calculated fertilizer in a circular loop 1.5 meters away from the palm trunk during early monsoon showers.",
        "Mulching Integration: Bury coconut husks in the trenches to trap nitrogen and potassium runoff."
      ];

    } else if (crop === 'Chilli') {
      ureaBase = 80 * yieldMultiplier;
      tspBase = 50;
      mopBase = 60 * yieldMultiplier;
      secondary = "Soluble Boron (B): 2.0 kg / acre to stop blossom-end rot and fruit drop.";
      compost = "5.0 Metric Tonnes of well-matured compost.";
      foliar = "Neem-Seed Kernel Extract: 5% concentration spray at fortnightly intervals for systemic protection.";
      ph = "6.0 - 6.8 (Narrow range)";
      liming = "Agricultural Lime: 150 kg / acre to prevent calcium deficiency during pod maturation.";
      
      schedule = language === 'si' ? [
        "මූලික යෙදීම: වැටි සැකසීමේදී 30% යූරියා + 100% TSP + 30% MOP පස සමඟ හොඳින් කලවම් කරන්න.",
        "පළමු අතිරේක යෙදීම: පැල සිටුවා සති 4 කින් (පළමු වල් නෙලීමෙන් පසු) 35% යූරියා + 35% MOP පේළි අතරට යොදන්න.",
        "දෙවන අතිරේක යෙදීම: පළමු මල් පිපෙන අවස්ථාවේදී (සති 7 කදී) ඉතිරි 35% යූරියා සහ 35% MOP පසට යොදන්න."
      ] : language === 'ta' ? [
        "அடி உரம்: பாத்திகள் அமைக்கும் போது 30% யூரியா + 100% TSP + 30% MOP ஆகியவற்றை மண்ணுடன் கலக்கவும்.",
        "முதல் மேலுரம்: நடுகை செய்து 4 வாரங்களில் (முதல் களை எடுப்புக்கு பின்) 35% யூரியா + 35% MOP ஐ வரிசைகளுக்கு இடையில் இடவும்.",
        "இரண்டாம் மேலுரம்: முதல் பூ பூக்கும் பருவத்தில் (7 வாரங்களில்) எஞ்சிய 35% யூரியா மற்றும் 35% MOP ஐ இடவும்."
      ] : [
        "Basal Dressing: Incorporate 30% Urea + 100% TSP + 30% MOP during field ridge construction.",
        "First Top Dressing: Apply 35% Urea + 35% MOP at 4 weeks after transplanting (immediately after first weeding).",
        "Second Top Dressing: Apply 35% Urea + 35% MOP at first flowering bloom (7 weeks after transplanting)."
      ];

    } else if (crop === 'Cinnamon') {
      ureaBase = 50 * yieldMultiplier;
      tspBase = 25;
      mopBase = 40 * yieldMultiplier;
      secondary = "Magnesium (MgO): 8.0 kg / acre annually to maintain rich oil distillation concentration.";
      compost = "2.0 Metric Tonnes applied during post-harvest light weeding.";
      foliar = "Cinnamon Leaf Mulch: Re-apply wild cinnamon twigs back into the basin circles to restore copper levels.";
      ph = "5.0 - 5.5 (Acidic soils preferred)";
      liming = "No liming required. Cinnamon grows best in slightly acidic wet-zone podzolic fields.";
      
      schedule = language === 'si' ? [
        "අස්වනු නෙලීමෙන් පසු: නව දලු මතු වීම උත්තේජනය කිරීම සඳහා කඳන් කපා දැමූ වහාම 50% යූරියා + 50% TSP + 50% MOP යොදන්න.",
        "අතුරු කන්නය: මාස 6 කට පසුව ලා වැස්සත් සමඟ ඉතිරි 50% යූරියා, TSP සහ MOP පසට යොදන්න."
      ] : language === 'ta' ? [
        "அறுவடைக்குப் பின்: புதிய தளிர்களை ஊக்குவிக்க தண்டுகளை கத்தரித்த உடனே 50% யூரியா + 50% TSP + 50% MOP ஐப் பயன்படுத்தவும்.",
        "பருவ இடைவெளி: 6 மாதங்களுக்குப் பிறகு மிதமான மழையுடன் எஞ்சிய 50% யூரியா, TSP மற்றும் MOP ஐப் பயன்படுத்தவும்."
      ] : [
        "Post-harvest Application: Apply 50% Urea + 50% TSP + 50% MOP immediately after pruning the shoots to stimulate new flushing buds.",
        "Mid-season flush: Apply remaining 50% Urea + 50% TSP + 50% MOP 6 months later during light rains."
      ];

    } else { // Carrot / Onion
      ureaBase = 90 * yieldMultiplier;
      tspBase = 60;
      mopBase = 85 * yieldMultiplier;
      secondary = "Borax + Iron Chelate: 1.5 kg / acre to ensure crisp texture and bright root pigmentation.";
      compost = "6.0 Metric Tonnes of highly decomposed leaf compost.";
      foliar = "Seaweed Extract Liquid: 2.5L spray at week 3 and week 6 to boost bulb scaling density.";
      ph = "5.8 - 6.8 (Neutral to acidic range)";
      liming = "Dolomite powder: 200 kg / acre to avoid heart-rot fungal risks in Nuwara Eliya hilly beds.";
      
      schedule = language === 'si' ? [
        "මූලික යෙදීම: වැටි සැකසීමේදී 40% යූරියා + 100% TSP + 40% MOP පසට එකතු කරන්න.",
        "අතිරේක යෙදීම: සිටුවා සති 4 කට පසු, වල් නෙලා පස් බුරුල් කර 60% යූරියා + 60% MOP පසට යොදන්න."
      ] : language === 'ta' ? [
        "அடி உரம்: பாத்திகள் அமைக்கும் போது 40% யூரியா + 100% TSP + 40% MOP ஐ மண்ணுடன் சேர்க்கவும்.",
        "மேலுரம்: நட்டு 4 வாரங்களுக்குப் பின் களை நீக்கி மண்ணை அணைத்து 60% யூரியா + 60% MOP ஐ இடவும்."
      ] : [
        "Basal Dressing: Apply 40% Urea + 100% TSP + 40% MOP during raised-bed preparation.",
        "Top Dressing: Apply 60% Urea + 60% MOP 4 weeks after seeding, combined with light soil earthing up."
      ];
    }

    // Soil adjustments
    let soilAdjustment = 1.0;
    if (soilType === 'Sandy Loam') {
      soilAdjustment = 1.08; // More Nitrogen lost due to leaching in Kalpitiya sand
    } else if (soilType === 'Laterite') {
      tspBase *= 1.15; // Phospate fixation is high in cabook soils
    } else if (soilType === 'Red-Yellow Podzolic') {
      soilAdjustment = 0.95;
    }

    // Nutrient mode adjustments
    let ureaFinal = Math.round(ureaBase * area * soilAdjustment);
    let tspFinal = Math.round(tspBase * area);
    let mopFinal = Math.round(mopBase * area * soilAdjustment);

    if (nutrientMode === 'organic') {
      ureaFinal = 0;
      tspFinal = 0;
      mopFinal = 0;
      compost = isHighYield ? "12.0 Metric Tonnes / acre" : "8.0 Metric Tonnes / acre";
      foliar = "Concentrated Compost Tea & Fish Amino Acids: Apply weekly to sustain high nitrogen requirements.";
      secondary = "Rock Phosphate + Neem Cake powder (300 kg basal) to supply phosphorous and potassium organic reserves.";
    } else if (nutrientMode === 'integrated') {
      // Integrated reduces chemical fertilizer by 35% because organic manure complements nutrients
      ureaFinal = Math.round(ureaFinal * 0.65);
      tspFinal = Math.round(tspFinal * 0.65);
      mopFinal = Math.round(mopFinal * 0.65);
      compost = isHighYield ? "6.0 Metric Tonnes" : "4.0 Metric Tonnes";
    } else {
      // Chemical only
      compost = "None (Chemical regime only - monitor soil health index!)";
    }

    setFertilizerResults({
      urea: ureaFinal,
      tsp: tspFinal,
      mop: mopFinal,
      secondary,
      compost,
      foliar,
      ph,
      liming,
      schedule
    });
    setShowFertilizerResult(true);
  };

  // 2. Calculate Seeds & Spacing
  const calculateSeedsAndSpacing = (e: React.FormEvent) => {
    e.preventDefault();
    const area = parseFloat(acres) || 1.0;
    
    let seedKg = 0;
    let plantDensity = 0;
    let rowSpacing = '0cm';
    let plantSpacing = '0cm';
    let tip = '';

    if (crop === 'Paddy') {
      seedKg = seedVariety === 'hybrid' ? 15 * area : 45 * area;
      plantDensity = 800000 * area;
      rowSpacing = '20 cm';
      plantSpacing = '15 cm';
      tip = 'Keep water at 2cm level during planting. Pre-germinate seeds by soaking for 24 hours to ensure 95%+ germination rate.';
    } else if (crop === 'Coconut') {
      seedKg = 0;
      plantDensity = Math.round(64 * area);
      rowSpacing = '8.0 meters';
      plantSpacing = '8.0 meters';
      tip = 'Plant seedlings in 1m x 1m pits filled with topsoil, organic manure, and 500g of Dolomite to support robust root stabilization.';
    } else if (crop === 'Chilli') {
      seedKg = seedVariety === 'hybrid' ? 0.2 * area : 0.5 * area;
      plantDensity = 14000 * area;
      rowSpacing = '60 cm';
      plantSpacing = '45 cm';
      tip = 'Raise green chilli seedlings in net-houses for 28 days to prevent early Thrips infestation and damping-off fungal issues.';
    } else if (crop === 'Cinnamon') {
      seedKg = 15 * area;
      plantDensity = 10000 * area;
      rowSpacing = '120 cm';
      plantSpacing = '90 cm';
      tip = 'Plant 3-4 cinnamon seedlings per hill to guarantee thick multi-shoot clusters that yield high-quality thin quills.';
    } else { // Carrot/Onion
      seedKg = crop === 'Carrot' ? 2.5 * area : 550 * area;
      plantDensity = crop === 'Carrot' ? 180000 * area : 400000 * area;
      rowSpacing = '15 cm';
      plantSpacing = '10 cm';
      tip = 'For Red Onions, trim the dried foliage neck by 1/3 prior to bulb planting to activate rapid root crown sprouting.';
    }

    setSeedResults({
      seedKg: parseFloat(seedKg.toFixed(2)),
      plantDensity,
      rowSpacing,
      plantSpacing,
      tip
    });
    setShowSeedResult(true);
  };

  // 3. Calculate Water & Irrigation
  const calculateWaterRequirements = (e: React.FormEvent) => {
    e.preventDefault();
    const area = parseFloat(acres) || 1.0;
    
    let baseLitersPerAcrePerDay = 4500;

    if (crop === 'Paddy') {
      baseLitersPerAcrePerDay = 12000;
    } else if (crop === 'Coconut') {
      baseLitersPerAcrePerDay = 3500;
    } else if (crop === 'Chilli') {
      baseLitersPerAcrePerDay = 5000;
    } else if (crop === 'Cinnamon') {
      baseLitersPerAcrePerDay = 3000;
    } else { // Carrot/Onion
      baseLitersPerAcrePerDay = 4800;
    }

    let weatherMultiplier = 1.0;
    if (weatherCondition === 'Sunny') {
      weatherMultiplier = 1.25;
    } else if (weatherCondition === 'Cloudy') {
      weatherMultiplier = 0.8;
    } else if (weatherCondition === 'Rainy') {
      weatherMultiplier = 0.1;
    }

    let efficiencyMultiplier = 1.0;
    let cycleMinutes = 45;
    if (irrigationMethod === 'Drip') {
      efficiencyMultiplier = 0.75;
      cycleMinutes = 30;
    } else if (irrigationMethod === 'Sprinkler') {
      efficiencyMultiplier = 0.9;
      cycleMinutes = 40;
    } else { // Flood/Manual
      efficiencyMultiplier = 1.3;
      cycleMinutes = 90;
    }

    const dailyLiters = Math.round(baseLitersPerAcrePerDay * area * weatherMultiplier * efficiencyMultiplier);
    
    let frequency = 'Every morning';
    if (weatherCondition === 'Rainy') {
      frequency = 'Suspend irrigation (monitor soil saturation)';
    } else if (crop === 'Coconut') {
      frequency = 'Twice a week (deep soaking)';
    } else if (irrigationMethod === 'Drip') {
      frequency = 'Once daily (preferred 6:00 AM - 8:00 AM)';
    }

    let dynamicTip = 'Watering early in the morning reduces water loss through evaporation by 25% and prevents nighttime fungal leaf spots.';
    if (crop === 'Paddy' && weatherCondition !== 'Rainy') {
      dynamicTip = 'Paddy fields require standing water of 2cm during tillering. Ensure perimeter bunds are sealed to prevent lateral seepage.';
    } else if (irrigationMethod === 'Drip') {
      dynamicTip = 'Drip lines should operate at 1.5 Bar pressure. Regularly clean main sand filters to prevent Kalpitiya sandy bore clogging.';
    }

    setWaterResults({
      dailyLiters,
      cycleMinutes,
      frequency,
      dynamicTip
    });
    setShowWaterResult(true);
  };

  return (
    <div className="space-y-6" id="fertilizer-calculator-section">
      
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-sans font-black text-gray-950 flex items-center gap-2">
            <Calculator className="h-7 w-7 text-emerald-600" />
            <span>{t.title}</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1 max-w-3xl">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="flex bg-gray-100/75 p-1 rounded-2xl border border-gray-200/50 max-w-lg">
        <button
          onClick={() => setActiveSubTab('fertilizer')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'fertilizer'
              ? 'bg-white text-emerald-700 shadow-sm border border-gray-200/30'
              : 'text-gray-600 hover:text-gray-950'
          }`}
          id="fertilizer-tab-btn"
        >
          <Beaker className="h-4 w-4" />
          <span>{t.fertTab}</span>
        </button>
        <button
          onClick={() => setActiveSubTab('seeds')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'seeds'
              ? 'bg-white text-emerald-700 shadow-sm border border-gray-200/30'
              : 'text-gray-600 hover:text-gray-950'
          }`}
          id="seeds-tab-btn"
        >
          <Sprout className="h-4 w-4" />
          <span>{t.seedTab}</span>
        </button>
        <button
          onClick={() => setActiveSubTab('water')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === 'water'
              ? 'bg-white text-emerald-700 shadow-sm border border-gray-200/30'
              : 'text-gray-600 hover:text-gray-950'
          }`}
          id="water-tab-btn"
        >
          <Droplets className="h-4 w-4" />
          <span>{t.waterTab}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-5">
          
          {activeSubTab === 'fertilizer' && (
            <form onSubmit={calculateNutrients} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-4">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <Beaker className="h-5 w-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-gray-950">{t.fertTab}</h4>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.cropLabel}</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800 cursor-pointer"
                >
                  <option value="Paddy">{t.paddy}</option>
                  <option value="Coconut">{t.coconut}</option>
                  <option value="Chilli">{t.chilli}</option>
                  <option value="Cinnamon">{t.cinnamon}</option>
                  <option value="Carrot">{t.carrot}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.soilLabel}</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800 cursor-pointer"
                >
                  <option value="Alluvial">Alluvial Soil (River basin / Paddy fields)</option>
                  <option value="Sandy Loam">Sandy Loam (Kalpitiya / Jaffna sand)</option>
                  <option value="Red-Yellow Podzolic">Red-Yellow Podzolic (Wet zone hills)</option>
                  <option value="Laterite">Cabook / Laterite (Coastal plains)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.modeLabel}</label>
                <select
                  value={nutrientMode}
                  onChange={(e) => setNutrientMode(e.target.value as 'artificial' | 'organic' | 'integrated')}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800 cursor-pointer"
                >
                  <option value="integrated">{t.modeIntegrated}</option>
                  <option value="artificial">{t.modeArtificial}</option>
                  <option value="organic">{t.modeOrganic}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.yieldLabel}</label>
                <select
                  value={targetYield}
                  onChange={(e) => setTargetYield(e.target.value as 'standard' | 'high')}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800 cursor-pointer"
                >
                  <option value="standard">{t.yieldStandard}</option>
                  <option value="high">{t.yieldHigh}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.acresLabel}</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  value={acres}
                  onChange={(e) => setAcres(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-800 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1"
              >
                <Calculator className="h-4 w-4" />
                <span>{t.computeBtn}</span>
              </button>
            </form>
          )}

          {/* TAB 2: Seeds Inputs */}
          {activeSubTab === 'seeds' && (
            <form onSubmit={calculateSeedsAndSpacing} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-4">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <Sprout className="h-5 w-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-gray-950">{t.seedTab}</h4>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.cropLabel}</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800 cursor-pointer"
                >
                  <option value="Paddy">{t.paddy}</option>
                  <option value="Coconut">{t.coconut}</option>
                  <option value="Chilli">{t.chilli}</option>
                  <option value="Cinnamon">{t.cinnamon}</option>
                  <option value="Carrot">{t.carrot}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.seedVarLabel}</label>
                <select
                  value={seedVariety}
                  onChange={(e) => setSeedVariety(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800 cursor-pointer"
                >
                  <option value="standard">Standard Open-Pollinated (CIC / Dept. Agriculture)</option>
                  <option value="hybrid">F1 High-Yielding Hybrid Seedlings</option>
                  <option value="local">Traditional Sri Lankan Heirloom Variety</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.acresLabel}</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  value={acres}
                  onChange={(e) => setAcres(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-800 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1"
              >
                <Calculator className="h-4 w-4" />
                <span>{t.computeBtn}</span>
              </button>
            </form>
          )}

          {/* TAB 3: Water Inputs */}
          {activeSubTab === 'water' && (
            <form onSubmit={calculateWaterRequirements} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-4">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
                <Droplets className="h-5 w-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-gray-950">{t.waterTab}</h4>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.cropLabel}</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800 cursor-pointer"
                >
                  <option value="Paddy">{t.paddy}</option>
                  <option value="Coconut">{t.coconut}</option>
                  <option value="Chilli">{t.chilli}</option>
                  <option value="Cinnamon">{t.cinnamon}</option>
                  <option value="Carrot">{t.carrot}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.weatherLabel}</label>
                <select
                  value={weatherCondition}
                  onChange={(e) => setWeatherCondition(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800 cursor-pointer"
                >
                  <option value="Sunny">Extreme Sun / Dry Spell (Evaporation High)</option>
                  <option value="Cloudy">Intermediate / Overcast Monsoon Skies</option>
                  <option value="Rainy">Rains / Showers Occurring</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.irrigationLabel}</label>
                <select
                  value={irrigationMethod}
                  onChange={(e) => setIrrigationMethod(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800 cursor-pointer"
                >
                  <option value="Drip">Drip Irrigation System (90% Efficient)</option>
                  <option value="Sprinkler">Sprinkler / Rain-hose System (75% Efficient)</option>
                  <option value="Flood">Traditional Flood / Govi Channel (40% Efficient)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t.acresLabel}</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  value={acres}
                  onChange={(e) => setAcres(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-800 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1"
              >
                <Calculator className="h-4 w-4" />
                <span>{t.computeBtn}</span>
              </button>
            </form>
          )}

        </div>

        <div className="lg:col-span-7">
          
          {activeSubTab === 'fertilizer' && (
            showFertilizerResult && fertilizerResults ? (
              <div className="bg-[#FFFDF7] rounded-3xl p-6 border-2 border-dashed border-emerald-600/30 shadow-md space-y-6 animate-scale-up" id="fert-results-card">
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">📊</span>
                    <h4 className="text-sm font-black text-gray-950">{t.resultsTitle}</h4>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded uppercase font-mono">
                    {t.resultsBadge}
                  </span>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-emerald-950 flex items-center">
                    <Beaker className="h-4.5 w-4.5 mr-2 text-emerald-600" />
                    {t.artificialHeader}
                  </h5>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-xs text-center relative group overflow-hidden">
                      <span className="bg-blue-50 text-blue-800 font-bold text-[9px] px-2 py-0.5 rounded-md uppercase">
                        {t.ureaLabel}
                      </span>
                      <p className="text-2xl font-mono font-black text-gray-900 mt-2">{fertilizerResults.urea}</p>
                      <span className="text-[10px] font-bold text-gray-400">Total kg needed</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-xs text-center relative group overflow-hidden">
                      <span className="bg-amber-50 text-amber-800 font-bold text-[9px] px-2 py-0.5 rounded-md uppercase">
                        {t.tspLabel}
                      </span>
                      <p className="text-2xl font-mono font-black text-gray-900 mt-2">{fertilizerResults.tsp}</p>
                      <span className="text-[10px] font-bold text-gray-400">Total kg needed</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-xs text-center relative group overflow-hidden">
                      <span className="bg-emerald-50 text-emerald-800 font-bold text-[9px] px-2 py-0.5 rounded-md uppercase">
                        {t.mopLabel}
                      </span>
                      <p className="text-2xl font-mono font-black text-gray-900 mt-2">{fertilizerResults.mop}</p>
                      <span className="text-[10px] font-bold text-gray-400">Total kg needed</span>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-gray-100/80 space-y-1 text-xs">
                    <strong className="text-gray-400 font-bold block uppercase text-[9px]">{t.secondaryLabel}:</strong>
                    <p className="text-gray-800 font-semibold">{fertilizerResults.secondary}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-bold text-emerald-950 flex items-center">
                    <Leaf className="h-4.5 w-4.5 mr-2 text-emerald-600" />
                    {t.organicHeader}
                  </h5>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3.5 rounded-2xl border border-gray-100">
                      <span className="text-gray-400 font-bold block mb-1 text-[9px] uppercase">{t.compostLabel}</span>
                      <strong className="text-sm text-emerald-900 block font-black">{fertilizerResults.compost}</strong>
                    </div>
                    <div className="bg-white p-3.5 rounded-2xl border border-gray-100">
                      <span className="text-gray-400 font-bold block mb-1 text-[9px] uppercase">{t.foliarLabel}</span>
                      <strong className="text-[11px] text-emerald-900 block leading-relaxed font-semibold">{fertilizerResults.foliar}</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-bold text-emerald-950 flex items-center">
                    <Info className="h-4.5 w-4.5 mr-2 text-emerald-600" />
                    {t.soilHealthHeader}
                  </h5>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3.5 rounded-2xl border border-gray-100">
                      <span className="text-gray-400 font-bold block mb-1 text-[9px] uppercase">{t.targetPh}</span>
                      <strong className="text-sm text-gray-800 block font-black">{fertilizerResults.ph}</strong>
                    </div>
                    <div className="bg-white p-3.5 rounded-2xl border border-gray-100">
                      <span className="text-gray-400 font-bold block mb-1 text-[9px] uppercase">{t.limingLabel}</span>
                      <strong className="text-xs text-gray-700 block font-semibold leading-relaxed">{fertilizerResults.liming}</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-bold text-gray-950 flex items-center">
                    <Calendar className="h-4.5 w-4.5 mr-2 text-[#F9A825]" />
                    {t.splitRoadmap}
                  </h5>
                  <div className="space-y-2.5">
                    {fertilizerResults.schedule.map((step, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-2xl border border-gray-100/80 flex items-start space-x-3 text-xs text-gray-700 leading-relaxed">
                        <span className="bg-emerald-50 text-emerald-800 font-black h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono text-[11px] border border-emerald-100">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-center space-x-2 text-[10px] text-emerald-800 font-bold">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-700 shrink-0" />
                  <span>{t.certifiedDesc}</span>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center space-y-4 flex flex-col items-center justify-center h-full min-h-[350px]">
                <div className="bg-emerald-50 p-4 rounded-full text-emerald-700">
                  <Beaker className="h-8 w-8" />
                </div>
                <div>
                  <h5 className="text-md font-bold text-gray-950 font-sans">{t.noCalcTitle}</h5>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1 leading-normal">
                    {t.noCalcDesc}
                  </p>
                </div>
              </div>
            )
          )}

          {activeSubTab === 'seeds' && (
            showSeedResult && seedResults ? (
              <div className="bg-[#FFFDF7] rounded-3xl p-6 border-2 border-dashed border-emerald-600/30 shadow-md space-y-6 animate-scale-up" id="seeds-results-card">
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🌱</span>
                    <h4 className="text-sm font-black text-gray-950">{t.seedTab}</h4>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded uppercase font-mono">
                    95%+ Germination
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm text-center">
                    <span className="text-xs font-black text-emerald-800 block uppercase tracking-wide text-[10px]">{t.seedKgLabel}</span>
                    <p className="text-3xl font-mono font-black text-gray-900 mt-2">{seedResults.seedKg} <span className="text-xs font-sans text-gray-400">kg</span></p>
                    <span className="text-[9px] font-bold text-gray-400 block mt-1">For {acres} acres of {crop}</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm text-center">
                    <span className="text-xs font-black text-amber-800 block uppercase tracking-wide text-[10px]">{t.plantDensityLabel}</span>
                    <p className="text-2xl font-mono font-black text-gray-900 mt-2">~ {seedResults.plantDensity.toLocaleString()}</p>
                    <span className="text-[9px] font-bold text-gray-400 block mt-1">Stems / saplings in the field</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm space-y-4">
                  <h5 className="text-xs font-bold text-gray-950 flex items-center border-b border-gray-100 pb-2">
                    <Grid className="h-4.5 w-4.5 mr-2 text-emerald-600" />
                    {t.spacingLabel}
                  </h5>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400 font-bold block mb-1 uppercase text-[9px]">{t.rowSpacingLabel}:</span>
                      <p className="font-mono text-sm font-black text-gray-800 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 inline-block">
                        {seedResults.rowSpacing}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block mb-1 uppercase text-[9px]">{t.plantSpacingLabel}:</span>
                      <p className="font-mono text-sm font-black text-gray-800 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 inline-block">
                        {seedResults.plantSpacing}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-yellow-50/70 rounded-2xl border border-yellow-100 flex items-start space-x-2.5 text-xs text-amber-900 leading-relaxed">
                  <span className="text-base">💡</span>
                  <div>
                    <strong className="block text-amber-950 font-bold mb-0.5">{t.extensionTips}:</strong>
                    <span>{seedResults.tip}</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center space-y-4 flex flex-col items-center justify-center h-full min-h-[350px]">
                <div className="bg-emerald-50 p-4 rounded-full text-emerald-700">
                  <Sprout className="h-8 w-8" />
                </div>
                <div>
                  <h5 className="text-md font-bold text-gray-950 font-sans">{t.noCalcTitle}</h5>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1 leading-normal">
                    {t.noCalcDesc}
                  </p>
                </div>
              </div>
            )
          )}

          {activeSubTab === 'water' && (
            showWaterResult && waterResults ? (
              <div className="bg-[#FFFDF7] rounded-3xl p-6 border-2 border-dashed border-emerald-600/30 shadow-md space-y-6 animate-scale-up" id="water-results-card">
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">💧</span>
                    <h4 className="text-sm font-black text-gray-950">{t.waterVolumeLabel}</h4>
                  </div>
                  <span className="bg-blue-50 text-sky-800 text-[10px] font-black px-2 py-0.5 rounded uppercase font-mono">
                    Climate Adjusted
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100 text-center">
                    <span className="text-xs font-black text-sky-900 block uppercase tracking-wide text-[10px]">{t.waterVolumeLabel}</span>
                    <p className="text-3xl font-mono font-black text-sky-950 mt-2">{waterResults.dailyLiters.toLocaleString()} <span className="text-xs font-sans text-sky-700">L / day</span></p>
                    <span className="text-[9px] font-bold text-sky-600 block mt-1">Suggested for {acres} acres</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm text-center">
                    <span className="text-xs font-black text-gray-700 block uppercase tracking-wide text-[10px]">{t.irrigationCycleLabel}</span>
                    <p className="text-3xl font-mono font-black text-gray-900 mt-2">{waterResults.cycleMinutes} <span className="text-xs font-sans text-gray-400">mins</span></p>
                    <span className="text-[9px] font-bold text-gray-400 block mt-1">Under normal pump pressure</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm space-y-2 text-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{t.scheduleLabel}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-gray-800">{waterResults.frequency}</span>
                    <span className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-xl border border-emerald-100 font-bold">
                      {irrigationMethod} Active
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-100/60 flex items-start space-x-2.5 text-xs text-sky-900 leading-relaxed">
                  <span className="text-base text-sky-600">💡</span>
                  <div>
                    <strong className="block text-sky-950 font-bold mb-0.5">{t.waterTipLabel}:</strong>
                    <span>{waterResults.dynamicTip}</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center space-y-4 flex flex-col items-center justify-center h-full min-h-[350px]">
                <div className="bg-emerald-50 p-4 rounded-full text-emerald-700">
                  <Droplets className="h-8 w-8" />
                </div>
                <div>
                  <h5 className="text-md font-bold text-gray-950 font-sans">{t.noCalcTitle}</h5>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1 leading-normal">
                    {t.noCalcDesc}
                  </p>
                </div>
              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}
