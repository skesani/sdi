# Setting Up Stripe-Style Documentation

## Current Issue

DocuAPI theme (which matches Stripe's style) requires Hugo modules and Go, which may not be available.

## Solution Options

### Option 1: Install Go (Recommended)

DocuAPI requires Go for Hugo modules. Install Go:

```bash
# macOS
brew install go

# Then initialize modules
cd documentation
hugo mod init github.com/yourusername/sdi-docs
hugo mod get github.com/bep/docuapi/v2
hugo mod tidy
hugo server
```

### Option 2: Use Pre-built Static Site

Build the site once with modules, then serve statically:

```bash
# On a machine with Go
hugo --minify
# Then serve the public/ directory with any web server
```

### Option 3: Use Netlify/Vercel

These platforms handle Hugo modules automatically:

1. Push to GitHub
2. Connect to Netlify/Vercel
3. They'll build with modules automatically

## Current Configuration

The `hugo.toml` is configured for DocuAPI theme which matches Stripe's style exactly. Once modules are set up, it will work perfectly.

## Quick Test

Try running:
```bash
cd documentation
hugo server
```

If you see module errors, install Go and run the module commands above.

