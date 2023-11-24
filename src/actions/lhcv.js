import * as api from "../api/index.js";
import { list_LHCV, detail_LHCV, post_LHCV, update_LHCV, delete_LHCV, lock_LHCV, reset_LHCV } from "../Slices/lhcvSlice";


export const getListLHCV = (body) => async (dispatch) => {
    try {
        const { data } = await api.fetchListDocuments(body);

        dispatch(list_LHCV({ data }));
    } catch (error) {
        console.log(error.message);
    }
};

export const getDetailLHCV = (keycode) => async (dispatch) => {
    console.log("getDetailLHCV is called with keycode = " + keycode);
    const body = {
        DCMNCODE: "LHCV",
        KEY_CODE: keycode,
    };
    try {
        const { data } = await api.fetchDetailDocument(body);
        dispatch(detail_LHCV({ data }));
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteLHCV = (body) => async (dispatch) => {
    try {
        const { data } = await api.deleteDocument(body);

        dispatch(delete_LHCV({ data }));
    } catch (error) {
        console.log(error.message);
    }
};

export const postLHCV = (body) => async (dispatch) => {
    try {
        const { data } = await api.postDocument(body);

        dispatch(post_LHCV({ data }));
    } catch (error) {
        console.log(error.message);
    }
};

export const updateLHCV = (body) => async (dispatch) => {
    try {
        const { data } = await api.updateDocument(body);

        dispatch(update_LHCV({ data }));
    } catch (error) {
        console.log(error.message);
    }
};

export const updateLockLHCV = (body) => async (dispatch) => {
    try {
        const { data } = await api.updateDocument(body);

        dispatch(update_LHCV({ data }));
    } catch (error) {
        console.log(error.message);
    }
};

export const lockLHCV = (body) => async (dispatch) => {
    try {
        const { data } = await api.lockDocument(body);

        dispatch(lock_LHCV({ data }));
    } catch (error) {
        console.log(error.message);
    }
};

export const resetLHCV = () => async (dispatch) => {
    try {
        dispatch(reset_LHCV({}));
    } catch (error) {
        console.log(error.message);
    }
};
