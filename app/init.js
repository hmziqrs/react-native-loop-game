import 'intl';
import 'intl/locale-data/jsonp/en';

import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import analytics from '@react-native-firebase/analytics';
import { enableScreens } from 'react-native-screens'; //eslint-disable-line
import { setDomain } from 'rn-hgl/services';
import '@react-native-firebase/crashlytics';
import 'react-native-gesture-handler';

import configs, { colors, typography } from 'configs';

const defaultStyles = {
  allowFontScaling: false,
  style: {
    color: colors.dark.string(),
    fontSize: typography.body4,
  },
};

analytics().setAnalyticsCollectionEnabled(true);
enableScreens();
setDomain(configs.DOMAIN);
setCustomText(defaultStyles);
setCustomTextInput(defaultStyles);
