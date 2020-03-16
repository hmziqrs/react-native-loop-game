import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchNative } from 'rn-hgl';

import PageView from 'components/PageView';

import styles from './styles';

const links = [
  { key: 'levels', label: 'Explore Levels' },
  { key: 'aboutApp', label: 'About App' },
  { key: 'aboutDeveloper', label: 'About Developer' },
];

function HomeScreen({ navigation }) {
  return (
    <PageView navigation={navigation} style={styles.container} name="home">
      <Text style={styles.title}>Welcome</Text>
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
    </PageView>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
