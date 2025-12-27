/**
 * Component Loader - Dynamically loads HTML components
 */
class ComponentLoader {
    
    /**
     * Load a component from a file and inject it into a target element
     * @param {string} componentPath - Path to the component HTML file
     * @param {string} targetSelector - CSS selector for the target element
     * @param {Function} callback - Optional callback function after loading
     */
    static async loadComponent(componentPath, targetSelector, callback = null) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentPath}`);
            }
            
            const html = await response.text();
            const targetElement = document.querySelector(targetSelector);
            
            if (targetElement) {
                targetElement.innerHTML = html;
                
                // Execute callback if provided
                if (callback && typeof callback === 'function') {
                    callback();
                }
                
                // Dispatch custom event
                document.dispatchEvent(new CustomEvent('componentLoaded', {
                    detail: { component: componentPath, target: targetSelector }
                }));
                
                console.log(`Component loaded: ${componentPath}`);
            } else {
                console.error(`Target element not found: ${targetSelector}`);
            }
        } catch (error) {
            console.error('Error loading component:', error);
        }
    }
    
    /**
     * Load multiple components
     * @param {Array} components - Array of component objects with path and target
     */
    static async loadComponents(components) {
        const promises = components.map(component => 
            this.loadComponent(component.path, component.target, component.callback)
        );
        
        try {
            await Promise.all(promises);
            console.log('All components loaded successfully');
            
            // Dispatch event when all components are loaded
            document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
        } catch (error) {
            console.error('Error loading some components:', error);
        }
    }
}

/**
 * Page initialization and component loading
 */
document.addEventListener('DOMContentLoaded', function() {
    // Define components to load
    const components = [
        {
            path: 'components/header.html',
            target: '#header-placeholder',
            callback: initNavigation
        },
        {
            path: 'components/footer.html',
            target: '#footer-placeholder',
            callback: initFooter
        }
    ];
    
    // Load all components
    ComponentLoader.loadComponents(components);
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    // Mobile menu toggle - Updated for Drupal primary navigation
    const mobileButton = document.querySelector('.primary-nav__button-toggle');
    const headerNav = document.querySelector('.header-nav');
    
    if (mobileButton && headerNav) {
        mobileButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle active class for mobile menu
            if (isExpanded) {
                headerNav.classList.remove('active');
                headerNav.style.display = 'none';
            } else {
                headerNav.classList.add('active');
                headerNav.style.display = 'block';
            }
        });
    }
    
    // Fallback for old navigation structure if it exists
    const mobileNav = document.querySelector('.mobile-nav');
    const innerNav = document.querySelector('.inner-nav');
    
    if (mobileNav && innerNav) {
        mobileNav.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            innerNav.style.display = isExpanded ? 'none' : 'flex';
        });
    }
    
    console.log('Navigation initialized with Drupal primary navigation support');
}

/**
 * Initialize footer functionality
 */
function initFooter() {
    // Back to top functionality
    const backToTop = document.querySelector('.link-to-top');
    
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (backToTop) {
            if (window.pageYOffset > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        }
    });
    
    console.log('Footer initialized');
}

/**
 * Utility functions for dynamic content loading
 */
const Utils = {
    /**
     * Dynamically load CSS file
     * @param {string} cssPath - Path to CSS file
     */
    loadCSS: function(cssPath) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = cssPath;
        link.media = 'all';
        document.head.appendChild(link);
    },
    
    /**
     * Dynamically load JavaScript file
     * @param {string} jsPath - Path to JS file
     * @param {Function} callback - Optional callback after loading
     */
    loadJS: function(jsPath, callback) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = jsPath;
        
        if (callback) {
            script.onload = callback;
        }
        
        document.head.appendChild(script);
    },
    
    /**
     * Check if element is in viewport
     * @param {Element} element - DOM element to check
     * @returns {boolean}
     */
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ComponentLoader, Utils };
}