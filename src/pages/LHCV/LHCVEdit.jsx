import React from 'react'
import { useParams } from "react-router-dom";
import LHCVEditMain from '@/components/LHCV/LHCVEditMain';



const LHCVEdit = (props) => {
    const { id } = useParams();
    return <LHCVEditMain keycode={id} mode={props.mode} />;
};

export default LHCVEdit