import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Phone, ShieldCheck, Landmark, Compass, HelpCircle } from 'lucide-react';
import { SRI_LANKAN_DISTRICTS } from './mockData';

export default function AboutContact({ language = 'en' }: { language?: 'en' | 'si' | 'ta' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [district, setDistrict] = useState('Anuradhapura');
  const [success, setSuccess] = useState(false);

  const tAbout = {
    en: {
      title: "🌿 SarunenaLK Independent Smart Agriculture Project",
      subtitle: "Smart farming support for Sri Lankan communities with practical advice, local tools, and faster access to trusted guidance.",
      missionTitle: "Project Conception & Scope",
      missionP1: "SarunenaLK is a premium, independent smart agricultural platform designed to provide direct, transparent agronomic support, localized climate data, and digital resources to Sri Lankan smallholder farmers.",
      missionP2: "By monitoring field conditions, providing real-time wholesale crop price trends, and facilitating active farmer registration, SarunenaLK equips growers with independent tools to bypass predatory intermediaries, cut waste, and optimize fertilizer inputs across Sri Lanka's wet, dry, and intermediate zones.",
      partnersTitle: "Technology Stack & Core Sources",
      p1: "SVD Group",
      p2: "HARTI Real-Time Pricing Index",
      p3: "Independent Agricultural Knowledge Sources",
      p4: "Independent Farmer Networks",
      faqTitle: "Frequently Asked Farmer Questions (FAQ)",
      q1: "Q: What is a Sarunena Farmer ID, and how do I register?",
      a1: "A Sarunena Farmer ID is a unique digital credential allocated to active Sri Lankan agricultural landholders who register on our system. Registering adds you to our Active Farmers Network immediately.",
      q2: "Q: Is this platform affiliated with the government?",
      a2: "No, this is an entirely independent, private smart farming initiative. All agronomy guidance and market rates are sourced from open-market databases and expert agronomy datasets.",
      formTitle: "Agronomist Support Desk",
      formSubtitle: "Submit questions about soil health, fertilizer distributions, or site pests.",
      successTitle: "Enquiry Logged Successfully",
      successSubtitle: "Your agricultural enquiry has been dispatched to our independent support team. We will review your questions and contact you with expert agronomy advice within 48 hours.",
      anotherBtn: "Submit Another Question",
      nameLabel: "Your Name",
      emailLabel: "Email Address",
      districtLabel: "District",
      enquiryLabel: "Enquiry / Message",
      placeholderEnquiry: "Describe your soil, crop variety, or question about seed distributions...",
      submitBtn: "Send Enquiry to Support Team",
      secureNotice: "Replies are routed securely via SarunenaLK Independent Support. No charges apply."
    },
    si: {
      title: "🌿 සරුනැණLK ස්වාධීන ස්මාර්ට් කෘෂිකාර්මික පද්ධතිය",
      subtitle: "ශ්‍රී ලාංකීය ගොවීන් සඳහා සැලසුම් කර ඇති ස්වාධීන, උසස් කෘෂිකාර්මික ද්වාරයකි.",
      missionTitle: "ව්‍යාපෘති සංකල්පය සහ විෂය පථය",
      missionP1: "සරුනැණ LK යනු ස්වාධීන, උසස් ස්මාර්ට් කෘෂිකාර්මික පද්ධතියකි. කිසිදු රජයේ මැදිහත් වීමකින් තොරව, ශ්‍රී ලාංකීය ගොවීන්ට සෘජු, විනිවිදභාවයෙන් යුත් කෘෂි උපදෙස්, දේශීය දේශගුණික දත්ත සහ ඩිජිටල් සම්පත් ලබා දීමට මෙය සකසා ඇත.",
      missionP2: "ක්ෂේත්‍ර තත්ත්වයන් නිරීක්ෂණය කිරීම, තථ්‍ය කාලීන තොග මිල දර්ශක ලබා දීම සහ සක්‍රීය ගොවි ලියාපදිංචිය සක්‍රීය කිරීම මඟින්, සරුනැණ LK ශ්‍රී ලංකාවේ වියළි හා තෙත් කලාපවල ගොවීන්ට තැරැව්කරුවන් මඟහැරීමට සහ වගාවන් සාර්ථක කර ගැනීමට ස්වාධීන මෙවලම් සපයයි.",
      partnersTitle: "තාක්ෂණික පද්ධතිය සහ මූලාශ්‍ර",
      p1: "SVD Group",
      p2: "HARTI වෙළඳපල මිලකරණ මධ්‍යස්ථානය",
      p3: "ස්වාධීන කෘෂිකාර්මික දත්ත මූලාශ්‍ර",
      p4: "ස්වාධීන ගොවි ජාලයන්",
      faqTitle: "ගොවීන් නිතර අසන ප්‍රශ්න (FAQ)",
      q1: "ප්‍රශ්නය: සරුනැණ ගොවි හැඳුනුම්පතක් යනු කුමක්ද සහ මම ලියාපදිංචි වන්නේ කෙසේද?",
      a1: "පිළිතුර: සරුනැණ ගොවි හැඳුනුම්පතක් යනු අපගේ පද්ධතියේ ලියාපදිංචි වන ශ්‍රී ලංකාවේ ක්‍රියාකාරී කෘෂිකාර්මික ගොවීන්ට ලබා දෙන සුවිශේෂී ස්වාධීන හැඳුනුම්පතකි. ලියාපදිංචි වූ සැනින් ඔබව අපගේ සක්‍රීය ගොවි ජාලයට එක් කරනු ලැබේ.",
      q2: "ප්‍රශ්නය: මෙම වේදිකාව රජයට සම්බන්ධ ද?",
      a2: "පිළිතුර: නැත, මෙය සම්පූර්ණයෙන්ම ස්වාධීන, පෞද්ගලික ස්මාර්ට් ගොවිතැන් මුලපිරීමකි. සියලුම කෘෂිකාර්මික උපදෙස් සහ වෙළඳපල මිල ගණන් විවෘත දත්ත සමුදායන්ගෙන් ලබා ගනී.",
      formTitle: "කෘෂි විද්‍යාඥ උපදෙස් කවුළුව",
      formSubtitle: "පස්වල සාරවත් බව, පොහොර භාවිතය හෝ පළිබෝධ හානි පිළිබඳ ප්‍රශ්න මෙහි ඉදිරිපත් කරන්න.",
      successTitle: "විමසීම සාර්ථකව වාර්තා කරන ලදී",
      successSubtitle: "ඔබේ විමසීම අපගේ ස්වාධීන සහාය කණ්ඩායම වෙත යොමු කර ඇත. අපගේ විශේෂඥ කණ්ඩායම පැය 48ක් ඇතුළත ඔබට විද්‍යුත් තැපෑලෙන් පිළිතුරු සපයනු ඇත.",
      anotherBtn: "තවත් ප්‍රශ්නයක් යොමු කරන්න",
      nameLabel: "ඔබේ නම",
      emailLabel: "විද්‍යුත් ලිපිනය",
      districtLabel: "දිස්ත්‍රික්කය",
      enquiryLabel: "විමසීම / පණිවිඩය",
      placeholderEnquiry: "ඔබේ වගා පස, බෝග වර්ගය හෝ පොහොර භාවිතය පිළිබඳ විස්තර මෙහි සටහන් කරන්න...",
      submitBtn: "විමසීම සහාය කණ්ඩායම වෙත යොමු කරන්න",
      secureNotice: "පිළිතුරු සරුනැණ LK ස්වාධීන සහාය සේවාව හරහා ආරක්ෂිතව යොමු කෙරේ. කිසිදු ගාස්තුවක් අය නොකෙරේ."
    },
    ta: {
      title: "🌿 சருனேனLK சுயாதீன ஸ்மார்ட் விவசாயத் திட்டம்",
      subtitle: "இலங்கை விவசாயிகளுக்காக வடிவமைக்கப்பட்ட ஒரு சுயாதீன, பிரீமியம் ஸ்மார்ட் விவசாய இயங்குதளம்.",
      missionTitle: "திட்டத்தின் கருத்து & எல்லை",
      missionP1: "சருனேனLK என்பது சுயாதீன, பிரீமியம் ஸ்மார்ட் விவசாய இயங்குதளமாகும். எந்தவொரு அரசாங்கத் தலையீடும் இன்றி, இலங்கை விவசாயிகளுக்கு நேரடி, வெளிப்படையான விவசாய ஆலோசனைகள், தட்பவெப்ப நிலை தரவுகள் மற்றும் டிஜிட்டல் வளங்களை வழங்க இது வடிவமைக்கப்பட்டுள்ளது.",
      missionP2: "வளர்ப்பு சென்சார்களில் இருந்து தரவுகளை சேகரித்தல், தினசரி சில்லறை விலை மாற்றங்களைக் கண்காணித்தல் மற்றும் செயலில் உள்ள விவசாயி பதிவை எளிதாக்குவதன் மூலம், சருனேனLK தளம் விவசாயிகளுக்கு சுயாதீன கருவிகளை வழங்குகிறது.",
      partnersTitle: "தொழில்நுட்ப கட்டமைப்பு & மூலங்கள்",
      p1: "SVD Group",
      p2: "ஹார்ட்டி (HARTI) சந்தை விலை மையம்",
      p3: "சுயாதீன விவசாய அறிவு ஆதாரங்கள்",
      p4: "சுயாதீன விவசாயி நெட்வொர்க்குகள்",
      faqTitle: "விவசாயிகள் அடிக்கடி கேட்கும் கேள்விகள் (FAQ)",
      q1: "கேள்வி: சருனேன விவசாயி ஐடி என்றால் என்ன, நான் எப்படி பதிவு செய்வது?",
      a1: "பதில்: சருனேன விவசாயி ஐடி என்பது எங்கள் அமைப்பில் பதிவு செய்யும் இலங்கை விவசாய நில உரிமையாளர்களுக்கு ஒதுக்கப்படும் தனித்துவமான சுயாதீன டிஜிட்டல் சான்றாகும். பதிவு செய்வது உங்களை எங்கள் செயலில் உள்ள விவசாயிகள் நெட்வொர்க்கில் உடனடியாக சேர்க்கும்.",
      q2: "கேள்வி: இந்த தளம் அரசாங்கத்துடன் தொடர்புடையதா?",
      a2: "பதில்: இல்லை, இது முற்றிலும் சுயாதீனமான, தனியார் ஸ்மார்ட் விவசாய முயற்சியாகும்.",
      formTitle: "விவசாய வல்லுநர் விசாரணை பிரிவு",
      formSubtitle: "மண் வளம், உர விநியோகம் அல்லது பயிர் பூச்சிகள் பற்றிய கேள்விகளை சமர்ப்பிக்கவும்.",
      successTitle: "விசாரணை வெற்றிகரமாக பதிவு செய்யப்பட்டது",
      successSubtitle: "உங்கள் விசாரணை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது. 48 மணி நேரத்திற்குள் உங்களுக்கு பதில் வழங்கப்படும்.",
      anotherBtn: "மற்றொரு கேள்வியைச் சமர்ப்பிக்கவும்",
      nameLabel: "உங்கள் பெயர்",
      emailLabel: "மின்னஞ்சல் முகவரி",
      districtLabel: "மாவட்டம்",
      enquiryLabel: "விசாரணை / செய்தி",
      placeholderEnquiry: "உங்கள் மண், பயிர் வகை அல்லது உரங்கள் பற்றிய கேள்விகளை விவரிக்கவும்...",
      submitBtn: "ஆதரவுக் குழுவிற்கு விசாரணையை அனுப்பவும்",
      secureNotice: "பதில்கள் சருனேனLK சுயாதீன ஆதரவு மூலம் பாதுகாப்பாக அனுப்பப்படுகின்றன. கட்டணம் எதுவும் இல்லை."
    }
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="space-y-8 animate-fade-in" id="about-contact-section">
      
      <div>
        <h3 className="text-2xl font-sans font-black text-gray-900 flex items-center gap-2">
          <span>{tAbout.title}</span>
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {tAbout.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Vision & Partners (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-4">
            <h4 className="text-md font-bold text-gray-950 flex items-center">
              <Compass className="h-5 w-5 mr-2 text-[#2E7D32]" />
              {tAbout.missionTitle}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {tAbout.missionP1}
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              {tAbout.missionP2}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/30 p-6 rounded-3xl border border-emerald-100 space-y-3">
            <h4 className="text-sm font-bold text-emerald-950 uppercase tracking-wide">{tAbout.partnersTitle}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-900 font-semibold">
              <div className="bg-white p-3 rounded-xl border border-emerald-100/50 flex items-center space-x-2">
                <span>🌾</span>
                <span>{tAbout.p1}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-100/50 flex items-center space-x-2">
                <span>📍</span>
                <span>{tAbout.p2}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-100/50 flex items-center space-x-2">
                <span>⚡</span>
                <span>{tAbout.p3}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-100/50 flex items-center space-x-2">
                <span>🏛️</span>
                <span>{tAbout.p4}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-4">
            <h4 className="text-md font-bold text-gray-950 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-[#2E7D32]" />
              {tAbout.faqTitle}
            </h4>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs font-bold text-gray-900">{tAbout.q1}</p>
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                  {tAbout.a1}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs font-bold text-gray-900">{tAbout.q2}</p>
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                  {tAbout.a2}
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-4">
            
            <div className="border-b border-gray-100 pb-3">
              <h4 className="text-md font-bold text-gray-950">{tAbout.formTitle}</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">{tAbout.formSubtitle}</p>
            </div>

            {success ? (
              <div className="text-center py-8 space-y-3">
                <div className="inline-flex p-3 bg-emerald-50 text-[#2E7D32] rounded-full">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h5 className="text-sm font-bold text-gray-900">{tAbout.successTitle}</h5>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-normal">
                  {tAbout.successSubtitle}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 bg-[#2E7D32] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  {tAbout.anotherBtn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{tAbout.nameLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samitha Perera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{tAbout.emailLabel}</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. samitha@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{tAbout.districtLabel}</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 cursor-pointer"
                  >
                    {SRI_LANKAN_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{tAbout.enquiryLabel}</label>
                  <textarea
                    rows={4}
                    required
                    placeholder={tAbout.placeholderEnquiry}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1B5E20] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{tAbout.submitBtn}</span>
                </button>
              </form>
            )}

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 space-y-2 text-[11px] text-emerald-900">
              <div className="flex items-center gap-2 font-bold">
                <Phone className="h-4 w-4" />
                <span>Direct support</span>
              </div>
              <p>+94 77 447 0098</p>
              <p>sinuradamsath2022@gmail.com</p>
              <p>Hotline: 1920</p>
              <p>23, Wattegedara Road, Maharagama</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center space-x-2 text-[10px] text-gray-400 font-medium leading-relaxed">
              <ShieldCheck className="h-4 w-4 text-[#2E7D32]" />
              <span>{tAbout.secureNotice}</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
