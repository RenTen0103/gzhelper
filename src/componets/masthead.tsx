import React from 'react'
import {ImageSourcePropType} from 'react-native'
import {VStack, Heading, Text} from 'native-base'

interface Props {
    title: string
    children: React.ReactNode
}

const Masthead = ({title, children}: Props) => {
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
                <Text>{title}</Text>
            </Heading>
        </VStack>
    )
}

export default Masthead
