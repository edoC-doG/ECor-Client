import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis'

export const getNewProducts = createAsyncThunk(
    'product/newProduct',
    async (data, { rejectWithValue }) => {
        const res = await apis.apiGetProducts({ sort: '-createAt' })
        if (!res.success) return rejectWithValue(res)
        return res.getProducts
    }
)