import React, { useState, useEffect, CSSProperties } from "react";

enum AllowedInputTypes {
  PASSWORD = "password",
  TEXT = "text",
  TEL = "tel",
}

enum AllowedInputMode {
  NONE = "none",
  NUMERIC = "numeric",
  TEL = "tel",
}

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
  inputMode?: AllowedInputMode;
  resendTimeout?: number; // in seconds
  onResend?: () => void;
  resendContainerStyle?: CSSProperties;
  resendButtonStyle?: CSSProperties;
  renderResendContainer?: (children: React.ReactNode) => React.ReactNode;
  renderResendButton?: (
    onClick: () => void,
    disabled: boolean,
    timer: number
  ) => React.ReactNode;
}

const OTPInput: React.FC<OTPInputProps> = ({
  numberOfInputs,
  onChange,
  inputWidth = "2.5rem",
  inputHeight = "3rem",
  disableAutoFocus = false,
  focusColor,
  borderRadius,
  showSeparators = true,
  renderCustomSeparators = () => <span style={{ margin: "0 0.5rem" }}>-</span>,
  inputStyle,
  containerStyle,
  inputType = AllowedInputTypes.TEL,
  inputMode = AllowedInputMode.NUMERIC,
  resendTimeout = 60,
  onResend,
  resendContainerStyle,
  resendButtonStyle,
  renderResendContainer,
  renderResendButton,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(numberOfInputs).fill(""));
  const [isFocused, setIsFocused] = useState(false);
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [timer, setTimer] = useState(resendTimeout);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!disableAutoFocus) {
      const firstInput = document.getElementById("otp-input-0");
      if (firstInput) firstInput.focus();
    }
  }, [disableAutoFocus]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (inputType === AllowedInputTypes.TEL && /[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (newOtp.every((val) => val !== "")) {
      setIsOtpComplete(true);
    }

    if (value) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    } else if (event.key === "ArrowRight" && index < numberOfInputs - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    } else if (event.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    } else if (event.key === "Delete" && index < numberOfInputs - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text");
    const newOtp = [...otp];
    let pasteIndex = index;

    for (let char of pasteData) {
      if (inputType === AllowedInputTypes.TEL && /[^0-9]/.test(char)) continue;
      if (pasteIndex < numberOfInputs) {
        newOtp[pasteIndex] = char;
        pasteIndex++;
      }
    }

    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (newOtp.every((val) => val !== "")) {
      setIsOtpComplete(true);
    }

    if (pasteIndex < numberOfInputs) {
      const nextInput = document.getElementById(`otp-input-${pasteIndex}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleResend = () => {
    if (onResend) {
      onResend();
      setTimer(resendTimeout);
      setCanResend(false);
    }
  };

  // Default if no custom components is passed
  const defaultRenderResendContainer = (children: React.ReactNode) => (
    <div style={resendContainerStyle}>{children}</div>
  );

  // Default if no custom components is passed
  const defaultRenderResendButton = (
    onClick: () => void,
    disabled: boolean,
    timer: number
  ) => (
    <button onClick={onClick} disabled={disabled} style={resendButtonStyle}>
      {disabled ? `Resend OTP in ${timer} seconds` : "Resend OTP"}
    </button>
  );

  return (
    <div style={containerStyle}>
      {otp.map((_, index) => (
        <React.Fragment key={index}>
          <input
            id={`otp-input-${index}`}
            key={index}
            type={inputType}
            inputMode={inputMode}
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={handleOnFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            disabled={isOtpComplete}
            style={{
              width: inputWidth,
              height: inputHeight,
              marginRight: "0.5rem",
              textAlign: "center",
              borderRadius,
              borderColor: isFocused && focusColor ? focusColor : undefined,
              ...inputStyle,
            }}
          />
          {showSeparators &&
            index < numberOfInputs - 1 &&
            (typeof renderCustomSeparators === "function"
              ? renderCustomSeparators()
              : renderCustomSeparators)}
        </React.Fragment>
      ))}
      {(renderResendContainer || defaultRenderResendContainer)(
        canResend
          ? (renderResendButton || defaultRenderResendButton)(
              handleResend,
              false,
              timer
            )
          : (renderResendButton || defaultRenderResendButton)(
              handleResend,
              true,
              timer
            )
      )}
    </div>
  );
};

export default OTPInput;