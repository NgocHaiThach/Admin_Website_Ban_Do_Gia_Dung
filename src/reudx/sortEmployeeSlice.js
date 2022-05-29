import { createSlice } from "@reduxjs/toolkit";

const sortEmployee = createSlice({
    name: 'sort',
    initialState: {
        list: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getSortEmployeeStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getSortEmployeeSuccess: (state, action) => {
            state.isFetching = false;
            state.list = action.payload;
        },
        getSortEmployeeFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
})

const { reducer, actions } = sortEmployee;
export const { getSortEmployeeStart, getSortEmployeeSuccess, getSortEmployeeFailure } = actions;
export default reducer;