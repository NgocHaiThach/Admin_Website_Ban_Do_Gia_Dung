import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
    name: 'store',
    initialState: {
        list: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //get list
        getStoreStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getStoreSuccess: (state, action) => {
            state.isFetching = false;
            state.list = action.payload;
        },
        getStoreFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
})

const { reducer, actions } = storeSlice;
export const { getStoreStart, getStoreSuccess, getStoreFailure, } = actions;
export default reducer;