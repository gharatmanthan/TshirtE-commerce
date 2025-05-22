// This file contains functions to integrate Google Analytics for tracking user interactions and site performance.

const GA_TRACKING_ID = 'YOUR_GA_TRACKING_ID'; // Replace with your Google Analytics tracking ID

// Initialize Google Analytics
export const initGA = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);
};

// Track page views
export const trackPageView = (page) => {
    window.gtag('config', GA_TRACKING_ID, {
        'page_path': page
    });
};

// Track events
export const trackEvent = ({ action, category, label, value }) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
    });
};