import React, { CSSProperties } from "react";
type AllowedInputTypes = "password" | "text" | "tel";
type AllowedInputMode = "none" | "numeric" | "tel";
type AllowedInputHeight = "auto" | "fit-content" | string;
export interface OTPInputProps {
    numberOfInputs: number;
    onChange: (otp: string) => void;
    classNames?: {
        container?: string;
        input?: string;
        "resend-button-container"?: string;
        "resend-button"?: string;
        "input-separators"?: string;
    };
    inputWidth?: string;
    inputHeight?: AllowedInputHeight;
    disableAutoFocus?: boolean;
    borderColor?: string;
    borderRadius?: string;
    showSeparators?: boolean;
    renderCustomSeparators?: () => React.ReactNode | React.ReactNode;
    inputStyle?: CSSProperties;
    containerStyle?: CSSProperties;
    inputType?: AllowedInputTypes;
    inputMode?: AllowedInputMode;
    resendTimeout?: number;
    onResend?: () => void;
    resendContainerStyle?: CSSProperties;
    resendButtonStyle?: CSSProperties;
    renderResendContainer?: (children: React.ReactNode) => React.ReactNode;
    renderResendButton?: (onClick: () => void, disabled: boolean, timer: number) => React.ReactNode;
    showResendButton?: boolean;
    shouldDisableInput?: boolean;
}
declare const OTPInput: React.FC<OTPInputProps>;
export default OTPInput;
//# sourceMappingURL=OTPInput.d.ts.map