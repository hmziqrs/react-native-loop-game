import React from 'react';
import { View, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import { TouchNative } from 'rn-hgl';

import PageView from 'components/PageView';
import Text from 'components/Text';
import Icon from 'components/Icon';

import rawStyles from './styles';
import { links } from './data';

function AboutAppScreen({ navigation }) {
  const styles = useDynamicStyleSheet(rawStyles);
  return (
    <PageView
      type="scroll"
      navigation={navigation}
      style={styles.container}
      baseStyle={styles.screen}
    >
      <Text style={styles.title}>About App</Text>
      <Text style={styles.description}>React Native Loop is just a fun experimint of mine.</Text>
      <Text style={styles.description2}>
        I crafted this app becuase I wanted to understand how does loop game calculate result &
        figure out a way to implement the game interface in React Native Eco-system as much as
        possible with all the good animations & themes. So I implemented few levels with clean code,
        good architecture & no redux.
      </Text>
      <Text style={styles.note}>
        Original app & Github code&apos;s link is shared below & any peice of code is free to use
      </Text>
      <Text style={styles.note}>
        All musics are downloaded from orangefreesounds.com. Link is shared below
      </Text>
      <View style={styles.buttonsHolder}>
        {links.map((link) => (
          <TouchNative
            key={link.icon}
            style={styles.button}
            onPress={() => Linking.openURL(link.url)}
          >
            <Icon style={styles.buttonIcon} name={link.icon} />
            <Text style={styles.buttonText}>{link.label}</Text>
          </TouchNative>
        ))}
      </View>
    </PageView>
  );
}

AboutAppScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AboutAppScreen;
