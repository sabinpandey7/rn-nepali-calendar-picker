import type { Platform } from 'react-native';

export const theme: Record<
  typeof Platform.OS,
  {
    backgroundColor: string;
    textColor: string;
    primary: string;
  }
> = {
  ios: {
    backgroundColor: 'white',
    textColor: '#020202',
    primary: '#3997F5',
  },
  macos: {
    backgroundColor: 'white',
    textColor: '#020202',
    primary: '#3997F5',
  },
  android: {
    backgroundColor: '#ECE6EE',
    textColor: '#1D1B20',
    primary: '#6750A4',
  },
  web: {
    backgroundColor: '#ECE6EE',
    textColor: '#1D1B20',
    primary: '#6750A4',
  },
  windows: {
    backgroundColor: '#ECE6EE',
    textColor: '#1D1B20',
    primary: '#6750A4',
  },
};
