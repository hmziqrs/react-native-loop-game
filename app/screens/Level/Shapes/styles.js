/*
    This styles.js doesn't contain any prebuilt styles 
*/

const arcOffsets = {
  1: { y: -1, x: 1 },
  2: { y: 1, x: 1 },
  3: { y: 1, x: -1 },
  4: { y: -1, x: -1 },
};

let color = () => {};
let success = false;
let size = 0;

export function setData(animateColor, bool, dimensions) {
  color = animateColor;
  success = bool;
  size = dimensions;
}

const stroke = 6;

export function box(rotate, center = false) {
  return {
    width: size,
    height: size,
    overflow: 'hidden',
    alignItems: center ? 'center' : null,
    justifyContent: center ? 'center' : null,
    transform: [
      {
        rotate,
      },
    ],
  };
}

export function arcBase(type = 1) {
  const origin = -stroke / 2;
  const offset = size / 2;
  const radius = size + stroke;
  return {
    borderColor: color('accent'),
    backgroundColor: 'transparent',

    width: radius,
    height: radius,

    borderWidth: stroke,
    borderRadius: size,

    top: origin,
    left: origin,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: offset * arcOffsets[type].y,
    marginLeft: offset * arcOffsets[type].x,
  };
}

export function line() {
  return {
    backgroundColor: color('accent'),

    top: 0,
    left: (size - stroke) / 2,

    height: size,
    width: stroke,
  };
}

export function miniLineBase() {
  return {
    ...line(),
    height: size * 0.21,
    position: 'absolute',
  };
}

export function miniCircleBase() {
  const radius = size / 2;
  return {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: stroke,
    borderRadius: 100,
    borderColor: color('accent'),
    backgroundColor: 'transparent',
    // borderColor: 'blue',

    width: radius + stroke,
    height: radius + stroke,
  };
}
