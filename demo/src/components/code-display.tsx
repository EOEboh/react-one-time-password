import dedent from 'dedent';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';
import { useCallback, useState } from 'react';
import Editor from 'react-simple-code-editor';
import type { OTPDemoProps } from '../types';

export default function CodeDisplay({ ...props }: OTPDemoProps) {
    const [code, setCode] = useState(dedent`
        import { OTPInput } from "react-one-time-password";
        import type { ReactNode } from "react";

        export default function App(){
            const handleResend = () => {
                console.log("Resend OTP triggered");
            }

            const customRenderSeparator = () => {
                return (<span style={{ margin: "0 0.5rem" }}>-</span>)
            };

            const customRenderResendContainer = (children: ReactNode) => {
                return (
                    <div style={{ marginTop: "1rem", textAlign: "center" }}>{children}</div>
                )
            }

            const customRenderResendButton = (
                onClick: () => void,
                disabled: boolean,
                timer: number
            ) => (
                <button
                onClick={onClick}
                disabled={disabled}
                style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: disabled ? "#ccc" : "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: disabled ? "not-allowed" : "pointer",
                }}
                >
                {disabled ? \`Resend OTP in \${timer} seconds\`) : "Resend OTP"}
                </button>
            );

            return (
                <OTPInput
                    numberOfInputs={${props.numberOfInputs}}
                    onChange={${(otp: string) => console.log(otp)}}
                    inputWidth={${JSON.stringify(props.inputWidth)}}
                    inputHeight={${JSON.stringify(props.inputHeight)}}
                    disableAutoFocus={${props.disableAutoFocus}}
                    borderColor={${JSON.stringify(props.borderColor)}}
                    borderRadius={${JSON.stringify(props.borderRadius)}}
                    showSeparators={${props.showSeparators}}
                    renderCustomSeparators={${props.showSeparators ? 'customRenderSeparator' : undefined}}
                    inputStyle={${JSON.stringify(props.inputStyle)}}
                    containerStyle={${JSON.stringify(props.containerStyle)}}
                    inputType={${JSON.stringify(props.inputType)}}
                    inputMode={${JSON.stringify(props.inputMode)}}
                    resendTimeout={${props.resendTimeout}}
                    onResend={${() => console.log("Resend OTP triggered")}}
                    resendContainerStyle={${JSON.stringify(props.resendContainerStyle)}}
                    resendButtonStyle={${JSON.stringify(props.resendButtonStyle)}}
                    renderResendContainer={customRenderResendContainer}
                    renderResendButton={customRenderResendButton}
                    showResendButton={${props.showResendButton}}
                    shouldDisableInput={${props.shouldDisableInput}}
                />
            );
        }
    `);

    const handleCopyCode = useCallback(() => {
        navigator.clipboard.writeText(code);
        alert('Copied');
    }, [code]);

    return (
        <>
            <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                padding={10}
                highlight={(code) => highlight(code, languages.jsx, 'jsx')}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                }}
                className='container-editor'
            />
            <div className="button-container">
                <button onClick={handleCopyCode} className="button">Copy Code</button>
            </div>
        </>
    );
};