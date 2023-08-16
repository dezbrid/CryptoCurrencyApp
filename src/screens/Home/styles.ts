import {StyleSheet, TextStyle} from 'react-native';
import {normalize, COLORS} from '@constants';

const BASIC_TEXT: TextStyle = {fontSize: normalize(18), fontWeight: 'bold'};
const IMAGEN_SIZE = normalize(50);
export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  separator: {
    height: normalize(2),
    backgroundColor: COLORS.concrate,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  textPorcent: {
    fontWeight: '400',
  },
  imagen: {
    width: IMAGEN_SIZE,
    height: IMAGEN_SIZE,
  },
  footer: {
    height: normalize(120),
  },
});
