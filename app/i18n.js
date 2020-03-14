/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */

// import { addLocaleData } from 'react-intl';
// import enLocaleData from 'react-intl/locale-data/en';
// import frLocaleData from 'react-intl/locale-data/fr';

import { DEFAULT_LOCALE } from 'containers/Locale/constants';

import enTranslationMessages from 'translations/en.json';
import frTranslationMessages from 'translations/fr.json';

export { DEFAULT_LOCALE } from 'containers/Locale/constants';

// prettier-ignore
const appLocales = [
  'en',
  'fr',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    let message = messages[key];
    if (!message && locale !== DEFAULT_LOCALE) {
      message = defaultFormattedMessages[key];
    }
    return Object.assign(formattedMessages, { [key]: message });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages),
};

export { appLocales };
