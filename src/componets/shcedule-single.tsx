import React from "react";
import {schedule} from "../types/schedule";
import {Box, CheckCircleIcon, HStack, Text, useColorModeValue, VStack, WarningIcon} from "native-base";


type Props = {
    scheduleData: schedule,
    index: number
}
export default function ({scheduleData, index}: Props) {
    if (scheduleData.lesson == "") {
        return (
            <HStack alignItems={"center"} space={1} marginTop={5} display={"flex"}>
                <VStack justifyContent={"space-evenly"} h={60} borderRightWidth={1}
                        flex={1}
                        borderColor={useColorModeValue("black", "gray.200")} alignItems={"center"} w={10}>
                    <Box>
                        <CheckCircleIcon/>
                    </Box>
                </VStack>
                <HStack flex={7} alignItems={"center"} paddingRight={10} justifyContent={"space-between"}>
                    <Text>YOUR TIME</Text>
                </HStack>

            </HStack>
        )
    } else return (

        <HStack alignItems={"center"} space={1} marginTop={5} display={"flex"}>
            <VStack justifyContent={"space-evenly"} h={60} borderRightWidth={1}
                    flex={1}
                    borderColor={useColorModeValue("black", "gray.200")} alignItems={"center"} w={10}>

                <Box>
                    <WarningIcon/>
                </Box>
            </VStack>
            <HStack flex={7} paddingRight={10} alignItems={"center"} justifyContent={"space-between"}>
                <VStack alignItems={"center"} space={2}>
                    <Text>
                        {scheduleData.lesson.replace("\n", "")}
                    </Text>
                    <Text>
                        {scheduleData.teacher.replace("\n", "")}
                    </Text>
                </VStack>
                <VStack alignItems={"center"} space={2}>
                    <Text>
                        {scheduleData.timeInfo?.replace("\n", "")}
                    </Text>
                    <Text>
                        {scheduleData.location.replace("\n", "")}
                    </Text>
                </VStack>
            </HStack>
        </HStack>
    )
}
