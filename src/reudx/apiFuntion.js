import callApi from "../utils/callApi"
import { addEmployeeFailure, addEmployeeStart, getListEmployeeFailure, getListEmployeeStart, getListEmployeeSuccess } from "./listEmployeeSlice"
import { clearOneEmployeeSuccess, deleteOneEmployeeFailure, deleteOneEmployeeStart, getOneEmployeeFailure, getOneEmployeeStart, getOneEmployeeSuccess, updateOneEmployeeFailure, updateOneEmployeeStart } from "./oneEmployee"
import { getSortEmployeeFailure, getSortEmployeeStart, getSortEmployeeSuccess } from "./sortEmployeeSlice"
import { getTotalElementsFailure, getTotalElementsStart, getTotalElementsSuccess } from "./totalElements"

// GET: List product
export const getListEmployee = async (dispatch) => {
    dispatch(getListEmployeeStart)
    try {
        const res = await callApi(`/admin/products/all`, 'GET', null)
        dispatch(getListEmployeeSuccess(res.data.result))
    }
    catch (err) {
        dispatch(getListEmployeeFailure(err))
    }
}

// ADD: one product
export const addEmployee = async (dispatch,
    id,
    name,
    category,
    price,
    description,
    avatar,
    contentPicture,
    weight,
    length,
    width,
    height,
    specifications) => {

    dispatch(addEmployeeStart)
    try {
        const res = await callApi(`/admin/products`, 'POST', {
            productId: id,
            categoryId: category,
            name: name,
            price: price,
            highlights: description,
            avatar: {
                content: avatar,
                isUrl: true,
            },
            images: contentPicture.map(image => ({
                content: image,
                isUrl: false,
            })),
            weight: weight,
            length: length,
            width: width,
            height: height,
            specifications: specifications,
            enable: true,
        })
    }
    catch (err) {
        dispatch(addEmployeeFailure(err))
    }
}

// DELETE: delete one product
export const deleteOneEmployee = async (dispatch, id,) => {
    console.log(id)
    dispatch(deleteOneEmployeeStart)
    try {
        const res1 = await callApi(`/admin/products/${id}`, 'DELETE', null);
        getListEmployee(dispatch)
    }
    catch (err) {
        dispatch(deleteOneEmployeeFailure(err))
    }
}

//PUT: update one product
export const updateOneProduct = async (dispatch,
     avatar, 
     category, 
     height, 
     highlights, 
     id, 
     length, 
     name, 
     price, 
     weight, 
     width, 
     b,
     images,) => {
    try {
        const res = await callApi(`/admin/products/${id}`, 'PUT', {
            productId: id,
            categoryId: category,
            name: name,
            price: price,
            highlights: [highlights],
            avatar: {
                content: avatar,
                isUrl: true,
            },
            images: images.map(image => ({
                content: image,
                isUrl: true,
            })),
            width: width,
            height: height,
            length: length,
            weight: weight,
            enable: true,
            specifications: b,
        })
        getListEmployee(dispatch);
        console.log(highlights)
    }
    catch (err) {
        console.log(err)
    }
}

// List Employee
export const searchListEmployee = async (dispatch, currentPage, sizePage, searchText) => {
    // dispatch(getListEmployeeStart)
    // try {
    //     const res = await callApi(`employees/?page=${currentPage}&size=${sizePage}&searchKeyword=${searchText}`, 'GET', null)
    //     dispatch(getListEmployeeSuccess(res.data.content))
    // }
    // catch (err) {
    //     dispatch(getListEmployeeFailure(err))
    // }
}

// set List Employee sort
export const setListEmployee = async (dispatch, list) => {
        dispatch(getListEmployeeStart)
        try {
            dispatch(getListEmployeeSuccess(list))
        }
        catch (err) {
            dispatch(getListEmployeeFailure(err))
        }
}

// List Employee
export const getSortEmployee = async (dispatch, list) => {
    // dispatch(getSortEmployeeStart)
    // try {
    //     dispatch(getSortEmployeeSuccess(list))
    // }
    // catch (err) {
    //     dispatch(getSortEmployeeFailure(err))
    // }
}

// One Employee
export const getOneEmployee = async (dispatch, id) => {
    // dispatch(getOneEmployeeStart)
    // try {
    //     const res = await callApi(`employees/${id}`, 'GET', null)
    //     dispatch(getOneEmployeeSuccess(res.data))
    // }
    // catch (err) {
    //     dispatch(getOneEmployeeFailure(err))
    // }
}

//totalElements
export const getTotalElements = async (dispatch, currentPage, sizePage, searchText) => {
    // dispatch(getTotalElementsStart)
    // try {
    //     if (searchText) {
    //         const res = await callApi(`employees/?page=${currentPage}&size=${sizePage}&searchKeyword=${searchText}`, 'GET', null)
    //         dispatch(getTotalElementsSuccess(res.data.totalElements))
    //     }
    //     else {
    //         const res = await callApi(`employees/?page=${currentPage}&size=${sizePage}`, 'GET', null)
    //         dispatch(getTotalElementsSuccess(res.data.totalElements))
    //     }
    // }
    // catch (err) {
    //     dispatch(getTotalElementsFailure(err))
    // }
}