/**
 * External Scripts Manager
 * Handles loading of third-party scripts like YouTube API, Google Fonts, etc.
 */

const ExternalScripts = {
    
    /**
     * Initialize external scripts based on page requirements
     */
    init: function() {
        this.loadGoogleFonts();
        this.checkForYouTubeVideos();
        this.loadAnalytics();
    },
    
    /**
     * Load Google Fonts
     */
    loadGoogleFonts: function() {
        // Load DM Sans font
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap';
        fontLink.rel = 'stylesheet';
        fontLink.media = 'all';
        document.head.appendChild(fontLink);
        
        // Fallback: load local font CSS
        Utils.loadCSS('assets/css/fonts.css');
    },
    
    /**
     * Check if page has YouTube videos and load API if needed
     */
    checkForYouTubeVideos: function() {
        const youtubeIframes = document.querySelectorAll('iframe[src*="youtube"], iframe[data-src*="youtube"]');
        const youtubeLinks = document.querySelectorAll('a[href*="youtube.com/watch"], a[href*="youtu.be/"]');
        
        if (youtubeIframes.length > 0 || youtubeLinks.length > 0) {
            this.loadYouTubeAPI();
        }
    },
    
    /**
     * Load YouTube API
     */
    loadYouTubeAPI: function() {
        if (window.YT) {
            return; // Already loaded
        }
        
        // Load the YouTube IFrame API
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.appendChild(script);
        
        // Fallback: load local copy
        Utils.loadJS('assets/js/iframe-api.js', function() {
            console.log('YouTube API fallback loaded');
        });
    },
    
    /**
     * Load analytics scripts (Google Analytics, etc.)
     */
    loadAnalytics: function() {
        // Only load in production
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Analytics disabled for local development');
            return;
        }
        
        // Add your analytics script here
        // Example for Google Analytics:
        /*
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
        */
    },
    
    /**
     * Load social media widgets
     */
    loadSocialWidgets: function() {
        // Facebook SDK
        if (document.querySelector('.facebook-widget')) {
            this.loadFacebookSDK();
        }
        
        // Twitter widgets
        if (document.querySelector('.twitter-widget')) {
            this.loadTwitterSDK();
        }
    },
    
    /**
     * Load Facebook SDK
     */
    loadFacebookSDK: function() {
        if (window.FB) return;
        
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
        document.body.appendChild(script);
    },
    
    /**
     * Load Twitter SDK
     */
    loadTwitterSDK: function() {
        if (window.twttr) return;
        
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://platform.twitter.com/widgets.js';
        script.charset = 'utf-8';
        document.head.appendChild(script);
    },
    
    /**
     * Load reCAPTCHA for forms
     */
    loadRecaptcha: function() {
        if (document.querySelector('.g-recaptcha')) {
            const script = document.createElement('script');
            script.async = true;
            script.defer = true;
            script.src = 'https://www.google.com/recaptcha/api.js';
            document.head.appendChild(script);
        }
    },
    
    /**
     * Privacy-friendly script loading
     * Only loads scripts after user consent
     */
    loadWithConsent: function(scriptType) {
        // Check if user has given consent
        const consent = localStorage.getItem('cookie-consent');
        
        if (consent === 'accepted') {
            switch(scriptType) {
                case 'analytics':
                    this.loadAnalytics();
                    break;
                case 'social':
                    this.loadSocialWidgets();
                    break;
                default:
                    console.log('Unknown script type:', scriptType);
            }
        } else {
            console.log('User consent required for:', scriptType);
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    ExternalScripts.init();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExternalScripts;
}