# Dark/Light Theme Toggle Setup

Your Hugo documentation site now includes a dark/light theme toggle that matches Stripe's documentation style.

## Features

✅ **Dark Mode** - Professional dark theme with blue accents
✅ **Light Mode** - Clean light theme matching Stripe's style  
✅ **Persistent Preference** - Theme choice saved in localStorage
✅ **Smooth Transitions** - Animated theme switching
✅ **Universal Compatibility** - Works with any Hugo theme

## Files Created

- `static/css/theme-toggle.css` - Theme styles
- `static/js/theme-toggle.js` - Theme toggle functionality
- `layouts/partials/theme-toggle.html` - Toggle button HTML
- `layouts/partials/head-custom.html` - CSS injection point
- `layouts/partials/footer-custom.html` - JS injection point

## How It Works

1. **Theme Toggle Button**: Fixed position button in top-right corner
2. **Icon Changes**: Moon icon in light mode, sun icon in dark mode
3. **CSS Variables**: Uses CSS custom properties for easy theming
4. **localStorage**: Saves user preference across sessions
5. **Dynamic Styling**: JavaScript applies theme colors to all elements

## Customization

To customize colors, edit `static/css/theme-toggle.css`:

```css
[data-theme="dark"] {
  --bg-color: #0a2540;        /* Background */
  --text-color: #ffffff;      /* Text */
  --link-color: #7c3aed;      /* Links */
  /* ... more variables */
}
```

## Testing

1. Start Hugo server: `hugo server`
2. Visit: http://localhost:1313
3. Click the theme toggle button (top-right)
4. Theme should switch smoothly
5. Refresh page - preference should persist

## Browser Support

Works in all modern browsers that support:
- CSS Custom Properties (CSS Variables)
- localStorage API
- ES6 JavaScript

