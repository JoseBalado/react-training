import * as en from "./en.json";
import { flattenMessages, getBrowserLocale } from "./utils";

const availableTranslations = { en };

export const messages = flattenMessages(
  (availableTranslations as any)[getBrowserLocale()].default
);

export const locale = (availableTranslations as any)[getBrowserLocale()]
  ? getBrowserLocale()
  : "en";
