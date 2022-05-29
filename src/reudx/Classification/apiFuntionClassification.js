import callApi from "../../utils/callApi"
import { getListClassificationFailure, getListClassificationStart, getListClassificationSuccess } from "./listClassificationSlice"


//GET: list classification
export const getListClassification = async (dispatch) => {
    dispatch(getListClassificationStart)
    try {
        const res = await callApi(`/admin/classifications/all`, 'GET', null)
        dispatch(getListClassificationSuccess(res.data.result))
    }
    catch (err) {
        dispatch(getListClassificationFailure(err))
    }
}


//ADD: add one classification
export const addClassification = async (dispatch, id, name, imageMenu, imageBanner,) => {

    try {
        const res = await callApi(`/admin/classifications`, 'POST', {
            classificationId: id,
            name: name,
            imageMenu: {
                content: imageMenu,
                isUrl: true,
            },

            imageMenu: {
                content: imageBanner,
                isUrl: true,
            },

        })
    }
    catch (err) {
        console.log(err)
    }
}

// DELETE: delete one classification
export const deleteOneClassification = async (dispatch, id,) => {
    console.log(id)
    try {
        const res1 = await callApi(`/admin/classifications/${id}`, 'DELETE', null);
        getListClassification(dispatch)
    }
    catch (err) {
        console.log(err)
    }
}

//PUT: update one product
export const updateOneClassification = async (dispatch, id, name, imageMenu, imageBanner,) => {
    try {
        const res = await callApi(`/admin/classifications/${id}`, 'PUT', {
            classificationId: id,
            name: name,
            imageMenu: {
                content: imageMenu,
                isUrl: true,
            },

            imageMenu: {
                content: imageBanner,
                isUrl: true,
            },
        })
    }
    catch (err) {
        console.log(err)
    }
}