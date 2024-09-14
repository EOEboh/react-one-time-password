import { OTPInput } from 'react-one-time-password';
import useOTPDemo from '../hooks/useOTPDemo';
import useTabState from '../hooks/useTabState';
import CodeDisplay from './code-display';
import ControlPanel from './control-panel';
import TabView from './tab-view';

export default function OTPDemo() {
    const {
        otp,
        otpProps,
        handleOtpChange,
        handleResend,
        customRenderSeparator,
        customRenderResendContainer,
        customRenderResendButton,
        updateOtpProp,
    } = useOTPDemo();

    const tabs = [
        {
            label: 'Preview', content: <>
                <OTPInput
                    {...otpProps}
                    onChange={handleOtpChange}
                    onResend={handleResend}
                    renderCustomSeparators={otpProps.showSeparators ? customRenderSeparator : undefined}
                    renderResendContainer={customRenderResendContainer}
                    renderResendButton={customRenderResendButton}
                />
                <p className="otp-value">Entered OTP: {otp}</p>

            </>
        },
        { label: 'Code', content: <CodeDisplay {...otpProps} /> },
    ]

    const { activeTabLabel } = useTabState({ tabs })

    return (
        <div className="otp-demo">
            <div className="otp-container">
                <TabView
                    tabs={tabs}
                />
            </div>
            {activeTabLabel === 'Preview' && (
                <ControlPanel {...otpProps} updateOtpProp={updateOtpProp} />
            )}
        </div>
    );
};