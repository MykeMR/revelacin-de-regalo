# Planning Guide

An elegant digital gift reveal experience that unveils a spa day voucher for Día de Reyes (Three Kings Day) through sequential timed animations that progressively reveal the gift message.

**Experience Qualities**:
1. **Magical** - Creates anticipation and wonder through timed sequential reveal animations that build excitement
2. **Elegant** - Sophisticated typography and warm color palette evoke luxury spa experience with parchment aesthetics
3. **Personal** - Intimate gift presentation with personalized messaging and shareable features

**Complexity Level**: Light Application (multiple features with basic state)
- Combines timed sequential reveal animations with localStorage persistence for music preferences and interactive particle animations

## Essential Features

### Welcome Screen
- **Functionality**: Landing view with animated scroll icon and CTA button
- **Purpose**: Build anticipation before the gift reveal
- **Trigger**: Page load
- **Progression**: Fade in title → Pulse scroll icon → Button appears → User clicks
- **Success criteria**: Smooth animations, clear call-to-action, mobile responsive

### Sequential Timed Reveal
- **Functionality**: After clicking start button, content reveals automatically in four timed stages
- **Purpose**: Create immersive experience that builds anticipation and focuses attention on each message
- **Trigger**: User clicks "Abrir Pergamino"
- **Progression**: Welcome fades → Step 1: Recipient name (3s display) → Step 2: Greeting (3.5s display) → Step 3: Gift title (3.5s display) → Step 4: Full details with action buttons (remains visible)
- **Success criteria**: Smooth fade transitions, proper timing that allows reading, natural pacing that feels deliberate not rushed

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

- **Impatient Users**: No skip functionality - experience must play through at designed pace to maintain magic
- **No Image Load**: Show placeholder scroll background with all text content intact
- **Audio Block**: Music toggle shows but handles browser autoplay restrictions gracefully
- **Slow Connection**: Progressive loading with skeleton states, core content prioritized
- **Small Screens**: Touch-friendly buttons (min 44px), readable text, proper spacing
- **Browser Compatibility**: Fallback for browsers without backdrop-filter or modern CSS

## Design Direction

The design should evoke the experience of receiving a precious gift announcement from the Three Kings. The timed sequential reveal creates anticipation and focuses attention on each element of the message. Golden tones suggest precious gifts, while parchment textures create an old-world, timeless quality. The reveal should feel like a magical ceremony unfolding before the recipient's eyes.

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

Animations should feel luxurious and deliberate, with the primary focus on timed sequential reveals that automatically progress through the gift message stages.

- **Scroll Icon**: Gentle pulse (scale 1.0 to 1.15) with 3s duration - invites interaction and creates magical effect
- **Welcome Fade**: 800ms fade-in with slight scale (0.95 to 1.0) - elegant entrance
- **Sequential Reveals**: Four timed stages with crossfade transitions (1s duration each):
  - Stage 1 (0.5s delay): Recipient name fades in, displays for 3s, fades out
  - Stage 2 (3.5s delay): Greeting appears, displays for 3.5s, fades out
  - Stage 3 (7s delay): Gift title reveals with slight scale effect, displays for 3.5s, fades out
  - Stage 4 (10.5s delay): Full details fade in and remain visible with action buttons
- **Particle Float**: Random duration 6-10s, slight horizontal drift, opacity fade 1 to 0 - subtle luxury backdrop
- **Button Hover**: 200ms scale (1.0 to 1.05) with shadow increase - satisfying tactile feedback

## Component Selection

- **Components**: 
  - Button (primary CTA) - Large, rounded, shadow with hover lift effect
  - Card container with centered content - Creates elegant frame for gift message
  - Framer Motion AnimatePresence - Handles smooth crossfade transitions between reveal stages
  - Toggle (music control) - Fixed position with icon swap animation
  
- **Customizations**: 
  - Parchment-style card with gradient overlays and border styling
  - SVG scroll icon with animated rotation
  - Particle system using absolute positioning with framer-motion animations
  - Timed sequential reveal system using React state and setTimeout
  
- **States**: 
  - Button: Default (elevated shadow) → Hover (lifted, brighter) → Active (pressed down)
  - Music Toggle: Off (muted icon, grayscale) → On (unmuted icon, gold accent)
  - Reveal Stages: Hidden (not started) → Stage 1 → Stage 2 → Stage 3 → Stage 4 (final with buttons)
  
- **Icon Selection**: 
  - Scroll (Phosphor Scroll) - Represents pergamino/document
  - Crown (Phosphor Crown) - Represents Three Kings
  - Download (Phosphor DownloadSimple) - Clear download action
  - Share (Phosphor ShareNetwork) - WhatsApp sharing
  - Music (Phosphor SpeakerHigh/SpeakerSlash) - Audio toggle states
  - Sparkle (Phosphor Sparkle) - Decorative magical elements
  
- **Spacing**: 
  - Container padding: 2rem (mobile) / 3rem (desktop)
  - Reveal content vertical centering: flexbox with center alignment
  - Button padding: 1.5rem horizontal, 1rem vertical
  - Text line-height: 1.6 for body, 1.2 for headings
  
- **Mobile**: 
  - Full-height experience maintained on mobile
  - Same timing for all devices - no adjustments needed
  - Increase touch targets to minimum 44x44px
  - Reduce font sizes proportionally (H1: 36px on mobile)
  - Full-width buttons stacked vertically
  - Reduce particle count (15 vs 30) for performance
