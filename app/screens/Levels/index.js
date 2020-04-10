import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { TouchNative } from 'rn-hgl';

import levels from 'engine/levels';

import PageView from 'components/PageView';
import Text from 'components/Text';

import rawStyles from './styles';

function HomeScreen({ navigation }) {
  const styles = useDynamicStyleSheet(rawStyles);
  return (
    <PageView type="scroll" navigation={navigation} baseStyle={styles.screen}>
      <Text style={styles.title}>Levels</Text>
      <View style={styles.levelsHolder}>
        {Object.keys(levels).map((level) => (
          <TouchNative
            key={level}
            style={styles.levelBase}
            testID={`level-${level}`}
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
