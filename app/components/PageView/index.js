/**
 *
 * PageView
 *
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { SafeAreaView } from 'react-navigation';
import { isIOS } from 'rn-hgl/platform';

import Header from 'components/Header';

import styles from './styles';

function PageView({
  type,
  style,
  header,
  footer,
  children,
  innerRef,
  baseStyle,
  baseProps,
  noKeyBoard,
  navigation,
  afterRender,
  ...props
}) {
  let Comp = View;
  const compProps = {};

  if (type === 'scroll') {
    Comp = ScrollView;
    compProps.keyboardShouldPersistTaps = 'handled';
  }

  const child = (
    <>
      <SafeAreaView {...baseProps} style={[styles.base].concat([baseStyle])}>
        {afterRender}
        {header ? <Header {...header} /> : null}
        <Comp style={[styles.container].concat(style)} {...compProps} {...props} ref={innerRef}>
          {children}
        </Comp>
        {footer}
      </SafeAreaView>
      {isIOS && !noKeyBoard ? <KeyboardSpacer /> : null}
    </>
  );

  return child;
}

PageView.propTypes = {
  gradient: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  navigation: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  afterRender: PropTypes.node,
  baseProps: PropTypes.object,
  noKeyBoard: PropTypes.bool,
  innerRef: PropTypes.func,
  baseStyle: PropTypes.any,
  header: PropTypes.object,
  type: PropTypes.string,
  footer: PropTypes.any,
  style: PropTypes.any,
};

PageView.defaultProps = {
  innerRef: () => {},
  afterRender: null,
  noKeyBoard: false,
  gradient: false,
  type: 'default',
  baseProps: {},
  baseStyle: {},
  header: null,
  footer: null,
  style: {},
};

export default PageView;
