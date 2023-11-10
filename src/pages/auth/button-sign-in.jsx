import React, { useState } from "react";
import {
    Button,
} from "@material-tailwind/react";
import InputSignIn from './input-sign-in';
// export function ButtonSignIn({ onClick }) {
//     // const [emailValue, setEmailValue] = useState("");
//     // const handleClick = () => {
//     //     setEmail(emailValue);
//     // };


//     const [vlueInpt, setVlueInpt] = useState('')
//     const getVlueInpt = (data) => {
//         // console.log('getVlueInpt', data)
//         setVlueInpt(data)
//     }

//     const showData = () => {
//         console.log(vlueInpt)
//     }


//     return (
//         <div>
//             <InputSignIn setEmailValue={getVlueInpt} />
//             <div className="container mx-auto p-4">
//                 {/* <Button variant="gradient" fullWidth onClick={handleClick}>
//                     Sign In
//                 </Button> */}

//                 <Button variant="gradient" fullWidth onClick={showData}>
//                     Sign In
//                 </Button>
//             </div>
//         </div>
//     );
// }
export function ButtonSignIn({ onClick }) {
    // const showData = () => {
    //     console.log('showData')
    // };
    return (
        <div className="container mx-auto p-4">
            <Button variant="gradient" fullWidth onClick={onClick}>
                Sign In
            </Button>
        </div>
    );
}

export default ButtonSignIn;