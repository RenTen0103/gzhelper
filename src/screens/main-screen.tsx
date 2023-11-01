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
import PlanBlock from "../componets/plan-block";

export default function MainScreen() {

    const [item1Active, setItem1Active] = useState(false)
    const [item2Active, setItem2Active] = useState(false)

    useEffect(() => {
        fetch("http://172.16.4.31/portal.do?wlanuserip=10.13.228.82&wlanacname=Stud_wlan_1&mac=74:15:75:e5:39:bf&vlan=38212549&hostname=renren&rand=1a992500f5657a&url=http%3A%2F%2Fwww.msftconnecttest.com%2Fredirec", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "max-age=0",
                "upgrade-insecure-requests": "1"
            },
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        }).then(r => {
                r.text().then(e => {
                    console.log(e)
                })
            }
        );
        console.log(111)
    }, [])

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
                        <Box w={"full"}>
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
