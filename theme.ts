export type ThemeName = 'emerald' | 'gold' | 'clay' | 'ocean';

export interface ThemeColors {
  primary: string;
  primaryBg: string; 
  primaryText: string; 
  primaryHover: string;
  primaryBorder: string;
  primaryBorderLight: string;
  primaryBgLight: string;
  gradientTo: string;
  bgGradient: string; 
  accent: string;
}

export const THEMES: Record<ThemeName, { label: string; icon: string; colors: ThemeColors }> = {
  emerald: {
    label: 'Emerald Fields (සරු)',
    icon: '🌿',
    colors: {
      primary: '#1B5E20',
      primaryBg: 'bg-[#1B5E20]',
      primaryText: 'text-[#1B5E20]',
      primaryHover: 'hover:bg-[#144A14]',
      primaryBorder: 'border-[#1B5E20]',
      primaryBorderLight: 'border-[#1B5E20]/20',
      primaryBgLight: 'bg-[#1B5E20]/5',
      gradientTo: 'to-[#2E7D32]',
      bgGradient: 'from-[#1B5E20] to-[#2E7D32]',
      accent: '#4CAF50'
    }
  },
  gold: {
    label: 'Golden Paddy (අස්වනු)',
    icon: '🌾',
    colors: {
      primary: '#E65100',
      primaryBg: 'bg-[#E65100]',
      primaryText: 'text-[#E65100]',
      primaryHover: 'hover:bg-[#BF360C]',
      primaryBorder: 'border-[#E65100]',
      primaryBorderLight: 'border-[#E65100]/20',
      primaryBgLight: 'bg-[#E65100]/5',
      gradientTo: 'to-[#FF8F00]',
      bgGradient: 'from-[#E65100] to-[#FF8F00]',
      accent: '#FFB300'
    }
  },
  clay: {
    label: 'Clay Soils (පස)',
    icon: '🍂',
    colors: {
      primary: '#795548',
      primaryBg: 'bg-[#795548]',
      primaryText: 'text-[#795548]',
      primaryHover: 'hover:bg-[#5D4037]',
      primaryBorder: 'border-[#795548]',
      primaryBorderLight: 'border-[#795548]/20',
      primaryBgLight: 'bg-[#795548]/5',
      gradientTo: 'to-[#8D6E63]',
      bgGradient: 'from-[#795548] to-[#8D6E63]',
      accent: '#A1887F'
    }
  },
  ocean: {
    label: 'Monsoon Sky (දියවර)',
    icon: '💧',
    colors: {
      primary: '#01579B',
      primaryBg: 'bg-[#01579B]',
      primaryText: 'text-[#01579B]',
      primaryHover: 'hover:bg-[#014377]',
      primaryBorder: 'border-[#01579B]',
      primaryBorderLight: 'border-[#01579B]/20',
      primaryBgLight: 'bg-[#01579B]/5',
      gradientTo: 'to-[#0288D1]',
      bgGradient: 'from-[#01579B] to-[#0288D1]',
      accent: '#29B6F6'
    }
  }
};
