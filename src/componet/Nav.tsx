import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LoginView} from '../views/Login';
import {Score} from '../views/Socre';
import {Cover} from '../views/Cover';
import {Home} from '../views/Home';
import {useState} from 'react';
import {Schedule} from '../views/Schedule';
const Tab = createBottomTabNavigator();
export type RootStackParamList = {
  Cover: undefined;
  Login: undefined;
  // Score: undefined;
  main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const TabNav = () => {
  const [scoreCount, serScore] = useState(0);
  const setHead = (n: number) => {
    serScore(n);
  };
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '主页',
        }}
      />
      <Tab.Screen
        name="Score"
        options={{
          headerTitle: '成绩:已有' + scoreCount + '门',
          title: '成绩',
        }}>
        {() => <Score setHead={setHead} />}
      </Tab.Screen>
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          headerShown: false,
          title: '课表',
        }}
      />
    </Tab.Navigator>
  );
};

function NavigationComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cover">
        <Stack.Screen
          name="Cover"
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
          name="main"
          component={TabNav}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationComponent;
