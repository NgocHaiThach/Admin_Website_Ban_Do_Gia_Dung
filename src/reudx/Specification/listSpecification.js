import { createSlice } from "@reduxjs/toolkit";

const listSpecification = createSlice({
    name: 'classification',
    initialState: {
        list: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //get list
        getListSpecificationStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getListSpecificationSuccess: (state, action) => {
            state.isFetching = false;
            state.list = action.payload;
        },
        getListSpecificationFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
})

const { reducer, actions } = listSpecification;
export const { getListSpecificationStart, getListSpecificationSuccess, getListSpecificationFailure, } = actions;
export default reducer;