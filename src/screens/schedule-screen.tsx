import React, {useEffect, useState} from "react";
import {
    Box,
    Center,
    ChevronLeftIcon,
    ChevronRightIcon,
    HStack, Pressable,
    ScrollView,
    Text,
    useColorModeValue,
    VStack
} from "native-base";
import AnimatedColorBox from "../componets/animated-color-box";
import NavBar from "../componets/navbar";
import {getScheduleListFromStore, userStore} from "../stores/user-store";
import {schedule} from "../types/schedule";
import ScheduleLineItem from "../componets/schedule-line-item";
import {timeStore, plusWeek, reduceWeek} from "../stores/time-store";
import Masthead from "../componets/masthead";
import {AnimatedShrinkBox} from "../componets/animated-shrink-box";


export default function () {
    const [scheduleList, setScheduleList] = useState<schedule[][][]>([])

    const [currentWeek, setCurrentWeek] = useState(1)

    const [showChangeBar, setShowChangeBar] = useState(false)

    function getWeek() {

        let date = new Date();

        let startData = timeStore.getState().value;

        return Math.floor((Math.floor((date.valueOf() - startData) / (24 * 60 * 60 * 1000))) / 7)
    }

    const TitlePress = () => {
        setShowChangeBar(!showChangeBar)
    }


    useEffect(() => {
        setCurrentWeek(getWeek())
        setScheduleList(getScheduleListFromStore())
        userStore.subscribe(() => {
            setScheduleList(getScheduleListFromStore)
        })
        timeStore.subscribe(() => {
            setCurrentWeek((getWeek()))
        })
    }, [])

    return <AnimatedColorBox
        flex={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        w="full"
    >
        <Masthead onPress={TitlePress}
                  title={`第${currentWeek}周`}>
            <NavBar/>
        </Masthead>
        <AnimatedShrinkBox marginBottom={2} active={showChangeBar} maxSize={50} minSize={0}>
            <Box w={"95%"} h={"full"} marginLeft={"2.5%"}
                 borderWidth={2}
                 borderRadius={10} borderColor={useColorModeValue("black", "gray.200")}
                 backgroundColor={useColorModeValue("blue.200", "blue.500")}
            >
                <HStack h={"full"} display={"flex"} justifyContent={"space-around"} w={"full"}>
                    <Pressable flex={1} h={"full"} onPress={reduceWeek}>
                        <Center h={"full"}>
                            <ChevronLeftIcon/>
                        </Center>
                    </Pressable>
                    <Center h={"full"} flex={1}>
                        <Text fontSize={30}>{`第${currentWeek}周`}</Text>
                    </Center>
                    <Pressable flex={1} h={"full"} onPress={plusWeek}>
                        <Center h={"full"}>
                            <ChevronRightIcon/>
                        </Center>
                    </Pressable>
                </HStack>
            </Box>
        </AnimatedShrinkBox>
        <ScrollView>
            <VStack marginLeft={"2.5%"} w={"95%"} height={"full"} space={1}>
                {scheduleList.map((value, index) => {
                    return <ScheduleLineItem key={index} scheduleList={value} currentWeek={currentWeek}/>
                })}
            </VStack>
        </ScrollView>

    </AnimatedColorBox>
}
