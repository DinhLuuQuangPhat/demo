import {
    CardBody,
    Input,
    Checkbox,
} from "@material-tailwind/react";
// export function InputSignIn({ setEmailValue }) {
//     const handleEmailChange = (event) => {
//         setEmailValue(event.target.value);
//     };

//     return (
//         <CardBody className="flex flex-col gap-4">
//             <Input type="email" label="Email" size="lg"
//                 onChange={handleEmailChange} />
//             <Input type="password" label="Password" size="lg" />
//             <div className="-ml-2.5">
//                 <Checkbox label="Remember Me" />
//             </div>
//         </CardBody>
//     )
// }
export function InputSignIn({ setEmail }) {
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    return (
        <CardBody className="flex flex-col gap-4">
            <Input type="email" label="Email" size="lg"
                onChange={handleEmailChange} />
            <Input type="password" label="Password" size="lg" />
            <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
            </div>
        </CardBody>
    )
}


export default InputSignIn;