import callApi from "../../utils/callApi"
import { getListCategoryFailure, getListCategoryStart, getListCategorySuccess } from "./listCategorySlice"


//GET: list classification
export const getListCategory = async (dispatch) => {
    dispatch(getListCategoryStart)
    try {
        const res = await callApi(`/admin/categories/all`, 'GET', null)
        dispatch(getListCategorySuccess(res.data.result))
    }
    catch (err) {
        dispatch(getListCategoryFailure(err))
    }
}

// set List Employee sort
export const setListCatergory = async (dispatch, list) => {
    dispatch(getListCategoryStart)
    try {
        dispatch(getListCategorySuccess(list))
    }
    catch (err) {
        dispatch(getListCategoryFailure(err))
    }
}

//ADD: add one category
export const addCategory = async (dispatch,
    categoryId,
    classificationId,
    name,
    slogan,
    image,
    advantages1,
    advantages2,
    advantages3,
    advantages4,) => {

    try {
        const res = await callApi(`/admin/categories`, 'POST', {
            classificationId: classificationId,
            categoryId: categoryId,
            name: name,
            slogan: slogan,
            image: {
                content: image,
                isUrl: true,
            },

            advantages: [advantages1, advantages2, advantages3, advantages4].map(advan => ({
                content: advan,
                // head: 'ngon'
            }))
        })
    }
    catch (err) {
        console.log(err)
    }
}

// DELETE: delete one category
export const deleteOneCategory = async (dispatch, id,) => {
    console.log(id)
    try {
        const res1 = await callApi(`/admin/categories/${id}`, 'DELETE', null);
        getListCategory(dispatch)
    }
    catch (err) {
        console.log(err)
    }
}

//PUT: update one product
export const updateOneCategory = async (dispatch, categoryId,
    classificationId,
    name,
    slogan,
    image,
    advantages1,
    advantages2,
    advantages3,
    advantages4,) => {
    try {
        const res = await callApi(`/admin/categories/${categoryId}`, 'PUT', {
            classificationId: classificationId,
            categoryId: categoryId,
            name: name,
            slogan: slogan,
            image: {
                content: image,
                isUrl: true,
            },

            advantages: [advantages1, advantages2, advantages3, advantages4].map(advan => ({
                content: advan,
                // head: 'ngon'
            }))
        })
    }
    catch (err) {
        console.log(err)
    }
}