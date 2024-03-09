import { createSlice } from '@reduxjs/toolkit'
import * as action from './asyncAction'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        current: null,
        errorMessage: '',
        isLoggedIn: false,
    },
    reducers: {
        register: (state, action) => {
            state.isLoggedIn = action.isLoggedIn
            state.current = action.userData
            state.token = action.token
        }
    },

    extraReducers: (builder) => {
        // builder.addCase(action.getNewProducts.pending, (state, action) => {
        //     state.isLoading = true;
        // })
        // builder.addCase(action.getNewProducts.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.newProducts = action.payload;
        // })
        // builder.addCase(action.getNewProducts.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.errorMessage = action.payload.message;
        // })
    }
})

export const { register } = userSlice.actions

export default userSlice.reducer
