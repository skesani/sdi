# Quick Start - Running Hugo Server

## The Issue

If you're getting "connection refused", the Hugo server isn't running. Here's how to start it:

## Method 1: Use the Startup Script

```bash
cd documentation
./start-server.sh
```

## Method 2: Manual Start

```bash
cd documentation
hugo server
```

The server will start on **http://localhost:1313**

## Method 3: With Specific Port

```bash
cd documentation
hugo server --port 1313 --bind 127.0.0.1
```

## Troubleshooting

### Port Already in Use
```bash
# Find what's using port 1313
lsof -i :1313

# Kill it
kill -9 <PID>
```

### Theme Errors
If you see module errors, try:
```bash
# Remove theme temporarily
# Edit hugo.toml and comment out: theme = '...'

# Or use a simpler theme
hugo server --theme PaperMod
```

### Check if Server is Running
```bash
curl http://localhost:1313
# Should return HTML content
```

## What You Should See

When the server starts successfully, you'll see:
```
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
```

Then open **http://localhost:1313** in your browser!

