import {PixelRatio, Dimensions} from 'react-native';

/**
 * This is a TypeScript function named `normalize` that takes a `size` parameter and returns a normalized size value.
 * The function uses the `Dimensions` and `PixelRatio` modules from the `react-native` library to calculate the normalized size based on the device's screen width.
 *
 * @param size - The size value to be normalized.
 * @returns The normalized size value.
 *
 * @example
 * const normalizedSize = normalize(16);
 * console.log(normalizedSize); // Output: 16 (or a rounded value based on the device's screen width)
 */
const width = Math.round(Dimensions.get('window').width);
const scale = width / 375;

export const normalize = (size: number): number => {
  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
