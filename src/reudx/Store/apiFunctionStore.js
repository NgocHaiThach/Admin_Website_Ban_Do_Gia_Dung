import callApi from "../../utils/callApi"
import { getStoreFailure, getStoreStart, getStoreSuccess } from "./storeSlice";

//GET: list specification
export const getStore = async (dispatch) => {
    dispatch(getStoreStart)
    try {
        const res = await callApi(`/stores`, 'GET', null)
        dispatch(getStoreSuccess(res.data.result));
    }
    catch (err) {
        dispatch(getStoreFailure(err))
    }
}

//ADD: add one category
export const addStore = async (dispatch, name, province, district, ward, detail,) => {
    try {
        const res = await callApi(`/stores`, 'POST', {
            name: name,
            province: province,
            district: district,
            ward: ward,
            detail:detail,
        })
    }
    catch (err) {
        console.log(err)
    }
}

// DELETE: delete one category
export const deleteOneStore = async (dispatch, id,) => {
    try {
        const res1 = await callApi(`/stores/${id}`, 'DELETE', null);
        getStore(dispatch)
    }
    catch (err) {
        console.log(err)
    }
}