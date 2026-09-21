import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../../lang';
import { applyLanguageFont } from '../utils/fontManager';

export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE };

const savedLang = localStorage.getItem('mf_lang') || DEFAULT_LANGUAGE;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false
    }
  });

// Apply font on initial bootstrap
applyLanguageFont(savedLang);

// Synchronize typography immediately whenever language changes
i18n.on('languageChanged', (lng) => {
  applyLanguageFont(lng);
});

export default i18n;

