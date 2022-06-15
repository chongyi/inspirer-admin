import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserProfile, login } from './api/user';

const initialState = {
    token: localStorage.accessToken || null,
    profile: null,
    loginStatus: 0,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginAsync = createAsyncThunk(
    'userSession/login',
    async (payload) => {
        const response = await login(payload);
        // The value we return becomes the `fulfilled` action payload
        return response.data.access_token;
    }
);

export const updateProfileAsync = createAsyncThunk(
    'userSession/updateProfile',
    async () => {
        const response = await getUserProfile()
        return response.data
    }
)

export const userSessionSlice = createSlice({
    name: 'userSession',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loginStatus = 1;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loginStatus = 2;
                state.token = action.payload;
            })
            .addCase(updateProfileAsync.fulfilled, (state, action) => {
                state.profile = action.payload;
            });
    },
});

export const {  } = userSessionSlice.actions;

export default userSessionSlice.reducer;
