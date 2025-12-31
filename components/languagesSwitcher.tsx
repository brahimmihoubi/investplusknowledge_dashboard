import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇩🇿' }
  ];

  const currentLang = languages.find(l => i18n.language?.startsWith(l.code)) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-white transition-all border border-slate-200/60 font-semibold text-[10px] text-slate-600 shadow-sm"
      >
        <span className="uppercase tracking-widest">{currentLang.code}</span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-2.5 h-2.5 opacity-40"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 5 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-full mt-2 right-0 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl border border-slate-100 p-1.5 min-w-[120px] z-50 overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center justify-between w-full px-3 py-2 text-xs font-semibold hover:bg-slate-50 rounded-xl transition-colors ${
                  i18n.language?.startsWith(lang.code) ? 'text-primary bg-primary/5' : 'text-slate-600'
                }`}
              >
                <span className="leading-none">{lang.name}</span>
                <span className="text-[9px] opacity-40 uppercase tracking-tighter">{lang.code}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
