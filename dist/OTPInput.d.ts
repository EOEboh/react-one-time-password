import React, { CSSProperties } from "react";
type AllowedInputTypes = "password" | "text" | "number" | "tel";
type AllowedInputHeight = "auto" | "fit-content" | string;
interface OTPInputProps {
    numberOfInputs: number;
    onChange: (otp: string) => void;
    inputWidth: string;
    inputHeight: AllowedInputHeight;
    disableAutoFocus?: boolean;
    focusColor?: string;
    borderRadius?: string;
    showSeparators?: boolean;
    renderCustomSeparators?: () => React.ReactNode | React.ReactNode;
    inputStyle?: CSSProperties;
    containerStyle?: CSSProperties;
    inputType?: AllowedInputTypes;
}
declare const OTPInput: React.FC<OTPInputProps>;
export default OTPInput;
