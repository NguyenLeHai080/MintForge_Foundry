import vn from './vn';
import en from './en';
import ja from './ja';
import ko from './ko';
import zh from './zh';
import fr from './fr';

export const SUPPORTED_LANGUAGES = [
  { code: 'vn', label: 'Tiếng Việt', flag: '🇻🇳', aliases: ['vi'] },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' }
];

export const DEFAULT_LANGUAGE = 'vn';

export const resources = {
  vn: {
    translation: vn
  },
  vi: {
    translation: vn
  },
  en: {
    translation: en
  },
  ja: {
    translation: ja
  },
  ko: {
    translation: ko
  },
  zh: {
    translation: zh
  },
  fr: {
    translation: fr
  }
};

export {
  vn,
  en,
  ja,
  ko,
  zh,
  fr
};
