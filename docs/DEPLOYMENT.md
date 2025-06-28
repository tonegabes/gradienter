# 🚀 Deployment Guide for Gradienter

This comprehensive guide covers deploying the Gradienter Tailwind CSS gradient generator to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Node.js 18.x or later
- npm 9.x or later

## Dependency Management

If you're experiencing dependency conflicts or build issues, follow these steps:

### Quick Fix
```bash
# Clean install
npm ci
```

### Full Reinstall
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Specific Issues
```bash
# For ESLint conflicts
npm install eslint@^9.0.0 --save-dev

# For Next.js compatibility issues
npm install next@15.3.4 --save-exact

# For React 19 compatibility
npm install react@^19.0.0 react-dom@^19.0.0
```

## GitHub Pages Configuration

### 1. Repository Settings
1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **"GitHub Actions"**
4. Save the configuration

### 2. Required Files Check
Ensure these files exist in your repository:
- `.github/workflows/deploy.yml` - Deployment workflow
- `next.config.ts` - Next.js static export configuration
- `package.json` - Build scripts and dependencies

## Deployment Methods

### Method 1: Automated Deployment (Recommended)

The repository uses GitHub Actions for automatic deployment when changes are pushed to the `main` branch.

#### How it works:
1. **Trigger**: Push to `main` branch or manual trigger
2. **Build**: GitHub Actions runs `npm ci` and `npm run build`
3. **Deploy**: Static files from `./out` are deployed to GitHub Pages
4. **Access**: Site available at `https://[username].github.io/gradienter/`

#### Deployment Steps:
```bash
# Make your changes
git add .
git commit -m "feat: update gradient generator"
git push origin main
```

#### Monitor Deployment:
1. Go to **Actions** tab in your GitHub repository
2. Click on the latest "Deploy to GitHub Pages" workflow
3. Monitor build and deployment progress
4. Check for any errors in the logs

### Method 2: Manual Deployment

For manual deployment or testing purposes:

```bash
# Build the application
npm run build

# Verify the build output
ls -la out/

# Optional: Test locally
npx serve out
```

### Method 3: Development Preview

Test your changes locally before deployment:

```bash
# Start development server
npm run dev

# Open http://localhost:3000
# Test all functionality before pushing
```

## Understanding the Configuration

### Next.js Configuration (`next.config.ts`)

```typescript
const nextConfig: NextConfig = {
  output: 'export',           // Enable static HTML export
  trailingSlash: true,        // Add trailing slashes to URLs
  images: {
    unoptimized: true,        // Disable image optimization for static export
  },
  experimental: {
    // Clean experimental config for static export
  },
};
```

**Key Settings Explained:**
- `output: 'export'`: Generates static HTML files instead of server-side rendering
- `trailingSlash: true`: Ensures compatibility with GitHub Pages routing
- `images.unoptimized: true`: Required for static export as image optimization needs a server

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

The workflow includes:
- **Node.js 18** setup with npm caching
- **Dependency installation** with `npm ci` for reproducible builds
- **Build process** using `npm run build`
- **Pages deployment** with proper permissions and artifact handling

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",    // Development with Turbopack
    "build": "next build",            // Production build
    "start": "next start",            // Production server (not used in static export)
    "lint": "next lint",              // Code linting
    "deploy": "next build"            // Alias for build
  }
}
```

## Troubleshooting

### Common Issues

#### ❌ Workflow Not Running
**Symptoms**: No workflow appears in Actions tab after push
**Solutions**:
- Verify `.github/workflows/deploy.yml` exists and is committed
- Ensure you pushed to the `main` branch (not `master` or other)
- Check workflow file YAML syntax with a YAML validator
- Confirm repository has Actions enabled in Settings → Actions

#### ❌ Build Failures
**Symptoms**: Build step fails in GitHub Actions
**Solutions**:
```bash
# Test build locally first
npm ci
npm run build

