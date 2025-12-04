# Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   cd docs
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features Enabled

✅ **Math Rendering (KaTeX)**
- Inline math: `$E = mc^2$`
- Block math: `$$\sum_{i=1}^{n} x_i$$`

✅ **Diagrams (Mermaid.js)**
- Use code blocks with `mermaid` language:
  ````markdown
  ```mermaid
  graph TB
      A[Start] --> B[End]
  ```
  ````

✅ **Code Highlighting**
- Automatic syntax highlighting for all code blocks
- GitHub-style theme

✅ **Search**
- Built-in full-text search
- Search across all documentation pages

✅ **Dark Mode**
- Automatic theme switching
- Respects system preferences

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Next.js and deploy

### Other Platforms

The site can be deployed to any platform supporting Next.js:
- **Netlify**: Connect GitHub repo, build command: `npm run build`, publish directory: `.next`
- **AWS Amplify**: Connect GitHub repo, build settings auto-detected
- **Docker**: Use the included Dockerfile (if created)

## Customization

### Theme Colors

Edit `theme.config.tsx`:
```tsx
primaryHue: 220, // Change for different color scheme
primarySaturation: 100,
```

### Custom Styles

Edit `styles/custom.css` for additional styling.

### Navigation

Edit `pages/_meta.json` to customize sidebar navigation.

## Troubleshooting

### Mermaid diagrams not rendering

1. Ensure `mermaid` package is installed: `npm install mermaid`
2. Check browser console for errors
3. Verify the code block uses `mermaid` language identifier

### Math equations not rendering

1. Ensure `katex` and `rehype-katex` are installed
2. Check that equations use proper `$` or `$$` delimiters
3. Verify `remark-math` is in `next.config.js`

### Build errors

1. Clear `.next` directory: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Node.js version (requires Node.js 18+)

