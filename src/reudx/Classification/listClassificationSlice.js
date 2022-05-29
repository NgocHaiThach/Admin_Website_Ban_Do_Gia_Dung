import { createSlice } from "@reduxjs/toolkit";

const listClassification = createSlice({
    name: 'classification',
    initialState: {
        list: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //get list
        getListClassificationStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getListClassificationSuccess: (state, action) => {
            state.isFetching = false;
            state.list = action.payload;
        },
        getListClassificationFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
})

const { reducer, actions } = listClassification;
export const { getListClassificationStart, getListClassificationSuccess, getListClassificationFailure, } = actions;
export default reducer;