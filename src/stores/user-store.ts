import {createSlice, configureStore} from '@reduxjs/toolkit'
import {
    getpasswd, getScheduleFromLocal,
    getScheduleToday,
    getScoreDataFromLocal,
    getUsername,
    setPasswd, setSchedule,
    setScoreData,
    setUsername
} from "../utils/localData";
import {loginStore, success} from "./login-store";
import {doGetScheduleList, doGetScoreList, doLogin} from "../utils/request";
import {schedule} from "../types/schedule";

interface CounterState {
    userName: string,
    passWord: string,
    scoreList: string,
    scheduleList: string
}

// 使用该类型定义初始 state
const initialState: CounterState = {
    passWord: "",
    userName: "",
    scoreList: "",
    scheduleList: "",
}

const userSlice = createSlice({
    name: 'userState',
    initialState: initialState,
    reducers: {
        loadLocal: state => {

            state.passWord = getpasswd()
            state.userName = getUsername();
            state.scoreList = getScoreDataFromLocal() || "{}";
            state.scheduleList = getScheduleFromLocal()

            if (getpasswd() != "" && getUsername() != "" && getpasswd() && getUsername()) {
                loginStore.dispatch(success());
                (async () => {
                    if (await doLogin(getUsername(), getpasswd())) {
                        await doGetScoreList()
                        await doGetScheduleList()
                    }
                    loginStore.dispatch(success())

                })()
            }
        },
        setScoreList: (state, p) => {
            state.scoreList = p.payload
        },
        setScheduleList: (state, p) => {
            state.scheduleList = p.payload
        },
        storeLocal: state => {
            try {
                setPasswd(state.passWord)
                setUsername(state.userName)
                setScoreData(state.scoreList)
                setSchedule(state.scheduleList)
            } catch (e) {
                console.log(e)
            }

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

export const {
    setUserName,
    clearUser,
    setScheduleList,
    setScoreList,
    setPassword,
    storeLocal,
    loadLocal
} = userSlice.actions


export const getScheduleListFromStore = () => {
    if (!userStore.getState().scheduleList) {
        return []
    } else return JSON.parse(userStore.getState().scheduleList) as schedule[][][]
}
export const save = () => {
    userStore.dispatch(storeLocal())
}
