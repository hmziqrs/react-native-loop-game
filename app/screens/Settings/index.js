import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Slider from '@react-native-community/slider';

import { colors } from 'configs';

import { SettingsContext, MP3S } from 'contexts/Settings';

import PageView from 'components/PageView';

import styles from './styles';
import Player from './Player';

let forcePlay = false;

function SettingsScreen({ navigation }) {
  const state = useContext(SettingsContext);
  const [volume, setVolume] = useState(state.player.volume);
  const [activeTack, setTrack] = useState(-1);

  useEffect(() => {
    state.player.volume = volume;
  }, [volume]);

  return (
    <PageView navigation={navigation} style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.heading}>Volume: {parseInt(volume * 100, 10)}</Text>
      <View>
        <Slider
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
    </PageView>
  );
}

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SettingsScreen;
