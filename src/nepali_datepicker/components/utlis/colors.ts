import type { Platform } from 'react-native';

export const theme: Record<
  typeof Platform.OS,
  {
    backgroundColor: string;
    textColor: string;
    primary: string;
    rangeBackground: string;
  }
> = {
  ios: {
    backgroundColor: 'white',
    textColor: '#020202',
    primary: '#3997F5',
    rangeBackground: '#D9ECFF',
  },
  macos: {
    backgroundColor: 'white',
    textColor: '#020202',
    primary: '#3997F5',
    rangeBackground: '#D9ECFF',
  },
  android: {
    backgroundColor: '#ECE6EE',
    textColor: '#1D1B20',
    primary: '#6750A4',
    rangeBackground: '#ECE0FD',
  },
  web: {
    backgroundColor: '#ECE6EE',
    textColor: '#1D1B20',
    primary: '#6750A4',
    rangeBackground: '#ECE0FD',
  },
  windows: {
    backgroundColor: '#ECE6EE',
    textColor: '#1D1B20',
    primary: '#6750A4',
    rangeBackground: '#ECE0FD',
  },
};
