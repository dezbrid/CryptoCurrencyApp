import {Platform} from 'react-native';

import {COLORS} from './colors';

/* The code is exporting a constant variable called `GENERAL_BOX_SHADOW`. This variable is an object
that contains platform-specific styles for applying a box shadow effect by platform. */
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
