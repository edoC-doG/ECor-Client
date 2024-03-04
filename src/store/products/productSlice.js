import { createSlice } from '@reduxjs/toolkit'
import * as action from './asyncAction'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        isLoading: false,
    },
    reducers: {
        test: (state) => {
            state.isLoading = false
        }
    },

    extraReducers: (builder) => {
        builder.addCase(action.newProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(action.newProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        })
        builder.addCase(action.newProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        })
    }
})

export const { test } = productSlice.actions

export default productSlice.reducer
