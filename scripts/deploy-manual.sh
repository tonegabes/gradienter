#!/bin/bash

# Manual deployment script for Gradienter to GitHub Pages
# Use this script if GitHub Actions deployment is not working

set -e  # Exit on any error

echo "🚀 Starting manual deployment to GitHub Pages..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed or not in PATH."
    exit 1
fi

# Check if we're on the main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: You're not on the main branch (current: $CURRENT_BRANCH)"
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled."
        exit 1
    fi
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes."
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled. Please commit your changes first."
        exit 1
    fi
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --prefer-offline --no-audit

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build the application
echo "🏗️  Building application..."
npm run build

# Verify build output
if [ ! -d "out" ]; then
    echo "❌ Error: Build output directory 'out' not found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build output:"
ls -la out/

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📋 gh-pages branch already exists"
else
    echo "🌿 Creating gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
    git commit --allow-empty -m "Initial gh-pages commit"
    git checkout main
fi

# Deploy to gh-pages branch
echo "🚀 Deploying to gh-pages branch..."

# Save current branch
ORIGINAL_BRANCH=$(git branch --show-current)

# Create a temporary directory for deployment
TEMP_DIR=$(mktemp -d)
cp -r out/* "$TEMP_DIR/"

# Switch to gh-pages branch
git checkout gh-pages

# Remove old files (except .git)
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} +

# Copy new files
cp -r "$TEMP_DIR"/* .

# Create .nojekyll file to bypass Jekyll processing
touch .nojekyll

# Add CNAME file if needed (uncomment and modify if you have a custom domain)
# echo "your-domain.com" > CNAME

# Commit and push
git add -A
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

echo "📤 Pushing to GitHub..."
git push origin gh-pages

# Switch back to original branch
git checkout "$ORIGINAL_BRANCH"

# Clean up
rm -rf "$TEMP_DIR"

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be available at: https://$(git config user.name).github.io/$(basename $(git rev-parse --show-toplevel))/"
echo "⏳ Note: It may take a few minutes for changes to appear on GitHub Pages."

# Optional: Open the site in browser (uncomment if desired)
# if command -v open &> /dev/null; then
#     open "https://$(git config user.name).github.io/$(basename $(git rev-parse --show-toplevel))/"
# elif command -v xdg-open &> /dev/null; then
#     xdg-open "https://$(git config user.name).github.io/$(basename $(git rev-parse --show-toplevel))/"
# fi
