# 🛠️ Development Guide for Gradienter

This guide covers local development setup and best practices for the Gradienter project.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/gradienter.git
cd gradienter

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Available Scripts

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run preview      # Build and serve locally
npm run start        # Start production server (not used for static export)
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run type-check   # Run TypeScript compiler check
```

### Deployment
```bash
npm run deploy       # Build for deployment (same as build)
npm run deploy:manual # Manual deployment to GitHub Pages
```

### Maintenance
```bash
npm run clean        # Clean build artifacts and cache
npm run reinstall    # Full dependency reinstall
```

## Project Structure

```
gradienter/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── GradientCard.tsx
│   │   └── GradientGrid.tsx
│   ├── lib/               # Utilities and helpers
│   │   └── utils.ts
│   └── types/             # TypeScript type definitions
│       └── index.ts
├── public/                # Static assets
├── docs/                  # Documentation
├── scripts/               # Build and deployment scripts
└── .github/workflows/     # GitHub Actions
```

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/new-gradient-feature

# Make changes and test locally
npm run dev

# Run quality checks
npm run lint
npm run type-check
npm run build

# Commit changes
git add .
git commit -m "feat: add new gradient feature"

# Push and create PR
git push origin feature/new-gradient-feature
```

### 2. Code Quality Standards

#### TypeScript
- All components and utilities are fully typed
- Use proper interfaces and type definitions
- Enable strict mode for better type safety

#### ESLint Configuration
- Extends Next.js recommended rules
- Includes React and TypeScript specific rules
- Automatically fixes formatting issues

#### Styling
- Tailwind CSS for all styling
- Use official Tailwind color palette only
- Responsive design with mobile-first approach

### 3. Component Guidelines

#### GradientCard Component
```typescript
// Example of proper component structure
interface GradientCardProps {
  gradient: TailwindGradient;
  index: number;
}

export function GradientCard({ gradient, index }: GradientCardProps) {
  // Component logic here
}
```

#### Best Practices
- Use semantic HTML elements
- Implement proper accessibility (ARIA labels, keyboard navigation)
- Keep components focused and reusable
- Use TypeScript interfaces for props

## Performance Considerations

### Build Optimization
- **Static Export**: Configured for optimal GitHub Pages deployment
- **Tailwind Purging**: Unused CSS automatically removed
- **Code Splitting**: Next.js handles automatic code splitting
- **Asset Optimization**: Images and assets optimized for static serving

### Runtime Performance
- **Deterministic Generation**: Prevents hydration issues
- **Efficient Rendering**: Minimal re-renders with proper React patterns
- **Lightweight Bundle**: Only necessary dependencies included

## Testing

### 🚀 Pre-CI Testing (Recommended)

**SEMPRE teste o build localmente antes de fazer push para evitar falhas no GitHub Actions:**

#### Opção 1: Scripts Dedicados (Mais Completo)
```bash
# Linux/Mac
./scripts/test-build.sh

# Windows PowerShell
.\scripts\test-build.ps1

# Windows PowerShell (pular servidor de teste)
.\scripts\test-build.ps1 -SkipServer
```

#### Opção 2: Scripts NPM (Mais Rápido)
```bash
npm run pre-commit    # Teste rápido antes do commit
npm run test:build    # Teste completo do build
npm run test:ci       # Simula ambiente CI completo
```

### ⚡ Comandos Rápidos de Teste

```bash
# Teste rápido (lint + types + build)
npm run pre-commit

# Limpeza completa + build
npm run clean && npm run build

# Preview local do build
npm run preview
```

### Manual Testing Checklist
- [ ] All 100 gradient cards render correctly
- [ ] Copy functionality works for both colors and classes
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] No console errors or warnings
- [ ] Build completes successfully
- [ ] Static export works correctly

### Local Testing
```bash
# Test development build
npm run dev

# Test production build
npm run preview

# Test static export
npm run build
npx serve out
```

### 🛠️ Fluxo Recomendado de Desenvolvimento

```bash
# 1. Fazer mudanças
npm run dev

# 2. Testar mudanças localmente
# ... testar no browser ...

# 3. SEMPRE testar build antes do commit
npm run pre-commit

# 4. Se tudo passou, fazer commit
git add .
git commit -m "feat: sua mudança"

# 5. Push para GitHub
git push origin main
```

## Troubleshooting

### Common Development Issues

#### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

#### Module Resolution Issues
```bash
# Clear Next.js cache
npm run clean

# Reinstall dependencies
npm run reinstall
```

#### TypeScript Errors
```bash
# Check types without building
npm run type-check

# Fix common issues
npm run lint:fix
```

#### Hydration Errors
- Ensure no `Math.random()` usage (use seeded random instead)
- Check for server/client rendering differences
- Verify all components are properly typed

### Performance Issues
```bash
# Analyze bundle size
npm run build
# Check output for bundle analysis

# Clear all caches
npm run clean
rm -rf node_modules/.cache
```

## Environment Configuration

### Local Development
Create `.env.local` for local environment variables:
```bash
# Disable telemetry
NEXT_TELEMETRY_DISABLED=1

# Custom configuration
DEBUG=true
```

### Production Build
Environment variables are set in GitHub Actions workflow:
```yaml
env:
  NODE_ENV: production
  NEXT_TELEMETRY_DISABLED: 1
```

## Contributing

### Code Style
- Use 2 spaces for indentation
- Follow Prettier formatting (configured in ESLint)
- Use semantic commit messages
- Write descriptive PR descriptions

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes with proper testing
4. Run quality checks
5. Submit PR with clear description
6. Address review feedback

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Phosphor Icons](https://phosphoricons.com)

---

**Happy coding! 🎨** Build amazing gradient experiences with Tailwind CSS!
