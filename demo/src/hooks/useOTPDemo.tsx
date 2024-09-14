import { type ReactNode, useEffect, useState } from 'react';
import type { OTPDemoProps, UseOTPDemoReturn } from '../types';

export default function useOTPDemo(): UseOTPDemoReturn {
    const [otp, setOtp] = useState("");
    const [otpProps, setOtpProps] = useState<OTPDemoProps>({
        numberOfInputs: 6,
        inputWidth: "2em",
        inputHeight: "3em",
        disableAutoFocus: false,
        borderColor: "#007bff",
        borderRadius: "4px",
        showSeparators: true,
        inputType: "tel",
        inputMode: "numeric",
        resendTimeout: 60,
        showResendButton: false,
        shouldDisableInput: false,
        inputStyle: {},
        containerStyle: {},
        resendContainerStyle: {},
        resendButtonStyle: {},
    });

    const [isDirty, setIsDirty] = useState(false);

    const handleOtpChange = (newOtp: string) => {
        setOtp(newOtp);
    };

    const handleResend = () => {
        alert("Resend OTP triggered");
    };

    const customRenderSeparator = () => (
        <span style={{ margin: "0 0.5rem" }}>-</span>
    );

    const customRenderResendContainer = (children: ReactNode) => (
        <div className="resend-container">{children}</div>
    );

    const customRenderResendButton = (
        onClick: () => void,
        disabled: boolean,
        timer: number
    ) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`resend-button ${disabled ? 'disabled' : ''}`}
        >
            {disabled ? `Resend OTP in ${timer} seconds` : "Resend OTP"}
        </button>
    );

    const updateOtpProp = <K extends keyof OTPDemoProps>(
        key: K,
        value: OTPDemoProps[K]
    ) => {
        setOtpProps(prev => ({ ...prev, [key]: value }));
        setIsDirty(true);
    };

    useEffect(() => {
        if (!isDirty) return;

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]);

    return {
        otp,
        otpProps,
        handleOtpChange,
        handleResend,
        customRenderSeparator,
        customRenderResendContainer,
        customRenderResendButton,
        updateOtpProp,
    };
};
