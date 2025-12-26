# Planning Guide

An elegant digital gift reveal experience that unveils a spa day voucher for Día de Reyes (Three Kings Day) through an interactive scroll/pergamino that unfolds as the user scrolls down.

**Experience Qualities**:
1. **Magical** - Creates anticipation and wonder through scroll-based reveal animations that mimic unfolding a physical scroll
2. **Elegant** - Sophisticated typography and warm color palette evoke luxury spa experience with parchment aesthetics
3. **Personal** - Intimate gift presentation with personalized messaging and shareable features

**Complexity Level**: Light Application (multiple features with basic state)
- Combines scroll-based progressive reveal with localStorage persistence for music preferences and interactive particle animations

## Essential Features

### Welcome Screen
- **Functionality**: Landing view with animated scroll icon and CTA button
- **Purpose**: Build anticipation before the gift reveal
- **Trigger**: Page load
- **Progression**: Fade in title → Pulse scroll icon → Button appears → User clicks
- **Success criteria**: Smooth animations, clear call-to-action, mobile responsive

### Scroll-Based Pergamino Reveal
- **Functionality**: As user scrolls down, the content of the pergamino is progressively revealed in sections
- **Purpose**: Create immersive, tactile experience that mimics unrolling a physical scroll
- **Trigger**: User scrolls after clicking "Abrir Pergamino"
- **Progression**: Welcome fades → Scroll container appears → User scrolls → Content reveals in stages (recipient name → greeting → gift title → gift details) → Top and bottom rods animate out
- **Success criteria**: Smooth 60fps scroll tracking, proper content staging, natural parchment feel, no jank on mobile

### Download Voucher
- **Functionality**: Downloads high-resolution image of the complete scroll
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
- **Trigger**: Activates after starting scroll experience
- **Progression**: Particles spawn → Float upward with random paths → Loop infinitely
- **Success criteria**: Smooth 60fps animation, not distracting, performant on mobile

## Edge Case Handling

- **No Scroll Support**: Fallback to show all content at once on devices without smooth scrolling
- **No Image Load**: Show placeholder scroll background with all text content intact
- **Audio Block**: Music toggle shows but handles browser autoplay restrictions gracefully
- **Slow Connection**: Progressive loading with skeleton states, core content prioritized
- **Small Screens**: Touch-friendly buttons (min 44px), readable text, proper spacing, adjusted scroll triggers
- **Browser Compatibility**: Fallback for browsers without backdrop-filter or modern CSS

## Design Direction

The design should evoke the experience of receiving and unrolling an ancient pergamino from the Three Kings. The scroll metaphor creates a tangible, physical connection to the digital gift. Golden tones suggest precious gifts, while parchment textures and scroll mechanics create an old-world, timeless quality. The scroll-based reveal should feel natural and intuitive - like slowly unrolling precious ancient document.

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

Animations should feel luxurious and deliberate, with the primary focus on scroll-based progressive reveal that mimics unrolling a physical pergamino.

- **Scroll Icon**: Gentle pulse (scale 1.0 to 1.15) with 3s duration - invites interaction and creates magical effect
- **Welcome Fade**: 800ms fade-in with slight scale (0.95 to 1.0) - elegant entrance
- **Scroll Rods**: Top rod animates up (translateY -100px) at start of scroll, bottom rod animates down (translateY 100px) at end of scroll - mimics scroll rolling away
- **Content Progressive Reveal**: Four opacity transforms tied to scroll position:
  - 0-15%: Recipient name fades in
  - 15-35%: Greeting appears
  - 35-55%: Gift title reveals
  - 55-80%: Full details and actions become visible
- **Particle Float**: Random duration 6-10s, slight horizontal drift, opacity fade 1 to 0 - subtle luxury backdrop
- **Button Hover**: 200ms scale (1.0 to 1.05) with shadow increase - satisfying tactile feedback
- **Sticky Scroll Container**: Pergamino stays centered on screen as user scrolls through virtual 400vh height

## Component Selection

- **Components**: 
  - Button (primary CTA) - Large, rounded, shadow with hover lift effect
  - Scroll container with sticky positioning - Creates pergamino unrolling effect
  - Framer Motion scroll tracking - useScroll and useTransform for smooth reveal
  - Toggle (music control) - Fixed position with icon swap animation
  
- **Customizations**: 
  - Custom scroll container with decorative rods at top/bottom that animate away during scroll
  - Parchment-style card with gradient overlays and border styling
  - SVG scroll icon with animated rotation
  - Particle system using absolute positioning with framer-motion animations
  
- **States**: 
  - Button: Default (elevated shadow) → Hover (lifted, brighter) → Active (pressed down)
  - Music Toggle: Off (muted icon, grayscale) → On (unmuted icon, gold accent)
  - Scroll Content: Hidden (opacity 0) → Revealing (progressive opacity) → Visible (opacity 1)
  - Scroll Rods: Attached (visible) → Rolling away (translateY animation) → Gone (off screen)
  
- **Icon Selection**: 
  - Scroll (Phosphor Scroll) - Represents pergamino/document
  - Crown (Phosphor Crown) - Represents Three Kings
  - Download (Phosphor DownloadSimple) - Clear download action
  - Share (Phosphor ShareNetwork) - WhatsApp sharing
  - Music (Phosphor SpeakerHigh/SpeakerSlash) - Audio toggle states
  - Sparkle (Phosphor Sparkle) - Decorative magical elements
  
- **Spacing**: 
  - Container padding: 2rem (mobile) / 3rem (desktop)
  - Scroll content vertical rhythm: 3rem between sections
  - Button padding: 1.5rem horizontal, 1rem vertical
  - Text line-height: 1.6 for body, 1.2 for headings
  
- **Mobile**: 
  - Full-height scroll experience maintained on mobile
  - Adjusted scroll trigger percentages for smaller screens
  - Increase touch targets to minimum 44x44px
  - Reduce font sizes proportionally (H1: 36px on mobile)
  - Full-width buttons stacked vertically
  - Reduce particle count (15 vs 30) for performance
  - Hide scrollbar for cleaner visual experience
