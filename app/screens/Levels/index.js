import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TouchNative } from 'rn-hgl';

import levels from 'engine/levels';

import PageView from 'components/PageView';

import styles from './styles';

function HomeScreen({ navigation }) {
  return (
    <PageView navigation={navigation}>
      <Text style={styles.title}>Levels</Text>
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
