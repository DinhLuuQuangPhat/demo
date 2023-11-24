import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
    name: "COMMON",
    initialState: {
        appEmplList: [],
        lstmngSubDcmnLHCV: [],
        lstmngSubDcmnPHTAM: [],
        lstCUOM: [],
        lstmngAdvnType: [],
        lstAcctObjectMngr: [],
        lstPymnType: [],
        lstAccObjcCode: [],
    },
    reducers: {
        appEmplList: (state, action) => {
            state.appEmplList =
                action.payload.data.RETNDATA !== null
                    ? action.payload.data.RETNDATA
                    : []
        },
        lstmngSubDcmnLHCV: (state, action) => {
            state.lstmngSubDcmnLHCV =
                action.payload.data.RETNDATA !== null
                    ? action.payload.data.RETNDATA
                    : []
        },
        lstmngSubDcmnPHTAM: (state, action) => {
            state.lstmngSubDcmnPHTAM =
                action.payload.data.RETNDATA !== null
                    ? action.payload.data.RETNDATA
                    : []
        },
        lstCUOM: (state, action) => {
            state.lstCUOM =
                action.payload.data.RETNDATA !== null
                    ? action.payload.data.RETNDATA
                    : []
        },
        lstmngAdvnType: (state, action) => {
            state.lstmngAdvnType =
                action.payload.data.RETNDATA !== null
                    ? action.payload.data.RETNDATA
                    : []
        },
        lstAcctObjectMngr: (state, action) => {
            state.lstAcctObjectMngr =
                action.payload.data.RETNDATA !== null
                    ? action.payload.data.RETNDATA
                    : []
        },
        lstPymnType: (state, action) => {
            state.lstPymnType =
                action.payload.data.RETNDATA !== null
                    ? action.payload.data.RETNDATA
                    : []
        },
        lstAccObjcCode: (state, action) => {
            state.lstAccObjcCode =
                action.payload.data.RETNDATA !== null
                    ? action.payload.data.RETNDATA
                    : []
        },
    }
})

export const { appEmplList, lstmngSubDcmnLHCV, lstmngSubDcmnPHTAM, lstCUOM, lstmngAdvnType, lstAcctObjectMngr, lstPymnType, lstAccObjcCode } = commonSlice.actions

export default commonSlice.reducer