import React, {useEffect, useState} from "react";
import {Box, HStack, Spinner, Text} from "native-base";

import {fadeStore} from "../stores/back-store";


export default function FadeBack() {

    const [fadeType, setFadeType] = useState(0)

    useEffect(() => {
        fadeStore.subscribe(() => {
            setFadeType(fadeStore.getState().value)
        })
    }, [])


    if (fadeType == 0) {
        return <></>
    } else return <Box position={"absolute"} w={"full"} h={"full"} alignItems={"center"} display={"flex"}>
        {(() => {
            let returns = <></>
            switch (fadeType) {
                case 1:
                    returns = <HStack h={"full"}><Spinner size={100} color={"gray.500"}/></HStack>
            }
            return returns
        })()}
    </Box>
}

