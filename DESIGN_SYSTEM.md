# WAISI Design System

## Overview
This document outlines the design system applied to the Wisconsin AI Safety Initiative (WAISI) website, establishing consistent visual language across all components.

## Color Palette

### Primary Colors - Violet
- **Primary Violet**: `#6B46C1` - Used for headings, emphasis, active states, and brand elements
- **Light Violet**: `#8B5CF6` - Used for links and interactive elements
- **Pale Violet**: `#C4B5FD` - Used for hover states and subtle accents
- **Violet Tint**: `#EDE9FE` - Used for light backgrounds and subtle highlights

### Neutral Colors - Cream & Charcoal
- **Primary Cream**: `#FFF9F0` - Main background color for all sections
- **Medium Cream**: `#F7F0E6` - Secondary background for layered elements
- **Dark Cream**: `#E8DCC8` - Used for borders, dividers, and inactive states
- **Charcoal**: `#2D2A26` - Primary text color for body content and inactive navigation

## Typography

### Font Family
- **Primary Font**: Lora (serif)
  - Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
  - Usage: All text elements including headings, body text, and navigation
  - Implementation: `fontFamily: '"Lora", serif'`

### Font Sizes
- **Headings**:
  - H2: `text-3xl` (30px) - Section titles
  - H3: `text-2xl` (24px) - Subsection titles
- **Body Text**: `text-lg` (18px) - Primary content
- **Navigation**: `text-lg` (18px) - Desktop nav links
- **Mobile Navigation**: `text-2xl` (24px) - Mobile menu items
- **Quotes**: `text-xl` (20px) - Testimonial text

## Component Styles

### Navigation Bar
- **Background**: Cream (`#FFF9F0`)
- **Logo Text**: Primary Violet (`#6B46C1`), bold weight
- **Active Links**: Primary Violet (`#6B46C1`) with underline
- **Inactive Links**: Charcoal (`#2D2A26`)
- **Hover State**: Underline decoration
- **Mobile Menu Hamburger**: Primary Violet (`#6B46C1`)
- **Position**: Fixed top with z-50 layering

### Section Layouts
- **Full-Width Sections**: Edge-to-edge bleed with cream background
- **Grid Layout**: 2-column responsive grid (stacks on mobile)
- **Content Padding**: `px-8` (32px) horizontal padding for content areas
- **Section Spacing**: `py-8` (32px) or `py-16` (64px) for larger sections

### Interactive Elements

#### Links
- **Default**: Light Violet (`#8B5CF6`)
- **Hover**: Underline decoration
- **No default text decoration**

#### Buttons & Controls
- **Carousel Navigation Arrows**:
  - Background: Semi-transparent cream `rgba(255, 249, 240, 0.8)`
  - Hover: Opaque cream (`#FFF9F0`)
  - Icon Color: Primary Violet (`#6B46C1`)

#### Carousel Indicators
- **Active Dot**: Primary Violet (`#6B46C1`), wider (`w-6`)
- **Inactive Dot**: Dark Cream (`#E8DCC8`), standard width (`w-2`)
- **Hover State**: Pale Violet (`#C4B5FD`)

### Content Patterns

#### Mission Statement Bullets
- **Bullet Symbol**: Primary Violet (`#6B46C1`) "•" with 8px right margin
- **Bullet Title**: Primary Violet (`#6B46C1`), semibold weight
- **Bullet Text**: Charcoal (`#2D2A26`), regular weight

#### Quotes & Testimonials
- **Quote Text**: Charcoal (`#2D2A26`), italic style, `text-xl`
- **Attribution**: Primary Violet (`#6B46C1`), semibold weight

#### Statistics Display
- **Number**: Charcoal (`#2D2A26`), black weight (`font-black`)
- **Label**: Charcoal (`#2D2A26`), regular weight
- **Separators**: Dark Cream (`#E8DCC8`) 1px vertical lines

## Design Principles

### Visual Hierarchy
1. **Primary Emphasis**: Violet headings and key actions
2. **Secondary Emphasis**: Semibold violet text for important points
3. **Body Content**: Charcoal text on cream background for optimal readability
4. **De-emphasis**: Dark cream for borders and inactive elements

### Consistency Rules
- All backgrounds use cream color (`#FFF9F0`) for cohesive feel
- All body text uses charcoal (`#2D2A26`) for consistent readability
- All interactive elements use violet spectrum for brand consistency
- All text uses Lora serif font for elegant, academic aesthetic

### Spacing Guidelines
- **Micro**: 4px, 8px for small gaps
- **Small**: 16px (1rem) for related elements
- **Medium**: 32px (2rem) for section padding
- **Large**: 64px (4rem) for major section breaks

### Responsive Behavior
- **Mobile First**: Components stack vertically on mobile
- **Breakpoint**: `lg:` (1024px) for desktop layouts
- **Grid Collapse**: 2-column grids become single column on mobile
- **Font Scaling**: Mobile navigation uses larger font size for touch targets

## Implementation Notes

### CSS-in-JS Pattern
Inline styles are used for color values to ensure consistency:
```tsx
style={{color: '#6B46C1', fontFamily: '"Lora", serif'}}
```

### Tailwind Classes
Utility classes handle spacing, layout, and responsive behavior:
```tsx
className="text-lg px-8 py-4 lg:grid-cols-2"
```

### State-Based Styling
Dynamic styling based on pathname for navigation:
```tsx
style={{color: pathname=="/about" ? '#6B46C1' : '#2D2A26'}}
```

## Accessibility Considerations
- **Color Contrast**: Violet on cream and charcoal on cream meet WCAG AA standards
- **Interactive Elements**: Minimum 44x44px touch targets on mobile
- **Focus States**: Preserve browser defaults or provide visible alternatives
- **Semantic HTML**: Use appropriate heading hierarchy and ARIA labels

## Future Considerations
- Consider adding dark mode variant with inverted color scheme
- Establish animation/transition standards (currently 300-500ms ease-in-out)
- Define error and success state colors
- Create reusable component library with these styles baked in