import { createSlice } from "@reduxjs/toolkit";

const totalElements = createSlice({
    name: 'totalElements',
    initialState: {
        total: 0,
        isFetching: false,
        error: false,
    },
    reducers: {
        getTotalElementsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getTotalElementsSuccess: (state, action) => {
            state.isFetching = false;
            state.total = action.payload;
        },
        getTotalElementsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
})

const { reducer, actions } = totalElements;
export const { getTotalElementsStart, getTotalElementsSuccess, getTotalElementsFailure } = actions;
export default reducer;