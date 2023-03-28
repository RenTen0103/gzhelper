import React from "react";
import {Box, Center, Text} from "native-base";

export default function MainScreen() {
    return (
        <Center
            _dark={{
                bg: "blueGray.900",
            }}

            _light={{
                bg: "blueGray.100",
            }}
        >
            <Box>
                <Text>HELLO World</Text>
            </Box>
        </Center>
    );
}
