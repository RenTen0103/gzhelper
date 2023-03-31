import React, {useCallback, useEffect, useState} from "react";
import {
    Box,
    Center,
    FlatList,
    Heading,
    HStack,
    Image,
    InfoIcon,
    ScrollView,
    Text,
    useColorModeValue,
    VStack
} from "native-base";


import NavBar from "../componets/navbar";
import Masthead from "../componets/masthead";
import AnimatedColorBox from "../componets/animated-color-box";
import ItemButton from "../componets/Item-button";
import {CatIcon} from "../componets/cat-icon";
import {AnimatedShrinkBox} from "../componets/animated-shrink-box";
import {UpdateIcon} from "../componets/update-icon";
import {getScheduleData} from "../utils/native";
import {praseSchedule} from "../utils/dataPrase";
import PlanBlock from "../componets/plan-block";

export default function MainScreen() {

    const [item1Active, setItem1Active] = useState(false)
    const [item2Active, setItem2Active] = useState(false)

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

                <ScrollView w={"full"}>
                    <Box w={"full"} alignItems={"center"} bg={useColorModeValue('warmGray.50', 'primary.900')}>
                        <ItemButton w={"90%"} active={true} onPress={() => {
                            setItem1Active(!item1Active)
                        }}
                                    Icon={<CatIcon/>}>为学校内的小猫捐赠！</ItemButton>
                        <AnimatedShrinkBox marginTop={5} marginLeft={"10%"} w={"80%"}
                                           active={item1Active}
                                           alignItems={"center"}
                                           minSize={0}
                                           maxSize={540}>
                            <Text>截图扫码喂养流浪的精灵</Text>
                            <Box w={"full"} h={'full'}>
                                <Image
                                    source={require('../assets/poster.jpg')}
                                    height={500}
                                    alt="Alternate Text"/>
                            </Box>
                        </AnimatedShrinkBox>
                    </Box>

                    <Box w={"full"} alignItems={"center"} bg={useColorModeValue('warmGray.50', 'primary.900')}>
                        <ItemButton w={"90%"} active={true} onPress={() => {
                            setItem2Active(!item2Active)
                        }}
                                    Icon={<UpdateIcon/>}>
                            更新日志
                        </ItemButton>
                        <AnimatedShrinkBox marginTop={5} marginLeft={"10%"} w={"80%"}
                                           active={item2Active}
                                           alignItems={"center"}
                                           minSize={0}
                                           maxSize={250}>
                            <Box w={"full"} h={'full'} marginTop={5}>
                                <Text marginBottom={1} fontSize={30}>Version 1.3</Text>
                                <VStack space={1}>
                                    <HStack alignItems={"center"} space={2}>
                                        <InfoIcon/>
                                        <Text>
                                            使用全新UI
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={"center"} space={2}>
                                        <InfoIcon/>
                                        <Text>
                                            更改登录逻辑，优化内存占用
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={"center"} space={2}>
                                        <InfoIcon/>
                                        <Text>
                                            添加动画，优化使用体验
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={"center"} space={2}>
                                        <InfoIcon/>
                                        <Text>
                                            移除对webview的依赖
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={"center"} space={2}>
                                        <InfoIcon/>
                                        <Text>
                                            修复若干bug
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={"center"} space={2}>
                                        <InfoIcon/>
                                        <Text>
                                            完善暗色模式
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={"center"} space={2}>
                                        <InfoIcon/>
                                        <Text>
                                            移除了him
                                        </Text>
                                    </HStack>
                                </VStack>
                            </Box>
                        </AnimatedShrinkBox>
                    </Box>
                    <Box w={"full"} marginTop={2} bg={useColorModeValue('warmGray.50', 'primary.900')}>
                        <Heading
                            _dark={{
                                color: "white"
                            }}
                            _light={{
                                color: "black",
                            }}
                            marginLeft={2}
                            p={0} size={"xl"}>

                            <Text>日程</Text>
                        </Heading>

                        <Box marginLeft={"5%"} w={"90%"} borderColor={useColorModeValue("black", "gray.200")}
                             borderTopWidth={1}/>
                        <PlanBlock/>
                    </Box>
                </ScrollView>

            </Center>
        </AnimatedColorBox>
    )
}
