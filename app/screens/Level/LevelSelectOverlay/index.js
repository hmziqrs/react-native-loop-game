import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { TouchNative, scaling } from 'rn-hgl';

import { initLayout } from 'utils/ui';

import Text from 'components/Text';
import Icon from 'components/Icon';

import styles from './styles';
import useHook from './hook';

export default function LevelSelectOverlay({
  next,
  prev,
  theme,
  level,
  toggle,
  setToggle,
  navigation,
}) {
  const { animation, mount, header, setHeader } = useHook(toggle);
  const init = () => initLayout(600, 'spring');

  useEffect(() => {
    initLayout();
    let timeout;
    if (toggle) {
      timeout = setTimeout(() => {
        init();
        setHeader(true);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [toggle]);

  function close() {
    init();
    setHeader(false);
    setTimeout(() => {
      setToggle(false);
    }, 200);
  }

  if (mount) {
    return (
      <TouchNative noFeedback style={[styles.base]} onPress={close}>
        <Animated.View
          style={[
            styles.flex,
            { opacity: animation, backgroundColor: theme.light.primary.alpha(0.7) },
          ]}
        >
          <Animated.View style={styles.header}>
            <TouchNative
              onPress={() => navigation.pop()}
              style={[
                styles.roundIconBase,
                header ? styles.headerLeftEnable : styles.headerLeftDisable,
              ]}
            >
              <Icon name="exit-to-app" style={styles.roundIcon} />
            </TouchNative>
            <View style={styles.flex} />
            <View
              style={[styles.row, header ? styles.headerRightEnable : styles.headerRightDisable]}
            >
              <TouchNative onPress={() => {}} style={styles.roundIconBase}>
                <Icon name="instagram" style={styles.roundIcon} />
              </TouchNative>
              <TouchNative onPress={() => {}} style={styles.roundIconBase}>
                <Icon name="facebook" style={styles.roundIcon} />
              </TouchNative>
            </View>
          </Animated.View>
          <View style={styles.content}>
            <Animated.Text style={[styles.centerText, { color: theme.light.accent }]}>
              React Native Loop
            </Animated.Text>
          </View>
          <Animated.View
            style={[
              styles.controlsHolder,
              {
                backgroundColor: theme.light.primary,
                opacity: animation,
                top: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [scaling(16), 0],
                }),
              },
            ]}
          >
            <TouchNative onPress={prev} style={styles.controlButton}>
              <Icon
                name="chevron-left"
                style={[styles.controlButtonIcon, { color: theme.light.accent }]}
              />
            </TouchNative>
            <View style={styles.controlTextBase}>
              <Text style={[styles.controlText, { color: theme.light.accent }]}>#{level}</Text>
            </View>
            <TouchNative onPress={next} style={styles.controlButton}>
              <Icon
                name="chevron-right"
                style={[styles.controlButtonIcon, { color: theme.light.accent }]}
              />
            </TouchNative>
          </Animated.View>
        </Animated.View>
      </TouchNative>
    );
  }
  return <View />;
}

LevelSelectOverlay.propTypes = {
  navigation: PropTypes.object.isRequired,
  setToggle: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  toggle: PropTypes.bool.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};
