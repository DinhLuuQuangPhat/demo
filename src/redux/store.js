import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "../Slices/commonSlice";
import lhcvReducer from "../Slices/lhcvSlice";
import phtamReducer from "../Slices/phtamSlice";

export const store = configureStore({
    reducer: {
        COMMON: commonReducer,
        LHCV: lhcvReducer,
        PHTAM: phtamReducer,
    },
})
