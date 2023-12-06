import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./assets/i18n/en";
import ar from "./assets/i18n/ar";
const { REACT_APP_DEFAULT_LANG, REACT_APP_LANG_WHITELIST } = process.env;

i18n.use(LanguageDetector).init({
  resources: {
    en: en,
    ar: ar,
  },
  fallbackLng: REACT_APP_DEFAULT_LANG,
  debug: false,
  whitelist: REACT_APP_LANG_WHITELIST,

  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false, // we use content as keys
  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
  },

  react: {
    wait: true,
  },
});

export default i18n;
