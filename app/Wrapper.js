import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import useLocale from 'containers/Locale';

import { translationMessages } from './i18n';

export default function Wrapper({ children }) {
  const locale = useLocale();

  return (
    <IntlProvider
      textComponent={Text}
      locale={locale.locale}
      messages={translationMessages[locale.locale]}
    >
      {children}
    </IntlProvider>
  );
}

Wrapper.propTypes = {
  children: PropTypes.any.isRequired,
};
