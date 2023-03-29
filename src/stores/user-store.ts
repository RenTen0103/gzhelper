import {createSlice, configureStore} from '@reduxjs/toolkit'
import {getpasswd, getScoreDataFromLocal, getUsername, setPasswd, setScoreData, setUsername} from "../utils/localData";
import {loginStore, success} from "./login-store";
import {doGetScoreList, doLogin} from "../utils/request";

interface CounterState {
    userName: string,
    passWord: string,
    scoreList: string
}

// 使用该类型定义初始 state
const initialState: CounterState = {
    passWord: "",
    userName: "",
    scoreList: "",
}

const userSlice = createSlice({
    name: 'userState',
    initialState: initialState,
    reducers: {
        loadLocal: state => {
            state.passWord = getpasswd()
            state.userName = getUsername();
            state.scoreList = getScoreDataFromLocal() || "{}";
            if (getpasswd() != "" && getUsername() != "" && getpasswd() && getUsername()) {
                loginStore.dispatch(success());
                (async () => {
                    if (await doLogin(getUsername(), getpasswd())) {
                        await doGetScoreList()
                    }
                    console.log(getUsername())
                    loginStore.dispatch(success())
                })()
            }
        },
        setScoreList: (state, p) => {
            console.log(p.payload)
            state.scoreList = p.payload
        },
        storeLocal: state => {
            setPasswd(state.passWord)
            setUsername(state.userName)
            setScoreData(state.scoreList)
        },


        setUserName: (state, s) => {
            state.userName = s.payload;
        },
        setPassword: (state, s) => {
            state.passWord = s.payload;
        },
        clearUser: state => {
            state.userName = ''
            state.passWord = ''
            state.scoreList = ''
        }

    }
})
export const userStore = configureStore({
    reducer: userSlice.reducer
})

export const {setUserName, clearUser, setScoreList, setPassword, storeLocal, loadLocal} = userSlice.actions

export const save = () => {
    userStore.dispatch(storeLocal())
}
