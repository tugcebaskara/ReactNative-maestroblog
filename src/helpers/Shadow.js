import {Platform} from 'react-native';
import Colors from './Colors';


export const shadow = {
  light: {
    shadowColor: Colors.black,
    shadowRadius: 4,
    shadowOpacity: Platform.OS === 'android' ? 0.5 : 0.12,
    shadowOffset: {
      width:Platform.OS === 'android' ? 0.5 : 0,
      height: 2,
    },
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  dark: {
    shadowColor: Colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
};
