import {Platform} from 'react-native';

import {COLORS} from './colors';

/**
 * This code snippet defines a constant named `GENERAL_BOX_SHADOW` which is an object containing different shadow styles based on the platform (iOS or Android).
 * The shadow styles for iOS include color, offset, opacity, and radius, while for Android it includes elevation.
 *
 * Example Usage:
 * import {GENERAL_BOX_SHADOW} from './code_under_test';
 *
 * // Use GENERAL_BOX_SHADOW in a component style
 * const styles = {
 *   container: {
 *     ...GENERAL_BOX_SHADOW,
 *     // other styles
 *   },
 * };
 */

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
