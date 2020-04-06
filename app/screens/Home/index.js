import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { useIsFocused } from 'react-navigation-hooks';
import DeviceInfo from 'react-native-device-info';
import { TouchNative } from 'rn-hgl';

import { SettingsContext } from 'contexts/Settings';

import PageView from 'components/PageView';
import Text from 'components/Text';

import rawStyles from './styles';

const links = [
  { key: 'levels', label: 'Explore Levels' },
  { key: 'aboutApp', label: 'About App' },
  { key: 'aboutDeveloper', label: 'About Developer' },
  { key: 'settings', label: 'Settings' },
];

function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const state = useContext(SettingsContext);
  const styles = useDynamicStyleSheet(rawStyles);

  useEffect(() => {
    if (isFocused) {
      state.player.pause();
    }
  }, [isFocused]);

  return (
    <PageView navigation={navigation} style={styles.container} baseStyle={styles.screen}>
      <Text testID="welcome" style={styles.title}>
        Welcome
      </Text>
      <Text style={styles.description}>Explore loop game&apos;s clone build with react native</Text>
      <View style={styles.buttonsHolder}>
        {links.map((link) => (
          <TouchNative
            key={link.key}
            style={styles.button}
            onPress={() => navigation.navigate(link.key)}
          >
            <Text style={styles.buttonText}>{link.label}</Text>
          </TouchNative>
        ))}
      </View>
      <Text style={styles.version}>VERSION {DeviceInfo.getVersion()}</Text>
    </PageView>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
