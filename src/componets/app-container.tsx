import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {NativeBaseProvider, Text} from 'native-base'
import theme from '../theme'
import FadeBack from "./fade-back";

type Props = {
    children: React.ReactNode
}

export default function AppContainer(props: Props) {
    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                {props.children}
                <FadeBack/>
            </NativeBaseProvider>
        </NavigationContainer>
    )
}
