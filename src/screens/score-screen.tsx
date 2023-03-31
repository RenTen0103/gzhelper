import React, {useEffect, useState} from "react";
import {Box, Center, FlatList, Heading, Text, useColorModeValue, View, VStack} from "native-base";
import {score} from "../types/score";
import AnimatedColorBox from "../componets/animated-color-box";
import NavBar from "../componets/navbar";
import Masthead from "../componets/masthead";
import {userStore} from "../stores/user-store";
import ScoreItem from "../componets/score-item";

let s = 0
export default function ScoreScreen() {
    const [scoreList, setScoreList] = useState<score[]>([])


    useEffect(() => {
        try {
            setScoreList(JSON.parse(userStore.getState().scoreList))
        } catch (e) {
            console.log(e)
        }

        userStore.subscribe(() => {
            try {
                setScoreList(JSON.parse(userStore.getState().scoreList))
            } catch (e) {
                console.log(e)
            }

        })
    }, [])


    return <AnimatedColorBox
        flex={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        w="full"
    >
        <Masthead
            title={"分数:共" + (scoreList.length || 0) + "科"}
        >
            <NavBar/>
        </Masthead>
        <Center
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            px={4}
            flex={1}
        >
        </Center>
        <FlatList
            data={scoreList}
            renderItem={item => {
                return (
                    <ScoreItem scoreData={item.item} key={item.index}/>
                );
            }}
            keyExtractor={_ => String(s++)}
        />
    </AnimatedColorBox>

}
