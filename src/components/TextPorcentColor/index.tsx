import React from 'react';
import {Text, TextStyle} from 'react-native';

import styles from './styles';

type TypeTextPorcentColor = 'porcent' | 'parenthesis';
interface TextPorcentColorProps {
  textValue: string | undefined;
  type: TypeTextPorcentColor;
  style?: TextStyle;
}
type ObjectTypePorcentColor = {
  [key in TypeTextPorcentColor]: (t: string) => string;
};

const OBJECT_TYPE: ObjectTypePorcentColor = {
  porcent: t => `${t}%`,
  parenthesis: t => `(${t})`,
};
/**
 * The `TextPorcentColor` component renders a text value with a specific color based on whether the
 * value is positive or negative.
 * @param {TextPorcentColorProps}  - - `textValue`: The value of the text to be displayed.
 * @returns a JSX element, specifically a `<Text>` component. The style of the `<Text>` component is
 * determined by the `inDown` variable, which is either `styles.textPorcentDown` or
 * `styles.textPorcentUp` depending on the value of `firstCharacter`. The content of the `<Text>`
 * component is determined by calling a function `OBJECT_TYPE[type]`
 */
export const TextPorcentColor = ({
  textValue = '',
  type,
  style,
}: TextPorcentColorProps) => {
  const firstCharacter: string = textValue.charAt(0);
  const inDown: boolean = firstCharacter === '-';
  return (
    <Text
      style={[
        inDown ? styles.textPorcentDown : styles.textPorcentUp,
        style && style,
      ]}>
      {OBJECT_TYPE[type](textValue)}
    </Text>
  );
};
