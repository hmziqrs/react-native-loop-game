module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.js'],
      },
    ],
  ],
  sourceMaps: true,
};
