import {NativeStackScreenProps} from '@react-navigation/native-stack';
export type RootStackParamList = {
  Home: undefined;
  Details: {id: string};
};

export type DetailProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
