import { createSlice } from "@reduxjs/toolkit";

const listCategory = createSlice({
    name: 'catagory',
    initialState: {
        list: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //get list
        getListCategoryStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getListCategorySuccess: (state, action) => {
            state.isFetching = false;
            state.list = action.payload;
        },
        getListCategoryFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
})

const { reducer, actions } = listCategory;
export const { getListCategoryStart, getListCategorySuccess, getListCategoryFailure, } = actions;
export default reducer;