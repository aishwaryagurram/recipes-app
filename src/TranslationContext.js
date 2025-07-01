import React, { createContext, useContext, useState } from 'react';
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';
import hi from './locales/hi/translation.json';
import te from './locales/te/translation.json';
import ta from './locales/ta/translation.json';
import ml from './locales/ml/translation.json';
import kn from './locales/kn/translation.json';
import ur from './locales/ur/translation.json';
import bn from './locales/bn/translation.json';
import ne from './locales/ne/translation.json';

const translations = {
  en,
  es,
  hi,
  te,
  ta,
  ml,
  kn,
  ur,
  bn,
  ne,
};

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key, params) => {
    let translation = translations[language][key] || key;
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
