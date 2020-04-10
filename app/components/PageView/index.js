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
import { platform, TouchNative } from 'rn-hgl';

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
  disableMaxContainer,
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
      <SafeAreaView
        {...baseProps}
        style={[styles.base].concat([baseStyle])}
        forceInset={{ top: type !== 'scroll' || platform.isIOS ? 'always' : 'never' }}
      >
        {afterRender}
        {header ? <Header {...header} /> : null}
        <Comp
          testID="base"
          style={[styles.container, disableMaxContainer ? {} : styles.maxContainer].concat(style)}
          {...compProps}
          {...props}
          ref={innerRef}
        >
          {children}
        </Comp>
        {footer}
      </SafeAreaView>
      {platform.isIOS && !noKeyBoard ? <KeyboardSpacer /> : null}
    </>
  );

  return child;
}

PageView.propTypes = {
  gradient: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  navigation: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  disableMaxContainer: PropTypes.bool,
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
  disableMaxContainer: false,
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
