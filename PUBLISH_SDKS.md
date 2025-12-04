# Publishing SDI SDKs

This guide explains how to publish all SDI SDKs to their respective package repositories.

## Prerequisites

1. **NPM** (for Node.js):
   ```bash
   npm login
   # Enter your npmjs.com credentials
   ```

2. **PyPI** (for Python):
   ```bash
   pip install twine build
   # Create account at https://pypi.org
   ```

3. **Maven** (for Java):
   - Already configured in `sdi-core/pom.xml`
   - Use JitPack (easiest) or GitHub Packages

4. **Go Modules** (for Go):
   - Already configured in `sdk/go/go.mod`
   - Just push to GitHub, Go will fetch automatically

## Publishing Steps

### 1. Node.js (npm)

```bash
cd sdk/nodejs

# Set NPM token (get from npmjs.com)
export NPM_TOKEN=your-npm-token

# Build and test
npm test
npm run build

# Publish
npm publish --access public
```

**After publishing:**
```bash
npm install sdi-nodejs  # Works!
```

### 2. Python (PyPI)

```bash
cd sdk/python

# Build package
python3 -m build

# Upload to PyPI (test first)
python3 -m twine upload --repository testpypi dist/*

# If test works, upload to real PyPI
python3 -m twine upload dist/*
```

**After publishing:**
```bash
pip install sdi-python  # Works!
```

### 3. Java (Maven)

#### Option A: JitPack (Easiest - Recommended)

1. Push code to GitHub
2. Create release tag: `git tag v1.0.0 && git push origin v1.0.0`
3. JitPack automatically builds it
4. Add to `pom.xml`:
```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>

<dependency>
    <groupId>com.github.skesani</groupId>
    <artifactId>sdi</artifactId>
    <version>sdi-core-1.0.0</version>
</dependency>
```

#### Option B: GitHub Packages

```bash
cd sdi-core

# Set GitHub token
export GITHUB_TOKEN=your-github-token

# Deploy
mvn clean deploy
```

**After publishing:**
```xml
<dependency>
    <groupId>com.sdi</groupId>
    <artifactId>sdi-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

### 4. Go Modules

```bash
cd sdk/go

# Just push to GitHub!
git add .
git commit -m "Release Go SDK v1.0.0"
git tag v1.0.0
git push origin main --tags
```

**After publishing:**
```bash
go get github.com/skesani/sdi-go@v1.0.0  # Works!
```

## Quick Publish Script

Run this script to publish all SDKs:

```bash
#!/bin/bash
# publish-all.sh

set -e

echo "🚀 Publishing all SDI SDKs..."

# Node.js
echo "📦 Publishing Node.js SDK..."
cd sdk/nodejs
npm publish --access public
cd ../..

# Python
echo "🐍 Publishing Python SDK..."
cd sdk/python
python3 -m build
python3 -m twine upload dist/*
cd ../..

# Go (just tag and push)
echo "🐹 Publishing Go SDK..."
cd sdk/go
git tag sdi-go-v1.0.0
git push origin sdi-go-v1.0.0
cd ../..

# Java (JitPack - just tag)
echo "☕ Publishing Java SDK..."
git tag sdi-java-v1.0.0
git push origin sdi-java-v1.0.0

echo "✅ All SDKs published!"
```

## Verification

After publishing, verify each SDK:

```bash
# Node.js
npm install sdi-nodejs
node -e "const sdi = require('sdi-nodejs'); console.log('OK')"

# Python
pip install sdi-python
python3 -c "import sdi; print('OK')"

# Go
go get github.com/skesani/sdi-go
go run -e "import 'github.com/skesani/sdi-go'; println('OK')"

# Java
# Add to test project and verify dependency resolves
```

## Troubleshooting

### NPM: Package name taken?
- Try: `sdi-nodejs-sdk` or `@yourorg/sdi-nodejs`

### PyPI: Package name taken?
- Try: `sdi-python-sdk` or `sdi-cybersecurity`

### Maven: Authentication failed?
- Check `~/.m2/settings.xml` for credentials
- For GitHub Packages, use GitHub token

### Go: Module not found?
- Ensure `go.mod` has correct module path
- Push tags to GitHub
- Wait a few minutes for Go proxy to sync

## Next Steps

1. Update documentation with actual package names
2. Add badges to README showing version
3. Set up CI/CD to auto-publish on tags
4. Create release notes for each SDK

