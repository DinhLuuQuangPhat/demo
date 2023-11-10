import React from 'react'
import { useParams } from "react-router-dom";
import PHTAMEditMain from '@/components/PHTAM/PHTAMEditMain';



const PHTAMEdit = (props) => {
    const { id } = useParams();
    return <PHTAMEditMain keycode={id} mode={props.mode} />;
};

export default PHTAMEdit