import 'intl';
import 'intl/locale-data/jsonp/en';
import { Text } from 'react-native';

import analytics from '@react-native-firebase/analytics';
import { enableScreens } from 'react-native-screens'; //eslint-disable-line
import '@react-native-firebase/crashlytics';
import 'react-native-gesture-handler';

import { getFont } from 'utils/fonts';

import { colors, typography } from 'configs';

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

enableScreens();
analytics().setAnalyticsCollectionEnabled(true);
