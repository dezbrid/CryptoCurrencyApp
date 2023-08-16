import {Platform} from 'react-native';

import {COLORS} from './colors';

export const GENERAL_BOX_SHADOW = {
  ...Platform.select({
    ios: {
      shadowColor: COLORS.gray,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 1,
      shadowRadius: 1,
    },
    android: {
      elevation: 3,
    },
  }),
};
