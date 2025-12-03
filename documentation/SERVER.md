# Running Hugo Server

## Quick Start

```bash
cd documentation
hugo server
```

## Server Options

### Basic
```bash
hugo server
```
- Runs on `http://localhost:1313`
- Auto-reloads on file changes

### With Custom Port
```bash
hugo server --port 8080
```

### Accessible from Network
```bash
hugo server --bind 0.0.0.0
```

### Disable Fast Render (for theme changes)
```bash
hugo server --disableFastRender
```

## Current Configuration

The server is configured to run with:
- **Port**: 1313
- **Bind**: 0.0.0.0 (accessible from network)
- **Theme**: Docsy with custom dark/light toggle
- **Auto-reload**: Enabled

## Accessing the Site

Once running, visit:
- **Local**: http://localhost:1313
- **Network**: http://YOUR_IP:1313

## Features Available

✅ **Dark/Light Theme Toggle** - Click button in top-right corner
✅ **API Documentation** - Stripe-style API reference
✅ **Responsive Design** - Works on mobile and desktop
✅ **Live Reload** - Changes update automatically

## Stopping the Server

Press `Ctrl+C` in the terminal, or:
```bash
pkill -f "hugo server"
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 1313
lsof -i :1313

# Kill it
kill -9 <PID>
```

### Theme Not Loading
```bash
# Rebuild with clean cache
hugo server --disableFastRender --noHTTPCache
```

### Changes Not Showing
- Check browser cache (hard refresh: Cmd+Shift+R / Ctrl+Shift+R)
- Restart server with `--disableFastRender`

