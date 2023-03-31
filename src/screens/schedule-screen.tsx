import React, {useEffect, useState} from "react";
import {Box, ScrollView, Text, useColorModeValue, VStack} from "native-base";
import AnimatedColorBox from "../componets/animated-color-box";
import NavBar from "../componets/navbar";
import {getScheduleListFromStore, userStore} from "../stores/user-store";
import {schedule} from "../types/schedule";
import ScheduleLineItem from "../componets/schedule-line-item";
import {timeStore} from "../stores/time-store";
import Masthead from "../componets/masthead";


export default function () {
    const [scheduleList, setScheduleList] = useState<schedule[][][]>([])

    const [currentWeek, setCurrentWeek] = useState(1)


    function getWeek() {

        let date = new Date();

        let startData = timeStore.getState().value;

        return Math.floor((Math.floor((date.valueOf() - startData) / (24 * 60 * 60 * 1000)) + 1) / 7)

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
        <Masthead onPress={() => {
        }} title={`第${currentWeek}周`}>
            <NavBar/>
        </Masthead>
        <ScrollView>
            <VStack marginLeft={"2.5%"} w={"95%"} height={"full"} space={1}>
                {scheduleList.map((value, index) => {
                    return <ScheduleLineItem key={index} scheduleList={value} currentWeek={currentWeek}/>
                })}
            </VStack>
        </ScrollView>

    </AnimatedColorBox>
}