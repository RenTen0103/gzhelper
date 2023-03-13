import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import {LoginView} from '../views/Login';
import {Score} from '../views/Socre';
import { Cover } from '../views/Cover';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Score: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


function NavigationComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Cover}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Score"
          component={Score}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationComponent;
