import React, { useEffect } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../../i18n';

export default function LanguageRouteWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isSupported = SUPPORTED_LANGUAGES.some(l => l.code === lang);
    if (!isSupported) {
      const savedLang = localStorage.getItem('mf_lang') || DEFAULT_LANGUAGE;
      const segments = location.pathname.split('/').filter(Boolean);
      segments[0] = savedLang;
      const newPath = '/' + segments.join('/');
      navigate(newPath + location.search + location.hash, { replace: true });
    } else if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem('mf_lang', lang);
    }
  }, [lang, i18n, navigate, location.pathname, location.search, location.hash]);

  return <Outlet />;
}
