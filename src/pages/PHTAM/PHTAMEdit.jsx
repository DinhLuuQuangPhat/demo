import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { getLstmngSubDcmnPHTAM, getLstCUOM, getLstmngAdvnType, getLstAcctObjectMngr, getLstPymnType } from '../../actions/common';
import { getDetailPHTAM, resetPHTAM } from '../../actions/phtam';
import PHTAMEditMain from '@/components/PHTAM/PHTAMEditMain';



const PHTAMEdit = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // Load listCode
    useEffect(() => {
        dispatch(getLstmngSubDcmnPHTAM());
        dispatch(getLstCUOM());
        dispatch(getLstmngAdvnType());
        dispatch(getLstAcctObjectMngr());
        dispatch(getLstPymnType());
    }, [dispatch]);
    // Load chi tiết chứng tự
    useEffect(() => {
        if (id !== undefined) {
            dispatch(getDetailPHTAM(id));
        } else {
            dispatch(resetPHTAM());
        }
    }, [dispatch, id]);
    return <PHTAMEditMain keycode={id} mode={props.mode} />;
};

export default PHTAMEdit