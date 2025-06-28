# 🎨 Tailwind CSS Gradient Generator

A **Single Page Application (SPA)** built with Next.js 14+ that generates 100 gradient cards using only **official Tailwind CSS colors**. Each card has a 16:10 aspect ratio and displays Tailwind colors and ready-to-use classes.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-blue?style=flat-square&logo=tailwindcss)
![Phosphor Icons](https://img.shields.io/badge/Phosphor%20Icons-green?style=flat-square)

## 🌐 Live Demo

🚀 **[View Live Demo on GitHub Pages](https://username.github.io/gradienter/)**

## ✨ Features

### 🎯 Core Features
- **100 unique cards** with deterministic generation (no hydration issues)
- **Official Tailwind colors** (slate, gray, blue, red, green, etc.)
- **Tailwind gradients** with 2-3 colors each
- **16:10 aspect ratio** for all cards
- **Ready-to-use Tailwind classes** for copy and paste
- **8 gradient directions** with Phosphor Icons
- **Deterministic generation** - same results on server and client

### 🖱️ Interactivity
- **Copy colors** - Individual Tailwind colors (e.g., blue-500, red-400)
- **Copy classes** - Complete gradient classes (e.g., bg-gradient-to-r from-blue-500 to-red-400)
- **Visual feedback** when copying
- **Phosphor Icons** for gradient directions
- **Smooth hover effects** and animations
- **Fully responsive interface**

### 📱 Responsive Design
- **Desktop**: 4 columns
- **Tablet**: 3 columns
- **Mobile**: 2 columns
- **Small Mobile**: 1 column

## 🚀 Technologies Used

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Static typing
- **Tailwind CSS** - CSS framework (colors used in gradients)
- **Phosphor Icons** - Icon library for direction indicators
- **Inter & Fira Code** - Google Fonts

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gradienter
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### GitHub Pages (Automatic)

This project is configured with **GitHub Actions** for automatic deployment to GitHub Pages:

1. **Push to main branch** - Deployment triggers automatically
2. **Manual deployment** - Use "Actions" tab in GitHub repository
3. **Live URL** - Available at `https://username.github.io/gradienter/`

The workflow (`/.github/workflows/deploy.yml`) handles:
- ✅ Next.js static export
- ✅ Optimized build process
- ✅ Automatic deployment to GitHub Pages
- ✅ Caching for faster builds

### Manual Deployment

```bash
# Build for production
npm run build

# The static files will be in the 'out' directory
# Deploy the 'out' folder to any static hosting service
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Main layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── GradientCard.tsx   # Individual Tailwind card
│   └── GradientGrid.tsx   # Cards grid
├── lib/
│   └── utils.ts           # Tailwind utility functions
└── types/
    └── index.ts           # TypeScript definitions
```

## 🎨 Components

### `GradientCard`
Renders an individual card with:
- CSS gradient generated from Tailwind colors
- 16:10 aspect ratio
- Listed Tailwind colors (e.g., blue-500, red-400)
- Complete Tailwind classes for copying
- Phosphor Icons for gradient directions
- Copy buttons for colors and classes

### `GradientGrid`
Organizes cards in:
- Responsive grid layout
- 100 cards per page
- Header with statistics
- Footer with Tailwind information

## 🛠️ Utility Functions

### `generateSeededTailwindColor()`
Generates deterministic Tailwind colors based on seed.

### `generateSeededTailwindGradient()`
Creates complete Tailwind gradient configuration with:
- 2-3 deterministic Tailwind colors
- Random Tailwind direction
- Ready-to-use CSS classes

### `generateCSSFromTailwindColors()`
Converts Tailwind colors to valid CSS for preview.

### `copyToClipboard()`
Copies colors or classes to clipboard with feedback.

## 🎯 How to Use

1. **View Gradients**: Page automatically loads with 100 unique gradients using Tailwind colors
2. **Copy Colors**: Click the copy icon next to colors to copy Tailwind color names (e.g., blue-500, red-400)
3. **Copy Classes**: Click the copy icon next to classes to copy complete gradient classes (e.g., bg-gradient-to-r from-blue-500 to-red-400)
4. **Use in Project**: Paste classes directly into your HTML/JSX
5. **Direction Icons**: Phosphor Icons show gradient direction visually

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Run production build
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🎨 Customization

### Modify Card Count
In `src/app/page.tsx`:
```tsx
<GradientGrid cardCount={100} /> // Change the number
```

### Add New Tailwind Colors
In `src/lib/utils.ts`, add to `TAILWIND_COLORS` constant:
```tsx
const TAILWIND_COLORS = {
  // ... existing colors
  newcolor: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
};
```

### Customize Directions
Modify the `TAILWIND_DIRECTIONS` constant in `src/lib/utils.ts`.

## 📊 Performance Features

- **Deterministic generation** with seeded random (no hydration issues)
- **Native Tailwind colors** for optimal performance
- **Dynamic CSS generation** only for preview
- **Tailwind JIT** for optimized bundle
- **Optimized Google Fonts** loading
- **Static export** for fast loading

## 🌟 Technical Highlights

- ✅ **100% official Tailwind colors**
- ✅ **Ready-to-use classes**
- ✅ **Well-typed TypeScript**
- ✅ **Mobile-first design**
- ✅ **Accessibility** with ARIA labels
- ✅ **Performance optimized**
- ✅ **Clean, commented code**
- ✅ **No hydration issues**
- ✅ **GitHub Pages ready**

## 🎨 Available Tailwind Colors

**Neutrals**: slate, gray, zinc, neutral, stone
**Reds**: red, rose
**Oranges**: orange, amber
**Yellows**: yellow, lime
**Greens**: green, emerald, teal
**Blues**: cyan, sky, blue, indigo
**Purples**: violet, purple, fuchsia
**Pinks**: pink

Each color family includes shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Developed with ❤️ using Next.js, TypeScript and Tailwind CSS**
