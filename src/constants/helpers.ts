import {PixelRatio, Dimensions} from 'react-native';

const width = Math.round(Dimensions.get('window').width);
const scale = width / 375;

/**
 * The `normalize` function takes a size value and returns a normalized size value based on the
 * device's pixel density.
 * @param {number} size - The `size` parameter is a number that represents the desired size to be
 * normalized.
 * @returns a rounded number after applying a scaling factor to the input size.
 */
export const normalize = (size: number): number => {
  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
