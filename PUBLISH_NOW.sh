#!/bin/bash
# Publish all SDKs NOW - Interactive guide

set -e

echo "🚀 SDI SDK Publishing Guide"
echo "=========================="
echo ""

# Check if logged into npm
echo "📦 Step 1: Publishing Node.js SDK to npm"
echo "----------------------------------------"
if npm whoami &>/dev/null; then
    echo "✅ Logged into npm as: $(npm whoami)"
    read -p "Publish Node.js SDK now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cd sdk/nodejs
        npm publish --access public
        echo "✅ Node.js SDK published!"
        cd ../..
    fi
else
    echo "⚠️  Not logged into npm"
    echo "Run: npm login"
    echo "Then: cd sdk/nodejs && npm publish --access public"
fi

echo ""
echo "🐍 Step 2: Publishing Python SDK to PyPI"
echo "----------------------------------------"
if command -v twine &> /dev/null; then
    echo "✅ twine installed"
    cd sdk/python
    
    if [ ! -d "dist" ] || [ -z "$(ls -A dist/*.whl 2>/dev/null)" ]; then
        echo "Building Python package..."
        python3 -m build
    fi
    
    echo "Ready to upload. You'll need PyPI credentials."
    read -p "Upload to PyPI now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        python3 -m twine upload dist/*
        echo "✅ Python SDK published!"
    fi
    cd ../..
else
    echo "⚠️  twine not installed"
    echo "Run: pip install build twine"
    echo "Then: cd sdk/python && python3 -m build && python3 -m twine upload dist/*"
fi

echo ""
echo "🐹 Step 3: Publishing Go SDK (GitHub)"
echo "----------------------------------------"
read -p "Create and push Go SDK tag? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if git rev-parse "sdi-go-v1.0.0" >/dev/null 2>&1; then
        echo "⚠️  Tag sdi-go-v1.0.0 already exists"
    else
        git tag sdi-go-v1.0.0
        echo "✅ Tag created. Push with: git push origin sdi-go-v1.0.0"
    fi
fi

echo ""
echo "☕ Step 4: Publishing Java SDK (JitPack)"
echo "----------------------------------------"
read -p "Create and push Java SDK tag? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if git rev-parse "sdi-java-v1.0.0" >/dev/null 2>&1; then
        echo "⚠️  Tag sdi-java-v1.0.0 already exists"
    else
        git tag sdi-java-v1.0.0
        echo "✅ Tag created. Push with: git push origin sdi-java-v1.0.0"
        echo "JitPack will auto-build at: https://jitpack.io/#skesani/sdi"
    fi
fi

echo ""
echo "✅ Publishing guide complete!"
echo ""
echo "Next: Push tags to GitHub:"
echo "  git push origin --tags"

