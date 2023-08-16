import React, {Dispatch, SetStateAction} from 'react';
import {View, Image, TextInput, TouchableOpacity} from 'react-native';
import {COLORS} from '@constants';

import iconSerch from './assets/ic_search.png';
import clearIcon from './assets/ic_close.png';
import styles from './styles';

type Nullable<T> = T | null;

interface BarSearchProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
/* The code is defining a functional component called `BarSearch` that takes in two props: `value` and
`setValue`. */
export const BarSearch = ({value, setValue}: BarSearchProps) => {
  let inputRef: Nullable<TextInput> = null;

  /**
   * The function `handlePressClearSearch` clears the input field and sets the value to an empty string.
   */
  const handlePressClearSearch = () => {
    inputRef!.clear();
    setValue('');
  };
  /**
   * The handleChangeText function updates the value state with the provided text.
   * @param {string} text - The `text` parameter is a string that represents the new value that needs to
   * be set.
   */
  const handleChangeText = (text: string) => {
    setValue(text);
  };
  return (
    <View style={styles.container}>
      <View style={[styles.barSearch, styles.barSearchShadow]}>
        <Image
          source={iconSerch}
          resizeMode="contain"
          style={styles.iconSearch}
        />
        <TextInput
          ref={ref => (inputRef = ref)}
          autoComplete="off"
          autoCorrect={false}
          style={styles.inputStyle}
          placeholder={'Buscar por nombre'}
          placeholderTextColor={COLORS.gray}
          onChangeText={handleChangeText}
          value={value}
          autoCapitalize="none"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handlePressClearSearch}>
            <Image
              source={clearIcon}
              resizeMode="contain"
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
