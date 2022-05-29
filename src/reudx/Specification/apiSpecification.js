import callApi from "../../utils/callApi"
import { getListSpecificationFailure, getListSpecificationStart, getListSpecificationSuccess } from "./listSpecification"


//GET: list specification
export const getListSpecification = async (dispatch) => {
    dispatch(getListSpecificationStart)
    try {
        const res = await callApi(`/admin/specifications`, 'GET', null)
        dispatch(getListSpecificationSuccess(res.data.result))
    }
    catch (err) {
        dispatch(getListSpecificationFailure(err))
    }
}


//ADD: add one specification
export const addSpecification = async (dispatch, id, name, description) => {

    try {
        const res = await callApi(`/admin/specifications`, 'POST', {
            specificationId: id,
            name: name,
        })
    }
    catch (err) {
        console.log(err)
    }
}

// DELETE: delete one specification
export const deleteOneSpecification = async (dispatch, id,) => {
    console.log(id)
    try {
        const res1 = await callApi(`/admin/specifications/${id}`, 'DELETE', null);
        getListSpecification(dispatch);
    }
    catch (err) {
        console.log(err)
    }
}

//PUT: update one specification
export const updateOneSpecification = async (dispatch, id, name,) => {
    try {
        const res = await callApi(`/admin/specifications/${id}`, 'PUT', {
            specificationId: id,
            name: name,
        })
    }
    catch (err) {
        console.log(err)
    }
}