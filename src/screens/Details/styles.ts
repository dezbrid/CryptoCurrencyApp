import {StyleSheet} from 'react-native';
import {COLORS, normalize} from '@constants';

const SIZE_IMG = normalize(80);
export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    padding: normalize(15),
  },
  imagen: {
    height: SIZE_IMG,
    marginVertical: normalize(20),
  },
  subContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  titleName: {
    flexDirection: 'row',
  },
  name: {
    color: COLORS.black,
    fontSize: normalize(35),
    fontWeight: '600',
    marginHorizontal: normalize(15),
  },
  symbolic: {
    paddingBottom: normalize(8),
    alignSelf: 'flex-end',
    color: COLORS.gray,
  },
  rank: {
    alignSelf: 'center',
    color: COLORS.black,
    fontSize: normalize(12),
    fontWeight: '500',
  },
  rankCotainer: {
    alignSelf: 'center',
  },
  valueUsd: {
    color: COLORS.black,
    fontSize: normalize(20),
    fontWeight: '400',
    marginVertical: normalize(8),
  },
  valueBtc: {
    color: COLORS.gray,
    fontSize: normalize(13),
    fontWeight: '500',
  },
});
