# Raco Energies - Outbox Africa Website

This project contains the cleaned and modularized version of the Outbox Africa website, with dynamically loaded components for better maintainability and performance.

## Project Structure

```
Raco_energies/
├── assets/
│   ├── css/
│   │   ├── custom-styles.css      # Extracted inline styles
│   │   └── enhancements.css       # Additional animations and responsive design
│   ├── js/
│   │   ├── components.js          # Dynamic component loading system
│   │   └── app.js                 # Main application logic
│   └── images/                    # Image assets (to be populated)
├── components/
│   ├── header.html                # Reusable header component
│   └── footer.html                # Reusable footer component
├── index.html                     # 10X Digital Startup Accelerator Challenge page
├── our-story.html                 # Our Story page
├── template-base.html             # Base template for creating new pages
└── README.md                      # This file
```

## Key Features

### 1. **Modular Architecture**
- **Header Component**: Dynamically loaded navigation with logo and mobile menu
- **Footer Component**: Reusable footer with contact info and social links
- **Base Template**: Standardized HTML structure for consistency

### 2. **Dynamic Loading System**
- Components are loaded asynchronously using JavaScript
- Reduces initial page load time
- Easier maintenance - update header/footer in one place

### 3. **Enhanced Styling**
- Extracted inline CSS into organized files
- Custom animations and interactions
- Responsive design optimizations
- Print-friendly styles

### 4. **Performance Optimizations**
- Lazy loading for images
- Smooth scrolling for internal links
- Optimized asset loading
- Reduced motion support for accessibility

### 5. **Developer-Friendly Features**
- Modular JavaScript architecture
- Event-driven component system
- Utility functions for common tasks
- Comprehensive error handling

## Setup Instructions

### 1. **File Organization**
Ensure all files are in their correct directories as shown in the project structure above.

### 2. **Image Assets**
Copy your images to the `assets/images/` directory and update the image paths in the HTML files:
- `logo.svg` - Company logo
- `favicon.ico` - Website favicon
- Various page images as referenced in the HTML

### 3. **External Dependencies**
The project relies on external CSS and JavaScript files. Ensure these are accessible:
- Drupal theme CSS files
- Font files (Metropolis, Lora)
- External JavaScript libraries

### 4. **Local Development**
To run locally, use a local server (due to CORS restrictions with component loading):

```bash
# Using Python
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

### 5. **Customization**
- **Colors**: Update CSS variables in the `<style>` section of HTML files
- **Content**: Modify HTML files directly or create new ones using `template-base.html`
- **Styling**: Add custom styles to `assets/css/enhancements.css`
- **Functionality**: Extend `assets/js/app.js` with additional features

## Component System

### Adding New Components

1. **Create the component file** in `components/` directory
2. **Add a placeholder** in your HTML: `<div id="component-placeholder"></div>`
3. **Load the component** using JavaScript:

```javascript
ComponentLoader.loadComponent('components/new-component.html', '#component-placeholder');
```

### Component Loading Examples

```javascript
// Load single component
ComponentLoader.loadComponent('components/header.html', '#header-placeholder', function() {
    console.log('Header loaded!');
});

// Load multiple components
const components = [
    { path: 'components/header.html', target: '#header-placeholder' },
    { path: 'components/footer.html', target: '#footer-placeholder' }
];
ComponentLoader.loadComponents(components);
```

## JavaScript Features

### Available Utilities

- **`OutboxApp.init()`** - Initialize the application
- **`OutboxApp.showNotification(message, type, duration)`** - Show notifications
- **`Utils.loadCSS(path)`** - Dynamically load CSS files
- **`Utils.loadJS(path, callback)`** - Dynamically load JavaScript files
- **`Utils.isInViewport(element)`** - Check if element is visible

### Custom Events

The system dispatches custom events for component loading:
- `componentLoaded` - When a single component loads
- `allComponentsLoaded` - When all components finish loading

```javascript
document.addEventListener('componentLoaded', function(event) {
    console.log('Component loaded:', event.detail.component);
});
```

## Responsive Design

The website is optimized for:
- **Desktop**: Full-featured experience
- **Tablet**: Adjusted layouts and font sizes
- **Mobile**: Optimized for small screens
- **Print**: Clean print styles

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills for fetch API)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize Images**: Use WebP format where possible
2. **Enable Compression**: Use gzip/brotli on your server
3. **CDN**: Consider using a CDN for static assets
4. **Caching**: Set appropriate cache headers
5. **Minification**: Minify CSS and JavaScript for production

## Accessibility Features

- Skip to content links
- ARIA labels and roles
- Keyboard navigation support
- Reduced motion support
- High contrast compatibility

## Troubleshooting

### Components Not Loading
- Check browser console for errors
- Ensure you're running on a local server (not file://)
- Verify component file paths are correct

### Styling Issues
- Check CSS file paths
- Verify external CSS dependencies are loading
- Use browser dev tools to debug styles

### JavaScript Errors
- Check browser console for error messages
- Ensure all required files are present
- Verify external script dependencies

## Future Enhancements

Consider these improvements for future development:
- Build system with bundling and minification
- Progressive Web App (PWA) features
- Advanced caching strategies
- Internationalization (i18n) support
- Content Management System (CMS) integration

## Contributing

When making changes:
1. Test across different devices and browsers
2. Ensure accessibility standards are maintained
3. Update this README if adding new features
4. Follow the established code organization patterns

## License

[Add your license information here]

---

For questions or support, please contact the development team.