import type { ControlPanelProps } from '../types';

export default function ControlPanel({ updateOtpProp, ...props }: ControlPanelProps) {
    return (
        <div className="controls-grid">
            <div className="control-item">
                <label htmlFor="numberOfInputs">Number of Inputs</label>
                <input
                    id="numberOfInputs"
                    type="number"
                    value={props.numberOfInputs}
                    onChange={(e) => updateOtpProp('numberOfInputs', Number(e.target.value))}
                    min={4}
                    max={8}
                />
                <small>Number of OTP input fields.</small>
            </div>
            <div className="control-item">
                <label htmlFor="inputWidth">Input Width</label>
                <input
                    id="inputWidth"
                    value={props.inputWidth}
                    onChange={(e) => updateOtpProp('inputWidth', e.target.value)}
                />
                <small>Width of each OTP input field.</small>
            </div>
            <div className="control-item">
                <label htmlFor="inputHeight">Input Height</label>
                <input
                    id="inputHeight"
                    value={props.inputHeight}
                    onChange={(e) => updateOtpProp('inputHeight', e.target.value)}
                />
                <small>Height of each OTP input field.</small>
            </div>
            <div className="control-item">
                <label htmlFor="disableAutoFocus">
                    <input
                        id="disableAutoFocus"
                        type="checkbox"
                        checked={props.disableAutoFocus}
                        onChange={(e) => updateOtpProp('disableAutoFocus', e.target.checked)}
                    />
                    Disable Auto Focus
                </label>
                <small>Disable auto-focus on the first input field.</small>
            </div>
            <div className="control-item">
                <label htmlFor="borderColor">Border Color</label>
                <input
                    id="borderColor"
                    type="color"
                    value={props.borderColor}
                    onChange={(e) => updateOtpProp('borderColor', e.target.value)}
                />
                <small>Border color of the input fields when focused.</small>
            </div>
            <div className="control-item">
                <label htmlFor="borderRadius">Border Radius</label>
                <input
                    id="borderRadius"
                    value={props.borderRadius}
                    onChange={(e) => updateOtpProp('borderRadius', e.target.value)}
                />
                <small>Border radius of the input fields.</small>
            </div>
            <div className="control-item">
                <label htmlFor="showSeparators">
                    <input
                        id="showSeparators"
                        type="checkbox"
                        checked={props.showSeparators}
                        onChange={(e) => updateOtpProp('showSeparators', e.target.checked)}
                    />
                    Show Separators
                </label>
                <small>Show separators between input fields.</small>
            </div>
            <div className="control-item">
                <label htmlFor="inputType">Input Type</label>
                <select
                    id="inputType"
                    value={props.inputType}
                    onChange={(e) => updateOtpProp('inputType', e.target.value as 'password' | 'text' | 'tel')}
                >
                    <option value="password">Password</option>
                    <option value="text">Text</option>
                    <option value="tel">Tel</option>
                </select>
                <small>Type of the input fields.</small>
            </div>
            <div className="control-item">
                <label htmlFor="inputMode">Input Mode</label>
                <select
                    id="inputMode"
                    value={props.inputMode}
                    onChange={(e) => updateOtpProp('inputMode', e.target.value as 'none' | 'numeric' | 'tel')}
                >
                    <option value="none">None</option>
                    <option value="numeric">Numeric</option>
                    <option value="tel">Tel</option>
                </select>
                <small>Input mode of the input fields.</small>
            </div>
            <div className="control-item">
                <label htmlFor="resendTimeout">Resend Timeout</label>
                <input
                    id="resendTimeout"
                    type="range"
                    value={props.resendTimeout}
                    onChange={(e) => updateOtpProp('resendTimeout', Number(e.target.value))}
                    min={0}
                    max={120}
                    step={1}
                />
                <span>{props.resendTimeout} seconds</span>
                <small>Timeout in seconds before the resend button is enabled.</small>
            </div>
            <div className="control-item">
                <label htmlFor="showResendButton">
                    <input
                        id="showResendButton"
                        type="checkbox"
                        checked={props.showResendButton}
                        onChange={(e) => updateOtpProp('showResendButton', e.target.checked)}
                    />
                    Show Resend Button
                </label>
                <small>Show the resend button.</small>
            </div>
            <div className="control-item">
                <label htmlFor="shouldDisableInput">
                    <input
                        id="shouldDisableInput"
                        type="checkbox"
                        checked={props.shouldDisableInput}
                        onChange={(e) => updateOtpProp('shouldDisableInput', e.target.checked)}
                    />
                    Should Disable Input
                </label>
                <small>Disable input fields when OTP is complete.</small>
            </div>
        </div>
    )
}
