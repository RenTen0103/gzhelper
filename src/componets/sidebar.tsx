import React, {useCallback, useEffect, useState} from 'react'
import {
    HStack,
    VStack,
    Center,
    Avatar,
    Heading,
    useColorModeValue, Text, Box
} from 'native-base'
import {DrawerContentComponentProps} from '@react-navigation/drawer'
import AnimatedColorBox from './animated-color-box'
import ThemeToggle from './theme-toggle'
import MenuButton from './menu-button'
import Login from "./login";
import {loginStore} from '../stores/login-store'
import {configureStore} from "@reduxjs/toolkit";
import {userStore} from "../stores/user-store";
import {doLogout} from "../utils/request";

const Sidebar = (props: DrawerContentComponentProps) => {


    const {state, navigation} = props

    const [userID, setUserId] = useState("")

    useEffect(() => {
            loginStore.subscribe(() => {
                setLoginState(loginStore.getState().value)
            })

            userStore.subscribe(() => {
                setUserId(userStore.getState().userName)
            })
        }, []
    )

    const currentRoute = state.routeNames[state.index]


    const [hasLogin, setLoginState] = useState(false)


    const handlePressBackButton = useCallback(() => {
        doLogout()
    }, [navigation])
    const handlePressMenuMain = useCallback(() => {
        navigation.navigate('Main')
    }, [navigation])

    const handlePressMenuAbout = useCallback(() => {
        navigation.navigate('About')
    }, [navigation])
    const handlePressMenuScore = useCallback(() => {
        navigation.navigate('Score')
    }, [navigation])

    const handlePressMenuSchedule = useCallback(() => {
        navigation.navigate("Schedule")
    }, [navigation])

    return (
        <AnimatedColorBox
            safeArea
            flex={1}
            bg={useColorModeValue('blue.50', 'darkBlue.800')}
            p={7}
        >
            <VStack flex={1} space={2}>
                <HStack justifyContent="space-around" alignItems={"center"}>
                    <VStack w={"100"} h={"70"} alignItems={"center"} justifyContent="space-around" marginTop={-5}>
                        <Text>{!hasLogin ? "未登录" : userID}</Text>
                    </VStack>
                    <Avatar
                        source={require('../assets/profile-image.png')}
                        size="xl"
                        borderRadius={100}
                        mb={6}
                        borderColor="secondary.500"
                        borderWidth={3}
                    />
                </HStack>
                <Box borderTopWidth={1} borderColor={"gray.400"}></Box>
                <Heading mb={4} size="xl">
                    Have a Nice Day
                </Heading>
                {hasLogin ? <VStack space={3}>
                    <MenuButton
                        active={currentRoute === 'Main'}
                        onPress={handlePressMenuMain}
                        icon="inbox"
                    >
                        主页
                    </MenuButton>

                    <MenuButton
                        active={currentRoute === 'Score'}
                        onPress={handlePressMenuScore}
                        icon="info"
                    >
                        分数
                    </MenuButton>
                    <MenuButton
                        active={currentRoute === 'Schedule'}
                        onPress={handlePressMenuSchedule}
                        icon="info"
                    >
                        课表
                    </MenuButton>
                    <MenuButton
                        active={currentRoute === 'About'}
                        onPress={handlePressMenuAbout}
                        icon="info"
                    >
                        关于
                    </MenuButton>
                    <MenuButton
                        active={false}
                        onPress={handlePressBackButton}
                        icon="info"
                    >
                        登出
                    </MenuButton>
                </VStack> : <Login/>}
            </VStack>
            <Center>
                <ThemeToggle/>
            </Center>
        </AnimatedColorBox>
    )
}

export default Sidebar
