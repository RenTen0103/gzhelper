import {createSlice, configureStore} from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'loginState',
    initialState: {
        value: false
    },
    reducers: {
        success: (state) => {
            state.value = true
        },

        failure: state => {
            state.value = false
        }
    }
})
export const loginStore = configureStore({
    reducer: loginSlice.reducer
})


export const {success, failure} = loginSlice.actions