import type { CSSProperties, ReactNode } from 'react';

type UpdateOtpProp = <K extends keyof OTPDemoProps>(key: K, value: OTPDemoProps[K]) => void;

export interface UseOTPDemoReturn {
    otp: string;
    otpProps: OTPDemoProps;
    handleOtpChange: (newOtp: string) => void;
    handleResend: () => void;
    customRenderSeparator: () => ReactNode;
    customRenderResendContainer: (children: ReactNode) => ReactNode;
    customRenderResendButton: (
        onClick: () => void,
        disabled: boolean,
        timer: number
    ) => ReactNode;
    updateOtpProp: UpdateOtpProp;
}

export interface OTPDemoProps {
    numberOfInputs: number;
    inputWidth: string;
    inputHeight: string;
    disableAutoFocus: boolean;
    borderColor: string;
    borderRadius: string;
    showSeparators: boolean;
    inputType: 'password' | 'text' | 'tel';
    inputMode: 'none' | 'numeric' | 'tel';
    resendTimeout: number;
    showResendButton: boolean;
    shouldDisableInput: boolean;
    inputStyle: CSSProperties;
    containerStyle: CSSProperties;
    resendContainerStyle: CSSProperties;
    resendButtonStyle: CSSProperties;
}

export interface ControlPanelProps extends OTPDemoProps {
    updateOtpProp: UpdateOtpProp;
}

export interface Tab {
    label: string
    content: ReactNode
}

export interface TabViewProps {
    tabs: Tab[]
    defaultTab?: string
    urlParamName?: string
}