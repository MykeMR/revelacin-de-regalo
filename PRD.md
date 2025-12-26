# Planning Guide

An elegant digital gift reveal experience that unveils a spa day voucher for Día de Reyes (Three Kings Day) with sophisticated animations and interactive elements.

**Experience Qualities**:
1. **Magical** - Creates anticipation and wonder through smooth reveal animations and golden particle effects
2. **Elegant** - Sophisticated typography and warm color palette evoke luxury spa experience
3. **Personal** - Intimate gift presentation with personalized messaging and shareable features

**Complexity Level**: Light Application (multiple features with basic state)
- Combines multiple interactive states (welcome screen, reveal, countdown) with localStorage persistence for music preferences and animation states

## Essential Features

### Welcome Screen
- **Functionality**: Landing view with animated title and CTA button
- **Purpose**: Build anticipation before the gift reveal
- **Trigger**: Page load
- **Progression**: Fade in title → Pulse crown icon → Button appears → User clicks
- **Success criteria**: Smooth animations, clear call-to-action, mobile responsive

### Gift Reveal Animation
- **Functionality**: Transitions from welcome to scroll unfurling with gift details
- **Purpose**: Create magical moment of discovery
- **Trigger**: Click "Descubrir Regalo" button
- **Progression**: Fade out welcome → Scroll unfurls from top → Content fades in → Background particles activate
- **Success criteria**: Smooth 60fps animation, proper timing, no jank on mobile

### Countdown Timer
- **Functionality**: Real-time countdown to voucher expiration date
- **Purpose**: Create urgency and show validity period
- **Trigger**: Automatically starts on reveal
- **Progression**: Calculate time remaining → Update every second → Display days/hours/minutes
- **Success criteria**: Accurate calculations, proper formatting, handles expired state

### Download Voucher
- **Functionality**: Downloads high-resolution image of the scroll
- **Purpose**: Allow user to save and print the gift
- **Trigger**: Click "Descargar Vale" button
- **Progression**: User clicks → Canvas generates high-res image → Browser downloads file
- **Success criteria**: High quality output, proper filename, works on all devices

### WhatsApp Share
- **Functionality**: Opens WhatsApp with pre-filled gift message
- **Purpose**: Enable easy sharing with recipient
- **Trigger**: Click share button
- **Progression**: User clicks → WhatsApp opens with message → User selects contact
- **Success criteria**: Proper URL encoding, works on mobile and desktop

### Background Music Toggle
- **Functionality**: Optional ambient music with on/off control
- **Purpose**: Enhance the magical atmosphere
- **Trigger**: User toggles music button
- **Progression**: User clicks → Audio plays/pauses → State persists via localStorage
- **Success criteria**: Auto-muted on load, smooth fade in/out, remembers preference

### Floating Particles
- **Functionality**: Subtle golden particles floating across screen
- **Purpose**: Add luxury aesthetic and depth
- **Trigger**: Activates after reveal
- **Progression**: Particles spawn → Float upward with random paths → Loop infinitely
- **Success criteria**: Smooth 60fps animation, not distracting, performant on mobile

## Edge Case Handling

- **Expired Voucher**: Display elegant "Voucher Expired" message with golden styling
- **No Image Load**: Show placeholder scroll background with all text content intact
- **Audio Block**: Music toggle shows but handles browser autoplay restrictions gracefully
- **Slow Connection**: Progressive loading with skeleton states, core content prioritized
- **Small Screens**: Touch-friendly buttons (min 44px), readable text, proper spacing
- **Browser Compatibility**: Fallback for browsers without backdrop-filter or modern CSS

## Design Direction

The design should evoke the warmth and luxury of a spa experience combined with the magic of Three Kings Day. Golden tones suggest precious gifts, while parchment textures create an old-world, timeless quality. Animations should feel gentle and refined - never rushed or jarring - like slowly unwrapping a precious gift.

## Color Selection

Warm, luxurious palette inspired by gold, aged parchment, and spa atmospheres.

- **Primary Color**: Rich Gold `oklch(0.78 0.15 85)` - Represents precious gift, Three Kings' offerings, luxury
- **Secondary Colors**: 
  - Warm Brown `oklch(0.45 0.08 60)` - Grounding, spa earth tones, sophistication
  - Antique Gold `oklch(0.65 0.12 75)` - Vintage elegance, parchment accents
