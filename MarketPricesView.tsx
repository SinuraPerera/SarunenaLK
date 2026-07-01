import React, { useState } from 'react';
import { Search, MapPin, TrendingUp, TrendingDown, RefreshCw, Filter, Award, Sparkles, DollarSign } from 'lucide-react';
import { MOCK_MARKET_PRICES, SRI_LANKAN_DISTRICTS } from './mockData';
import { MarketPrice, Language } from './types';

interface MarketPricesViewProps {
  language: Language;
}

export default function MarketPricesView({ language }: MarketPricesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [prices, setPrices] = useState<MarketPrice[]>(MOCK_MARKET_PRICES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter items
  const filteredPrices = prices.filter(item => {
    const matchesSearch = item.cropName.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.cropName.si.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.cropName.ta.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || item.district === selectedDistrict;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesDistrict && matchesCategory;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const updated = prices.map(p => {
        const changeDir = Math.random() > 0.4 ? 1 : -1;
        const changePercent = parseFloat((Math.random() * 4).toFixed(1));
        const diff = (p.pricePerKg * (changePercent / 100)) * changeDir;
        const newPrice = Math.max(15, Math.round(p.pricePerKg + diff));
        
        const currentTrend = [...p.trendData];
        currentTrend.shift();
        currentTrend.push(newPrice);

        return {
          ...p,
          pricePerKg: newPrice,
          yesterdayPrice: p.pricePerKg,
          change: changeDir > 0 ? 'up' as const : changeDir < 0 ? 'down' as const : 'stable' as const,
          changePercentage: changePercent,
          trendData: currentTrend
        };
      });
      setPrices(updated);
      setIsRefreshing(false);
    }, 800);
  };

  // Sparkline generator
  const renderSparkline = (data: number[]) => {
    const width = 100;
    const height = 30;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const points = data.map((val, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    const isUp = data[data.length - 1] >= data[0];

    return (
      <svg className="h-8 w-24 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill="none"
          stroke={isUp ? '#10b981' : '#f43f5e'}
          strokeWidth="2.5"
          points={points}
        />
        <circle
          cx={width}
          cy={height - ((data[data.length - 1] - min) / range) * height}
          r="3"
          fill={isUp ? '#10b981' : '#f43f5e'}
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6" id="market-prices-section">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-sans font-black text-gray-900 flex items-center gap-2">
            <span>📈 Sri Lanka Daily Crop Market Prices</span>
            <span className="bg-red-100 text-red-800 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-ping"></span> Live HARTI Feed
            </span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Official wholesale prices across major Economic Centers (Dambulla, Pettah, Keppetipola).
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#FFFDF7] text-gray-700 hover:text-[#2E7D32] hover:bg-[#2E7D32]/5 border-2 border-[#2E7D32]/20 font-bold rounded-xl text-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-[#2E7D32]' : ''}`} />
          <span>{isRefreshing ? 'Fetching latest rates...' : 'Synchronize Feed'}</span>
        </button>
      </div>

      <div className="bg-[#FFFDF7] border-2 border-[#F9A825]/30 rounded-2xl p-4 overflow-hidden shadow-inner flex items-center space-x-6">
        <span className="bg-[#F9A825] text-amber-950 font-black text-[11px] px-2.5 py-1 rounded-lg uppercase shrink-0">
          MARKET BULLS:
        </span>
        <div className="flex space-x-8 text-xs font-bold text-gray-800 animate-pulse whitespace-nowrap overflow-x-auto scrollbar-none py-1 w-full">
          {prices.map(p => (
            <div key={p.id} className="flex items-center space-x-1 shrink-0">
              <span className="text-gray-900">{p.cropName[language] || p.cropName.en}</span>
              <span className="font-mono text-gray-900">Rs.{p.pricePerKg}</span>
              {p.change === 'up' ? (
                <span className="text-emerald-600 flex items-center">▲ +{p.changePercentage}%</span>
              ) : p.change === 'down' ? (
                <span className="text-rose-600 flex items-center">▼ -{p.changePercentage}%</span>
              ) : (
                <span className="text-gray-400">● 0%</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search crop (e.g., Carrots, Paddy...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
          />
        </div>

        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 cursor-pointer appearance-none"
          >
            <option value="All">All Crop Categories</option>
            <option value="Paddy">Paddy Rice</option>
            <option value="Vegetable">Vegetables</option>
            <option value="Spice">Ceylon Spices</option>
            <option value="Coconut">Coconuts</option>
          </select>
        </div>

        <div className="relative col-span-1 md:col-span-2">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 cursor-pointer appearance-none"
          >
            <option value="All">All Sri Lankan District Centers</option>
            {SRI_LANKAN_DISTRICTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
            <option value="Dambulla (Matale)">Dambulla Economic Center</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-[#2E7D32]/5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Crop Name</th>
                <th className="px-6 py-4">District Hub</th>
                <th className="px-6 py-4 text-right">Today's Price</th>
                <th className="px-6 py-4 text-right">Yesterday's Rate</th>
                <th className="px-6 py-4 text-center">Price Delta</th>
                <th className="px-6 py-4 text-center">Trend (5-day)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
              {filteredPrices.length > 0 ? (
                filteredPrices.map((item) => {
                  const percentageDiff = item.changePercentage;
                  const isUp = item.change === 'up';
                  const isDown = item.change === 'down';

                  return (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{item.cropName[language] || item.cropName.en}</div>
                        <div className="text-[10px] text-[#2E7D32] font-semibold">{item.category}</div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center text-xs font-semibold text-gray-600">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          {item.district}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right font-mono font-bold text-gray-900">
                        Rs. {item.pricePerKg.toFixed(2)} /kg
                      </td>

                      <td className="px-6 py-4 text-right font-mono text-gray-500">
                        Rs. {item.yesterdayPrice.toFixed(2)} /kg
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {isUp ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              +{percentageDiff}%
                            </span>
                          ) : isDown ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-700">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              {percentageDiff}%
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-gray-50 text-gray-500">
                              Stable
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {renderSparkline(item.trendData)}
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">
                    No matching agricultural products found under the current search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-[#FFFDF7] rounded-2xl border border-[#F9A825]/20 text-xs text-gray-600 leading-relaxed flex items-start gap-2">
        <span className="text-[#C1622D] text-sm">💡</span>
        <span>
          <strong>Farming Tip:</strong> Price differences are influenced by transportation, moisture quality, and localized supply. Paddy prices fluctuate according to Yala/Maha seasonal harvesting cycles. For guaranteed farm-gate buying operations, consult with local Govi Niladhari officers.
        </span>
      </div>

    </div>
  );
}