# Check for common issues:
# - Missing dependencies in package.json
# - TypeScript errors
# - ESLint errors that block build
# - Import/export issues
```

**Common Build Errors**:
- **"Module not found"**: Missing dependency or incorrect import path
- **"Type error"**: TypeScript compilation issues
- **"ESLint error"**: Linting rules blocking build
- **"Out of memory"**: Large bundle size (check for unnecessary imports)

#### ❌ GitHub Pages Not Working
**Symptoms**: 404 error or blank page on deployed site
**Solutions**:
- Ensure repository is **public** (or GitHub Pro/Team for private repos)
- Verify Pages source is set to **"GitHub Actions"**
- Check that workflow completed successfully
- Confirm `./out` directory was created and uploaded
- Wait 5-10 minutes for DNS propagation

#### ❌ Assets Not Loading
**Symptoms**: Styles or JavaScript not loading on deployed site
**Solutions**:
- Verify `trailingSlash: true` in `next.config.ts`
- Check browser developer tools for 404 errors
- Ensure `images.unoptimized: true` is set
- Clear browser cache and try again

#### ❌ Hydration Errors
**Symptoms**: Console errors about hydration mismatches
**Solutions**:
- Our app uses deterministic generation to avoid this
- If you modify the gradient generation, ensure server/client consistency
- Check that no `Math.random()` is used directly (use our seeded random instead)

### Advanced Troubleshooting

#### Dependency Conflicts
```bash
# Check for peer dependency issues
npm ls

# Fix peer dependency warnings
npm install --legacy-peer-deps

# Update all dependencies
npm update

# Check for security vulnerabilities
npm audit
npm audit fix
```

#### Build Performance Issues
```bash
# Analyze bundle size
npm run build
# Check .next/analyze/ folder if bundle analyzer is configured

# Clear Next.js cache
rm -rf .next

# Check for large dependencies
npm ls --depth=0
```

#### GitHub Actions Debugging
1. **Check workflow logs**: Actions tab → Click on failed workflow → Expand failed steps
2. **Enable debug logging**: Add `ACTIONS_RUNNER_DEBUG: true` to workflow environment
3. **Test workflow locally**: Use `act` tool to run GitHub Actions locally
4. **Check permissions**: Ensure proper `permissions` section in workflow

## Performance Optimization

### Build Optimization
- **Bundle Analysis**: Monitor bundle size and remove unused dependencies
- **Code Splitting**: Next.js automatically splits code for optimal loading
- **Image Optimization**: Already disabled for static export compatibility
- **CSS Optimization**: Tailwind CSS purges unused styles automatically

### Runtime Performance
- **Deterministic Generation**: Prevents hydration issues and ensures consistent rendering
- **Efficient Color Mapping**: Optimized Tailwind color utilities
- **Minimal JavaScript**: Lightweight React components with minimal client-side logic

## Recent Improvements

### Enhanced Deployment Workflow
- **Improved caching**: Node.js and npm dependencies cached for faster builds
- **Better error handling**: Clear error messages and troubleshooting steps
- **Automated testing**: Build verification before deployment
- **Artifact optimization**: Only necessary files included in deployment

### Configuration Improvements
- **Simplified Next.js config**: Removed unnecessary experimental features
- **Better TypeScript support**: Proper type definitions and strict mode
- **Enhanced ESLint rules**: Better code quality and consistency
- **Tailwind CSS v4**: Latest version with improved performance

## Additional Resources

- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)

## Support

If you encounter issues not covered in this guide:

1. **Check the logs**: Always start with GitHub Actions logs for detailed error information
2. **Test locally**: Run `npm run build` locally to reproduce issues
3. **Search existing issues**: Check the repository issues for similar problems
4. **Create an issue**: Include error logs, environment details, and steps to reproduce

---

**Happy deploying! 🚀** Your Tailwind gradient generator will be live at `https://[username].github.io/gradienter/`
