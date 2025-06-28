# 🚀 GitHub Pages Deployment Guide

## Quick Setup

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 2. Push to Main Branch
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 3. Check Deployment
- Go to **Actions** tab in your repository
- You should see the "Deploy to GitHub Pages" workflow running
- Once completed, your site will be available at: `https://yourusername.github.io/gradienter/`

## Troubleshooting

### Common Issues

#### ❌ Workflow Not Running
**Problem**: No workflow appears in Actions tab
**Solution**:
- Ensure `.github/workflows/deploy.yml` exists in your repository
- Check that you pushed to the `main` branch
- Verify the workflow file syntax is correct

#### ❌ Build Fails
**Problem**: Build step fails in Actions
**Solution**:
- Check that `package.json` has all required dependencies
- Ensure `next.config.ts` has `output: 'export'`
- Verify build works locally with `npm run build`

#### ❌ Pages Not Enabled
**Problem**: No Pages option in repository settings
**Solution**:
- Repository must be public (or GitHub Pro/Team for private repos)
- Go to Settings > Pages and select "GitHub Actions" as source

#### ❌ 404 Error on Deployed Site
**Problem**: Site shows 404 error
**Solution**:
- Ensure the workflow completed successfully
- Check that `./out` directory was uploaded as artifact
- Verify GitHub Pages is enabled in repository settings

### Manual Deployment

If GitHub Actions isn't working, you can deploy manually:

```bash
# Build the application
npm run build

# The static files will be in 'out' directory
# You can upload these files to any static hosting service
```

### Local Testing

Test the built application locally:

```bash
# Build the application
npm run build

# Serve the out directory (using any static server)
npx serve out
```

## Configuration Files

### Required Files
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `next.config.ts` - Next.js configuration with `output: 'export'`
- `package.json` - Build scripts and dependencies

### GitHub Actions Workflow
The workflow handles:
- ✅ Installing Node.js and dependencies
- ✅ Building the Next.js application
- ✅ Creating static export
- ✅ Deploying to GitHub Pages

## Support

If you're still having issues:
1. Check the Actions logs for detailed error messages
2. Ensure your repository is public or has GitHub Pages enabled
3. Verify all configuration files are present and correct
4. Try running `npm run build` locally to test the build process

---

**Need help?** Open an issue in the repository with your error details and Actions logs.
