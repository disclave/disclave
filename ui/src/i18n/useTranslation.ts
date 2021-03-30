import {
  Namespace,
  useTranslation as originalUseTranslation,
} from "react-i18next";
import { i18n } from "./i18n";

export const useTranslation = <N extends Namespace>(ns: N) =>
  originalUseTranslation(ns, { i18n });
