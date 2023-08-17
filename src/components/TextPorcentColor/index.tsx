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
 * value is positive or negative. It takes in props such as `textValue`, `type`, and `style`, and uses
 * the `OBJECT_TYPE` object to determine the formatting of the text.
 *
 * @param {TextPorcentColorProps} props - The props for the `TextPorcentColor` component.
 * @param {string} props.textValue - The value of the text to be displayed.
 * @param {string} props.type - The type of text to be displayed. It can be either "porcent" or "parenthesis".
 * @param {object} props.style - Additional styles to be applied to the text.
 * @returns {JSX.Element} - A `<Text>` component with the specified style and content.
 *
 * @example
 * import { TextPorcentColor } from './TextPorcentColor';
 *
 * <TextPorcentColor textValue="10" type="porcent" />
 * // Output: Renders the text "10%" with the color defined in `styles.textPorcentUp`
 *
 * <TextPorcentColor textValue="-5" type="porcent" />
 * // Output: Renders the text "-5%" with the color defined in `styles.textPorcentDown`
 */
export const TextPorcentColor = ({
  textValue = '',
  type,
  style,
}: TextPorcentColorProps): JSX.Element => {
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
