import React from 'react'
import {ImageSourcePropType, TouchableWithoutFeedback} from 'react-native'
import {VStack, Heading, Text, HStack, Box} from 'native-base'
import {timeStore} from "../stores/time-store";

interface Props {
    title: string,
    onPress?: (e: any) => void,
    children: React.ReactNode
}

const Masthead = ({title, onPress, children}: Props) => {
    return (
        <VStack h="120px" pb={5}>
            {children}
            <HStack justifyContent={"space-between"}>
                <Heading
                    _dark={{
                        color: "white"
                    }}
                    _light={{
                        color: "black",
                    }}
                    p={0} size={"xl"} marginLeft={6}>
                    <Text onPress={onPress}>{title}</Text>
                </Heading>
            </HStack>
        </VStack>
    )
}

export default Masthead
