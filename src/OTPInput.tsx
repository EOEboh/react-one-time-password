import React, { CSSProperties, useEffect, useState } from "react";

type AllowedInputTypes = "password" | "text" | "tel";
type AllowedInputMode = "none" | "numeric" | "tel";

export interface OTPInputProps {
  inputLength: number;
  onChange: (otp: string) => void;
  inputWidth?: CSSProperties["width"];
  inputHeight?: CSSProperties["height"];
  disableAutoFocus?: boolean;
  borderColor?: CSSProperties["borderColor"];
  borderRadius?: CSSProperties["borderRadius"];
  showSeparators?: boolean;
  renderCustomSeparators?: () => React.ReactNode;
  inputStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  inputType?: AllowedInputTypes;
  inputMode?: AllowedInputMode;
  resendTimeout?: number;
  onResend?: () => void;
  resendContainerStyle?: CSSProperties;
  resendButtonStyle?: CSSProperties;
  renderResendContainer?: (children: React.ReactNode) => React.ReactNode;
  renderResendButton?: (
    onClick: () => void,
    disabled: boolean,
    timer: number
  ) => React.ReactNode;
  showResendButton?: boolean;
  shouldDisableInput?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  inputLength,
  onChange,
  inputWidth = "1em",
  inputHeight = "3em",
  disableAutoFocus = false,
  borderColor,
  borderRadius,
  showSeparators = true,
  renderCustomSeparators = () => <span style={{ margin: "0 0.5rem" }}>-</span>,
  inputStyle,
  containerStyle,
  inputType = "tel",
  inputMode = "numeric",
  resendTimeout = 60,
  onResend,
  resendContainerStyle,
  resendButtonStyle,
  renderResendContainer,
  renderResendButton,
  showResendButton = false,
  shouldDisableInput = false,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(inputLength).fill(""));
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
    // TODO: add input mask to support different countries
    if (inputType === "tel" && /[^0-9]/.test(value)) return;

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
    } else if (event.key === "ArrowRight" && index < inputLength - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    } else if (event.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    } else if (event.key === "Delete" && index < inputLength - 1) {
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
      if (inputType === "tel" && /[^0-9]/.test(char)) continue;
      if (pasteIndex < inputLength) {
        newOtp[pasteIndex] = char;
        pasteIndex++;
      }
    }

    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (newOtp.every((val) => val !== "")) {
      setIsOtpComplete(true);
    }

    if (pasteIndex < inputLength) {
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
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          ...containerStyle,
        }}
      >
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
              disabled={shouldDisableInput ? isOtpComplete : false}
              style={{
                width: inputWidth,
                height: inputHeight,
                marginRight: "0.5rem",
                textAlign: "center",
                borderRadius,
                borderColor: isFocused && borderColor ? borderColor : undefined,
                ...inputStyle,
              }}
            />
            {showSeparators &&
              index < inputLength - 1 &&
              (typeof renderCustomSeparators === "function"
                ? renderCustomSeparators()
                : renderCustomSeparators)}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>
        {showResendButton &&
          (renderResendContainer || defaultRenderResendContainer)(
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
    </div>
  );
};

export default OTPInput;
