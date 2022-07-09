import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import contentAPI from './api/content';

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
    'deletedContentList/loadContentList',
    async (pagination) => {
        const response = await contentAPI.getDeletedContentList(pagination);
        return response.data;
    }
);

export const refreshContentListAsync = createAsyncThunk(
    'deletedContentList/refreshContentList',
    async (_payload, thunkAPI) => {
        const { page, page_size } = thunkAPI.getState().deletedContentList.data
        const response = await contentAPI.getDeletedContentList({ page, page_size })
        return response.data;
    }
)

export const deletedContentListSlice = createSlice({
    name: 'deletedContentList',
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
            .addCase(refreshContentListAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(refreshContentListAsync.rejected, (state) => {
                state.loading = true
            })
            .addCase(refreshContentListAsync.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
    }
})

export const { } = deletedContentListSlice.actions;

export const selectContentList = (state) => ({
    data: state.deletedContentList.data,
    loading: state.deletedContentList.loading,
})

export default deletedContentListSlice.reducer;
