import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserProfile, login } from './api/user';

const initialState = {
    token: sessionStorage.accessToken || localStorage.accessToken || null,
    profile: null,
    isLogin: !!(sessionStorage.accessToken || localStorage.accessToken),
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

        // 保存本地
        if (response.data.access_token) {
            sessionStorage.accessToken = response.data.access_token
        }

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
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLogin = true;
                state.token = action.payload;
            })
            .addCase(updateProfileAsync.fulfilled, (state, action) => {
                state.isLogin = true;
                state.profile = action.payload;
            })
    },
});

export const {  } = userSessionSlice.actions;

export const selectIsLogin = (state) => state.userSession.isLogin;

export default userSessionSlice.reducer;
