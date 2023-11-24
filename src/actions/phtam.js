import * as api from "../api/index.js";
import { list_PHTAM, detail_PHTAM, post_PHTAM, update_PHTAM, delete_PHTAM, lock_PHTAM, reset_PHTAM } from "../Slices/phtamSlice";

export const getListPHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);

    dispatch(list_PHTAM({ data }));
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetailPHTAM = (keycode) => async (dispatch) => {
  console.log("getDetailPHTAM is called with keycode = " + keycode);
  const body = {
    DCMNCODE: "PHTAM",
    KEY_CODE: keycode,
  };
  try {
    const { data } = await api.fetchDetailDocument(body);
    dispatch(detail_PHTAM({ data }));
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.deleteDocument(body);

    dispatch(delete_PHTAM({ data }));
  } catch (error) {
    console.log(error.message);
  }
};

export const postPHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.postDocument(body);

    dispatch(post_PHTAM({ data }));
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch(update_PHTAM({ data }));
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLockPHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch(update_PHTAM({ data }));
  } catch (error) {
    console.log(error.message);
  }
};

export const lockPHTAM = (body) => async (dispatch) => {
  try {
    const { data } = await api.lockDocument(body);

    dispatch(lock_PHTAM({ data }));
  } catch (error) {
    console.log(error.message);
  }
};

export const resetPHTAM = () => async (dispatch) => {
  try {
    dispatch(reset_PHTAM({}));
  } catch (error) {
    console.log(error.message);
  }
};
