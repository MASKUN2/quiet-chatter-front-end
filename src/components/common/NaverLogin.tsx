import React, { useEffect } from 'react';

declare global {
    interface Window {
        naver: any;
    }
}

interface NaverLoginProps {
    height?: number;
}

const NaverLogin: React.FC<NaverLoginProps> = ({ height = 40 }) => {
    useEffect(() => {
        const initNaverLogin = () => {
            const { naver } = window;
            if (!naver) {
                console.error('Naver SDK not loaded');
                return;
            }

            // Clear previous button using the SDK's container ID
            const container = document.getElementById('naverIdLogin');
            if (container) {
                container.innerHTML = '';
            }

            const naverLogin = new naver.LoginWithNaverId({
                clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
                // The callback URL must match what's registered in Naver Developers
                callbackUrl: import.meta.env.VITE_NAVER_REDIRECT_URI,
                isPopup: false,
                loginButton: { color: 'green', type: 3, height: height }, // Type 3 is "Naver Login" text with logo
            });

            naverLogin.init();
        };

        // Initialize after the script is loaded
        if (window.naver) {
            initNaverLogin();
        } else {
            // Retry or wait for load (simplified for SPA)
            const timer = setInterval(() => {
                if (window.naver) {
                    clearInterval(timer);
                    initNaverLogin();
                }
            }, 100);

            // Clear timeout after 5 seconds to prevent infinite loop
            setTimeout(() => clearInterval(timer), 5000);
        }
    }, [height]);

    return (
        // The id "naverIdLogin" is required by the SDK to render the button
        <div id="naverIdLogin" style={{ display: 'inline-block' }} />
    );
};

export default NaverLogin;
