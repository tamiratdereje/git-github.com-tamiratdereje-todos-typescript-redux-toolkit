import React from "react";
import {createAsyncThunk, createSlice, } from '@reduxjs/toolkit'

export const fetchUserById = createAsyncThunk(
    'users/fetchById',
    async (userId, thunkAPI) => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${userId}`)
            return await response.json()
        } catch (error : any) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);

interface UserState {
    loading: boolean;
    error: string | null;
    data: any;
}

const initialState: UserState = {
    loading: false,
    error: null,
    data: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserById.pending.type]: (state) => {
            state.loading = true;
        },
        [fetchUserById.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        [fetchUserById.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        },
    }
});

export default userSlice.reducer;
