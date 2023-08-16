import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types';
import {Home, Details} from '@screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * The function exports a React component that defines the navigation routes for a React Native app
 * using React Navigation.
 * @returns a JSX element that represents a navigation container with a stack navigator. The stack
 * navigator has two screens: "Home" and "Details". The "Home" screen is represented by the `Home`
 * component and has the option `headerShown` set to false, meaning the header will not be shown. The
 * "Details" screen is represented by the `Details` component and has the
 */
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            title: 'Coin Detail',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