- **Accent Color**: Bright Gold `oklch(0.88 0.18 90)` - Attention-grabbing for CTAs, particle effects
- **Foreground/Background Pairings**: 
  - Background Gradient (Brown to Gold `oklch(0.35 0.06 55)` to `oklch(0.55 0.10 70)`): White text `oklch(0.98 0 0)` - Ratio 8.5:1 ✓
  - Parchment `oklch(0.95 0.02 80)`: Dark Brown text `oklch(0.25 0.04 50)` - Ratio 12.8:1 ✓
  - Accent Gold `oklch(0.88 0.18 90)`: Dark text `oklch(0.20 0.02 45)` - Ratio 10.2:1 ✓

## Font Selection

Typography should feel elegant and timeless, evoking handwritten invitations and luxury spa branding.

- **Primary Font**: Cormorant Garamond (Serif) - Elegant, classic, perfect for formal gift presentation
- **Secondary Font**: Montserrat (Sans-serif) - Clean, modern for UI elements and small text

- **Typographic Hierarchy**: 
  - H1 (Main Title): Cormorant Garamond Bold/48px/tight letter spacing/-0.02em
  - H2 (Recipient Name): Cormorant Garamond Italic/36px/normal/-0.01em
  - Body (Voucher Details): Cormorant Garamond Regular/20px/relaxed/1.6
  - UI Elements: Montserrat Medium/16px/normal/0
  - Countdown: Montserrat Bold/14px/wide/0.05em

## Animations

Animations should feel luxurious and deliberate, enhancing the gift-giving experience without overwhelming.

- **Crown Icon**: Gentle pulse (scale 1.0 to 1.1) with 2s duration - creates breathing, magical effect
- **Welcome Fade**: 800ms fade-in with slight scale (0.95 to 1.0) - elegant entrance
- **Scroll Unfurl**: 1200ms height expansion from top with cubic-bezier easing - mimics real scroll unrolling
- **Particle Float**: Random duration 4-7s, slight horizontal drift, opacity fade 1 to 0 - subtle luxury
- **Button Hover**: 200ms scale (1.0 to 1.05) with shadow increase - satisfying tactile feedback
- **Content Reveal**: Staggered fade-in (100ms delays) for text blocks - guides reading flow

## Component Selection

- **Components**: 
  - Button (primary CTA) - Large, rounded, shadow with hover lift effect
  - Card (scroll container) - Parchment texture, torn edges via CSS, drop shadow for depth
  - Dialog (for expired state) - Centered overlay with backdrop blur
  - Progress (countdown bars) - Linear bars showing time remaining visually
  - Toggle (music control) - Fixed position with icon swap animation
  
- **Customizations**: 
  - Custom scroll shape using border-radius and box-shadow for parchment effect
  - Canvas-based particle system for golden floating elements
  - SVG crown icon with animated paths
  - Custom countdown component with gradient backgrounds
  
- **States**: 
  - Button: Default (elevated shadow) → Hover (lifted, brighter) → Active (pressed down) → Disabled (muted)
  - Music Toggle: Off (muted icon, grayscale) → On (unmuted icon, gold accent)
  - Scroll: Hidden (scale 0, opacity 0) → Revealing (height animate) → Visible (full size)
  
- **Icon Selection**: 
  - Crown (Phosphor Crown) - Represents Three Kings
  - Download (Phosphor DownloadSimple) - Clear download action
  - Share (Phosphor ShareNetwork) - WhatsApp sharing
  - Music (Phosphor SpeakerHigh/SpeakerSlash) - Audio toggle states
  - Sparkle (Phosphor Sparkle) - Decorative magical elements
  
- **Spacing**: 
  - Container padding: 2rem (mobile) / 3rem (tablet) / 4rem (desktop)
  - Section gaps: 3rem vertical rhythm
  - Button padding: 1rem horizontal, 0.75rem vertical
  - Text line-height: 1.6 for body, 1.2 for headings
  
- **Mobile**: 
  - Stack all elements vertically on mobile (<768px)
  - Increase touch targets to minimum 44x44px
  - Reduce font sizes proportionally (H1: 36px on mobile)
  - Full-width buttons with fixed positioning for primary actions
  - Reduce particle count on mobile for performance
  - Simplify animations (shorter durations, less complex easing)
