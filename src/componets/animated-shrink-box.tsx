import Animated, {useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {Box, Button, IBoxProps} from "native-base";
import React, {useEffect} from "react";


const AnimatedBox = Animated.createAnimatedComponent(Box)

interface Props extends IBoxProps {
    active: boolean
    maxSize: number,
    minSize: number,
    children: React.ReactNode
}

export function AnimatedShrinkBox({active, maxSize, minSize, ...props}: Props) {
    const height = useSharedValue(minSize);

    useEffect(() => {
        height.value = withTiming(active ? maxSize : minSize)
    }, [active])

    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: height.value
        };
    });

    return (
        <AnimatedBox {...props} overflow={"hidden"} style={animatedStyles}/>
    );
}

