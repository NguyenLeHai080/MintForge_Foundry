import React, { useEffect } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../../i18n';
import { applyLanguageFont } from '../../utils/fontManager';

export default function LanguageRouteWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const matchedLang = SUPPORTED_LANGUAGES.find(l => l.code === lang || (l.aliases && l.aliases.includes(lang)));
    if (!matchedLang) {
      const savedLang = localStorage.getItem('mf_lang') || DEFAULT_LANGUAGE;
      applyLanguageFont(savedLang);
      const segments = location.pathname.split('/').filter(Boolean);
      segments[0] = savedLang;
      const newPath = '/' + segments.join('/');
      navigate(newPath + location.search + location.hash, { replace: true });
    } else {
      // Chuyển hướng alias (ví dụ /vi -> /vn) về mã chuẩn nếu cần
      if (matchedLang.code !== lang && matchedLang.aliases?.includes(lang)) {
        const segments = location.pathname.split('/').filter(Boolean);
        segments[0] = matchedLang.code;
        const newPath = '/' + segments.join('/');
        navigate(newPath + location.search + location.hash, { replace: true });
        return;
      }

      // Apply typography specifically for the matched language
      applyLanguageFont(matchedLang.code);

      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
        localStorage.setItem('mf_lang', lang);
      }
    }
  }, [lang, i18n, navigate, location.pathname, location.search, location.hash]);

  return <Outlet />;
}
