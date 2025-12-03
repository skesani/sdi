#!/bin/bash
# Simple script to start Hugo server

cd "$(dirname "$0")"

echo "🚀 Starting Hugo server..."
echo ""
echo "📝 Server will be available at:"
echo "   http://localhost:1313"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Kill any existing Hugo servers
pkill -f "hugo server" 2>/dev/null
sleep 1

# Start Hugo server
hugo server --bind 127.0.0.1 --port 1313

