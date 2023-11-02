import {Dimensions, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');
const screenHeight = Dimensions.get('screen').height;
const statusBarHeight = StatusBar.currentHeight || 0;

export const COLORS = {
  primary: '#f0543a',
  secondary: '#F4F6FB',
  primaryText: '#FEE6E2',
  background: '#fff',
  secondaryText: '#000',
  disabledBackground: '#157336',
  success: '#14a44d',
  danger: '#eb5c5c',
};

export const SIZES = {
  width,
  height,
  statusBarHeight,
  navBarHeight: screenHeight - (height + statusBarHeight),
  borderRadius: 10,
};
