import React from "react";
import {Box, Center, Link, Text, useColorModeValue, VStack} from "native-base";
import Navbar from "../componets/navbar";
import AnimatedColorBox from "../componets/animated-color-box";


export default function () {
    return <AnimatedColorBox
        flex={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        w="full"
    >
        <Navbar/><Center
        _dark={{
            bg: "blueGray.900",
        }}

        _light={{
            bg: "blueGray.50",
        }}

        px={4}
        flex={1}
    >

        <VStack space={5} alignItems={"center"} justifyContent={"space-around"}>
            <Text>by RenTen0103</Text>
            <Text>仅供学习交流使用</Text>
            <Text>开源于GITHUB</Text>
            <Link href={"https://github.com/RenTen0103/gzhelper"}>链接</Link>
        </VStack>


    </Center></AnimatedColorBox>
}