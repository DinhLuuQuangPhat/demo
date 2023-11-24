import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import {
    Input,
} from "@progress/kendo-react-inputs";
import {
    MdAddCircleOutline,
    MdContentCopy,
} from "react-icons/md";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Label } from "@progress/kendo-react-labels";
import { FcLeft } from "react-icons/fc";
import moment from "moment/moment";
import FieldEditCombobox from "../FieldEditCombobox";
import MainButton from "../MainButton";
import { NavLink } from "react-router-dom";
import FieldEditNumberic from "../FieldEditNumberic";
import {
    postPHTAM,
    updatePHTAM,
    resetPHTAM,
} from "../../actions/phtam";
import { getLstAccObjcCode } from "../../actions/common";


const dcmncCode = "PHTAM";
const userData = JSON.parse(localStorage.getItem("userData"));

const PHTAMEditMain = (props) => {


    const dispatch = useDispatch();
    const phieuTamUng = useSelector((state) => state.PHTAM.phieuTamUng);
    const postResult = useSelector((state) => state.PHTAM.postResult);
    const lstmngSubDcmnPHTAM = useSelector(
        (state) => state.COMMON.lstmngSubDcmnPHTAM
    );
    const lstCUOM = useSelector((state) => state.COMMON.lstCUOM);
    const lstmngAdvnType = useSelector((state) => state.COMMON.lstmngAdvnType);
    const lstAcctObjectMngr = useSelector((state) => state.COMMON.lstAcctObjectMngr);
    const lstPymnType = useSelector((state) => state.COMMON.lstPymnType);
    const lstAccObjcCode = useSelector((state) => state.COMMON.lstAccObjcCode);


    const [tabSelected, setTabSelected] = useState(0);
    const [mode, setMode] = props.mode === "ADD" ? useState(true) : useState(false);

    useEffect(() => {
        if (props.mode === "ADD") {
            setMode(true);
        }
    }, []);

    const initHeader = {
        MAINDATE: moment(new Date()).format("YYYY-MM-DD"),
        DCMNSBCD: "",
        MAINCODE: "",
        CUOMCODE: "",
        CUOMRATE: 0,
        GRP_TYPE: "",
        OBJCTYPE: 0,
        OBJCCODE: "",
        PERDDATE: moment(new Date()).format("YYYY-MM-DD"),
        EMPLCODE: userData.EMPLCODE,
        ADVNCRAM: 0,
        ACPTCRAM: 0,
        MEXLNNTE: "",
        ACOBCODE: "",
        OBJCNAME: "",
        PYMNTYPE: 0,
        DDDD: dcmncCode,
        ACCERGHT: 0,
        STTESIGN: 1,
        STTENAME: "",
        QRC_DATA: "",
        KKKK0000: "",
        DCMNFILE: [],
    };
    const [header, setHeader] = useState(initHeader);

    useEffect(() => {
        if (phieuTamUng) {
            setHeader(phieuTamUng !== undefined ? phieuTamUng : initHeader);
        }
    }, [phieuTamUng]);

    useEffect(() => {
        if (header.GRP_TYPE) {
            dispatch(getLstAccObjcCode(header.GRP_TYPE));
        }
    }, [header.GRP_TYPE]);

    useEffect(() => {
        if (postResult) {
            if (postResult.RETNCODE) {
                alert(postResult.RETNMSSG);
                dispatch(resetPHTAM());
            }
        }
    }, [postResult]);

    const handleAdd = () => {
        var postJson = {
            DCMNCODE: dcmncCode,
            HEADER: [header],
        };
        dispatch(postPHTAM(postJson));
    };
    const handleSave = () => {
        var postJson = {
            DCMNCODE: dcmncCode,
            HEADER: [header],
        };
        dispatch(updatePHTAM(postJson));
    };

    return (
        <>
            {console.log(header)}
            <div className={"p-3 flex justify-between items-center"}>
                <div className="order-first flex items-center">
                    {/* Dau mui ten , event Click vao hien thi danh sach Luoi */}
                    <NavLink className="text-base mr-2" to={"/dashboard/advn-invc"}>
                        <FcLeft />
                    </NavLink>
                </div>
                <div id="action-button" className="flex order-last">
                    {/* Them moi */}
                    {props.mode === "ADD" && (
                        <MainButton
                            title={"Thêm"}
                            icon={<MdAddCircleOutline />}
                            customClick={handleAdd}
                            className="AddItem"
                        />
                    )}
                    {/* Sua */}
                    {props.mode === "EDIT" && mode === false && (
                        <MainButton
                            title={"Sửa"}
                            icon={<MdAddCircleOutline />}
                            customClick={() => {
                                setMode(true);
                            }}
                            className="AddItem"
                        />
                    )}
                    {/* Luu */}
                    {props.mode === "EDIT" && mode === true && (
                        <MainButton
                            title={"Lưu"}
                            icon={<MdAddCircleOutline />}
                            customClick={handleSave}
                            className="AddItem"
                        />
                    )}

                    {/* Nhan ban */}
                    <MainButton
                        title="Nhân bản"
                        customClick={() => {
                            alert("Click Nhân bản");
                        }}
                        icon={<MdContentCopy />}
                        className="dupItem"
                    />
                </div>


            </div>
            <div className="flex md:flex-row flex-col">
                <div className="w-full md:flex-row flex-col">
                    <div
                        className={`lg:ml-2 ml-0 lg:mr-2 mr-0 lg:p-5 p-0 bg-white border-solid lg:border-[1px] border-0 lg:mb-0 mb-2 border-borderBase hover:border-blue-700 `}
                    >
                        {/* Tieu de */}
                        <div className="flex">
                            <div className="w-full mb-3">
                                <h4 className="text-xl">
                                    {" "}
                                    {"Phiếu liên hệ công vụ"} {"#"}
                                    {props.keycode == null
                                        ? ""
                                        : props.keycode}{" "}
                                    chi tiết
                                </h4>
                                <div className="font-semibold text-sm cursor-pointer text-white">
                                    <span className="text-red-600 rounded-md underline items-center italic">
                                        {header.STTENAME}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <TabStrip
                            selected={tabSelected}
                            onSelect={(e) => {
                                setTabSelected(e.selected);
                            }}
                            className="Tab-flex"
                        >
                            <TabStripTab title={"Thông tin chung"} >
                                <div className="order-customer" style={{ width: "140%" }}>
                                    <div className="wrapper lg:flex lg:justify-between flex-none gap-4">
                                        <div className="lg:w-1/3 w-full">
                                            <div className="wrapper-item">
                                                <div className="flex justify-between mb-3">
                                                    {/* Ma don hang */}
                                                    <div className="mr-1">
                                                        <Label className="text-sm text-gray-500">
                                                            {"Số chứng từ"}
                                                        </Label>
                                                        <Input
                                                            id="MAINCODE"
                                                            name="MAINCODE"
                                                            style={{ borderColor: "grey" }}
                                                            value={header?.MAINCODE}
                                                            type="text"
                                                            disabled={true}
                                                            className="bg-white"
                                                        />
                                                    </div>

                                                    {/* Ngay tao */}
                                                    <div className="ml-1">
                                                        <Label className="text-sm text-gray-500">
                                                            {"Ngày lập"}
                                                        </Label>
                                                        <DatePicker
                                                            format="dd/MM/yyyy"
                                                            weekNumber={true}
                                                            defaultValue={new Date(header.MAINDATE)}
                                                            disabled
                                                            className="bg-white"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Loại tạm ứng */}
                                                <div className="mb-3">
                                                    <FieldEditCombobox
                                                        title={"Loại tạm ứng"}
                                                        id={"DCMNSBCD"}
                                                        data={lstmngSubDcmnPHTAM}
                                                        defaultValue={
                                                            header !== undefined
                                                                ? lstmngSubDcmnPHTAM.find(
                                                                    (item) =>
                                                                        item.ITEMCODE === header.DCMNSBCD
                                                                )
                                                                : {}
                                                        }
                                                        textField="ITEMNAME"
                                                        dataItemKey="ITEMCODE"
                                                        onComboboxChange={(e) => {
                                                            console.log("DCMNSBCD:" + e.target.value.ITEMCODE);
                                                            setHeader({
                                                                ...header,
                                                                DCMNSBCD: e.target.value.ITEMCODE,
                                                            });

                                                        }}
                                                        disabled={!mode}
                                                    />
                                                </div>

                                                <div className="flex justify-between mb-3">
                                                    {/* Loại đối tượng */}
                                                    <div className="mr-1">
                                                        <FieldEditCombobox
                                                            title={"Loại đối tượng"}
                                                            id={"OBJCTYPE"}
                                                            data={lstmngAdvnType}
                                                            defaultValue={
                                                                header.OBJCTYPE !== undefined
                                                                    ? lstmngAdvnType.find(
                                                                        (item) =>
                                                                            item.ITEMCODE === header.OBJCTYPE.toString()
                                                                    )
                                                                    : {}
                                                            }
                                                            textField="ITEMNAME"
                                                            dataItemKey="ITEMCODE"
                                                            onComboboxChange={(e) => {
                                                                console.log("OBJCTYPE:" + e.target.value.ITEMCODE);
                                                                setHeader({
                                                                    ...header,
                                                                    OBJCTYPE: e.target.value.ITEMCODE,
                                                                });

                                                            }}
                                                            disabled={!mode}
                                                        />
                                                    </div>

                                                    {/* Đối tượng */}
                                                    <div className="ml-1">
                                                        <FieldEditCombobox
                                                            title={"Đối tượng"}
                                                            id={"OBJCCODE"}
                                                            data={lstAccObjcCode}
                                                            defaultValue={
                                                                lstAccObjcCode
                                                                    ? lstAccObjcCode.find(
                                                                        (item) =>
                                                                            item.ITEMCODE === header.OBJCCODE
                                                                    )
                                                                    : {}
                                                            }
                                                            textField="ITEMSRCH"
                                                            dataItemKey="ITEMCODE"
                                                            onComboboxChange={(e) => {
                                                                console.log("OBJCCODE:" + e.target.value.ITEMCODE);
                                                                setHeader({
                                                                    ...header,
                                                                    OBJCCODE: e.target.value.ITEMCODE,
                                                                });

                                                            }}
                                                            disabled={!mode}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex justify-between mb-3">
                                                    <div className="mr-1 lg:w-1/2 w-full">
                                                        <div className="flex justify-between mb-3">
                                                            {/* DV Tiền tệ */}
                                                            <div className="mr-1">
                                                                <FieldEditCombobox
                                                                    title={"DV Tiền tệ"}
                                                                    id={"CUOMCODE"}
                                                                    data={lstCUOM}
                                                                    defaultValue={
                                                                        lstCUOM
                                                                            ? lstCUOM.find(
                                                                                (item) =>
                                                                                    item.ITEMCODE === header.CUOMCODE
                                                                            )
                                                                            : {}
                                                                    }
                                                                    textField="ITEMNAME"
                                                                    dataItemKey="ITEMCODE"
                                                                    onComboboxChange={(e) => {
                                                                        console.log("CUOMCODE:" + e.target.value.ITEMCODE);
                                                                        setHeader({
                                                                            ...header,
                                                                            CUOMCODE: e.target.value.ITEMCODE,
                                                                        });

                                                                    }}
                                                                    disabled={!mode}
                                                                />
                                                            </div>

                                                            {/* Tỷ giá */}
                                                            <div className="ml-1">
                                                                <FieldEditNumberic
                                                                    title={"Tỷ giá"}
                                                                    id={"CUOMRATE"}
                                                                    value={
                                                                        header.CUOMRATE !== undefined
                                                                            ? header.CUOMRATE.toFixed(4)
                                                                            : 0
                                                                    }
                                                                    onChange={(e) => {
                                                                        console.log("CUOMRATE:" + e.target.value);
                                                                        setHeader({
                                                                            ...header,
                                                                            CUOMRATE: e.target.value,
                                                                        });
                                                                    }}
                                                                    disabled={!mode}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Tiền tạm ứng */}
                                                    <div className="ml-1 lg:w-1/2 w-full">
                                                        <FieldEditNumberic
                                                            title={"Tiền tạm ứng"}
                                                            id={"ADVNCRAM"}
                                                            value={
                                                                header.ADVNCRAM !== undefined
                                                                    ? header.ADVNCRAM
                                                                    : 0
                                                            }
                                                            onChange={(e) => {
                                                                console.log("ADVNCRAM:" + e.target.value);
                                                                setHeader({
                                                                    ...header,
                                                                    ADVNCRAM: e.target.value,
                                                                });
                                                            }}
                                                            disabled={!mode}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex justify-between mb-3">
                                                    {/* Số tiền đã nhận */}
                                                    <div className="mr-1">
                                                        <FieldEditNumberic
                                                            title={"Số tiền đã nhận"}
                                                            id={"ACPTCRAM"}
                                                            value={
                                                                header.ACPTCRAM !== undefined
                                                                    ? header.ACPTCRAM
                                                                    : 0
                                                            }
                                                            onChange={(e) => {
                                                                console.log("ACPTCRAM:" + e.target.value);
                                                                setHeader({
                                                                    ...header,
                                                                    ACPTCRAM: e.target.value,
                                                                });
                                                            }}
                                                            disabled={!mode}
                                                        />
                                                    </div>

                                                    {/* Số tiền đã thanh toán */}
                                                    <div className="ml-1">
                                                        <FieldEditNumberic
                                                            title={"Số tiền đã thanh toán"}
                                                            id={"ACPTCRAM"}
                                                            value={
                                                                header.ACPTCRAM !== undefined
                                                                    ? header.ACPTCRAM
                                                                    : 0
                                                            }
                                                            onChange={(e) => {
                                                                console.log("ACPTCRAM:" + e.target.value);
                                                                setHeader({
                                                                    ...header,
                                                                    ACPTCRAM: e.target.value,
                                                                });
                                                            }}
                                                            disabled={!mode}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div >
                                        <div className="lg:w-1/3 w-full">
                                            <div className="wrapper-item">
                                                {/* NV Lập phiếu */}
                                                <div className="mb-3">
                                                    <FieldEditCombobox
                                                        title={"NV Lập phiếu"}
                                                        id={"EMPLCODE"}
                                                        defaultValue={userData.EMPLCODE + " - " + userData.EMPLNAME}
                                                        disabled={!mode}
                                                    />
                                                </div>

                                                {/* Bộ phận */}
                                                <div className="mb-3">
                                                    <Label className="text-sm text-gray-500">
                                                        {"Bộ phận"}
                                                    </Label>
                                                    <Input
                                                        id=""
                                                        name=""
                                                        style={{ borderColor: "grey" }}
                                                        type="text"
                                                        className="bg-white"
                                                        disabled={!mode}
                                                    />
                                                </div>

                                                {/* Phương thức thanh toán */}
                                                <div className="mb-3">
                                                    <FieldEditCombobox
                                                        title={"Phương thức thanh toán"}
                                                        id={"PYMNTYPE"}
                                                        data={lstPymnType}
                                                        defaultValue={
                                                            header.PYMNTYPE !== undefined
                                                                ? lstPymnType.find(
                                                                    (item) =>
                                                                        item.ITEMCODE === header.PYMNTYPE.toString()
                                                                )
                                                                : {}
                                                        }
                                                        textField="ITEMNAME"
                                                        dataItemKey="ITEMCODE"
                                                        onComboboxChange={(e) => {
                                                            console.log("PYMNTYPE:" + e.target.value.ITEMCODE);
                                                            setHeader({
                                                                ...header,
                                                                PYMNTYPE: e.target.value.ITEMCODE,
                                                            });
                                                        }}
                                                        disabled={!mode}
                                                    />
                                                </div>

                                                {/* Dự án */}
                                                <div className="mb-3">
                                                    <FieldEditCombobox
                                                        title={"Dự án"}
                                                        id={"ACOBCODE"}
                                                        data={lstAcctObjectMngr}
                                                        defaultValue={
                                                            lstAcctObjectMngr
                                                                ? lstAcctObjectMngr.find(
                                                                    (item) =>
                                                                        item.ITEMCODE === header.ACOBCODE
                                                                )
                                                                : {}
                                                        }
                                                        textField="ITEMNAME"
                                                        dataItemKey="ITEMCODE"
                                                        disabled={!mode}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:w-1/3 w-full"></div>
                                    </div >
                                </div >
                            </TabStripTab >
                        </TabStrip >
                    </div >
                </div >
            </div >
        </>
    )
}

export default PHTAMEditMain