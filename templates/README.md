# Outbox Africa Website Template System

This directory contains template files for creating consistent pages across the Outbox Africa website. The templates use placeholder syntax that can be replaced with actual content.

## Template Files

### 1. `template-page-with-header.html`
**Purpose**: Standard page template with header section, navigation, and content area
**Use For**: Content pages, detail pages, story pages

**Key Placeholders**:
- `{{PAGE_TITLE}}` - Page title for SEO and display
- `{{PAGE_DESCRIPTION}}` - Meta description for SEO
- `{{PAGE_HEADER_ENABLED}}` - true/false to show page header section
- `{{PAGE_HEADER_ALIGNMENT}}` - CSS classes: text-only-center-alignment, text-only-left-alignment, text-on-top-of-background-image-dark
- `{{HEADER_IMAGE}}` - Background image URL for page header
- `{{PAGE_TITLE_TEXT}}` - Main title displayed in header
- `{{PAGE_SUMMARY}}` - Subtitle/description under main title
- `{{NODE_ID}}` - Drupal node ID for tracking
- `{{BODY_CLASSES}}` - CSS classes for body element
- `{{NAV_CLASSES}}` - Additional CSS classes for navigation
- `{{LOGO_CLASSES}}` - CSS classes for logo (e.g., "small-height")
- `{{HOME_URL}}` - URL for home page link (usually "/" or "#")
- `{{LOGO_SRC}}` - Path to logo image
- `{{NAVIGATION_MENU}}` - HTML for navigation menu items
- `{{CONTENT_BEFORE_SECTIONS}}` - Content before main sections
- `{{MAIN_CONTENT_SECTIONS}}` - Main page content sections
- `{{CURRENT_PATH}}` - Current page path for Drupal settings
- `{{IS_FRONT}}` - true/false if this is the front page

**Example Values**:
```
{{PAGE_TITLE}} = "Impact Stories"
{{PAGE_DESCRIPTION}} = "Discover inspiring entrepreneurial journeys from Outbox Africa"
{{PAGE_HEADER_ENABLED}} = true
{{PAGE_HEADER_ALIGNMENT}} = "text-only-center-alignment"
{{PAGE_TITLE_TEXT}} = "Impact Stories"
{{PAGE_SUMMARY}} = "Embark on a journey of positive change through our diverse entrepreneurial stories"
{{BODY_CLASSES}} = "path-impact-stories page-node-type-page"
{{LOGO_SRC}} = "https://via.placeholder.com/200x60/003366/FFFFFF?text=OUTBOX+AFRICA"
```

### 2. `template-homepage.html`
**Purpose**: Simplified template for homepage without header section
**Use For**: Landing page, home page

**Key Differences from page-with-header**:
- No page header section
- Fixed body classes for front page
- Streamlined structure for homepage content

### 3. `content-sections.html`
**Purpose**: Reusable content section templates
**Use For**: Building content within main templates

**Section Types Available**:

#### Hero Section
```html
{{HERO_TITLE}} - Main hero heading
{{HERO_SUBTITLE}} - Small text above title
{{HERO_DESCRIPTION}} - Description paragraph
{{HERO_CTA_TEXT}} - Call to action button text
{{HERO_CTA_URL}} - Call to action button link
{{HERO_IMAGE}} - Hero image URL
{{HERO_IMAGE_ALT}} - Alt text for hero image
```

#### Single Column Text
```html
{{SECTION_TITLE}} - Section heading
{{SECTION_CONTENT}} - Main content (HTML allowed)
{{SECTION_CLASSES}} - CSS classes for section
{{SECTION_STYLES}} - Inline styles (e.g., "background-color:#FFFAEB;")
{{COLUMN_CLASSES}} - Bootstrap column classes (default: "col-md-12")
```

#### Multiple Text Boxes
```html
{{SECTION_TITLE}} - Overall section title
{{TEXT_BOXES}} - Array of text box objects:
  - TITLE - Box title
  - CONTENT - Box content
  - COLUMN_CLASSES - Bootstrap classes (e.g., "col-md-6", "col-lg-4")
```

