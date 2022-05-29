import { configureStore } from "@reduxjs/toolkit";
import listEmployeeReducer from '../reudx/listEmployeeSlice';
import totalElementsReducer from '../reudx/totalElements';
import sortEmployeeReducer from '../reudx/sortEmployeeSlice';
import oneEmployeeReducer from '../reudx/oneEmployee';
import listClassificationReducer from '../reudx/Classification/listClassificationSlice';
import listCategoryReducer from '../reudx/Categories/listCategorySlice';
import listSpecificationReducer from '../reudx/Specification/listSpecification';
import storeReducer from '../reudx/Store/storeSlice';

const rootReducer = {
    listEmployee: listEmployeeReducer,
    totalElements: totalElementsReducer,
    sortEmployee: sortEmployeeReducer,
    oneEmployee: oneEmployeeReducer,
    classification: listClassificationReducer,
    category: listCategoryReducer,
    specification: listSpecificationReducer,
    store: storeReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;