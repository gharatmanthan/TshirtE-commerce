import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isConsentGiven, setIsConsentGiven] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
            setIsConsentGiven(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsConsentGiven(true);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'false');
        setIsConsentGiven(true);
    };

    if (isConsentGiven) {
        return null;
    }

    return (
        <div className="cookie-consent">
            <p>This website uses cookies to enhance the user experience. Do you accept the use of cookies?</p>
            <button onClick={handleAccept}>Accept</button>
            <button onClick={handleDecline}>Decline</button>
        </div>
    );
};

export default CookieConsent;