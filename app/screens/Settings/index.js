import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchNative } from 'rn-hgl';

import { SettingsContext } from 'contexts/Settings';

import PageView from 'components/PageView';

import styles from './styles';

function SettingsScreen({ navigation }) {
  const state = useContext(SettingsContext);
  console.log('Settings screen', state);

  return (
    <PageView navigation={navigation} style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.description}>App&apos;s Settings</Text>
    </PageView>
  );
}

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SettingsScreen;
