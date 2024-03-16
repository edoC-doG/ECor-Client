import { createSlice } from '@reduxjs/toolkit';
import * as action from './asyncAction'
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
    },
    reducers: {
        registerV2: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(action.getCurrentUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(action.getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload
        })
        builder.addCase(action.getCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.errorMessage = action.payload.message;
        })
    }
});

export const { registerV2, logout } = userSlice.actions;

export default userSlice.reducer;