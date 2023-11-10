import React, { useEffect, useState } from "react";
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
import api from "../api/api";
import { apiUrl } from "@/constants";


const dcmncCode = "PHTAM";
const userData = JSON.parse(localStorage.getItem("userData"));

const PHTAMEditMain = (props) => {

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
    const [header, setHeader] = useState([initHeader]);
    const [tabSelected, setTabSelected] = useState(0);
    const [DCMNSBCDList, setDCMNSBCDList] = useState([]);
    const [CUOMCODEList, setCUOMCODEList] = useState([]);
    const [OBJCTYPEList, setOBJCTYPEList] = useState([]);
    const [ACOBCODEList, setACOBCODEList] = useState([]);
    const [PYMNTYPEList, setPYMNTYPEList] = useState([]);
    const [GRP_TYPEList, setGRP_TYPEList] = useState([]);
    const [mode, setMode] = props.mode === "ADD" ? useState(true) : useState(false);

    const getData = async () => {
        if (props.keycode != null) {
            api(localStorage.getItem("usertoken"))
                .post(apiUrl.detailData, {
                    DCMNCODE: dcmncCode,
                    KEY_CODE: props.keycode,
                })
                .then((res) => {
                    if (res.data.RETNDATA !== null) {
                        setHeader(res.data.RETNDATA)
                    }
                })
                .catch((err) => {
                    window.location.href = "/logout"
                })
        }
        // Lấy List DCMNSBCD
        api(localStorage.getItem("usertoken"))
            .post(apiUrl.listCommon, {
                LISTCODE: "lstmngSub_Dcmn",
                CONDFLTR: "DcmnCode='PHTAM'",
            })
            .then((res) => {
                if (res.data.RETNDATA !== null) {
                    setDCMNSBCDList(res.data.RETNDATA)
                } else {
                    setDCMNSBCDList([])
                }
            })

        // Lấy List CUOMCODE
        api(localStorage.getItem("usertoken"))
            .post(apiUrl.listCommon, {
                LISTCODE: "lstCUOM"
            })
            .then((res) => {
                if (res.data.RETNDATA !== null) {
                    setCUOMCODEList(res.data.RETNDATA)
                } else {
                    setCUOMCODEList([])
                }
            })

        // Lấy List OBJCTYPE
        api(localStorage.getItem("usertoken"))
            .post(apiUrl.listCommon, {
                LISTCODE: "lstmngAdvnType"
            })
            .then((res) => {
                if (res.data.RETNDATA !== null) {
                    setOBJCTYPEList(res.data.RETNDATA)
                } else {
                    setOBJCTYPEList([])
                }
            })

        // Lấy List ACOBCODE
        api(localStorage.getItem("usertoken"))
            .post(apiUrl.listCommon, {
                LISTCODE: "lstAcctObjectMngr",
                CONDFLTR: "UsedStte>0",
            })
            .then((res) => {
                if (res.data.RETNDATA !== null) {
                    setACOBCODEList(res.data.RETNDATA)
                } else {
                    setACOBCODEList([])
                }
            })

        // Lấy List PYMNTYPE
        api(localStorage.getItem("usertoken"))
            .post(apiUrl.listCommon, {
                LISTCODE: "lstPymnType",
                CONDFLTR: "PymnType in(1,8,1024)",
            })
            .then((res) => {
                if (res.data.RETNDATA !== null) {
                    setPYMNTYPEList(res.data.RETNDATA)
                } else {
                    setPYMNTYPEList([])
                }
            })

    };
    const getGRP_TYPEList = async () => {
        api(localStorage.getItem("usertoken"))
            .post(apiUrl.listObject, {
                FUNCNAME: "spDtaLoadAccObjcCode_Srch_App",
                DTBSNAME: "Common",
                LCTNCODE: "{{0202}}",
                PARA_001: "'1990-01-01', '1990-01-01'," + parseInt(header[0].GRP_TYPE) + ", ''",
            })
            .then((res) => {
                if (res.data.RETNDATA !== null) {
                    setGRP_TYPEList(res.data.RETNDATA)
                } else {
                    setGRP_TYPEList([])
                }
            })
    };

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (props.mode === "ADD") {
            setMode(true);
        }

        const fetchData = async () => {
            await getData();
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (header[0].KKKK0000 !== "" && props.mode === "EDIT") {
            getGRP_TYPEList();
            setDataLoaded(true);
        } else {
            setDataLoaded(true);
        }
    }, [header[0].KKKK0000])

    if (!dataLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
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
                            title={"Thêm mới"}
                            icon={<MdAddCircleOutline />}
                            customClick={() => {
                                alert("Click thêm mới");
                            }}
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
                            customClick={() => {
                                alert("Click lưu");
                            }}
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
                                        {header[0].STTENAME}
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
                                                            value={header[0]?.MAINCODE}
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
                                                            defaultValue={new Date(header[0].MAINDATE)}
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
                                                        data={DCMNSBCDList}
                                                        defaultValue={
                                                            DCMNSBCDList !== null
                                                                ? DCMNSBCDList.find(
                                                                    (item) =>
                                                                        item.ITEMCODE === header[0].DCMNSBCD
                                                                )
                                                                : {}
                                                        }
                                                        textField="ITEMNAME"
                                                        dataItemKey="ITEMCODE"
                                                        onComboboxChange={(e) => {
                                                            console.log(e.target.value.ITEMCODE);
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
                                                            data={OBJCTYPEList}
                                                            defaultValue={
                                                                OBJCTYPEList
                                                                    ? OBJCTYPEList.find(
                                                                        (item) =>
                                                                            item.ITEMCODE === header[0].OBJCTYPE.toString()
                                                                    )
                                                                    : {}
                                                            }
                                                            textField="ITEMNAME"
                                                            dataItemKey="ITEMCODE"
                                                            disabled={!mode}
                                                        />
                                                    </div>

                                                    {/* Đối tượng */}
                                                    <div className="ml-1">
                                                        <FieldEditCombobox
                                                            title={"Đối tượng"}
                                                            id={"OBJCCODE"}
                                                            data={GRP_TYPEList}
                                                            defaultValue={
                                                                GRP_TYPEList
                                                                    ? GRP_TYPEList.find(
                                                                        (item) =>
                                                                            item.ITEMCODE === header[0].OBJCCODE
                                                                    )
                                                                    : {}
                                                            }
                                                            textField="ITEMSRCH"
                                                            dataItemKey="ITEMCODE"
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
                                                                    data={CUOMCODEList}
                                                                    defaultValue={
                                                                        CUOMCODEList
                                                                            ? CUOMCODEList.find(
                                                                                (item) =>
                                                                                    item.ITEMCODE === header[0].CUOMCODE
                                                                            )
                                                                            : {}
                                                                    }
                                                                    textField="ITEMNAME"
                                                                    dataItemKey="ITEMCODE"
                                                                    disabled={!mode}
                                                                />
                                                            </div>

                                                            {/* Tỷ giá */}
                                                            <div className="ml-1">
                                                                <FieldEditNumberic
                                                                    title={"Tỷ giá"}
                                                                    id={"CUOMRATE"}
                                                                    value={header[0].CUOMRATE.toFixed(4) || ""}
                                                                    onChange={(e) => {
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
                                                            value={header[0].ADVNCRAM || ""}
                                                            onChange={(e) => {
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
                                                            value={header[0].ACPTCRAM || ""}
                                                            onChange={(e) => {
                                                            }}
                                                            disabled={!mode}
                                                        />
                                                    </div>

                                                    {/* Số tiền đã thanh toán */}
                                                    <div className="ml-1">
                                                        <FieldEditNumberic
                                                            title={"Số tiền đã thanh toán"}
                                                            id={"ACPTCRAM"}
                                                            value={header[0].ACPTCRAM || ""}
                                                            onChange={(e) => {
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
                                                        data={PYMNTYPEList}
                                                        defaultValue={
                                                            PYMNTYPEList
                                                                ? PYMNTYPEList.find(
                                                                    (item) =>
                                                                        item.ITEMCODE === header[0].PYMNTYPE.toString()
                                                                )
                                                                : {}
                                                        }
                                                        textField="ITEMNAME"
                                                        dataItemKey="ITEMCODE"
                                                        disabled={!mode}
                                                    />
                                                </div>

                                                {/* Dự án */}
                                                <div className="mb-3">
                                                    <FieldEditCombobox
                                                        title={"Dự án"}
                                                        id={"ACOBCODE"}
                                                        data={ACOBCODEList}
                                                        defaultValue={
                                                            ACOBCODEList
                                                                ? ACOBCODEList.find(
                                                                    (item) =>
                                                                        item.ITEMCODE === header[0].ACOBCODE
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