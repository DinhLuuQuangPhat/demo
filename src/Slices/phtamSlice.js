import { createSlice } from "@reduxjs/toolkit";

export const phtamSlice = createSlice({
    name: "PHTAM",
    initialState: {
        listPhieuTamUng: [],
        phieuTamUng: {},
        postResult: undefined,
    },
    reducers: {
        list_PHTAM: (state, action) => {
            state.listPhieuTamUng = action.payload.data.RETNDATA;
        },
        detail_PHTAM: (state, action) => {
            state.phieuTamUng =
                action.payload.data.RETNDATA !== undefined
                    ? action.payload.data.RETNDATA[0]
                    : {}
        },
        post_PHTAM: (state, action) => {
            state.postResult = action.payload.data;
        },
        update_PHTAM: (state, action) => {
            state.postResult = action.payload.data;
        },
        delete_PHTAM: (state, action) => {
            state.postResult = action.payload.data;
        },
        lock_PHTAM: (state, action) => {
            state.postResult = action.payload.data;
        },
        reset_PHTAM: (state) => {
            state.postResult = undefined;
        },
    }
})

export const { list_PHTAM, detail_PHTAM, post_PHTAM, update_PHTAM, delete_PHTAM, lock_PHTAM, reset_PHTAM } = phtamSlice.actions

export default phtamSlice.reducer