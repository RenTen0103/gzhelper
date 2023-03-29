import {hiddenAll, showLoading} from "../stores/back-store";
import {getCodeList, getScoreData, login} from "./native";
import {failure, loginStore, success} from "../stores/login-store";
import {clearUser, save, setPassword, setScoreList, setUserName, userStore} from "../stores/user-store";
import {ToastAndroid} from "react-native";
import {praseScore} from "./dataPrase";
import {clearAll} from "./localData";

export async function doLogin(userName: string, passwd: string) {
    let result = await login(userName, passwd)
    if (result === "LOGIN SUCCESS") {
        loginStore.dispatch(success())
        userStore.dispatch(setPassword(passwd))
        userStore.dispatch(setUserName(userName))
        save()
        return true
    } else if (result === "NULL") {
        ToastAndroid.show("用户名或密码错误", ToastAndroid.SHORT)
        loginStore.dispatch(failure())
        return false
    } else {
        ToastAndroid.show("网络异常，请检查", ToastAndroid.SHORT)
        loginStore.dispatch(failure())
        return false
    }

}

export async function doGetScoreList() {
    let s = JSON.stringify(praseScore(JSON.parse(await getCodeList()), await getScoreData()));
    userStore.dispatch(setScoreList(s))
    save()
}

export function doLogout() {
    clearAll()
    userStore.dispatch(clearUser())
    loginStore.dispatch(failure())
}



