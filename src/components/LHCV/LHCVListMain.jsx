import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { filterBy } from "@progress/kendo-data-query";
import {
    Grid,
    GridColumn,
} from "@progress/kendo-react-grid";
import {
    MdAddCircleOutline,
} from "react-icons/md";
import MainButton from "../MainButton";
import OrderListCommandCell from "../OrderListCommandCell";
import moment from "moment";
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteLHCV,
    getListLHCV,
    lockLHCV,
    resetLHCV,
} from "../../actions/lhcv";


const pageInit = {
    title: "Phiếu liên hệ công vụ",
    DCMNCODE: "LHCV",
    editUrl: "/dashboard/dcmn-work/",
    newUrl: "/dashboard/dcmn-work/new",
};
const LHCVListMain = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listDocuments = useSelector((state) => state.LHCV.listLienHeCongVu);
    const postResult = useSelector((state) => state.LHCV.postResult);
    const [listVisiable, setListVisiable] = useState(true);

    var initDateFrom = new Date();
    var initDateTo = new Date();
    const [dateFrom, setdateFrom] = useState(initDateFrom);
    const [dateTo, setdateTo] = useState(initDateTo);
    const [sumDocuments, setSumDocuments] = useState(0);
    const [orders, setOrders] = useState([]);

    const initialFilter = {
        logic: "and",
        filters: [
            {
                field: "MAINCODE",
                operator: "contains",
                value: "0",
            },
        ],
    };
    const [filter, setFilter] = useState(initialFilter);

    const CellDate = (cell) => {
        return (
            <td>{moment(new Date(cell.dataItem.MAINDATE)).format("DD/MM/YYYY")}</td>
        );
    };

    const DetailLink = (cell) => {
        return (
            <NavLink to={pageInit.editUrl + cell.dataItem.KKKK0000}>
                <td style={{ color: "#0e9f6e", fontWeight: "bold" }}>
                    {cell.dataItem.MAINCODE}
                </td>
            </NavLink>
        );
    }

    const loadDataDocuments = () => {
        const body = {
            DCMNCODE: pageInit.DCMNCODE,
            STTESIGN: 7,
            BEG_DATE:
                dateFrom.getFullYear() +
                "-" +
                ("0" + (dateFrom.getMonth() + 1)).slice(-2) +
                "-" +
                ("0" + dateFrom.getDate()).slice(-2),
            END_DATE:
                dateTo.getFullYear() +
                "-" +
                ("0" + (dateTo.getMonth() + 1)).slice(-2) +
                "-" +
                ("0" + dateTo.getDate()).slice(-2),
        };
        dispatch(getListLHCV(body));
    };

    useEffect(() => {
        if (listDocuments && listDocuments.length > 0) {
            const data = listDocuments.map((item) => {
                return {
                    KKKK0000: item.KKKK0000,
                    MAINCODE: item.MAINCODE,
                    MAINDATE: new Date(item.MAINDATE),
                    NOTETEXT: item.NOTETEXT,
                    STTENAME: item.STTENAME,
                    STTESIGN: item.STTESIGN,
                    DCMNCODE: pageInit.DCMNCODE,
                };
            });
            setOrders(data ? data : []);
            setSumDocuments(data.length);
        }
    }, [listDocuments]);
    useEffect(() => {
        if (postResult) {
            if (postResult.RETNCODE) {
                alert(postResult.RETNMSSG);
                dispatch(resetLHCV());
                window.location.reload();
            }
        }
    }, [postResult]);
    const onSuccess = () => {
        setListVisiable(true);
        loadDataDocuments();
    };
    const lockClick = (dataItem) => {
        const body = {
            DCMNCODE: pageInit.DCMNCODE,
            KEY_CODE: dataItem.KKKK0000,
        };
        dispatch(lockLHCV(body));
    };
    const deleteClick = (dataItem) => {
        const body = {
            DCMNCODE: pageInit.DCMNCODE,
            KEY_CODE: dataItem.KKKK0000,
        };
        dispatch(deleteLHCV(body));
    };

    const CommandCell = (props) => (
        <OrderListCommandCell
            {...props}
            lockClick={lockClick}
            deleteClick={deleteClick}
        />
    );

    return (
        <>
            <div className="p-5 flex justify-between items-center">
                <div id="title order-first">
                    <h2 className="text-lg font-semibold">{pageInit.title}</h2>
                </div>
                <div id="action-button" className="flex order-last">
                    <MainButton
                        title={"Thêm mới"}
                        icon={<MdAddCircleOutline />}
                        customClick={() => {
                            navigate(pageInit.newUrl);
                        }}
                        className="AddItem"
                    />
                </div>
            </div>
            {listVisiable ? (
                <div>
                    <div className="w-full lg:flex bg-blue-200 p-3">
                        <div className="flex">
                            <div className="flex items-center">
                                <div className="w-fit text-xs">
                                    Từ ngày:
                                </div>
                                <div className="lg:ml-3">
                                    <Flatpickr
                                        className="p-1 leading-4 text-sm"
                                        options={{
                                            enableTime: false,
                                            dateFormat: "d-m-Y",
                                        }}
                                        value={dateFrom}
                                        onChange={([date]) => {
                                            setdateFrom(new Date(date));
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-fit text-xs lg:ml-3">
                                    đến ngày:
                                </div>
                                <div className="lg:ml-3">
                                    <Flatpickr
                                        className="p-1 leading-4 text-sm"
                                        options={{
                                            enableTime: false,
                                            dateFormat: "d-m-Y",
                                        }}
                                        value={dateTo}
                                        onChange={([date]) => {
                                            setdateTo(new Date(date));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="rounded-md bg-green-500 text-white pl-5 pr-5 ml-5 items-center w-32 m-3 p-[0.15rem] text-sm"
                            onClick={onSuccess}
                        >
                            Lọc
                        </button>
                        <div className="flex items-center ml-10">
                            <div className="w-fit text-xs">
                                Tổng số chứng từ:
                            </div>
                            <div className="ml-3 text-red-700 text-xs font-semibold">
                                {sumDocuments}
                            </div>
                        </div>
                    </div>
                    <Grid
                        style={{
                            height: "700px",
                        }}
                        data={filterBy(orders, filter)}
                        filterable={true}
                        filter={filter}
                        onFilterChange={(e) => setFilter(e.filter)}
                    >
                        <GridColumn
                            field="MAINCODE"
                            title={"Mã"}
                            width="150px"
                            cell={DetailLink}
                        />
                        <GridColumn
                            field="MAINDATE"
                            title={"Ngày tạo"}
                            width="200px"
                            filter="date"
                            cell={CellDate}
                        />
                        <GridColumn
                            field="NOTETEXT"
                            title={"Nội dung"}
                        />
                        <GridColumn
                            field="STTENAME"
                            title={"Trạng thái"}
                            width="200px"
                        />
                        <GridColumn
                            width="200px"
                            filterable={false}
                            title={"Tác vụ"}
                            cell={CommandCell}
                        />
                    </Grid>
                </div >
            ) : (
                <div></div>
            )}
        </>
    )
}

export default LHCVListMain