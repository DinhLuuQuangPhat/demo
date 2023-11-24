import * as api from "../api/index.js";
import { appEmplList, lstmngSubDcmnLHCV, lstmngSubDcmnPHTAM, lstCUOM, lstmngAdvnType, lstAcctObjectMngr, lstPymnType, lstAccObjcCode } from "../Slices/commonSlice";

// Danh sách Nhân viên
export const getAppEmplList = () => async (dispatch) => {
  const body = {
    DCMNCODE: "appEmplList",
    PARACODE: "001",
    DPTMCODE: "%",
    PSTNCODE: "%",
    JOB_CODE: "%",
    PSTNTYPE: 0,
    JOB_TYPE: 0,
  };
  try {
    const { data } = await api.fetchCommonData(body);

    dispatch(appEmplList({ data }));
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách lãnh vực liên quan
export const getLstmngSubDcmnLHCV = () => async (dispatch) => {
  const body = {
    VAR_VLUE: "",
    CONDFLTR: "DcmnCode='LHCV'",
    LISTCODE: "lstmngSub_Dcmn",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch(lstmngSubDcmnLHCV({ data }));
  } catch (error) {
    console.log(error.message);
  }
};
export const getLstmngSubDcmnPHTAM = () => async (dispatch) => {
  const body = {
    VAR_VLUE: "",
    CONDFLTR: "DcmnCode='PHTAM'",
    LISTCODE: "lstmngSub_Dcmn",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch(lstmngSubDcmnPHTAM({ data }));
  } catch (error) {
    console.log(error.message);
  }
};

export const getLstCUOM = () => async (dispatch) => {
  const body = { LISTCODE: "lstCUOM" };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch(lstCUOM({ data }));
  } catch (error) {
    console.log(error.message);
  }
};
export const getLstmngAdvnType = () => async (dispatch) => {
  const body = { LISTCODE: "lstmngAdvnType" };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch(lstmngAdvnType({ data }));
  } catch (error) {
    console.log(error.message);
  }
};
export const getLstAcctObjectMngr = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstAcctObjectMngr",
    CONDFLTR: "UsedStte>0",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch(lstAcctObjectMngr({ data }));
  } catch (error) {
    console.log(error.message);
  }
};
export const getLstPymnType = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstPymnType",
    CONDFLTR: "PymnType in(1,8,1024)",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch(lstPymnType({ data }));
  } catch (error) {
    console.log(error.message);
  }
};
export const getLstAccObjcCode = (objType) => async (dispatch) => {
  const body = {
    FUNCNAME: "spDtaLoadAccObjcCode_Srch_App",
    DTBSNAME: "Common",
    LCTNCODE: "{{0202}}",
    PARA_001: "'1990-01-01', '1990-01-01'," + parseInt(objType) + ", ''",
  };
  try {
    const { data } = await api.fetchCommonFuncList(body);

    dispatch(lstAccObjcCode({ data }));
  } catch (error) {
    console.log(error.message);
  }
};