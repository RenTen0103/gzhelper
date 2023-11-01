import React, {useEffect} from 'react'
import AppContainer from './src/componets/app-container'
import Navigator from './src/'
import {loadLocal, storeLocal, userStore} from "./src/stores/user-store";
import {timeStore, init} from "./src/stores/time-store";

export default function App() {

    useEffect(() => {
        userStore.dispatch(loadLocal())
        init()
    }, [])
    return (
        <AppContainer>
            <Navigator/>
        </AppContainer>
    )
}
