import {StyleSheet} from 'react-native';
import {COLORS, GENERAL_BOX_SHADOW, normalize} from '@constants';

const ICON_SIZE = normalize(25);
const CLEAR_ICON_SIZE = normalize(18);

export default StyleSheet.create({
  container: {
    margin: normalize(20),
  },
  barSearch: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: normalize(45),
    borderRadius: 20,
    flexDirection: 'row',
    paddingRight: normalize(15),
    paddingLeft: normalize(10),
  },
  iconSearch: {
    marginRight: normalize(10),
    height: ICON_SIZE,
    width: ICON_SIZE,
  },
  inputStyle: {
    flex: 1,
    color: COLORS.black,
  },
  clearIcon: {
    width: CLEAR_ICON_SIZE,
    height: CLEAR_ICON_SIZE,
  },
  barSearchShadow: {
    ...GENERAL_BOX_SHADOW,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
});
