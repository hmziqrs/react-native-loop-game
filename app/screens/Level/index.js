import React, { useRef, useContext, useEffect } from 'react';
import { View, StatusBar, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { useDarkMode } from 'react-native-dark-mode';
import { TouchNative } from 'rn-hgl';

import { SettingsContext } from 'contexts/Settings';
import { ThemeContext } from 'contexts/Theme';

import PageView from 'components/PageView';
import Icon from 'components/Icon';

import useEngine from 'engine';

import LevelSelectOverlay from './LevelSelectOverlay';
import useToggle from './toggle.hook';
import Shapes from './Shapes';
import styles from './styles';

export default function LevelScreen({ navigation }) {
  const { params } = navigation.state;
  const forceLevel = parseInt(params.level, 10) || 1;
  const { toggle, setToggle } = useToggle();
  const state = useContext(SettingsContext);
  const { setDefaultStatusBar } = useContext(ThemeContext);
  const {
    level,
    size,
    grid,
    theme,
    capture,
    success,
    controls,
    setRotate,
    animateColor,
  } = useEngine(forceLevel, state.player);
  const ref = useRef();

  state.getPlayer().play();
  useEffect(
    () => () => {
      state.getPlayer().pause();
      setDefaultStatusBar();
    },
    [],
  );

  useEffect(() => {
    StatusBar.setBarStyle(success ? 'light-content' : 'dark-content', true);
  });

  const bgStyle = { flex: 1, backgroundColor: animateColor('primary', 'primary') };
  return (
    <>
      <Animated.View ref={ref} style={bgStyle}>
        <PageView key={level} navigation={navigation} baseStyle={styles.transparent}>
          {/* <StatusBar animated barStyle={} /> */}
          <View style={[styles.gridContainer]}>
            <Animated.Text
              style={[styles.currentLevel, { color: animateColor('accent', 'accent') }]}
            >
              #{level}
            </Animated.Text>
            {grid.map((column, y) => (
              // eslint-disable-next-line
              <View key={y} style={styles.row}>
                {column.map(({ id, type, animation }, x) => (
                  <Shapes
                    key={id}
                    size={size}
                    type={type}
                    success={success}
                    animation={animation}
                    animateColor={animateColor}
                    theme={success ? theme.dark : theme.light}
                    setRotate={() => {
                      // eslint-disable-next-line
                      if (['null'].indexOf(type) === -1 && Number.isInteger(animation._value)) {
                        setRotate(x, y);
                      }
                    }}
                  />
                ))}
              </View>
            ))}
          </View>
          <TouchNative
            noFeedback
            onPress={controls.next}
            style={[styles.blockBase, success ? styles.blockVisible : {}]}
          >
            <View />
          </TouchNative>
          <View style={styles.watermark}>
            <Animated.Text style={[styles.watermarkText, { color: animateColor('accent') }]}>
              React Native Loop
            </Animated.Text>
          </View>
        </PageView>

        <LevelSelectOverlay
          theme={theme}
          level={level}
          toggle={toggle}
          setToggle={setToggle}
          navigation={navigation}
          {...controls}
        />
      </Animated.View>
      <Animated.View style={[styles.captureBase, { backgroundColor: animateColor('primary') }]}>
        <TouchNative
          style={styles.capture}
          onPress={() => (success ? capture(ref) : setToggle(true))}
        >
          <Icon
            animated
            name={success ? 'camera' : 'menu'}
            style={[
              styles.captureIcon,
              {
                color: success ? animateColor('accent', 'accent') : theme.light.accent.alpha(0.4),
              },
            ]}
          />
        </TouchNative>
      </Animated.View>
    </>
  );
}

LevelScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
