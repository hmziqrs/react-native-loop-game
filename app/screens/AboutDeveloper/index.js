import React from 'react';
import { View, Text, Image, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { TouchNative } from 'rn-hgl';

import avatarImage from 'assets/hamza.jpg';

import * as utils from 'utils';

import PageView from 'components/PageView';
import pageViewStyles from 'components/PageView/styles';
import Icon from 'components/Icon';

import * as data from './data';
import styles from './styles';

function AboutDeveloperScreen({ navigation }) {
  return (
    <PageView
      disableMaxContainer
      type="scroll"
      navigation={navigation}
      baseStyle={styles.page}
      baseProps={{
        forceInset: { bottom: false },
      }}
    >
      <View style={styles.header}>
        <TouchNative style={styles.backButtonBase} onPress={() => navigation.pop()}>
          <Icon name="chevron-left" style={styles.backButtonIcon} />
        </TouchNative>
      </View>
      <View style={styles.body}>
        <View style={pageViewStyles.maxContainer}>
          <Text style={styles.heading}>Full stack web & app developer</Text>
          <Text style={styles.description}>
            Hi, I am full stack developer who has been developing end to end smart solutions for
            more than three years. I am a committed individual who is highly efficient and has
            excellent organisational skills to develop applications. I help throughout the life
            cycle of an assigned project with my experience and ensure quality solutions that meet
            objectives. With all that being said, I am very proud of the work I do, and will stop at
            nothing to make sure the job is done to 100% satisfaction.
          </Text>
          <Text style={styles.heading}>My skill set</Text>
          <View style={styles.skillsHolder}>
            {data.skills.map((skill) => (
              <Text key={skill} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>
          <Text style={styles.heading}>Let&apos;s Chat!</Text>
          <View style={styles.contactsHolder}>
            {data.contacts.map((contact) => (
              <TouchNative
                key={contact.icon}
                style={styles.contactBase}
                onPress={() =>
                  Linking.openURL(utils.socialLink(contact.username, contact.platform))
                }
              >
                <Icon style={styles.contactIcon} name={contact.icon} />
                <Text style={styles.contactText}>{contact.username}</Text>
              </TouchNative>
            ))}
          </View>
          <Text style={styles.heading}>Show support</Text>
          <Text style={styles.subDescription}>
            If you like the project and want to appreciate my effort. Then please click any of these
            links and perform any action you may like.
          </Text>
          <View style={styles.supportHolder}>
            {data.showSupport.map((support) => (
              <TouchNative
                key={support.link}
                style={styles.supportBase}
                onPress={() => Linking.openURL(support.link)}
              >
                <Text style={styles.supportText}>* {support.text}</Text>
              </TouchNative>
            ))}
          </View>
        </View>
        <View style={styles.avatarBase}>
          <Image source={avatarImage} style={styles.avatarImage} resizeMode="cover" />
        </View>
      </View>
    </PageView>
  );
}

AboutDeveloperScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AboutDeveloperScreen;
