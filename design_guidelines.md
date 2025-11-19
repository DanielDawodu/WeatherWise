# Weather Dashboard Design Guidelines

## Design Approach

**Selected Framework**: Material Design-inspired utility interface with modern dashboard aesthetics
**Justification**: Weather dashboards prioritize data clarity and real-time information display, requiring clean visual hierarchy and intuitive information architecture.

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, and 16** for consistent rhythm
- Container padding: `p-6` on mobile, `p-8` on desktop
- Card spacing: `p-6` to `p-8` for content areas
- Element gaps: `gap-4` to `gap-6` for related components
- Section margins: `mb-8` to `mb-12` for visual breathing room

**Container Strategy**:
- Max width: `max-w-4xl` centered with `mx-auto`
- Full viewport height: `min-h-screen` to center content vertically
- Responsive padding: `px-4 md:px-6 lg:px-8`

## Typography Hierarchy

**Font Selection**: Single font family from Google Fonts
- **Primary**: Inter or Poppins (clean, modern sans-serif for dashboard clarity)

**Type Scale**:
- City Name: `text-4xl md:text-5xl font-bold` 
- Temperature: `text-6xl md:text-7xl font-extrabold` (hero number)
- Weather Condition: `text-xl md:text-2xl font-medium`
- Labels (Humidity, Wind): `text-sm font-semibold uppercase tracking-wide`
- Values: `text-2xl md:text-3xl font-semibold`
- Search Input: `text-lg`

## Component Library

### Search Bar
- Full-width on mobile, `max-w-md` centered on desktop
- Height: `h-14` for comfortable touch target
- Rounded corners: `rounded-full` for modern feel
- Input padding: `px-6 py-4`
- Search button: Icon-only, `w-12 h-12` rounded-full, positioned absolute right
- Subtle shadow: `shadow-lg` for elevation

### Weather Card
- Card container: `rounded-3xl` for soft, friendly aesthetic
- Padding: `p-8 md:p-12` for spacious feel
- Backdrop blur effect: `backdrop-blur-md bg-white/10` for glassmorphism overlay on gradient backgrounds
- Shadow: `shadow-2xl` for pronounced depth
- Border: `border border-white/20` for subtle definition

### Weather Icon Display
- Icon size: `w-24 h-24 md:w-32 md:h-32` for prominent visual
- Placement: Top center of weather card
- Icons from React Icons library (wi-day-sunny, wi-cloud, wi-rain, wi-strong-wind)

### Stats Grid (Humidity & Wind)
- Layout: Two-column grid `grid grid-cols-2 gap-6`
- Each stat card: `rounded-2xl p-6 backdrop-blur-sm bg-white/5`
- Icon size: `w-8 h-8` positioned above text
- Center-aligned content

### Loading State
- Spinner: `w-16 h-16` centered
- Animated spin: Use Tailwind's `animate-spin`
- Loading text: `text-lg` below spinner with `mt-4`

### Error State
- Alert icon: `w-12 h-12`
- Error message: `text-lg font-medium`
- Retry button: `mt-6` with standard button sizing

## Background Gradient Implementation

**Strategy**: Full viewport gradients that subtly shift based on weather condition
- Apply to `body` or root container with `min-h-screen`
- Use `bg-gradient-to-br` for diagonal flow (top-left to bottom-right)
- Smooth transitions: `transition-all duration-1000 ease-in-out`

**Reference Gradient Patterns** (describe color tone without naming colors):
- Clear: Warm, sunny gradient (light to medium saturation)
- Clouds: Cool, muted gradient (grey tones)
- Rain: Cool, deeper gradient (blue-grey spectrum)

## Interactive Elements

### Buttons
- Primary (Search): `h-12 px-8 rounded-full font-semibold`
- Icon buttons: `w-12 h-12 rounded-full` with centered icon
- Hover: Subtle scale `hover:scale-105` with `transition-transform`

### Input Fields
- Border: `border-2` with focus ring `focus:ring-4 focus:ring-offset-2`
- Placeholder: Medium opacity for clear hierarchy

## Accessibility Standards

- All interactive elements: Minimum `44x44px` touch targets
- Focus indicators: Visible on all focusable elements
- ARIA labels: On icon-only buttons and search input
- Semantic HTML: Proper heading hierarchy (h1 for city, h2 for sections)
- Loading announcements: Screen reader feedback for state changes

## Animations

**Minimal, purposeful motion**:
- Weather data appearance: Fade-in with slight slide-up `animate-fade-in-up` (create custom Tailwind animation)
- Background transitions: 1-second smooth fade between gradients
- Loading spinner: Standard rotation
- Search button: Subtle scale on hover
- **No** complex scroll animations or decorative motion

## Responsive Breakpoints

- Mobile-first approach
- Key breakpoint: `md:` (768px) for layout shifts
- Search bar: Full width mobile, fixed width desktop
- Weather card: Single column throughout, increased padding on larger screens
- Typography: Scale up 1-2 sizes from mobile to desktop

## Images

**Hero Section**: No large hero image needed for this utility dashboard
**Weather Icons**: Use React Icons library exclusively - no custom images required
**Background**: Pure CSS gradients only, no background images

This design creates a clean, data-focused weather dashboard with modern aesthetics, clear information hierarchy, and smooth weather-driven ambient background changes.