# Deployment Guide for Emotevation

This document describes how to deploy the Emotevation application to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Node.js 18.x or later
- npm 7.x or later

## Dependency Management

If you're experiencing dependency conflicts (especially with ESLint), follow these steps:

1. Run the reinstall script:
   ```bash
   npm run reinstall
   ```

2. If you're still having issues, try a manual reinstall:
   ```bash
   rm -rf node_modules
   npm cache clean --force
   npm install
   ```

3. For specific ESLint conflicts, ensure you're using a compatible version:
   ```bash
   npm install eslint@8.57.0 --save-dev
   ```

## GitHub Pages Configuration

1. **Repository Settings**: In your GitHub repository, go to Settings > Pages.
2. **Source**: Set the source to "GitHub Actions".

## Deployment Methods

### Method 1: Automated Deployment with GitHub Actions

The repository is configured with a GitHub Actions workflow that automatically builds and deploys the application to GitHub Pages whenever changes are pushed to the `main` branch.

#### How it works:

1. Push your changes to the `main` branch
2. GitHub Actions will automatically run the workflow defined in `.github/workflows/deploy.yml`
3. The workflow builds the application and deploys it to GitHub Pages
4. Your site will be available at `https://[username].github.io/emotevation/`

#### Debugging GitHub Actions:

If the deployment fails, you can check the workflow logs in the "Actions" tab of your GitHub repository to identify and fix the issue.

### Method 2: Manual Deployment

You can also deploy the application manually using the included script.

```bash
# Run the deployment script
./deploy-gh-pages.sh
```

This script:
1. Builds the Next.js application with the correct base path and asset prefix
2. Prepares the output for GitHub Pages
3. Deploys the application using the gh-pages npm package

### Method 3: Step-by-Step Manual Deployment

If you prefer to deploy manually without using the script:

```bash
# Build the application
NODE_ENV=production npm run build

# Prepare the output for GitHub Pages
touch dist/.nojekyll
cp public/github-index.html dist/index.html
cp public/404.html dist/404.html
cp public/gh-pages-router.js dist/gh-pages-router.js

# Deploy using gh-pages
npm run deploy
```

## Understanding the Configuration

### next.config.js

The Next.js configuration is set up for GitHub Pages deployment:

```javascript
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/emotevation' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/emotevation/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
};
```

- `output: 'export'`: Enables static HTML export
- `basePath`: Sets the base path for the application on GitHub Pages
- `assetPrefix`: Sets the asset prefix for the application on GitHub Pages
- `trailingSlash: true`: Ensures that all URLs have a trailing slash for better compatibility with GitHub Pages

### GitHub Pages Routing

GitHub Pages doesn't natively support client-side routing used by Single Page Applications (SPAs) like those built with Next.js. To work around this, we use:

1. **Custom 404.html**: Redirects all routes to the main index.html with the path in the query string
2. **gh-pages-router.js**: Parses the query string and updates the browser history to the correct route

## Troubleshooting

### Common Issues:

1. **Stuck on Loading Screen**: If you see a "Loading the Emotevation app..." message without redirecting, this indicates that the routing script isn't running properly:
   - Clear your browser cache completely
   - Check that all the routing files (`gh-pages-router.js`, `404.html`) are present in the deployed site
   - Verify that the paths to Next.js scripts in the HTML files are correct
   - Try directly accessing `https://[username].github.io/emotevation/` (with the trailing slash)

2. **Blank Page**: If you see a blank page after deployment, check the browser console for errors. This often indicates an issue with the base path or asset prefix.

3. **Missing Assets**: If assets (CSS, JavaScript) are not loading, check that the `assetPrefix` in `next.config.js` is set correctly.

4. **404 Errors on Routes**: Make sure the gh-pages-router.js is included and working correctly.

5. **GitHub Actions Failures**: Check the workflow logs in the "Actions" tab of your GitHub repository.

6. **Dependency Conflicts**: If you encounter errors like `npm error code ERESOLVE` or conflicts with ESLint:
   - Try running `npm run reinstall` to fix dependency issues
   - For ESLint conflicts, ensure you're using version 8.x with `npm install eslint@8.57.0 --save-dev`
   - Use `npm install --legacy-peer-deps` only as a last resort as it may lead to incompatible packages
   - Check that your package-lock.json is up-to-date with `npm install --package-lock-only`

## Recent Improvements

We've made several improvements to the GitHub Pages deployment:

1. **Enhanced HTML file generation**: The `scripts/fix-html-paths.js` script now dynamically finds and includes the correct Next.js script paths in the HTML files.

2. **Better loading experience**: Added a styled loading spinner while the app is initializing.

3. **Improved error handling**: Special 404 handling for the `/emotevation/` path to ensure better client-side routing.

4. **Optimized deployment script**: The `deploy-gh-pages.sh` script now uses the locally installed gh-pages package instead of requiring global installation.

## Additional Resources

- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [SPA GitHub Pages](https://github.com/rafgraph/spa-github-pages): The routing solution we're using
