import { createSlice } from "@reduxjs/toolkit";

export const lhcvSlice = createSlice({
    name: "LHCV",
    initialState: {
        listLienHeCongVu: [],
        lienHeCongVu: {},
        postResult: undefined,
    },
    reducers: {
        list_LHCV: (state, action) => {
            state.listLienHeCongVu = action.payload.data.RETNDATA;
        },
        detail_LHCV: (state, action) => {
            state.lienHeCongVu =
                action.payload.data.RETNDATA !== undefined
                    ? action.payload.data.RETNDATA[0]
                    : {}
        },
        post_LHCV: (state, action) => {
            state.postResult = action.payload.data;
        },
        update_LHCV: (state, action) => {
            state.postResult = action.payload.data;
        },
        delete_LHCV: (state, action) => {
            state.postResult = action.payload.data;
        },
        lock_LHCV: (state, action) => {
            state.postResult = action.payload.data;
        },
        reset_LHCV: (state) => {
            state.postResult = undefined;
        },
    }
})

export const { list_LHCV, detail_LHCV, post_LHCV, update_LHCV, delete_LHCV, lock_LHCV, reset_LHCV } = lhcvSlice.actions

export default lhcvSlice.reducer