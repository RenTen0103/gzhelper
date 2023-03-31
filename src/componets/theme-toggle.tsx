import React, {useEffect} from 'react'
import {Text, HStack, Switch, useColorMode} from 'native-base'
import {Appearance} from "react-native";

export default function ThemeToggle() {
    const {colorMode, toggleColorMode} = useColorMode()
    useEffect(() => {
        Appearance.addChangeListener((preferences) => {
            if (colorMode != preferences.colorScheme) {
                toggleColorMode()
            }
        })
    }, [colorMode])
    return (
        <HStack space={2} alignItems="center">
            <Text>Dark</Text>
            <Switch
                isChecked={colorMode === 'light'}
                onToggle={toggleColorMode}
            ></Switch>
            <Text>Light</Text>
        </HStack>
    )
}
