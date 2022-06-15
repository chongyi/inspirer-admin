import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getContentList } from './api/content';

const initialState = {
    data: {
        data: [],
        page: 1,
        page_size: 20,
        total: 0
    },
    loading: false,
}

export const loadContentListAsync = createAsyncThunk(
    'contentList/loadContentList',
    async (...payload) => {
        const response = await getContentList(...payload);
        return response.data;
    }
);

export const contentListSlice = createSlice({
    name: 'contentList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadContentListAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(loadContentListAsync.rejected, (state) => {
                state.loading = false
            })
            .addCase(loadContentListAsync.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
    }
})

export const { } = contentListSlice.actions;

export const selectContentList = (state) => ({
    data: state.contentList.data,
    loading: state.contentList.loading,
})

export default contentListSlice.reducer;
