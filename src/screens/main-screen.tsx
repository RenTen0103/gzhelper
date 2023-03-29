import React, {useCallback, useEffect} from "react";
import {Box, Center, Text, useColorModeValue, VStack} from "native-base";


import ThemeToggle from "../componets/theme-toggle";
import MenuButton from "../componets/menu-button";
import Navbar from "../componets/navbar";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import NavBar from "../componets/navbar";
import Masthead from "../componets/masthead";
import AnimatedColorBox from "../componets/animated-color-box";

export default function MainScreen() {
    return (
        <AnimatedColorBox
            flex={1}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            w="full"
        >
            <Masthead
                title="欢迎！"
            >
                <NavBar/>
            </Masthead>
            <Center
                bg={useColorModeValue('warmGray.50', 'primary.900')}
                px={4}
                flex={1}
            >

            </Center>
        </AnimatedColorBox>
    )
}
