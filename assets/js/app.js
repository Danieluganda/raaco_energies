/**
 * Main Application JavaScript
 * This file handles the primary functionality for the Outbox Africa website
 */

// Global app configuration
const APP_CONFIG = {
    baseURL: window.location.origin,
    apiEndpoint: '/api',
    version: '1.0.0',
    debug: false
};

// Main App object
const OutboxApp = {
    
    /**
     * Initialize the application
     */
    init: function() {
        console.log('Initializing Outbox App v' + APP_CONFIG.version);
        
        this.bindEvents();
        this.initializeFeatures();
        this.handleFormSubmissions();
        this.initializeAnimations();
    },
    
    /**
     * Bind global event listeners
     */
    bindEvents: function() {
        // Window load event
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
        
        // Window resize event
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 16);
        });
    },
    
    /**
     * Initialize various features
     */
    initializeFeatures: function() {
        this.initSmoothScrolling();
        this.initLazyLoading();
        this.initVideoEmbeds();
        this.initExternalLinks();
    },
    
    /**
     * Handle window resize
     */
    handleResize: function() {
        // Update any responsive elements here
        console.log('Window resized');
    },
    
    /**
     * Handle window scroll
     */
    handleScroll: function() {
        // Handle scroll-based animations or sticky elements
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove sticky class to navigation
        const nav = document.querySelector('.main-nav');
        if (nav) {
            if (scrollTop > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    },
    
    /**
     * Initialize smooth scrolling for internal links
     */
    initSmoothScrolling: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },
    
    /**
     * Initialize lazy loading for images
     */
    initLazyLoading: function() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    },
    
    /**
     * Initialize video embeds with fluid wrapper
     */
    initVideoEmbeds: function() {
        const videos = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"]');
        videos.forEach(video => {
            if (!video.parentElement.classList.contains('fluid-width-video-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'fluid-width-video-wrapper';
                video.parentNode.insertBefore(wrapper, video);
                wrapper.appendChild(video);
            }
        });
    },
    
    /**
     * Add external link indicators and target="_blank"
     */
    initExternalLinks: function() {
        const domain = window.location.hostname;
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('http') && !href.includes(domain)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                link.classList.add('external-link');
            }
        });
    },
    
    /**
     * Handle form submissions
     */
    handleFormSubmissions: function() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                // Add form validation and submission logic here
                console.log('Form submitted:', form);
            });
        });
    },
    
    /**
     * Initialize animations
     */
    initializeAnimations: function() {
        // Check if animations are supported
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // User prefers reduced motion, disable animations
            document.body.classList.add('reduce-motion');
            return;
        }
        
        this.initFadeInAnimations();
        this.initCounterAnimations();
    },
    
    /**
     * Initialize fade-in animations for elements
     */
    initFadeInAnimations: function() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            document.querySelectorAll('.fade-in').forEach(el => {
                animationObserver.observe(el);
            });
        }
    },
    
    /**
     * Initialize counter animations
     */
    initCounterAnimations: function() {
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(counter, 0, target, duration);
                        observer.unobserve(counter);
                    }
                });
            });
            
            observer.observe(counter);
        });
    },
    
    /**
     * Animate counter from start to end value
     */
    animateCounter: function(element, start, end, duration) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * this.easeOutQuart(progress));
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    /**
     * Easing function for animations
     */
    easeOutQuart: function(t) {
        return 1 - (--t) * t * t * t;
    },
    
    /**
     * Show notification message
     */
    showNotification: function(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after duration
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    OutboxApp.init();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OutboxApp;
}