import './App.css';
import OTPDemo from './components/otp-demo';

export default function App() {
    return (
        <div className="demo-container">
            <header className="demo-header">
                <h1>react-one-time-password</h1>
                <p>A customizable OTP (One-Time Password) input component for React.</p>
                <a href="https://github.com/EOEboh/react-one-time-password" target='_blank' rel='noopener noreferrer' className='button'>
                    View on GitHub
                </a>
            </header>
            <main>
                <OTPDemo />
            </main>
        </div>
    )
}