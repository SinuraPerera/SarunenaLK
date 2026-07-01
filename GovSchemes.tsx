import React, { useState } from 'react';
import { Landmark, Calendar, ShieldCheck, FileCheck, ArrowRight, CheckCircle, Tag, Search, Sparkles } from 'lucide-react';
import { MOCK_SCHEMES } from './mockData';
import { Scheme, Language } from './types';

interface GovSchemesProps {
  language: Language;
}

export default function GovSchemes({ language }: GovSchemesProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Fertilizer' | 'Equipment' | 'Seed' | 'Loan'>('All');
  const [activeScheme, setActiveScheme] = useState<Scheme | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [appliedSchemes, setAppliedSchemes] = useState<string[]>(['scheme-4']);
  
  // Application form fields
  const [goviID, setGoviID] = useState('');
  const [landAcreage, setLandAcreage] = useState('2.5');
  const [bankAccount, setBankAccount] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const filteredSchemes = MOCK_SCHEMES.filter(s => {
    return selectedCategory === 'All' || s.category === selectedCategory;
  });

  const handleOpenApply = (scheme: Scheme) => {
    setActiveScheme(scheme);
    setFormSuccess(false);
    setShowApplyModal(true);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;

    if (activeScheme) {
      setAppliedSchemes([...appliedSchemes, activeScheme.id]);
    }
    setFormSuccess(true);
  };

  const getCategoryIcon = (cat: Scheme['category']) => {
    switch (cat) {
      case 'Fertilizer':
        return '🧪';
      case 'Equipment':
        return '⚙️';
      case 'Seed':
        return '🌱';
      case 'Loan':
        return '💳';
      case 'Disaster':
        return '🚨';
    }
  };

  return (
    <div className="space-y-6" id="gov-subsidies-section">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-lg border-b-4 border-[#F9A825] relative overflow-hidden">
        {/* Subtle decorative motif */}
        <div className="absolute right-0 bottom-0 opacity-10 text-9xl transform translate-y-10 translate-x-10">
          🌾
        </div>

        <div className="max-w-2xl space-y-3">
          <div className="flex items-center space-x-2">
            <span className="bg-[#F9A825] text-gray-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
              Independent Initiative Portal
            </span>
            <span className="text-emerald-300 font-bold text-xs">Direct Farmer Benefits</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tight leading-tight">
            Agricultural Initiatives, Schemes & Grants
          </h3>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Browse and apply for private agricultural grants, community organic compost distributions, and independent farm-modernization loans facilitated by SarunenaLK.
          </p>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex bg-gray-100 rounded-2xl p-1.5 overflow-x-auto scrollbar-none gap-1">
        {(['All', 'Fertilizer', 'Equipment', 'Seed', 'Loan'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white text-[#2E7D32] shadow-sm border border-[#2E7D32]/10'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <span>{cat === 'All' ? '📂' : cat === 'Fertilizer' ? '🧪' : cat === 'Equipment' ? '⚙️' : cat === 'Seed' ? '🌱' : '💳'}</span>
            <span>{cat} Schemes</span>
          </button>
        ))}
      </div>

      {/* Schemes Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="schemes-grid">
        {filteredSchemes.map((scheme) => {
          const isApplied = appliedSchemes.includes(scheme.id);
          
          return (
            <div
              key={scheme.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative flex flex-col justify-between"
              id={`scheme-card-${scheme.id}`}
            >
              <div className="space-y-4">
                {/* Category & Badge */}
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-50 text-[#2E7D32] text-[11px] font-bold px-3 py-1 rounded-xl flex items-center">
                    <span className="mr-1.5">{getCategoryIcon(scheme.category)}</span>
                    {scheme.category}
                  </span>

                  <span className="text-xs text-gray-400 font-medium flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-[#F9A825]" />
                    Deadline: {scheme.deadline}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h4 className="text-lg font-bold text-gray-950 leading-snug">
                    {scheme.title[language] || scheme.title.en}
                  </h4>
                  <p className="text-xs text-[#2E7D32] font-semibold mt-1">
                    Certified by: {scheme.authority[language] || scheme.authority.en}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50/50 p-3.5 rounded-2xl border border-gray-100">
                  {scheme.description[language] || scheme.description.en}
                </p>

                {/* Subsidy cover value */}
                <div className="flex items-center space-x-3 bg-gradient-to-r from-amber-50 to-amber-100/30 p-3 rounded-2xl border border-amber-100">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="text-[10px] font-bold text-[#C1622D] uppercase tracking-wider">Independent Project Funding</p>
                    <p className="text-sm font-black text-amber-950 font-mono">Covers {scheme.subsidyPercentage}% of total operational expenditure</p>
                  </div>
                </div>

                {/* Eligibility Tags */}
                <div>
                  <h5 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5 flex items-center">
                    <Tag className="h-3.5 w-3.5 mr-1" /> Minimum Eligibility Criteria
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.eligibility.map((el, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">
                        ✓ {el}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply / Status Action row */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure Filing</span>
                </div>

                {isApplied ? (
                  <span className="px-5 py-2.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl flex items-center space-x-1 border border-emerald-200">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Applied & Certified</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleOpenApply(scheme)}
                    className="flex items-center space-x-1 px-5 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-black rounded-xl shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Form Modal wizard */}
      {showApplyModal && activeScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" id="apply-modal">
          <div className="relative w-full max-w-lg bg-[#FFFDF7] rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-800/10">
            {/* Header */}
            <div className="bg-[#2E7D32] text-white p-5 text-center relative border-b-4 border-[#F9A825]">
              <button
                onClick={() => setShowApplyModal(false)}
                className="absolute top-4 right-4 text-emerald-100 hover:text-white bg-emerald-900/40 p-1.5 rounded-full cursor-pointer"
              >
                ✕
              </button>
              <h4 className="text-lg font-bold font-sans">Farming Grants Filing Form</h4>
              <p className="text-[10px] text-emerald-100/80 mt-1">
                Applying for: {activeScheme.title.en}
              </p>
            </div>

            <div className="p-6">
              {formSuccess ? (
                <div className="text-center py-6 space-y-4 animate-scale-up">
                  <div className="inline-flex items-center justify-center p-4 bg-emerald-100 text-[#2E7D32] rounded-full">
                    <CheckCircle className="h-12 w-12" />
                  </div>
                  <div>
                    <h5 className="text-lg font-black text-gray-900">Application Lodged Successfully!</h5>
                    <p className="text-xs text-[#2E7D32] font-mono mt-1">Reference: SRN-SL-{Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                    Your digital grant application has been logged into our independent farmer registry. The SarunenaLK agricultural verification team will review your field dimensions and reach out to certify your dispatch within 5 working days.
                  </p>
                  <button
                    onClick={() => setShowApplyModal(false)}
                    className="px-6 py-2 bg-[#2E7D32] text-white text-xs font-bold rounded-xl cursor-pointer shadow-md"
                  >
                    Return to Portal
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Sarunena Farmer ID (සරුනැණ ID)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SRN-WP-82910"
                      value={goviID}
                      onChange={(e) => setGoviID(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 font-mono"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">If you don't have a Farmer ID, we will automatically generate one for you upon registration.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Total Cultivated Area (Acres)</label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={landAcreage}
                        onChange={(e) => setLandAcreage(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Bank Account (People's Bank/NSB/Commercial)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1020-3940-5920-001"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 font-mono"
                      />
                    </div>
                  </div>

                  {/* Warning terms */}
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-start space-x-2.5">
                    <input
                      type="checkbox"
                      id="accept-terms"
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 accent-[#2E7D32]"
                    />
                    <label htmlFor="accept-terms" className="text-[11px] text-[#2E7D32] leading-relaxed font-semibold">
                      I solemnly certify that the lands declared are active and part of my local cultivation fields. I consent to verification audits by the SarunenaLK team.
                    </label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setShowApplyModal(false)}
                      className="px-4 py-2 border border-gray-200 text-gray-500 font-bold rounded-xl text-xs hover:bg-gray-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!termsAccepted}
                      className="px-5 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:opacity-50 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md flex items-center space-x-1"
                    >
                      <FileCheck className="h-4 w-4" />
                      <span>Submit Digital Application</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
