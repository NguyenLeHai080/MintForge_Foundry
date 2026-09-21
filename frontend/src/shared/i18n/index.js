import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import locales từng module
import landingVi from '../../modules/landing/locales/vi.json';
import landingEn from '../../modules/landing/locales/en.json';
import adminVi from '../../modules/admin/locales/vi.json';
import adminEn from '../../modules/admin/locales/en.json';

const resources = {
  vi: {
    translation: {
      landing: landingVi,
      admin: adminVi
    }
  },
  en: {
    translation: {
      landing: landingEn,
      admin: adminEn
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
