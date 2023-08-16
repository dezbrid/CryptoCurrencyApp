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
