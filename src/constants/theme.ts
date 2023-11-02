import {Dimensions, StatusBar} from 'react-native';
const {width, height} = Dimensions.get('window');

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
  statusBarHeight: StatusBar.currentHeight || 0,
  borderRadius: 10,
};
