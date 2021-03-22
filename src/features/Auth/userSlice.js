import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import storageKeys from '../../constants/storage-keys';

export const register = createAsyncThunk('user/register', async (payload) => {
    // call API to register
    const data = await userApi.register(payload);

    // save data to local storage
    localStorage.setItem(storageKeys.TOKEN, data.jwt);
    localStorage.setItem(storageKeys.USER, JSON.stringify(data.user));

    // return user data
    return data.user ;
});

export const login = createAsyncThunk('user/login ', async (payload) => {
    // call API to register
    const data = await userApi.login(payload);

    // save data to local storage
    localStorage.setItem(storageKeys.TOKEN, data.jwt);
    localStorage.setItem(storageKeys.USER, JSON.stringify(data.user));

    // return user data
    return data.user ;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(storageKeys.USER)) || {},
        settings: {},
    },

    reducers: {
        logout(state) {
            // clear localStorage
            localStorage.removeItem(storageKeys.USER);
            localStorage.removeItem(storageKeys.TOKEN );
            // reset current
            state.current = {};
        }

    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
        
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
