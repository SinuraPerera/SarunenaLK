import React, { useState } from 'react';
import { Sprout, Activity, Thermometer, ShieldAlert, Plus, Layers, Sparkles, Calendar, Trash2, Heart, PlusCircle } from 'lucide-react';
import { Crop, Language } from './types';
import { translations } from './mockData';

interface CropMonitoringProps {
  language: Language;
  crops: Crop[];
  setCrops: React.Dispatch<React.SetStateAction<Crop[]>>;
}

export default function CropMonitoring({ language, crops, setCrops }: CropMonitoringProps) {
  const t = translations[language];
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New Crop fields
  const [nameEn, setNameEn] = useState('');
  const [nameSi, setNameSi] = useState('');
  const [category, setCategory] = useState<'Vegetable' | 'Paddy' | 'Fruit' | 'Spice' | 'Export'>('Paddy');
  const [areaAcres, setAreaAcres] = useState('1.5');
  const [soilPH, setSoilPH] = useState('6.5');
  const [growthStage, setGrowthStage] = useState<'Seeding' | 'Vegetative' | 'Flowering' | 'Harvesting'>('Seeding');
  
  const handleAddCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn) return;

    const newCrop: Crop = {
      id: `crop-${Date.now()}`,
      name: {
        en: nameEn,
        si: nameSi || nameEn,
        ta: nameEn
      },
      category: category,
      healthStatus: 'Excellent',
      growthStage: growthStage,
      progress: growthStage === 'Seeding' ? 10 : growthStage === 'Vegetative' ? 40 : growthStage === 'Flowering' ? 70 : 95,
      plantedDate: new Date().toISOString().split('T')[0],
      expectedHarvest: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      areaAcres: parseFloat(areaAcres) || 1.0,
      moisture: 75,
      soilPH: parseFloat(soilPH) || 6.5,
      alerts: []
    };

    setCrops([newCrop, ...crops]);
    setShowAddForm(false);
    
    // reset fields
    setNameEn('');
    setNameSi('');
  };

  const handleDeleteCrop = (id: string) => {
    setCrops(crops.filter(c => c.id !== id));
  };

  const getHealthColor = (status: Crop['healthStatus']) => {
    switch (status) {
      case 'Excellent':
        return 'bg-emerald-500 text-white';
      case 'Good':
        return 'bg-green-500 text-white';
      case 'Fair':
        return 'bg-[#F9A825] text-gray-900';
      case 'At Risk':
        return 'bg-red-500 text-white animate-pulse';
    }
  };

  const getHealthBadge = (status: Crop['healthStatus']) => {
    switch (status) {
      case 'Excellent':
        return 'Excellent';
      case 'Good':
        return 'Good';
      case 'Fair':
        return 'Attention Needed';
      case 'At Risk':
        return 'Critical Risk';
    }
  };

  return (
    <div className="space-y-6" id="crop-monitoring-section">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-sans font-black text-gray-900 flex items-center gap-2">
            <Sprout className="h-7 w-7 text-[#2E7D32]" />
            <span>{t.navCrops}</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Real-time sensory insights, crop health indicators, and field tracking for your holdings.
          </p>
        </div>

        <button
          id="add-crop-toggle-btn"
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white font-bold rounded-2xl shadow-md transition-all hover:scale-[1.02] cursor-pointer"
        >
          {showAddForm ? 'Close Recorder' : 'Record New Crop'}
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {showAddForm && (
        <form 
          onSubmit={handleAddCrop} 
          className="bg-[#FFFDF7] border-2 border-[#2E7D32] p-6 rounded-3xl shadow-xl space-y-4 animate-fade-in"
          id="add-crop-form"
        >
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <Sparkles className="h-5 w-5 text-[#2E7D32]" />
            <h4 className="text-md font-bold text-gray-900">Digital Crop Registry Form</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Crop Name (English)</label>
              <input
                type="text"
                required
                placeholder="e.g. Red Chilli (M3 variety)"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Crop Name (Sinhala / Tamil)</label>
              <input
                type="text"
                placeholder="e.g. මිරිස් / மிளகாய்"
                value={nameSi}
                onChange={(e) => setNameSi(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 cursor-pointer"
              >
                <option value="Paddy">Paddy Rice (වී)</option>
                <option value="Vegetable">Vegetable (එළවළු)</option>
                <option value="Fruit">Fruit (පළතුරු)</option>
                <option value="Spice">Spice (කුළුබඩු)</option>
                <option value="Export">Export Crop (අපනයන භෝග)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Land Size (Acres)</label>
              <input
                type="number"
                step="0.1"
                required
                value={areaAcres}
                onChange={(e) => setAreaAcres(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Soil pH Level</label>
              <input
                type="number"
                step="0.1"
                required
                value={soilPH}
                onChange={(e) => setSoilPH(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Initial Growth Stage</label>
              <select
                value={growthStage}
                onChange={(e) => setGrowthStage(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 cursor-pointer"
              >
                <option value="Seeding">Seeding (පැළ)</option>
                <option value="Vegetative">Vegetative (වැඩෙන)</option>
                <option value="Flowering">Flowering (මල් පිපෙන)</option>
                <option value="Harvesting">Harvesting (අස්වනු නෙලන)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-200 text-gray-500 font-bold rounded-xl text-sm hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold rounded-xl text-sm cursor-pointer shadow-md"
            >
              Confirm and Add
            </button>
          </div>
        </form>
      )}

      {/* Grid of Crops */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="crops-grid-container">
        {crops.map((crop) => (
          <div
            key={crop.id}
            id={`crop-card-${crop.id}`}
            className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 relative flex flex-col justify-between"
          >
            {/* Top Indicator */}
            <div className="flex justify-between items-start mb-3">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getHealthColor(crop.healthStatus)}`}>
                {getHealthBadge(crop.healthStatus)}
              </span>
              <button
                id={`crop-delete-${crop.id}`}
                onClick={() => handleDeleteCrop(crop.id)}
                className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Remove crop from tracking"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Title & Core Details */}
            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-900 font-sans">
                {crop.name[language] || crop.name.en}
              </h4>
              <p className="text-xs text-gray-500 font-medium">
                🌱 {crop.category} • {crop.areaAcres} Acres
              </p>
            </div>

            {/* Progress Gauge */}
            <div className="space-y-1.5 mb-4 bg-gray-50/70 p-3 rounded-2xl border border-gray-100">
              <div className="flex justify-between text-xs font-bold text-gray-700">
                <span>Stage: {crop.growthStage}</span>
                <span className="font-mono text-[#2E7D32]">{crop.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#2E7D32] h-full rounded-full transition-all duration-1000"
                  style={{ width: `${crop.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-medium pt-1">
                <span>Planted: {crop.plantedDate}</span>
                <span>Harvest: {crop.expectedHarvest}</span>
              </div>
            </div>

            {/* Sensor readings (Moisture, pH) */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-medium text-gray-600">
              <div className="bg-sky-50 p-2 rounded-xl border border-sky-100 flex flex-col">
                <span className="text-[10px] uppercase font-bold text-sky-800 tracking-wider">Moisture</span>
                <span className="text-sm font-bold font-mono text-sky-950 mt-0.5">{crop.moisture}%</span>
              </div>
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-100 flex flex-col">
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Soil pH</span>
                <span className="text-sm font-bold font-mono text-amber-950 mt-0.5">{crop.soilPH}</span>
              </div>
            </div>

            {/* Warnings/Alerts from Ag-sensors */}
            {crop.alerts.length > 0 && (
              <div className="bg-red-50 p-2.5 rounded-xl border border-red-100 text-[11px] text-red-700 font-medium space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <ShieldAlert className="h-3.5 w-3.5" /> Sensory Advisories:
                </span>
                <ul className="list-disc pl-4 space-y-0.5">
                  {crop.alerts.map((al, idx) => (
                    <li key={idx} className="leading-tight">{al}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
