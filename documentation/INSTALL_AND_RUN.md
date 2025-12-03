# Install and Run Stripe-Style Documentation

## Quick Setup

The DocuAPI theme (which matches Stripe's documentation style exactly) requires Go for Hugo modules.

### Step 1: Install Go

**macOS:**
```bash
brew install go
```

**Or download from:** https://go.dev/dl/

### Step 2: Initialize Hugo Modules

```bash
cd documentation
hugo mod init github.com/yourusername/sdi-docs
hugo mod get github.com/bep/docuapi/v2
hugo mod tidy
```

### Step 3: Start Server

```bash
hugo server
```

Visit: http://localhost:1313

## Alternative: Use Without Go

If you can't install Go, you can:

1. **Use Netlify/Vercel** - They handle modules automatically
2. **Build on another machine** with Go, then serve the `public/` folder
3. **Use Docker** with Go pre-installed

## What You'll Get

✅ **Exact Stripe-style design** - Three-panel layout
✅ **Dark/Light theme toggle** - Already configured
✅ **Code examples** - With language tabs
✅ **Search functionality** - Built-in search
✅ **Responsive** - Works on all devices

## Current Status

- ✅ Theme: DocuAPI (Stripe-inspired)
- ✅ Content: API reference pages created
- ✅ Config: Stripe-style configuration ready
- ⏳ **Need**: Go installed for modules

Once Go is installed, everything will work perfectly!

