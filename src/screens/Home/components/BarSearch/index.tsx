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
/**
 * This is a functional component called `BarSearch` that renders a search bar with an input field, a search icon, and a clear icon.
 * It takes in two props: `value` and `setValue`.
 *
 * @component
 * @example
 * import { BarSearch } from './BarSearch';
 *
 * const MyComponent = () => {
 *   const [searchValue, setSearchValue] = useState('');
 *
 *   return (
 *     <BarSearch value={searchValue} setValue={setSearchValue} />
 *   );
 * };
 */
export const BarSearch = ({value, setValue}: BarSearchProps) => {
  let inputRef: Nullable<TextInput> = null;

  /**
   * Clears the input field and sets the value to an empty string.
   */
  const handlePressClearSearch = () => {
    inputRef!.clear();
    setValue('');
  };

  /**
   * Updates the value state with the provided text.
   *
   * @param {string} text - The new value that needs to be set.
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
