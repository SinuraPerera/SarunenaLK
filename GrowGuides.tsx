import React, { useState } from 'react';
import { BookOpen, Search, Filter, ShieldCheck, MapPin, Droplets, Beaker, Sprout, ShoppingBag, ShieldAlert } from 'lucide-react';
import { CROP_GROW_GUIDES, CropGuide } from './growGuideData';

export default function GrowGuides({ language = 'en' }: { language?: 'en' | 'si' | 'ta' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGuide, setSelectedGuide] = useState<CropGuide>(CROP_GROW_GUIDES[0]);

  const tGuide = {
    en: {
      title: "Crop Grow Guide & Knowledge Base",
      subtitle: "Explore complete agricultural grow books, seeding frequencies, and pest controls standardized by Sri Lankan extension departments.",
      searchPlaceholder: "Search crop or organic protection (e.g., Paddy, Red Onion, Cinnamon...)",
      indexTitle: "Sri Lankan Cultivation Index",
      yieldTarget: "Yield Target",
      noResults: "No crop grow guides matched your query.",
      manual: "Grow Manual",
      avgYield: "Avg Yield Target",
      soilMatrix: "Soil & pH Matrix",
      waterPrec: "Water / Precipitation",
      sowingRate: "Sowing Rate & Spacing",
      fertilizerApp: "Fertilizer Application",
      chronology: "Chronological Growth Milestones",
      organicTitle: "Organic Pest Protection",
      organicSymptom: "Symptoms",
      organicControl: "Organic / Extension Control",
      harvestProtocol: "Harvesting & Preservation Protocol"
    },
    si: {
      title: "වගා අත්පොත් සහ කෘෂි දැනුම් පද්ධතිය",
      subtitle: "ශ්‍රී ලංකා කෘෂිකර්ම දෙපාර්තමේන්තුව මගින් සම්මත කරන ලද වගා තොරතුරු, වපුරන වාර ගණන සහ පළිබෝධ පාලන ක්‍රම මෙතැනින් බලන්න.",
      searchPlaceholder: "වගාවන් හෝ පළිබෝධ පාලනය සොයන්න (උදා: වී, රතු ළූණු, කුරුඳු...)",
      indexTitle: "ශ්‍රී ලංකා වගා දර්ශකය",
      yieldTarget: "අස්වනු ඉලක්කය",
      noResults: "ඔබ සෙවූ වගාවට අදාළ අත්පොත් සොයාගත නොහැකි විය.",
      manual: "වගා උපදෙස් පොත",
      avgYield: "සාමාන්‍ය අස්වනු ඉලක්කය",
      soilMatrix: "පස සහ pH අගය",
      waterPrec: "ජල අවශ්‍යතාවය",
      sowingRate: "බීජ අවශ්‍යතාවය සහ පරතරය",
      fertilizerApp: "පොහොර යෙදීම",
      chronology: "කාලානුක්‍රමික වර්ධන සන්ධිස්ථාන",
      organicTitle: "කාබනික පළිබෝධ සහ රෝග පාලනය",
      organicSymptom: "ලක්ෂණ",
      organicControl: "කාබනික / දෙපාර්තමේන්තු උපදෙස්",
      harvestProtocol: "අස්වනු නෙලීම සහ ගබඩා කිරීමේ උපදෙස්"
    },
    ta: {
      title: "பயிர் வளர்ப்பு வழிகாட்டி & அறிவுத் தளம்",
      subtitle: "இலங்கை விவசாய விரிவாக்கத் திணைக்களங்களால் தரப்படுத்தப்பட்ட முழுமையான விவசாய வளர்ப்பு புத்தகங்கள், விதைப்பு அதிவெண்கள் மற்றும் பூச்சி கட்டுப்பாடுகளை ஆராயுங்கள்.",
      searchPlaceholder: "பயிர் அல்லது பூச்சி கட்டுப்பாட்டைத் தேடுங்கள் (எ.கா., நெல், சிவப்பு வெங்காயம், இலவங்கப்பட்டை...)",
      indexTitle: "இலங்கை விவசாய குறியீடு",
      yieldTarget: "மகசூல் இலக்கு",
      noResults: "தேடப்பட்ட பயிர் வளர்ப்பு வழிகாட்டிகள் எதுவும் காணப்படவில்லை.",
      manual: "வளர்ப்பு கையேடு",
      avgYield: "சராசரி மகசூல் இலக்கு",
      soilMatrix: "மண் மற்றும் pH அளவீடு",
      waterPrec: "நீர் தேவை / வீழ்ச்சி",
      sowingRate: "விதைப்பு வீதம் மற்றும் இடைவெளி",
      fertilizerApp: "உர பயன்பாடு",
      chronology: "வளர்ச்சி மைல்கற்கள்",
      organicTitle: "இயற்கை பூச்சி மேலாண்மை",
      organicSymptom: "அறிகுறிகள்",
      organicControl: "இயற்கை / திணைக்கள கட்டுப்பாடு",
      harvestProtocol: "அறுவடை மற்றும் சேமிப்பு நெறிமுறை"
    }
  }[language];

  const filteredGuides = CROP_GROW_GUIDES.filter(guide => {
    const matchesSearch = guide.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guide.name.si.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guide.name.ta.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guide.soil.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || guide.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Cereal', 'Export', 'Commercial', 'Vegetable', 'Animal Husbandry'];

  return (
    <div className="space-y-6" id="grow-guides-section">
      
      {/* Header */}
      <div>
        <h3 className="text-2xl font-sans font-black text-gray-900 flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-[#2E7D32]" />
          <span>{tGuide.title}</span>
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {tGuide.subtitle}
        </p>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300/40 p-4 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div className="flex items-start space-x-3">
          <span className="text-3xl shrink-0">📄</span>
          <div>
            <h4 className="text-sm font-black text-amber-950 font-sans">Complete Sri Lankan Smart Agriculture Guide (PDF)</h4>
            <p className="text-xs text-amber-800 font-semibold mt-0.5">
              Features organic soil enrichment, crop rotation charts, and seasonal biosecurity guidelines.
            </p>
          </div>
        </div>
        <a
          href="/guide.pdf"
          download="guide.pdf"
          className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center space-x-1.5 transition-transform hover:scale-[1.02] shrink-0"
        >
          <span>Download PDF Guide</span>
        </a>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="relative md:col-span-7">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={tGuide.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
          />
        </div>
        
        <div className="md:col-span-5 flex items-center space-x-2">
          <Filter className="h-4 w-4 text-[#2E7D32]" />
          <div className="flex flex-wrap gap-1.5 w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2E7D32] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-4 space-y-3 max-h-[550px] overflow-y-auto pr-1">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">{tGuide.indexTitle}</h4>
          {filteredGuides.map(guide => (
            <div
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                selectedGuide.id === guide.id
                  ? 'bg-emerald-50/70 border-2 border-[#2E7D32] shadow-sm'
                  : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start">
                <h5 className="text-xs font-black text-gray-950">{guide.name[language] || guide.name.en}</h5>
                <span className="text-[9px] font-bold bg-white text-[#2E7D32] px-2 py-0.5 rounded-lg border border-emerald-100">
                  {guide.category}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium mt-1">
                {tGuide.yieldTarget}: <strong>{guide.yieldPerAcre}</strong>
              </p>
              
              <div className="flex items-center space-x-1.5 mt-2.5 text-[10px] text-gray-500 font-bold">
                <MapPin className="h-3 w-3 text-red-400" />
                <span className="truncate">Districts: {guide.suitability.slice(0, 3).join(', ')}...</span>
              </div>
            </div>
          ))}

          {filteredGuides.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-xs bg-white rounded-3xl border border-gray-100">
              {tGuide.noResults}
            </div>
          )}
        </div>

        <div className="lg:col-span-8">
          {selectedGuide ? (
            <div className="bg-[#FFFDF7] rounded-3xl p-6 border-2 border-[#2E7D32]/20 shadow-md space-y-6 animate-scale-up">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 gap-3">
                <div>
                  <span className="bg-emerald-50 text-[#2E7D32] text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider border border-emerald-100">
                    {selectedGuide.category} {tGuide.manual}
                  </span>
                  <h4 className="text-lg font-sans font-black text-gray-950 mt-1.5">
                    {selectedGuide.name[language] || selectedGuide.name.en}
                  </h4>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-2xl border border-gray-100 shadow-sm text-center shrink-0">
                  <span className="text-[9px] text-gray-400 font-bold uppercase block">{tGuide.avgYield}</span>
                  <strong className="text-xs text-[#2E7D32] font-black">{selectedGuide.yieldPerAcre}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-3">
                  <div className="bg-amber-50 p-2.5 rounded-xl text-amber-800 shrink-0">
                    <Sprout className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-amber-950 uppercase">{tGuide.soilMatrix}</h5>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{selectedGuide.soil}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-3">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 shrink-0">
                    <Droplets className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-blue-950 uppercase">{tGuide.waterPrec}</h5>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{selectedGuide.water}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-3">
                  <div className="bg-emerald-50 p-2.5 rounded-xl text-[#2E7D32] shrink-0">
                    <ShoppingBag className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-emerald-950 uppercase">{tGuide.sowingRate}</h5>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{selectedGuide.seeds}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-3">
                  <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600 shrink-0">
                    <Beaker className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-purple-950 uppercase">{tGuide.fertilizerApp}</h5>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{selectedGuide.fertilizer}</p>
                  </div>
                </div>

              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-black text-gray-900 uppercase tracking-wider">{tGuide.chronology}</h5>
                <div className="space-y-3">
                  {selectedGuide.stages.map((stg, sIdx) => (
                    <div key={sIdx} className="bg-white p-3.5 rounded-2xl border border-gray-100 flex items-start justify-between gap-4 text-xs">
                      <div className="flex items-start space-x-3">
                        <span className="bg-[#2E7D32]/10 text-[#2E7D32] h-6 w-6 rounded-full flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <div>
                          <strong className="block text-gray-950 text-xs font-black">{stg.name}</strong>
                          <p className="text-gray-500 mt-1 leading-relaxed">{stg.work}</p>
                        </div>
                      </div>
                      <span className="bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider shrink-0 mt-0.5 font-mono">
                        {stg.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-5">
                <h5 className="text-xs font-black text-rose-800 uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="h-4 w-4" />
                  <span>{tGuide.organicTitle}</span>
                </h5>
                <div className="space-y-3">
                  {selectedGuide.pests.map((pest, pIdx) => (
                    <div key={pIdx} className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100/60 space-y-2">
                      <div className="flex justify-between items-center">
                        <strong className="text-xs text-rose-950 font-black">{pest.name}</strong>
                        <span className="bg-rose-100 text-rose-800 text-[9px] font-black px-2 py-0.5 rounded-md uppercase">
                          Biosecurity Alert
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-gray-400 font-bold block mb-0.5">{tGuide.organicSymptom}:</span>
                          <span className="text-gray-600 leading-normal block">{pest.symptoms}</span>
                        </div>
                        <div>
                          <span className="text-emerald-800 font-bold block mb-0.5">{tGuide.organicControl}:</span>
                          <span className="text-emerald-950 leading-normal block font-medium">{pest.organicControl}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center space-x-2 text-[11px] text-[#2E7D32] font-semibold">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>Verified by Sri Lanka Agriculture Extension Office, Division of Entomology. Use organic alternatives whenever possible.</span>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center text-gray-400">
              Select a crop from the left catalog to load certified growth sheets.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
