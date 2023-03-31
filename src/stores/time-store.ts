import {createSlice, configureStore} from '@reduxjs/toolkit'
import {loadTime, saveTime} from "../utils/localData";

const timeSlice = createSlice({
    name: 'timeState',
    initialState: {
        value: new Date("2023-03-06").valueOf()
    },
    reducers: {
        loadTime: (state) => {
            state.value = loadTime();
        },

        currentWeekReduce: (state) => {
            state.value = new Date().valueOf() - 7 * 24 * 60 * 60 * 1000
            saveTime(state.value)
        },
        currentWeekPlus: (state) => {
            state.value = new Date().valueOf() + 7 * 24 * 60 * 60 * 1000
            saveTime(state.value)
        }
    }
})
export const timeStore = configureStore({
    reducer: timeSlice.reducer
})

export const reduceWeek = () => {
    timeStore.dispatch(timeSlice.actions.currentWeekReduce())
}
export const plusWeek = () => {
    timeStore.dispatch(timeSlice.actions.currentWeekPlus())
}
export const init = () => {
    timeStore.dispatch(timeSlice.actions.loadTime())
}




