module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.ts', '.tsx'],
        root: ['./'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@navigations': './src/navigations',
          '@pages': './src/pages',
          '@services': './src/services',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
