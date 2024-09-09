import React, { CSSProperties } from "react";
type AllowedInputTypes = "password" | "text" | "number" | "tel";
interface OTPInputProps {
    length: number;
    onChange: (otp: string) => void;
    autoFocus?: boolean;
    inputStyle?: CSSProperties;
    containerStyle?: CSSProperties;
    inputType?: AllowedInputTypes;
}
declare const OTPInput: React.FC<OTPInputProps>;
export default OTPInput;
