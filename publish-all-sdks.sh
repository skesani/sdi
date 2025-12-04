#!/bin/bash
# Publish all SDI SDKs to their respective repositories

set -e

echo "🚀 Publishing all SDI SDKs..."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ $1 not found. Please install it first.${NC}"
        exit 1
    fi
}

echo "Checking prerequisites..."
check_command npm
check_command python3
check_command git

# Node.js SDK
echo -e "\n${YELLOW}📦 Publishing Node.js SDK...${NC}"
cd sdk/nodejs

if [ -z "$NPM_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  NPM_TOKEN not set. Run: npm login${NC}"
    echo "Skipping npm publish. Run manually: cd sdk/nodejs && npm publish --access public"
else
    npm publish --access public
    echo -e "${GREEN}✅ Node.js SDK published!${NC}"
fi

cd ../..

# Python SDK
echo -e "\n${YELLOW}🐍 Publishing Python SDK...${NC}"
cd sdk/python

if ! python3 -c "import build" 2>/dev/null; then
    echo "Installing build tools..."
    pip3 install build twine
fi

python3 -m build

if [ -z "$PYPI_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  PYPI_TOKEN not set.${NC}"
    echo "Skipping PyPI upload. Run manually:"
    echo "  cd sdk/python"
    echo "  python3 -m twine upload dist/*"
else
    python3 -m twine upload dist/* --username __token__ --password $PYPI_TOKEN
    echo -e "${GREEN}✅ Python SDK published!${NC}"
fi

cd ../..

# Go SDK (just tag and push)
echo -e "\n${YELLOW}🐹 Publishing Go SDK...${NC}"
cd sdk/go

# Check if tag exists
if git rev-parse "sdi-go-v1.0.0" >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Tag sdi-go-v1.0.0 already exists${NC}"
else
    git add .
    git commit -m "Release Go SDK v1.0.0" || true
    git tag sdi-go-v1.0.0
    echo -e "${GREEN}✅ Go SDK tagged! Push with: git push origin sdi-go-v1.0.0${NC}"
fi

cd ../..

# Java SDK (JitPack - just tag)
echo -e "\n${YELLOW}☕ Publishing Java SDK (JitPack)...${NC}"

if git rev-parse "sdi-java-v1.0.0" >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Tag sdi-java-v1.0.0 already exists${NC}"
else
    git tag sdi-java-v1.0.0
    echo -e "${GREEN}✅ Java SDK tagged! Push with: git push origin sdi-java-v1.0.0${NC}"
    echo "JitPack will automatically build it at: https://jitpack.io/#skesani/sdi"
fi

echo -e "\n${GREEN}✅ Publishing process complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Push tags: git push origin --tags"
echo "2. Verify packages:"
echo "   - npm: npm install sdi-nodejs"
echo "   - pip: pip install sdi-python"
echo "   - go: go get github.com/skesani/sdi-go@v1.0.0"
echo "   - maven: Add JitPack repo and dependency"

