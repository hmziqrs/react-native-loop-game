import React from 'react';
import PropTypes from 'prop-types';
import { TouchNative } from 'rn-hgl/components';

import styles from './styles';
import Icon from '../Icon';

function CheckBox({ value, ...props }) {
  return (
    <TouchNative rippleEffect style={styles.base} {...props}>
      {value ? <Icon style={styles.icon} name="check" /> : null}
    </TouchNative>
  );
}

CheckBox.propTypes = {
  value: PropTypes.bool.isRequired,
};

CheckBox.defaultProps = {};

export default CheckBox;
