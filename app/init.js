import 'intl';
import 'intl/locale-data/jsonp/en';
import { Text } from 'react-native';

import analytics from '@react-native-firebase/analytics';
import { enableScreens } from 'react-native-screens'; //eslint-disable-line
import { setDomain } from 'rn-hgl/services';
import '@react-native-firebase/crashlytics';
import 'react-native-gesture-handler';

import { getFont } from 'utils/fonts';

import configs, { colors, typography } from 'configs';

// const defaultStyles = {
//   allowFontScaling: false,
//   style: {
//     color: colors.reddit.string(),
//     fontSize: typography.label1,
//     ...getFont(),
//     fontFamily: 'Muli-Regular',
//   },
// };

const sourceRender = Text.render;
Text.render = function render(props, ref) {
  return sourceRender.apply(this, [
    {
      ...props,
      style: [
        { ...getFont(), color: colors.dark.string(), fontSize: typography.label1 },
        props.style,
      ],
    },
    ref,
  ]);
};

analytics().setAnalyticsCollectionEnabled(true);
enableScreens();
setDomain(configs.DOMAIN);
// setCustomText(defaultStyles);
// setCustomTextInput(defaultStyles);
