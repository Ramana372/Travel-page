import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const changeLanguage = (lang) => {
    if (['en', 'hi', 'te'].includes(lang)) {
      setLanguage(lang);
    }
  };

  const getLanguageName = (code) => {
    const names = {
      en: 'English',
      hi: 'हिंदी',
      te: 'తెలుగు'
    };
    return names[code] || 'English';
  };

  const getLanguageFlag = (code) => {
    const flags = {
      en: '🇺🇸',
      hi: '🇮🇳',
      te: '🇮🇳'
    };
    return flags[code] || '🇺🇸';
  };

  const value = {
    language,
    changeLanguage,
    getLanguageName,
    getLanguageFlag,
    isEnglish: language === 'en',
    isHindi: language === 'hi',
    isTelugu: language === 'te'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
