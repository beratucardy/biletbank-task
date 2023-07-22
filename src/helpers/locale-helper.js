import store from "../store";
import { setLang } from "../store/slices/locale-slice";

export const langs = [
  { title: "English", code: "EN", country: "gb" },
  { title: "Türkçe", code: "TR", country: "tr" },
];

export const getCurrentLang = () => {
  return store.getState().locale.lang;
};

export const setCurrentLang = (lang) => {
  store.dispatch(setLang(lang));
};

export const $t = (key) => {
  const currentLang = getCurrentLang();
  const langFile = require(`../helpers/langs/${currentLang.code}.json`);
  return langFile[key];
};
