import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getContentServiceConfig } from "./api/content";

const initialState = {
    loading: false,
    config: null,
}

export const loadContentServiceConfigAsync = createAsyncThunk(
    'contentConfig/loadContentServiceConfig',
    async () => {
        const response = await getContentServiceConfig();
        return response.data;
    }
);

export const contentConfigSlice = createSlice({
    name: 'contentConfig',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadContentServiceConfigAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(loadContentServiceConfigAsync.rejected, (state) => {
                state.loading = false
            })
            .addCase(loadContentServiceConfigAsync.fulfilled, (state, action) => {
                state.loading = false
                state.config = action.payload
            })
    }
})

export const {} = contentConfigSlice.actions

export const selectContentConfigState = (state) => ({
    data: state.contentConfig.data,
    loading: state.contentConfig.loading,
})

export default contentConfigSlice.reducer;