import React from "react";
import {schedule} from "../types/schedule";
import {Box, Center, HStack, ScrollView, Text, useColorModeValue} from "native-base";


type Props = {
    scheduleList: schedule[][],
    currentWeek: number
}


type scProps = {
    scheduleList: schedule[],
    currentWeek: number
}

function CurrentBlock({scheduleList, currentWeek}: scProps) {
    let s = scheduleList.find(e => {
        let k = true
        if (e.timeInfo?.includes("单周")) {
            if (currentWeek % 2 == 1) {
                k = true
            }
        }
        if (e.timeInfo?.includes("双周")) {
            if (currentWeek % 2 == 1) {
                k = false
            }
        }
        return e.startWeek <= currentWeek && e.endWeek >= currentWeek && k
    })
    if (s) {
        return <Box overflow={"hidden"}>
            <Text>{(s.lesson + "@" + s.location).replace("\n", "")}</Text>
        </Box>
    } else return <></>
}

export default function ({scheduleList, currentWeek}: Props) {
    return <HStack w={"full"} alignItems={"center"} space={1} h={"full"} flex={1} display={"flex"}>
        {scheduleList.map((value, index) => {
            return (
                <Box key={index} borderRadius={10} borderColor={useColorModeValue("black", "gray.200")}
                     backgroundColor={useColorModeValue("blue.200", "blue.500")}
                     borderWidth={2}
                     paddingLeft={1} h={"full"}
                     minH={"120"}
                     flex={1}>
                    <CurrentBlock currentWeek={currentWeek} scheduleList={value}/>
                </Box>
            )
        })}
    </HStack>

}

