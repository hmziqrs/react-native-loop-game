import React from 'react';
import NativeKeyboardSpacer from 'react-native-keyboard-spacer';

const style = { height: 0 };

function keyboardSpacer(p) {
  return <NativeKeyboardSpacer {...p} style={style} />;
}

export default keyboardSpacer;
