import {createSlice, configureStore} from '@reduxjs/toolkit'

const fadeSlice = createSlice({
    name: 'fadeBackState',
    initialState: {
        value: 0
    },
    reducers: {
        showLoading: state => {
            state.value = 1
        },
        hiddeAll: state => {
            state.value = 0
        }
    }
})
export const fadeStore = configureStore({
    reducer: fadeSlice.reducer
})


export const showLoading = () => {
    fadeStore.dispatch(fadeSlice.actions.showLoading())
}

export const hiddenAll = () => {
    fadeStore.dispatch(fadeSlice.actions.hiddeAll())
}
