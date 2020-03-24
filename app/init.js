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

export function setText(isDark = false) {
  Text.render = function render(props, ref) {
    return sourceRender.apply(this, [
      {
        ...props,
        style: [
          {
            ...getFont(),
            color: isDark ? colors.white : colors.dark,
            fontSize: typography.label1,
          },
          props.style,
        ],
      },
      ref,
    ]);
  };
}

setText();

enableScreens();
analytics().setAnalyticsCollectionEnabled(true);
