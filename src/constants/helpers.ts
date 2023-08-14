import {PixelRatio, Dimensions} from 'react-native';

const width = Math.round(Dimensions.get('window').width);
const scale = width / 375;

export const normalize = (size: number): number => {
  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
