import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { getAppEmplList, getLstmngSubDcmnLHCV } from '../../actions/common';
import { getDetailLHCV, resetLHCV } from '../../actions/lhcv';
import LHCVEditMain from '@/components/LHCV/LHCVEditMain';



const LHCVEdit = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    //Load listCode
    useEffect(() => {
        dispatch(getAppEmplList());
        dispatch(getLstmngSubDcmnLHCV());
    }, [dispatch]);
    // Load chi tiết chứng tự
    useEffect(() => {
        if (id !== undefined) {
            dispatch(getDetailLHCV(id));
        } else {
            dispatch(resetLHCV());
        }
    }, [dispatch, id]);
    return <LHCVEditMain keycode={id} mode={props.mode} />;
};

export default LHCVEdit