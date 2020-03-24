import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useDynamicStyleSheet, useDarkMode } from 'react-native-dark-mode';
import * as Animatable from 'react-native-animatable';
import Slider from '@react-native-community/slider';
import moment from 'moment';
import { TouchNative, scaling } from 'rn-hgl';

import { colors } from 'configs';

import { useDidMount } from 'utils';

import Icon from 'components/Icon';

import rawStyles from './styles';

let intervalState;

export default function Player({ isActive, mp3, toggle, state, updateParent }) {
  const [status, setStatus] = useState({
    isPlaying: false,
    progress: moment.duration(0),
  });
  const didMount = useDidMount();
  const [mount, setMount] = useState(true);
  const setStatusSafe = (v) => setStatus({ ...status, ...v });
  const styles = useDynamicStyleSheet(rawStyles);
  const isDark = useDarkMode();
  const themeColor = isDark ? 'white' : 'dark';

  const runProgressBar = (bool) => {
    if (bool) {
      intervalState = setInterval(() => {
        setStatusSafe({ progress: moment.duration(state.player.currentTime) });
      }, 200);
    } else {
      clearInterval(intervalState);
    }
  };

  useEffect(() => {
    if (status.isPlaying) {
      runProgressBar(true);
    } else {
      runProgressBar(false);
    }
    return () => clearInterval(intervalState);
  }, [status.isPlaying]);

  useEffect(() => {
    let timeout;
    if (isActive) {
      setMount(true);
    } else {
      timeout = setTimeout(() => setMount(false), 400);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isActive]);

  return (
    <View style={styles.playerBase}>
      <TouchNative onPress={toggle} style={styles.playerHeader}>
        <Animatable.Text
          duration={400}
          transition="color"
          style={[
            styles.playerHeaderText,
            {
              color: colors[isActive ? 'primary' : themeColor].fade(0.0001).string(),
            },
          ]}
        >
          {mp3.replace('.mp3', '')}
        </Animatable.Text>
        <Icon
          animatable
          duration={400}
          name="chevron-down"
          transition={['color', 'rotate']}
          style={[
            styles.playerHeaderIcon,
            {
              color: colors[isActive ? 'primary' : themeColor].fade(0.0001).string(),
              transform: [
                {
                  rotate: isActive ? '180deg' : '0deg',
                },
              ],
            },
          ]}
        />
      </TouchNative>
      <Animatable.View
        duration={400}
        transition="height"
        style={[styles.br, isActive ? styles.brActive : {}]}
      />
      <Animatable.View
        style={styles.bodyBase}
        duration={didMount ? 400 : 1.0}
        animation={
          isActive
            ? {
                0: {
                  opacity: 0.0,
                  height: 0.0,
                },
                1: {
                  opacity: 1.0,
                  height: scaling(16),
                },
              }
            : {
                0: {
                  opacity: 1.0,
                  height: scaling(16),
                },
                1: {
                  opacity: 0.0,
                  height: 0.0,
                },
              }
        }
      >
        {mount ? (
          <View style={styles.bodyContent}>
            <TouchNative
              style={styles.playButton}
              onPress={() => {
                if (state.mp3 !== mp3) {
                  state.player.destroy();
                  state.setPlayer(mp3, true, true);
                  updateParent();
                } else if (status.isPlaying) {
                  state.player.pause();
                } else {
                  state.player.play();
                }
                setStatusSafe({ isPlaying: !status.isPlaying });
              }}
            >
              <Icon
                style={styles.playIcon}
                name={status.isPlaying && state.mp3.indexOf(mp3) > -1 ? 'pause' : 'play'}
              />
            </TouchNative>
            <Slider
              disabled={state.mp3.indexOf(mp3) < 0}
              minimumValue={0.0}
              maximumValue={state.player.duration}
              value={status.progress.asMilliseconds()}
              maximumTrackTintColor="#000000"
              minimumTrackTintColor={colors.primary}
              style={styles.bodySlider}
              onSlidingStart={() => {
                runProgressBar(false);
              }}
              onSlidingComplete={() => {
                runProgressBar(true);
              }}
              onValueChange={(val) => {
                state.player.seek(val);
              }}
            />
            <Text style={styles.time}>
              {status.progress.minutes()}:{status.progress.seconds()}
            </Text>
          </View>
        ) : null}
      </Animatable.View>
    </View>
  );
}

Player.propTypes = {
  updateParent: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  state: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  mp3: PropTypes.string.isRequired,
};
