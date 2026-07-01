import React, { useState, useEffect } from 'react';
import { Search, MapPin, Tag, Plus, Phone, ShoppingCart, UserCheck, X, Check, Image as ImageIcon } from 'lucide-react';
import { MOCK_MARKETPLACE, SRI_LANKAN_DISTRICTS } from './mockData';
import { MarketplaceItem, Language, User } from './types';

interface MarketplaceProps {
  language: Language;
  user: User | null;
  onOpenAuth?: () => void;
}

export default function Marketplace({ language, user, onOpenAuth }: MarketplaceProps) {
  const [items, setItems] = useState<MarketplaceItem[]>(() => {
    try {
      const saved = localStorage.getItem('sarunena_marketplace_items');
      return saved ? JSON.parse(saved) : MOCK_MARKETPLACE;
    } catch {
      return MOCK_MARKETPLACE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sarunena_marketplace_items', JSON.stringify(items));
    } catch (e) {
      // Silent localStorage failure
    }
  }, [items]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Produce' | 'Seedlings' | 'Equipment' | 'Fertilizer' | 'Services'>('Produce');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('kg');
  const [quantity, setQuantity] = useState('');
  const [district, setDistrict] = useState('Anuradhapura');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (user) {
      setPhone(user.phone || '');
      setDistrict(user.district || 'Anuradhapura');
    }
  }, [user]);

  const [activeContactItem, setActiveContactItem] = useState<MarketplaceItem | null>(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'All' || item.district === selectedDistrict;
    return matchesSearch && matchesCategory && matchesDistrict;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !quantity || !phone || !location) return;

    const categoryImages = {
      Produce: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
      Seedlings: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400',
      Equipment: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&q=80&w=400',
      Fertilizer: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400',
      Services: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400'
    };

    const newItem: MarketplaceItem = {
      id: `item-${Date.now()}`,
      title,
      category,
      price: parseFloat(price) || 0,
      unit,
      quantityAvailable: parseFloat(quantity) || 0,
      sellerName: user ? `${user.name} (You)` : 'Samantha Bandara (You)',
      sellerRole: user ? (user.role === 'Officer' || user.role === 'Admin' ? 'Supplier' : 'Farmer') : 'Farmer',
      sellerPhone: phone,
      location,
      district,
      imageUrl: categoryImages[category],
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setItems([newItem, ...items]);
    setShowAddForm(false);
    
    setTitle('');
    setPrice('');
    setQuantity('');
    setPhone('');
    setLocation('');
  };

  return (
    <div className="space-y-6" id="marketplace-section">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-sans font-black text-gray-900 flex items-center gap-2">
            <span>🛒 Sarunena Farmers' Direct Marketplace</span>
            <span className="bg-amber-100 text-[#C1622D] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
              P2P Zero Middleman
            </span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Buy certified high-grade seeds, organic fertilizers, list your harvests, or hire farming equipment.
          </p>
        </div>

        <button
          onClick={() => {
            if (!user) {
              if (onOpenAuth) onOpenAuth();
            } else {
              setShowAddForm(!showAddForm);
            }
          }}
          className="flex items-center space-x-1.5 px-4.5 py-2.5 bg-gradient-to-r from-[#2E7D32] to-[#43A047] text-white font-bold rounded-2xl shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
        >
          <span>{showAddForm ? 'Close Recorder' : 'List Your Produce'}</span>
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {showAddForm && (
        <form 
          onSubmit={handleCreateListing}
          className="bg-[#FFFDF7] p-6 rounded-3xl border-2 border-[#2E7D32] shadow-xl space-y-4 animate-fade-in"
          id="marketplace-form"
        >
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <ImageIcon className="h-5 w-5 text-[#2E7D32]" />
            <h4 className="text-md font-bold text-gray-950">Add Govi-Market Produce Listing</h4>
          </div>

          {user && (
            <div className="text-xs text-[#2E7D32] bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100/60 font-medium flex items-center justify-between">
              <span>Verified Seller: <strong>{user.name}</strong> ({user.role})</span>
              <span>Home District: <strong>{user.district}</strong></span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Listing Title / Harvest Description</label>
              <input
                type="text"
                required
                placeholder="e.g., Organic Keeri Samba Paddy (Fresh harvest, low moisture)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                <option value="Produce">Produce Harvest</option>
                <option value="Seedlings">Seedlings & Seeds</option>
                <option value="Equipment">Farm Equipment</option>
                <option value="Fertilizer">Fertilizers & Manure</option>
                <option value="Services">Agronomic Services</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Price (Rs.)</label>
              <input
                type="number"
                required
                placeholder="e.g. 210"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Trading Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 cursor-pointer"
              >
                <option value="kg">per kg</option>
                <option value="bag">per bag (50kg)</option>
                <option value="day">per day (rent)</option>
                <option value="acre">per acre</option>
                <option value="unit">per unit</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Available Quantity</label>
              <input
                type="number"
                required
                placeholder="e.g. 500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Contact Phone {user ? '(From Profile)' : ''}
              </label>
              <input
                type="tel"
                required
                readOnly={!!user}
                placeholder="e.g. 0771234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none text-gray-800 ${
                  user ? 'bg-gray-100 text-gray-500 cursor-not-allowed focus:ring-0' : 'bg-white focus:ring-2 focus:ring-[#2E7D32]'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Town / Village Location</label>
              <input
                type="text"
                required
                placeholder="e.g., Chunnakam Market Junction"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                District {user ? '(From Profile)' : ''}
              </label>
              {user ? (
                <input
                  type="text"
                  readOnly
                  value={district}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-gray-100 text-gray-500 focus:outline-none cursor-not-allowed"
                />
              ) : (
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 cursor-pointer"
                >
                  {SRI_LANKAN_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
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
              Post Live Listing
            </button>
          </div>
        </form>
      )}

      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search items, sellers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Produce">Produce Harvest</option>
            <option value="Seedlings">Seedlings & Seeds</option>
            <option value="Equipment">Farm Equipment</option>
            <option value="Fertilizer">Fertilizers & Manure</option>
            <option value="Services">Agronomic Services</option>
          </select>
        </div>

        <div>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 cursor-pointer"
          >
            <option value="All">All Districts</option>
            {SRI_LANKAN_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="marketplace-grid-items">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between"
            id={`item-card-${item.id}`}
          >
            <div>
              <div className="relative h-48 bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#2E7D32] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                  {item.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-gray-900/80 backdrop-blur-sm text-white font-mono text-sm font-bold px-3 py-1 rounded-xl">
                  Rs.{item.price} / {item.unit}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h4 className="text-md font-bold text-gray-950 line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1.5">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-[#F9A825]" />
                    <span>{item.location}, {item.district}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Available Stock</p>
                    <p className="font-bold text-gray-900 font-mono mt-0.5">{item.quantityAvailable} {item.unit}s</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Seller Type</p>
                    <p className="font-bold text-[#2E7D32] flex items-center mt-0.5">
                      <UserCheck className="h-3.5 w-3.5 mr-1" />
                      {item.sellerRole}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setActiveContactItem(item)}
                className="w-full py-2.5 bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Contact Govi Seller</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeContactItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" id="contact-modal">
          <div className="relative w-full max-w-sm bg-[#FFFDF7] rounded-3xl p-6 shadow-2xl border-2 border-[#2E7D32]/20">
            <button
              onClick={() => setActiveContactItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-1.5 rounded-full cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-50 text-[#2E7D32] rounded-full border border-emerald-100">
                <ShoppingCart className="h-8 w-8" />
              </div>

              <div>
                <h5 className="text-lg font-bold text-gray-950 font-sans">{activeContactItem.sellerName}</h5>
                <p className="text-xs text-gray-500 font-medium">{activeContactItem.sellerRole} • {activeContactItem.district} District</p>
              </div>

              <div className="bg-emerald-950 text-white p-4 rounded-2xl border-2 border-[#F9A825] space-y-2">
                <p className="text-[10px] uppercase font-bold text-[#F9A825] tracking-widest">Phone / Mobile Line</p>
                <p className="text-lg font-mono font-black select-all tracking-wide">{activeContactItem.sellerPhone}</p>
                <p className="text-[10px] text-emerald-200">Quote "Sarunena Direct Market" when dialling or sending a text.</p>
              </div>

              <div className="text-[10px] text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-left">
                <strong>💡 Smart Trading Tip:</strong> Meet in public market hubs (Govi Jana centers) to inspect produce or seedlings. Sarunena does not collect commissions on farmer transactions.
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveContactItem(null)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer"
                >
                  Close Window
                </button>
                <a
                  href={`tel:${activeContactItem.sellerPhone}`}
                  className="flex-1 py-2 bg-[#2E7D32] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center space-x-1 hover:bg-[#1B5E20]"
                >
                  <Phone className="h-3 w-3" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
