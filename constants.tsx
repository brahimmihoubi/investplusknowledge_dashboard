
import React from 'react';

export const COLORS = {
  primary: '#10B981',      // Emerald 500
  primaryDark: '#064E3B',  // Emerald 900
  primaryLight: '#6EE7B7', // Emerald 300
  secondary: '#1F5F63',    // Deep Teal
  secondaryLight: '#2D8A8F',
  accent: '#F59E0B',       // Amber
  brandNavy: '#1F5F63',    // Mapped to Secondary for consistency
  bg: '#f8fafc'
};

export const Logo = () => (
  <img 
    src="/logo.png" 
    alt="InvestPlus Knowledge" 
    className="h-24 w-auto object-contain m-0 p-0"
  />
);
