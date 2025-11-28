# Antiigravity Technologies Website

A premium, modern website for Antiigravity Technologies built with React, Three.js, and Tailwind CSS.

## Features

- 🎨 x.ai / Grok inspired dark minimal design
- ✨ Animated logo with inverted levitating "ii" letters
- 🌌 3D particle background with Three.js
- 🎭 Smooth scroll animations
- 📱 Fully responsive design
- ⚡ Performance optimized

## Prerequisites

- Node.js 16+ 
- npm or yarn

## Installation

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   cd antiigravity-website
   npm install
   ```

3. **Install Tailwind CSS:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Update `src/index.css`** to include Tailwind directives at the top:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. **Start the development server:**
   ```bash
   npm start
   ```

6. **Open your browser** at `http://localhost:3000`

## Project Structure

```
antiigravity-website/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main application with all components
│   ├── index.js        # Entry point
│   └── index.css       # Global styles & animations
├── package.json
├── tailwind.config.js
└── README.md
```

## Components

- **LogoAnimation** - Animated logo reveal with scan line effect
- **StaticLogo** - Static version for footer
- **ParticleField** - Three.js 3D background
- **FloatingParticles** - Anti-gravity floating particles
- **Navigation** - Fixed header with centered nav
- **HeroSection** - Main hero with animated logo
- **ProductsSection** - Products showcase
- **StatementSection** - Large typography statement
- **ServicesSection** - Services grid
- **CTASection** - Call to action
- **NewsSection** - Latest news
- **Footer** - Large logo footer with links

## Customization

### Colors
The site uses a dark theme with white text at various opacities. Edit the Tailwind classes to customize.

### Logo Animation
Adjust timing in `LogoAnimation` component:
- `scanPosition` speed: Change `prev + 1.2` value
- Flip trigger: Change `prev >= 28` threshold
- Animation duration: Modify `transition` and `animation` CSS

### 3D Background
Customize in `ParticleField`:
- `pointsCount`: Number of particles
- `opacity`: Particle visibility
- Rotation speed: Adjust in `animate()` function

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder.

## License

© 2025 Antiigravity Technologies Pvt. Ltd. All rights reserved.
