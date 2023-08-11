module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'import-glob',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '@types': './src/types',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@routes': './src/routes',
        },
      },
    ],
  ],
};
