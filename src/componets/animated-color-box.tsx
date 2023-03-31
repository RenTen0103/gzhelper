import React, {useEffect} from 'react'
import {Box, useColorMode, useToken} from 'native-base'
import usePrevious from '../utils/use-previous'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor, withSpring
} from 'react-native-reanimated'

const AnimatedBox = Animated.createAnimatedComponent(Box)


const AnimatedColorBox = ({bg, ...props}: any) => {
    const hexBg = useToken('colors', bg)
    const prevHexBg = usePrevious(hexBg)
    const progress = useSharedValue(0)

    useEffect(() => {
        progress.value = 0
        progress.value = withTiming(1, {duration: 200})
    }, [hexBg])

    const animatedStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                progress.value,
                [0, 1],
                [prevHexBg || hexBg, hexBg]
            )
        }
    }, [hexBg])


    return <AnimatedBox {...props} style={[animatedStyles]}/>
}

export default AnimatedColorBox
