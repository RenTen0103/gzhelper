import React, {useEffect} from 'react'
import AppContainer from './src/componets/app-container'
import Navigator from './src/'
import {loadLocal, storeLocal, userStore} from "./src/stores/user-store";

export default function App() {
    useEffect(() => {
        userStore.dispatch(loadLocal())
    })
    return (
        <AppContainer>
            <Navigator/>
        </AppContainer>
    )
}
