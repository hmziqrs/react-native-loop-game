import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from 'configs';

import Modal from '../Modal';
import styles from './styles';

function AbsoluteLoader({ loading, ...props }) {
  return (
    <Modal active={loading} style={styles.base}>
      <ActivityIndicator color={colors.accent.string()} size="large" {...props} />
    </Modal>
  );
}

AbsoluteLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default AbsoluteLoader;
