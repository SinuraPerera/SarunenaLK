import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, MapPin, Sprout, Landmark, ShieldCheck } from 'lucide-react';
import { SRI_LANKAN_DISTRICTS } from './mockData';
import { User, UserRole } from './types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('Farmer');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Anuradhapura');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[^0-9]/g, '');
    return cleaned.length >= 9 && cleaned.length <= 10;
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (isLogin) {
      if (!email || !password) {
        setError('Please enter both email and password.');
        setIsLoading(false);
        return;
      }
      
      if (!validateEmail(email)) {
        setError('Please enter a valid email address.');
        setIsLoading(false);
        return;
      }
      
      // Check if user exists in registered farmers
      try {
        const savedFarmers = localStorage.getItem('sarunena_registered_farmers');
        const farmersList = savedFarmers ? JSON.parse(savedFarmers) : [];
        const existingUser = farmersList.find((f: any) => f.email === email);
        
        if (existingUser) {
          const mockUser: User = {
            name: existingUser.name,
            email: existingUser.email || email,
            phone: existingUser.phone || '+94 77 123 4567',
            role: existingUser.role as UserRole || role,
            district: existingUser.district || district,
            avatarUrl: existingUser.avatarUrl || `https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`
          };
          onSuccess(mockUser);
        } else {
          // Allow login for demo purposes if not registered
          const mockUser: User = {
            name: email.split('@')[0].toUpperCase(),
            email: email,
            phone: '+94 77 123 4567',
            role: role,
            district: district,
            avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`
          };
          onSuccess(mockUser);
        }
      } catch (e) {
        // Fallback to mock user on localStorage error
        const mockUser: User = {
          name: email.split('@')[0].toUpperCase(),
          email: email,
          phone: '+94 77 123 4567',
          role: role,
          district: district,
          avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`
        };
        onSuccess(mockUser);
      }
      onClose();
    } else {
      if (!name || !email || !phone || !password) {
        setError('All fields are required for registration.');
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address.');
        setIsLoading(false);
        return;
      }

      if (!validatePhone(phone)) {
        setError('Please enter a valid phone number (9-10 digits).');
        setIsLoading(false);
        return;
      }

      if (!validatePassword(password)) {
        setError('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
      }

      // Sanitize inputs
      const sanitizedName = name.trim().replace(/[<>]/g, '');
      const sanitizedEmail = email.trim().toLowerCase();
      const sanitizedPhone = phone.replace(/[^0-9+\s]/g, '');

      // Check for duplicate email
      try {
        const savedFarmers = localStorage.getItem('sarunena_registered_farmers');
        const farmersList = savedFarmers ? JSON.parse(savedFarmers) : [
          { name: "Gunapala Gamage", district: "Anuradhapura", role: "Farmer", avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=gunapala" },
          { name: "Kandasamy Sivalingam", district: "Jaffna", role: "Farmer", avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=kandasamy" },
          { name: "Priyantha de Silva", district: "Galle", role: "Farmer", avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=priyantha" },
          { name: "Fathima Rizna", district: "Kurunegala", role: "Farmer", avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=fathima" },
          { name: "Samantha Bandara", district: "Matale", role: "Farmer", avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=samantha" }
        ];
        
        if (farmersList.some((f: any) => f.email === sanitizedEmail)) {
          setError('An account with this email already exists.');
          setIsLoading(false);
          return;
        }
        
        if (farmersList.some((f: any) => f.name === sanitizedName)) {
          setError('An account with this name already exists.');
          setIsLoading(false);
          return;
        }

        const newUser: User = {
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone.startsWith('+94') ? sanitizedPhone : `+94 ${sanitizedPhone}`,
          role: role,
          district: district,
          avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${sanitizedName}`
        };

        farmersList.push({
          name: newUser.name,
          email: newUser.email,
          district: newUser.district,
          role: newUser.role,
          avatarUrl: newUser.avatarUrl
        });
        
        localStorage.setItem('sarunena_registered_farmers', JSON.stringify(farmersList));
        localStorage.setItem('sarunena_registered_count', farmersList.length.toString());

        onSuccess(newUser);
        onClose();
      } catch (e) {
        // Silent localStorage failure
        // Still allow registration even if localStorage fails
        const fallbackUser: User = {
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone.startsWith('+94') ? sanitizedPhone : `+94 ${sanitizedPhone}`,
          role: role,
          district: district,
          avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${sanitizedName}`
        };
        onSuccess(fallbackUser);
        onClose();
      }
    }
    setIsLoading(false);
  };

  const fillQuickDemo = (demoRole: UserRole) => {
    setRole(demoRole);
    if (demoRole === 'Farmer') {
      setEmail('farmer@sarunena.lk');
      setPassword('farmer123');
      setDistrict('Anuradhapura');
    } else if (demoRole === 'Officer') {
      setEmail('officer@sarunena.lk');
      setPassword('officer123');
      setDistrict('Kurunegala');
    } else {
      setEmail('admin@sarunena.lk');
      setPassword('admin123');
      setDistrict('Colombo');
    }
    setIsLogin(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" id="auth-modal-overlay">
      <div 
        className="relative w-full max-w-lg bg-[#FFFDF7] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#2E7D32]/20"
        id="auth-modal-container"
      >
        <div className="bg-[#2E7D32] p-6 text-white text-center relative border-b-4 border-[#F9A825]">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-emerald-900/40 text-emerald-100 hover:bg-[#FFFDF7] hover:text-[#2E7D32] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex justify-center mb-2">
            <div className="bg-[#FFFDF7] p-2 rounded-2xl shadow-md border-2 border-[#F9A825]">
              <Sprout className="h-7 w-7 text-[#2E7D32]" />
            </div>
          </div>
          <h3 className="text-xl font-bold font-sans">
            {isLogin ? 'SarunenaLK Sign In' : 'Join SarunenaLK Platform'}
          </h3>
          <p className="text-xs text-emerald-100/80 mt-1">
            Sri Lanka's National Smart Agricultural Operating System
          </p>
        </div>

        <div className="p-6 sm:p-8">
          
          <div className="mb-6 p-3 bg-[#F9A825]/10 border border-[#F9A825]/30 rounded-2xl">
            <p className="text-xs font-bold text-[#C1622D] flex items-center gap-1.5 mb-2">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Developer Quick Access Roles:</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button 
                type="button" 
                onClick={() => fillQuickDemo('Farmer')}
                className="px-2 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-[11px] font-bold rounded-lg border border-emerald-200 transition-colors cursor-pointer"
              >
                🌾 Farmer
              </button>
              <button 
                type="button" 
                onClick={() => fillQuickDemo('Officer')}
                className="px-2 py-1.5 bg-amber-50 text-amber-800 hover:bg-amber-100 text-[11px] font-bold rounded-lg border border-amber-200 transition-colors cursor-pointer"
              >
                👮 Officer
              </button>
              <button 
                type="button" 
                onClick={() => fillQuickDemo('Admin')}
                className="px-2 py-1.5 bg-sky-50 text-sky-800 hover:bg-sky-100 text-[11px] font-bold rounded-lg border border-sky-200 transition-colors cursor-pointer"
              >
                ⚙️ Admin
              </button>
            </div>
          </div>

          <div className="flex bg-gray-100 rounded-xl p-1.5 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-center text-xs sm:text-sm font-bold rounded-lg transition-all ${
                isLogin ? 'bg-white text-[#2E7D32] shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Sign In (ඇතුල් වන්න)
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-center text-xs sm:text-sm font-bold rounded-lg transition-all ${
                !isLogin ? 'bg-white text-[#2E7D32] shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Register (ලියාපදිංචි වන්න)
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                Portal Access Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Farmer', 'Officer', 'Admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border-2 transition-all ${
                      role === r
                        ? 'border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32]'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {r === 'Farmer' && '🌾 '}
                    {r === 'Officer' && '👮 '}
                    {r === 'Admin' && '⚙️ '}
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {!isLogin && (
              <div className="animate-fade-in space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., Samantha Bandara"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="e.g., 0771234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="e.g., farmer@sarunena.lk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                District Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800 appearance-none cursor-pointer"
                >
                  {SRI_LANKAN_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4.5 w-4.5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Minimum 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-4 bg-gradient-to-r from-[#2E7D32] to-[#43A047] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <span className="animate-spin">⏳</span>
                  <span>{isLogin ? 'Signing In...' : 'Registering...'}</span>
                </span>
              ) : (
                <span>{isLogin ? 'Sign In to Portal' : 'Register Govi-Account'}</span>
              )}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}
