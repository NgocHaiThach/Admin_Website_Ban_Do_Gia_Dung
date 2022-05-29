import { createSlice } from "@reduxjs/toolkit";

const oneEmployee = createSlice({
    name: 'employee',
    initialState: {
        info: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        //get one
        getOneEmployeeStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.info = null;
        },
        getOneEmployeeSuccess: (state, action) => {
            state.isFetching = false;
            state.info = action.payload;
        },

        getOneEmployeeFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.info = null;
        },

        //update
        updateOneEmployeeStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateOneEmployeeSuccess: (state, action) => {
            state.isFetching = false;
            state.info = action.payload;
        },
        updateOneEmployeeFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //delete
        deleteOneEmployeeStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteOneEmployeeFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

    }
})

const { reducer, actions } = oneEmployee;
export const { getOneEmployeeStart, getOneEmployeeSuccess, getOneEmployeeFailure,
    updateOneEmployeeStart, updateOneEmployeeSuccess, updateOneEmployeeFailure,
    deleteOneEmployeeStart, deleteOneEmployeeFailure,
} = actions;
export default reducer;