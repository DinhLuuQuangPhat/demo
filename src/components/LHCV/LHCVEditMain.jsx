import React, { useEffect, useState } from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import {
    Input,
    TextArea,
} from "@progress/kendo-react-inputs";
import {
    MdAddCircleOutline,
    MdContentCopy,
} from "react-icons/md";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Label } from "@progress/kendo-react-labels";
import { FcLeft } from "react-icons/fc";
import moment from "moment/moment";
import FieldEditMultiSelect from "../FieldEditMultiSelect";
import FieldEditCombobox from "../FieldEditCombobox";
import MainButton from "../MainButton";
import { NavLink } from "react-router-dom";
import api from "../api/api";
import { apiUrl } from "@/constants";

const dcmncCode = "LHCV";
const userData = JSON.parse(localStorage.getItem("userData"));

const LHCVEditMain = (props) => {
    const initHeader = {
        LCTNCODE: userData.LCTNCODE,
        MAINCODE: "",
        MAINDATE: moment(new Date()).format("YYYY-MM-DD"),
        EMPLSEND: userData.EMPLCODE,
        EMPLRECV: "",
        EMPLREFR: "",
        DCMNSBCD: "",
        MPURPNME: "",
        MCONTENT: "",
        FISHDATE: moment(new Date()).format("YYYY-MM-DD"),
        FISHPLCE: "",
        DCMNSBNAME: "",
        DDDD: dcmncCode,
        ACCERGHT: 0,
        STTESIGN: 0,
        STTENAME: "",
        KKKK0000: "",
        DCMNFILE: [],
    };
    const [header, setHeader] = useState([initHeader]);
    const [tabSelected, setTabSelected] = useState(0);
    const [appEmplList, setAppEmplList] = useState([]);
    const [lstmngSubDcmnLHCV, setlstmngSubDcmnLHCV] = useState([]);
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

        //getlstmngSubDcmnLHCV
        api(localStorage.getItem("usertoken"))
            .post(apiUrl.listCommon, {
                LISTCODE: "lstmngSub_Dcmn",
                CONDFLTR: "DcmnCode='LHCV'",
            })
            .then((res) => {
                if (res.data.RETNDATA !== null) {
                    setlstmngSubDcmnLHCV(res.data.RETNDATA)
                } else {
                    setlstmngSubDcmnLHCV([])
                }
            })

        //getappEmplList
        api(localStorage.getItem("usertoken"))
            .post(apiUrl.listCustomer, {
                DCMNCODE: "appEmplList",
                PARACODE: "001",
                DPTMCODE: "%",
                PSTNCODE: "%",
                JOB_CODE: "%",
                PSTNTYPE: 0,
                JOB_TYPE: 0,
            })
            .then((res) => {
                if (res.data.RETNDATA !== null) {
                    setAppEmplList(res.data.RETNDATA)
                } else {
                    setAppEmplList([])
                }
            })
    };

    useEffect(() => {
        if (props.mode === "ADD") {
            setMode(true);
        }
    }, []);

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await getData();

            setDataLoaded(true);
        };

        fetchData();
    }, []);

    if (!dataLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={"p-3 flex justify-between items-center"}>
                <div className="order-first flex items-center">
                    {/* Dau mui ten , event Click vao hien thi danh sach Luoi */}
                    <NavLink className="text-base mr-2" to={"/dashboard/dcmn-work"}>
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

                                                {/* Lãnh vực liên quan */}
                                                <div className="mb-3">
                                                    <FieldEditCombobox
                                                        title={"Lãnh vực liên quan"}
                                                        id={"DCMNSBCD"}
                                                        data={lstmngSubDcmnLHCV}
                                                        defaultValue={
                                                            header !== undefined
                                                                ? lstmngSubDcmnLHCV.find(
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

                                                {/* Mục đích liên hệ */}
                                                <div className="mb-3">
                                                    <Label className="text-sm text-gray-500">
                                                        {"Mục đích liên hệ"}
                                                    </Label>
                                                    <TextArea
                                                        className={`border-[#808080] border-[1px] bg-white`}
                                                        rows={2}
                                                        value={header[0].MPURPNME}
                                                        disabled={!mode}
                                                        onChange={(e) => {
                                                            setHeader({
                                                                ...header,
                                                                MPURPNME: e.target.value,
                                                            });
                                                        }}
                                                    />
                                                </div>

                                                {/* Nội dung liên hệ */}
                                                <div className="mb-3">
                                                    <Label className="text-sm text-gray-500">
                                                        {" Nội dung liên hệ"}
                                                    </Label>
                                                    <TextArea
                                                        className={`border-[#808080] border-[1px] bg-white`}
                                                        rows={2}
                                                        value={header[0].MCONTENT}
                                                        disabled={!mode}
                                                        onChange={(e) => {
                                                            setHeader({
                                                                ...header,
                                                                MCONTENT: e.target.value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div >
                                        <div className="lg:w-1/3 w-full">
                                            <div className="wrapper-item">
                                                {/* Danh sách người nhận */}
                                                <div className="mb-3">
                                                    <FieldEditMultiSelect
                                                        title={"Danh sách người nhận"}
                                                        id={"EMPLRECV"}
                                                        data={appEmplList}
                                                        defaultValue={
                                                            header !== undefined
                                                                ? appEmplList.filter((item) =>
                                                                    header[0].EMPLRECV.includes(item.EMPLCODE)
                                                                )
                                                                : []
                                                        }
                                                        textField="EMPLNAME"
                                                        dataItemKey="EMPLCODE"
                                                        onComboboxChange={(e) => {
                                                            var listEmpCode = [];
                                                            e.value.map((item) =>
                                                                listEmpCode.push(item.EMPLCODE)
                                                            );
                                                            setHeader({
                                                                ...header,
                                                                EMPLRECV: listEmpCode.join(),
                                                            });
                                                        }}
                                                        disabled={!mode}
                                                    />
                                                </div>

                                                {/* Danh sách tham khảo */}
                                                <div className="mb-3">
                                                    <FieldEditMultiSelect
                                                        title={"Danh sách tham khảo"}
                                                        id={"EMPLREFR"}
                                                        data={appEmplList}
                                                        defaultValue={
                                                            header !== undefined
                                                                ? appEmplList.filter((item) =>
                                                                    header[0].EMPLREFR.includes(item.EMPLCODE)
                                                                )
                                                                : []
                                                        }
                                                        textField="EMPLNAME"
                                                        dataItemKey="EMPLCODE"
                                                        onComboboxChange={(e) => {
                                                            var listEmpCode = [];
                                                            e.value.map((item) =>
                                                                listEmpCode.push(item.EMPLCODE)
                                                            );
                                                            setHeader({
                                                                ...header,
                                                                EMPLREFR: listEmpCode.join(),
                                                            });
                                                        }}
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

export default LHCVEditMain