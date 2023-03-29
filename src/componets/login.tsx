import React, {useState} from "react";
import {Box, Button, Heading, Hidden, Input, Spinner, Text, VStack} from "native-base";
import {failure, loginStore, success} from "../stores/login-store";
import {login} from "../utils/native";
import {ToastAndroid} from "react-native";
import {showLoading, hiddenAll} from "../stores/back-store";
import {save, setPassword, setUserName, userStore} from "../stores/user-store";
import {doGetScoreList, doLogin} from "../utils/request";

export default function Login() {

    const [passwd, handlePasswd] = useState('')
    const [userName, handleUsername] = useState('')

    const submit = async () => {
        showLoading()
        let loginState = await doLogin(userName, passwd)
        hiddenAll()
        if (loginState) {
            await doGetScoreList()
        }
    }


    return (
        <Box w={"full"} h={"full"}>
            <VStack alignItems={"center"} space={4}>
                <Input paddingLeft={2} variant="underlined" onChangeText={handleUsername} placeholder=" 用户名/学号"
                       w="100%"/>
                <Input paddingLeft={2} type={"password"} variant="underlined" onChangeText={handlePasswd}
                       placeholder="密码" w="100%"/>
                <Button w={"full"} marginTop={3} onPress={submit} height={10}>登录</Button>
            </VStack>
        </Box>
    )
}
