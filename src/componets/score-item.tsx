import React from "react";
import {score} from "../types/score";
import {Box, CheckCircleIcon, HStack, Text, useColorModeValue, VStack} from "native-base";

type Props = {
    scoreData: score
}

export default function ScoreItem(props: Props) {

    return <Box w={"90%"} h={70} marginTop={1} marginLeft={"5%"}>
        <HStack alignItems={"center"} space={1}>
            <VStack justifyContent={"space-evenly"} h={60} borderRightWidth={1}
                    borderColor={useColorModeValue("black", "gray.200")} alignItems={"center"} w={10}>
                <Box>
                    <CheckCircleIcon/>
                </Box>
            </VStack>

            <VStack space={2} minW={70}>
                <Text>{props.scoreData.lesson}</Text>
                <HStack justifyContent={"space-around"}>
                    {props.scoreData.score.map((v, index) => {
                        return <Text key={index}>{v}</Text>
                    })}
                </HStack>
            </VStack>
        </HStack>
    </Box>

}

