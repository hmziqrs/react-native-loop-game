import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import RadioButton from 'react-native-radio-button';
import Slider from '@react-native-community/slider';
import { TouchNative, scaling } from 'rn-hgl';

import { colors } from 'configs';

import { SettingsContext, MP3S } from 'contexts/Settings';
import { ThemeContext, THEMES } from 'contexts/Theme';

import PageView from 'components/PageView';

import rawStyles from './styles';
import Player from './Player';

let forcePlay = false;

function SettingsScreen({ navigation }) {
  const state = useContext(SettingsContext);
  const [volume, setVolume] = useState(state.player.volume);
  const [activeTack, setTrack] = useState(-1);
  const styles = useDynamicStyleSheet(rawStyles);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    state.player.volume = volume;
  }, [volume]);

  return (
    <PageView navigation={navigation} style={styles.container} baseStyle={styles.screen}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.heading}>Volume: {parseInt(volume * 100, 10)}</Text>
      <View>
        <Slider
          step={0.1}
          minimumValue={0}
          maximumValue={1}
          style={styles.volumeSlider}
          value={volume}
          maximumTrackTintColor="#000000"
          onSlidingStart={() => {
            if (!state.player.isPlaying) {
              forcePlay = true;
              state.player.play();
            }
          }}
          onSlidingComplete={() => {
            if (forcePlay) {
              forcePlay = false;
              state.player.pause();
            }
          }}
          minimumTrackTintColor={colors.primary}
          onValueChange={(val) => {
            setVolume(val);
          }}
        />
      </View>
      <Text style={styles.heading}>MP3 Track: {state.mp3.replace('.mp3', '')}</Text>
      {Object.keys(MP3S).map((key, index) => {
        const mp3 = MP3S[key];
        const isActive = index === activeTack;
        return (
          <Player
            mp3={mp3}
            key={key}
            state={state}
            isActive={isActive}
            updateParent={() => {}}
            toggle={() => setTrack(isActive ? -1 : index)}
          />
        );
      })}
      <Text style={styles.heading}>Theme: {theme}</Text>
      {Object.keys(THEMES).map((key) => (
        <TouchNative key={key} style={styles.radioBase} onPress={() => setTheme(key)}>
          <RadioButton
            animation="fadeIn"
            isSelected={key === theme}
            size={scaling(3)}
            innerColor={colors.primary.string()}
            outerColor={colors.primary.string()}
          />
          <Text style={styles.radioLabel}>{key}</Text>
        </TouchNative>
      ))}
    </PageView>
  );
}

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SettingsScreen;
