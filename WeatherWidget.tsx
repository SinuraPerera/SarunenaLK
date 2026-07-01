import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudLightning, Droplets, Wind, MapPin, Calendar, HelpCircle, Thermometer } from 'lucide-react';
import { MOCK_WEATHER, DEFAULT_WEATHER, SRI_LANKAN_DISTRICTS } from './mockData';
import { WeatherData } from './types';

interface WeatherWidgetProps {
  defaultDistrict?: string;
  language?: 'en' | 'si' | 'ta';
}

export default function WeatherWidget({ defaultDistrict, language = 'en' }: WeatherWidgetProps) {
  const [selectedDistrict, setSelectedDistrict] = useState('Anuradhapura');

  useEffect(() => {
    if (defaultDistrict) {
      setSelectedDistrict(defaultDistrict);
    }
  }, [defaultDistrict]);

  const hasMockData = Object.prototype.hasOwnProperty.call(MOCK_WEATHER, selectedDistrict);
  const weather: WeatherData = hasMockData 
    ? MOCK_WEATHER[selectedDistrict] 
    : { ...DEFAULT_WEATHER, district: selectedDistrict };

  const tWeather = {
    en: {
      climateUnit: "Climate Unit",
      warningNearest: "⚠️ Showing nearest available regional data for",
      conditions: "Conditions",
      metFeed: "District Meteorological Feed",
      humidity: "Humidity",
      wind: "Wind",
      precipitation: "Precipitation",
      outlook: "5-Day Outlook",
      advisoryTitle: "Agronomic Advisory",
      goviFeed: "Govi Feed",
      cropCycle: "Crop Cycle",
      fertilizerTipTitle: "Fertilizer Timing tip:",
      zones: {
        'Nuwara Eliya': {
          zone: 'Wet Zone - Up Country (Hill Country)',
          season: 'Maha Preparation / Vegetable cultivation',
          advice: 'High moisture and chill detected. Risk of damping-off and blight in Carrots and Potatoes is active. Maintain strict drainage paths, clean seedbed channels, and limit spray pesticides during heavy morning rains. Ideal season for high-yield tea clipping.',
          fertilizerTip: 'Avoid applying top-dress fertilizer (Urea) right before high heavy rain probability; instead, apply in split doses when sky clears.'
        },
        'Galle': {
          zone: 'Wet Zone - Low Country (Southern Coastal)',
          season: 'Cinnamon harvest & Pepper sorting',
          advice: 'Humidity remains high (78%). Ideal for peeling cinnamon shoots. Keep harvested quills in dry sheds with adequate cross-ventilation. For paddy growers in low-lying tracts, keep drainage gates functional to prevent minor field inundation.',
          fertilizerTip: 'Apply dolomitic limestone to combat low soil pH common in southern soils before the next fertilizer split.'
        },
        'Kurunegala': {
          zone: 'Intermediate Zone - Coconut Triangle',
          season: 'Intercropping & Coconut fertilization',
          advice: 'Optimal weather for planting cover crops (Mucuna or Calopogonium) in coconut estates to conserve soil moisture. Check young coconut palms for Red Palm Weevil boring marks. Inject biological extract if bores are found.',
          fertilizerTip: 'This is the perfect window to apply organic manures or husk-bury around the palm basins.'
        },
        'Anuradhapura': {
          zone: 'Dry Zone - Low Country (Northern Plains)',
          season: 'Yala Season Harvesting / Land Prep',
          advice: 'High solar radiation (33°C). Excellent for sun-drying harvested paddy seeds. If starting minor vegetable rotations (Chilli/Onion), deploy drip lines immediately. Soil evaporation is high—irrigate during evening hours to conserve water.',
          fertilizerTip: 'High soil temperatures trigger rapid nitrogen volatilization. Bury Urea granules 2cm deep for maximum absorption.'
        }
      } as Record<string, { zone: string; season: string; advice: string; fertilizerTip: string }>
    },
    si: {
      climateUnit: "කාලගුණ අංශය",
      warningNearest: "⚠️ ආසන්නතම කලාපීය දත්ත පෙන්වයි: ",
      conditions: "තත්ත්වයන්",
      metFeed: "දිස්ත්‍රික් කාලගුණ තොරතුරු සේවාව",
      humidity: "තෙතමනය",
      wind: "සුළඟ",
      precipitation: "වර්ෂාපතන සම්භාවිතාව",
      outlook: "දින 5ක කාලගුණ අනාවැකිය",
      advisoryTitle: "කෘෂි උපදෙස්",
      goviFeed: "ගොවි පණිවිඩ",
      cropCycle: "බෝග චක්‍රය",
      fertilizerTipTitle: "පොහොර යෙදීමේ උපදෙස්:",
      zones: {
        'Nuwara Eliya': {
          zone: 'තෙත් කලාපය - උඩරට (කඳුකර ප්‍රදේශය)',
          season: 'මහ කන්නයේ සූදානම / එළවළු වගාව',
          advice: 'අධික තෙතමනය සහ ශීතල දේශගුණයක් පවතී. කැරට් සහ අර්තාපල් වගාවන්හි දිලීර සහ කොළ අංගමාර රෝග ඇතිවීමේ අවදානමක් ඇත. නිසි පරිදි ජලාපවහන පද්ධති සකස් කරන්න, උදෑසන අධික වර්ෂාව පවතින විට කෘමිනාශක ඉසීමෙන් වළකින්න. තේ දළු කැඩීමට ඉතා සුදුසු කාලයකි.',
          fertilizerTip: 'අධික වර්ෂාපතනයක් අපේක්ෂා කරන අවස්ථාවලදී යුරියා පොහොර යෙදීමෙන් වළකින්න. අහස පැහැදිලි වූ පසු කොටස් වශයෙන් පොහොර යොදන්න.'
        },
        'Galle': {
          zone: 'තෙත් කලාපය - පහතරට (දකුණු වෙරළබඩ)',
          season: 'කුරුඳු අස්වැන්න සහ ගම්මිරිස් වර්ග කිරීම',
          advice: 'ආර්ද්‍රතාවය ඉහළ මට්ටමක පවතී (78%). කුරුඳු තැලීම සඳහා ඉතා සුදුසු කාලයකි. අස්වැන්න නෙළාගත් කුරුඳු වියළි සහ වාතාශ්‍රය ඇති මඩුවල ගබඩා කරන්න. පහත් බිම්වල වී වගා කරන ගොවීන් කෙත්වල ජලය බැසයාමට අවශ්‍ය කානු පද්ධති නිසි පරිදි පවත්වා ගන්න.',
          fertilizerTip: 'පොහොර යෙදීමට පෙර දකුණු පළාතේ පස්වල බහුලව දක්නට ලැබෙන අඩු pH අගය (ආම්ලිකතාවය) පාලනය කිරීම සඳහා ඩොලමයිට් එකතු කරන්න.'
        },
        'Kurunegala': {
          zone: 'අතරමැදි කලාපය - පොල් ත්‍රිකෝණය',
          season: 'අතුරු වගාවන් සහ පොල් පොහොර යෙදීම',
          advice: 'පොල් වතුවල පසෙහි තෙතමනය ආරක්ෂා කර ගැනීම සඳහා ආවරණ බෝග (Mucuna හෝ Calopogonium) සිටුවීමට වඩාත් සුදුසු කාලයකි. රතු පොල් කුරුමිණි හානිය පරීක්ෂා කර, හානි වී ඇත්නම් ජීව විද්‍යාත්මක ක්‍රමවේද භාවිතා කරන්න.',
          fertilizerTip: 'පොල් ගස් වටා කාබනික පොහොර යෙදීමට හෝ පොල් ලෙලි වැලලීමට මෙය ඉතාමත් සුදුසු කාලයකි.'
        },
        'Anuradhapura': {
          zone: 'වියළි කලාපය - පහතරට (උතුරු තැන්න)',
          season: 'යාල කන්නයේ අස්වනු නෙලීම / බිම් සකස් කිරීම',
          advice: 'අධික සූර්ය රශ්මියක් පවතී (33°C). නෙලාගත් වී වියළා ගැනීමට ඉතා සුදුසුය. මිරිස් හෝ ලූනු වැනි එළවළු වගාවන් ආරම්භ කරන්නේ නම් වහාම බිංදු ජල සම්පාදන ක්‍රම සකස් කරන්න. ජලය වාෂ්පීකරණය වීම වැළැක්වීම සඳහා සවස් කාලයේ ජලය සපයන්න.',
          fertilizerTip: 'වැඩි උෂ්ණත්වය නිසා පසෙන් නයිට්‍රජන් වාෂ්ප විය හැක. උපරිම ප්‍රතිඵල සඳහා යුරියා පොහොර පසට යට කර (සෙන්ටිමීටර 2ක් ගැඹුරට) යොදන්න.'
        }
      } as Record<string, { zone: string; season: string; advice: string; fertilizerTip: string }>
    },
    ta: {
      climateUnit: "காலநிலை பிரிவு",
      warningNearest: "⚠️ இற்கான மிக நெருக்கமான பிராந்திய தரவைக் காட்டுகிறது: ",
      conditions: "நிலவரம்",
      metFeed: "மாவட்ட வானிலை தரவு சேவை",
      humidity: "ஈரப்பதம்",
      wind: "காற்று",
      precipitation: "மழைப்பொழிவு",
      outlook: "5-நாள் வானிலை முன்னறிவிப்பு",
      advisoryTitle: "விவசாய ஆலோசனை",
      goviFeed: "கோவி செய்தி",
      cropCycle: "பயிர் சுழற்சி",
      fertilizerTipTitle: "உரமிடுதல் குறிப்பு:",
      zones: {
        'Nuwara Eliya': {
          zone: 'ஈரமான மண்டலம் - மலைநாடு (மலைப் பகுதி)',
          season: 'மகா கன்னை ஆயத்தம் / காய்கறி பயிர்ச்செய்கை',
          advice: 'அதிக ஈரப்பதம் மற்றும் குளிர் கண்டறியப்பட்டுள்ளது. கேரட் மற்றும் உருளைக்கிழங்கில் பூஞ்சை மற்றும் கருகல் நோய் ஏற்படும் அபாயம் உள்ளது. முறையான வடிகால் அமைப்புகளை பேணவும், பலத்த காலை மழையின் போது பூச்சிக்கொல்லி தெளிப்பதை தவிர்க்கவும். தேயிலை பறிக்க உகந்த காலம்.',
          fertilizerTip: 'அதிக மழை பெய்யும் முன் யூரியா உரம் இடுவதை தவிர்க்கவும். வானம் தெளிவடைந்த பின் உரம் இடவும்.'
        },
        'Galle': {
          zone: 'ஈரமான மண்டலம் - தாழ்நில நாடு (தெற்கு கடலோரம்)',
          season: 'இலவங்கப்பட்டை அறுவடை மற்றும் மிளகு தரம் பிரித்தல்',
          advice: 'ஈரப்பதம் அதிகமாக உள்ளது (78%). இலவங்கப்பட்டை அறுவடை செய்ய சிறந்த காலம். அறுவடை செய்த இலவங்கப்பட்டையை காற்றோட்டமான உலர்ந்த இடங்களில் சேமிக்கவும். தாழ்நில நெல் விவசாயிகள் நீர் தேங்குவதை தவிர்க்க வடிகால்களை சுத்தமாக வைத்திருக்கவும்.',
          fertilizerTip: 'உரம் இடுவதற்கு முன், தெற்கு மண்ணில் பொதுவாகக் காணப்படும் குறைந்த pH அளவைக் கட்டுப்படுத்த டோலமைட் பயன்படுத்தவும்.'
        },
        'Kurunegala': {
          zone: 'இடைநிலை மண்டலம் - தென்னை முக்கோணம்',
          season: 'ஊடுபயிர்ச்செய்கை மற்றும் தென்னை உரமிடுதல்',
          advice: 'தென்னந்தோப்புகளில் மண் ஈரப்பதத்தை பாதுகாக்க மூடிப் பயிர்களை நடுவதற்கு ஏற்ற வானிலை. சிவப்பு தென்னை வண்டின் தாக்கத்தை கண்காணித்து உயிரியல் பூச்சிக்கொல்லிகளைப் பயன்படுத்தவும்.',
          fertilizerTip: 'தென்னை மரங்களுக்கு கரிம உரங்களை இட அல்லது தேங்காய் மட்டைகளை புதைக்க இதுவே சிறந்த நேரம்.'
        },
        'Anuradhapura': {
          zone: 'உலர் மண்டலம் - தாழ்நில நாடு (வடக்கு சமவெளி)',
          season: 'யால பருவ அறுவடை / நிலம் தயாரித்தல்',
          advice: 'அதிக சூரிய கதிர்வீச்சு (33°C). அறுவடை செய்த நெல்லை உலர வைக்க சிறந்தது. மிளகாய்/வெங்காயம் பயிரிட சொட்டு நீர் பாசனத்தை பயன்படுத்தவும். மாலை வேளையில் நீர் பாய்ச்சுவதன் மூலம் நீராவியாவதை தடுக்கலாம்.',
          fertilizerTip: 'அதிக வெப்பநிலை காரணமாக நைட்ரஜன் ஆவியாகலாம். சிறந்த பலனைப் பெற யூரியா உரத்தை மண்ணுக்குள் 2 செ.மீ ஆழத்தில் புதைக்கவும்.'
        }
      } as Record<string, { zone: string; season: string; advice: string; fertilizerTip: string }>
    }
  }[language];

  const dayLabels = {
    en: { Sat: 'Sat', Sun: 'Sun', Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri' } as Record<string, string>,
    si: { Sat: 'සෙන', Sun: 'ඉරිදා', Mon: 'සඳුදා', Tue: 'අඟහ', Wed: 'බදාදා', Thu: 'බ්‍රහස්', Fri: 'සිකු' } as Record<string, string>,
    ta: { Sat: 'சனி', Sun: 'ஞாயிறு', Mon: 'திங்கள்', Tue: 'செவ்வாய்', Wed: 'புதன்', Thu: 'வியாழன்', Fri: 'வெள்ளி' } as Record<string, string>
  }[language];

  const conditionLabels = {
    en: { Sunny: 'Sunny', Rainy: 'Rainy', Thunderstorm: 'Thunderstorm', Cloudy: 'Cloudy' } as Record<string, string>,
    si: { Sunny: 'පැහැදිලි', Rainy: 'වැසි සහිත', Thunderstorm: 'ගිගුරුම් සහිත', Cloudy: 'වලාකුළු සහිත' } as Record<string, string>,
    ta: { Sunny: 'வெயில்', Rainy: 'மழை', Thunderstorm: 'இடியுடன் கூடிய மழை', Cloudy: 'மேகமூட்டம்' } as Record<string, string>
  }[language];

  const advisory = tWeather.zones[hasMockData ? selectedDistrict : 'Anuradhapura'] || tWeather.zones['Anuradhapura'];

  const getWeatherIcon = (cond: string, size = "h-8 w-8") => {
    switch (cond) {
      case 'Sunny':
        return <Sun className={`${size} text-amber-500 animate-spin-slow`} />;
      case 'Rainy':
        return <CloudRain className={`${size} text-blue-400`} />;
      case 'Thunderstorm':
        return <CloudLightning className={`${size} text-amber-600`} />;
      case 'Cloudy':
      default:
        return <Cloud className={`${size} text-gray-400`} />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-sky-100 relative overflow-hidden" id="weather-widget">
      
      {/* Decorative vector cloud */}
      <div className="absolute top-0 right-0 p-4 bg-sky-50 rounded-bl-3xl border-l border-b border-sky-100 flex items-center gap-2">
        <span className="text-[10px] font-bold text-sky-700 tracking-wider uppercase">{tWeather.climateUnit}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left: District selection & Current Condition */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-sky-600" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-sky-50 text-sky-900 text-sm font-bold px-3 py-1.5 rounded-xl focus:outline-none border border-sky-200 cursor-pointer"
              >
                {SRI_LANKAN_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
            {!hasMockData && (
              <div className="text-[11px] text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/50 font-medium inline-block animate-fade-in">
                {tWeather.warningNearest} {selectedDistrict}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-sky-50 to-sky-100/50 p-4 rounded-2xl border border-sky-100 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-4xl font-black text-sky-950 font-mono">{weather.temp}°C</span>
                {getWeatherIcon(weather.condition, "h-10 w-10")}
              </div>
              <p className="text-sm font-bold text-sky-900 mt-1">
                {conditionLabels[weather.condition] || weather.condition} {tWeather.conditions}
              </p>
              <p className="text-xs text-sky-700/80 mt-0.5">{tWeather.metFeed}</p>
            </div>

            <div className="space-y-1.5 text-xs text-sky-950 font-medium border-l border-sky-200/60 pl-4">
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-sky-600" />
                <span>{tWeather.humidity}: {weather.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="h-4 w-4 text-sky-600" />
                <span>{tWeather.wind}: {weather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center space-x-2">
                <CloudRain className="h-4 w-4 text-sky-600" />
                <span>{tWeather.precipitation}: {weather.rainProbability}%</span>
              </div>
            </div>
          </div>

          {/* 5-day Forecast */}
          <div>
            <h5 className="text-xs font-bold text-sky-950 uppercase tracking-wider mb-2">{tWeather.outlook}</h5>
            <div className="grid grid-cols-5 gap-2">
              {weather.forecast.map((fc, idx) => (
                <div key={idx} className="bg-sky-50/50 p-2.5 rounded-xl border border-sky-100/40 text-center flex flex-col items-center">
                  <span className="text-[10px] font-bold text-sky-900">{dayLabels[fc.day] || fc.day}</span>
                  <div className="my-1.5">{getWeatherIcon(fc.condition, "h-5 w-5")}</div>
                  <span className="text-xs font-bold text-sky-950 font-mono">{fc.temp}°</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: National Smart Ag Advisory Box */}
        <div className="lg:w-96 bg-gradient-to-br from-amber-50 to-amber-100/40 p-5 rounded-2xl border border-amber-200 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#F9A825] text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {tWeather.advisoryTitle}
              </span>
              <span className="text-[10px] font-bold text-amber-800 flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" /> {tWeather.goviFeed}
              </span>
            </div>

            <div>
              <p className="text-xs font-bold text-[#C1622D]">{advisory.zone}</p>
              <p className="text-[11px] font-semibold text-amber-700 mt-0.5">{tWeather.cropCycle}: {advisory.season}</p>
            </div>

            <p className="text-xs text-amber-950/90 leading-relaxed font-medium bg-white/60 p-3 rounded-xl border border-amber-200/50">
              {advisory.advice}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-amber-200/60 text-[11px] text-[#C1622D] font-medium leading-normal">
            <strong className="text-amber-950 block mb-0.5">{tWeather.fertilizerTipTitle}</strong>
            {advisory.fertilizerTip}
          </div>

        </div>

      </div>

    </div>
  );
}
