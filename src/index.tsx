import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import MainScreen from './screens/main-screen'
import AboutScreen from './screens/about-screen'
import Sidebar from './componets/sidebar'
import ScoreScreen from "./screens/score-screen";

const Drawer = createDrawerNavigator()

const App = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Main"
            drawerContent={props => <Sidebar {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'back',
                overlayColor: '#00000000'
            }}
        >
            <Drawer.Screen name="Main" component={MainScreen}/>
            <Drawer.Screen name="About" component={AboutScreen}/>
            <Drawer.Screen name="Score" component={ScoreScreen}/>
        </Drawer.Navigator>
    )
}

export default App
