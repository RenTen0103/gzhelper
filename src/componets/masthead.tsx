import React from 'react'
import {ImageSourcePropType} from 'react-native'
import {VStack, Heading, Text} from 'native-base'

interface Props {
    title: string,
    onPress?: () => void,
    children: React.ReactNode
}

const Masthead = ({title, onPress, children}: Props) => {
    return (
        <VStack h="120px" pb={5}>
            {children}
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
        </VStack>
    )
}

export default Masthead
