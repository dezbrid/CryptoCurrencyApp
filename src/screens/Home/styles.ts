import {StyleSheet, TextStyle} from 'react-native';
import {normalize, COLORS} from '@constants';

const BASIC_TEXT: TextStyle = {fontSize: normalize(18), fontWeight: 'bold'};
export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  separator: {
    height: normalize(2),
    backgroundColor: COLORS.concrate,
  },
  itemContainer: {
    flexDirection: 'row',
    height: normalize(50),
  },
  listContainer: {
    paddingHorizontal: normalize(10),
    backgroundColor: 'white',
  },
  textName: {
    color: COLORS.steelBlue,
    ...BASIC_TEXT,
    flexGrow: 1,
    marginLeft: normalize(10),
  },
  textCoinUSD: {
    color: COLORS.Tundora,
    ...BASIC_TEXT,
  },
  textPorcentUp: {
    color: COLORS.apple,
    fontWeight: '400',
  },
  textPorcentDown: {
    color: COLORS.darkBurgundy,
    fontWeight: '400',
  },
  imagen: {
    width: 50,
    height: 50,
  },
});