#### Icon Text Boxes
```html
{{SECTION_TITLE}} - Section title
{{ICON_BOXES}} - Array of icon box objects:
  - ICON - Font Awesome icon class
  - ICON_COLOR - Color for icon
  - TITLE - Box title
  - CONTENT - Box content
  - COLUMN_CLASSES - Bootstrap column classes
```

#### Card Grid
```html
{{SECTION_TITLE}} - Grid title
{{SECTION_SUBTITLE}} - Grid subtitle
{{CARDS}} - Array of card objects:
  - IMAGE - Card image URL
  - IMAGE_ALT - Image alt text
  - TITLE - Card title
  - CONTENT - Card content
  - CTA_LINK - Call to action URL
  - CTA_TEXT - Call to action text
  - CTA_CLASSES - Button CSS classes
  - COLUMN_CLASSES - Bootstrap column classes
```

#### Image with Text
```html
{{SECTION_IMAGE}} - Main image URL
{{SECTION_IMAGE_ALT}} - Image alt text
{{SECTION_TITLE}} - Section title
{{SECTION_SUBTITLE}} - Section subtitle
{{SECTION_CONTENT}} - Text content
{{SECTION_CTA_URL}} - Call to action URL
{{SECTION_CTA_TEXT}} - Call to action text
{{IMAGE_COLUMN_CLASSES}} - Classes for image column
{{TEXT_COLUMN_CLASSES}} - Classes for text column
```

#### Views/Listing
```html
{{VIEWS_ITEMS}} - Array of view items:
  - IMAGE - Item image
  - IMAGE_ALT - Image alt text
  - TITLE - Item title
  - CONTENT - Item content/excerpt
  - LINK - Item detail link
  - META - Additional metadata
  - COLUMN_CLASSES - Bootstrap column classes
```

## Usage Instructions

1. **Choose the appropriate template**:
   - `template-page-with-header.html` for content pages
   - `template-homepage.html` for the homepage

2. **Replace placeholders with actual content**:
   - Use find/replace or template engine
   - Replace `{{PLACEHOLDER}}` with actual values

3. **Build content sections**:
   - Use sections from `content-sections.html`
   - Combine multiple sections in `{{MAIN_CONTENT_SECTIONS}}`

4. **Configure navigation and branding**:
   - Set logo source and home URL
   - Configure navigation menu HTML
   - Set appropriate CSS classes

## Common CSS Classes

### Page Header Alignments
- `text-only-center-alignment` - Centered text header
- `text-only-left-alignment` - Left-aligned text header
- `text-on-top-of-background-image-dark` - Text over dark background image
- `text-w-image-left` - Text with image on left

### Navigation Classes
- `small-height` - Smaller navigation bar
- `body-scrolled` - Navigation after page scroll

### Section Background Colors
- `style="background-color:#FFFAEB;"` - Light yellow
- `style="background-color:#F8F9FA;"` - Light gray
- `bg-primary-gradients` - Primary gradient background

### Bootstrap Column Classes
- `col-md-12` - Full width
- `col-md-6` - Half width
- `col-lg-4` - One third on large screens
- `col-sm-6 col-lg-3` - Responsive grid

## File Organization

```
templates/
├── template-page-with-header.html    # Main page template
├── template-homepage.html            # Homepage template  
├── content-sections.html             # Reusable content sections
└── README.md                         # This documentation
```

## Example Implementation

To create a new "About Us" page:

1. Copy `template-page-with-header.html`
2. Replace placeholders:
   ```
   {{PAGE_TITLE}} → "About Us"
   {{PAGE_HEADER_ENABLED}} → true
   {{PAGE_TITLE_TEXT}} → "About Us" 
   {{PAGE_SUMMARY}} → "Learn about our mission and team"
   ```
3. Add content sections to `{{MAIN_CONTENT_SECTIONS}}`
4. Save as `about-us.html`

This template system ensures consistency across all pages while allowing flexibility for different content types and layouts.