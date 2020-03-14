import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Message, TouchNative } from 'rn-hgl';

import levels from 'engine/levels';

import PageView from 'components/PageView';

import { messages } from './messages';
import styles from './styles';

function HomeScreen({ navigation }) {
  return (
    <PageView navigation={navigation} style={styles.container} name="home">
      <Message {...messages.title} style={styles.title} />
      <View style={styles.levelsHolder}>
        {Object.keys(levels).map((level) => (
          <TouchNative
            key={level}
            style={styles.levelBase}
            onPress={() => navigation.navigate('level', { level })}
          >
            <Text style={styles.levelText}>Level {level}</Text>
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
