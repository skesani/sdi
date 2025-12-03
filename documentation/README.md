# SDI Documentation - Stripe-Style API Docs

Your documentation site has been restructured to match Stripe's API documentation style using the DocuAPI theme.

## Structure

```
documentation/
├── content/
│   ├── _index.md          # Homepage
│   ├── api/                # API Reference (Stripe-style)
│   │   ├── introduction.md
│   │   ├── authentication.md
│   │   ├── errors.md
│   │   └── core-resources.md
│   └── docs/               # Other documentation
├── themes/
│   └── docuapi/           # Stripe-inspired theme
└── hugo.toml              # Configuration
```

## Features

✅ **Stripe-style layout** - Three-panel design with sidebar navigation
✅ **Code examples** - Syntax-highlighted code blocks
✅ **API reference** - Complete endpoint documentation
✅ **Error handling** - Detailed error documentation
✅ **Authentication** - API key documentation

## Running the Site

```bash
cd documentation
hugo server
```

Visit: http://localhost:1313

## Theme

Using **DocuAPI** theme - specifically designed to match Stripe's API documentation style.

## Content Organization

The API documentation follows Stripe's structure:
- **Introduction** - Overview and quick start
- **Authentication** - API keys and tokens
- **Errors** - Error handling and codes
- **Core Resources** - Main API endpoints

All content is in Markdown with front matter for proper organization.
