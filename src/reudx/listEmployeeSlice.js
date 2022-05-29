import { createSlice } from "@reduxjs/toolkit";

const listEmployee = createSlice({
    name: 'employee',
    initialState: {
        list: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //get list
        getListEmployeeStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getListEmployeeSuccess: (state, action) => {
            state.isFetching = false;
            state.list = action.payload;
        },
        getListEmployeeFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //add 1 employee
        addEmployeeStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addEmployeeSuccess: (state, action) => {
            state.isFetching = false
            // state.carts.dishCarts.push(action.payload)
        },
        addEmployeeFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
    }
})

const { reducer, actions } = listEmployee;
export const { getListEmployeeStart, getListEmployeeSuccess, getListEmployeeFailure,
    addEmployeeStart, addEmployeeSuccess, addEmployeeFailure } = actions;
export default reducer;