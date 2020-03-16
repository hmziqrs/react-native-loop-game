const weightMap = {
  200: 'Muli-ExtraLight',
  300: 'Muli-Light',
  400: 'Muli-Regular',
  600: 'Muli-SemiBold',
  700: 'Muli-Bold',
  800: 'Muli-ExtraBold',
  900: 'Muli-Black',
};

export function getFont(weight = 400) {
  return {
    fontFamily: weightMap[weight],
  };
}
