import {createSlice, configureStore} from '@reduxjs/toolkit'
import {loadTime, saveTime} from "../utils/localData";

const timeSlice = createSlice({
    name: 'timeState',
    initialState: {
        value: new Date("2023-03-06").valueOf() - 28800000
    },
    reducers: {
        loadTime: (state) => {
            state.value = (loadTime() || state.value);
        },

        currentWeekReduce: (state) => {
            state.value = state.value + 604800000
            saveTime(state.value)
        },
        currentWeekPlus: (state) => {
            state.value = state.value - 604800000
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




