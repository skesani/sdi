# Quick Publish Guide - Publish SDKs NOW

## Prerequisites (5 minutes)

### 1. NPM Account
```bash
npm login
# Enter your npmjs.com credentials
# If you don't have an account: https://www.npmjs.com/signup
```

### 2. PyPI Account  
```bash
pip install twine build
# Create account at: https://pypi.org/account/register/
```

### 3. GitHub (for Go & Java)
- Already have it! Just need to push tags

## Publish NOW (Copy-Paste These Commands)

### Node.js (npm) - 2 minutes

```bash
cd sdk/nodejs

# Login to npm (if not already)
npm login

# Publish!
npm publish --access public

# Verify
npm view sdi-nodejs
```

**After publishing, users can:**
```bash
npm install sdi-nodejs
```

### Python (PyPI) - 3 minutes

```bash
cd sdk/python

# Install build tools
pip install build twine

# Build package
python3 -m build

# Upload to PyPI
python3 -m twine upload dist/*

# Enter your PyPI credentials when prompted
```

**After publishing, users can:**
```bash
pip install sdi-python
```

### Go (GitHub) - 1 minute

```bash
cd /Users/sasikesani/workspace/research

# Tag and push
git tag sdi-go-v1.0.0
git push origin sdi-go-v1.0.0
```

**After publishing, users can:**
```bash
go get github.com/skesani/sdi-go@v1.0.0
```

### Java (JitPack) - 1 minute

```bash
cd /Users/sasikesani/workspace/research

# Tag and push
git tag sdi-java-v1.0.0
git push origin sdi-java-v1.0.0
```

**JitPack will auto-build at:** https://jitpack.io/#skesani/sdi

**After publishing, users can:**
```xml
<dependency>
    <groupId>com.github.skesani</groupId>
    <artifactId>sdi</artifactId>
    <version>sdi-core-1.0.0</version>
</dependency>
```

## One-Command Publish (After Setup)

```bash
./publish-all-sdks.sh
```

## Verify Publishing

After publishing, test each SDK:

```bash
# Node.js
npm install sdi-nodejs
node -e "const sdi = require('sdi-nodejs'); console.log('✅ Node.js SDK works!')"

# Python
pip install sdi-python
python3 -c "import sdi; print('✅ Python SDK works!')"

# Go
go get github.com/skesani/sdi-go@v1.0.0
go run -e "import 'github.com/skesani/sdi-go'; println('✅ Go SDK works!')"
```

## Troubleshooting

### NPM: Package name taken?
- The name `sdi-nodejs` might be taken
- Try: `@yourusername/sdi-nodejs` or `sdi-nodejs-sdk`
- Update `package.json` name field

### PyPI: Package name taken?
- Try: `sdi-python-sdk` or `sdi-cybersecurity-python`
- Update `setup.py` name field

### Authentication Issues?
- NPM: `npm login` then `npm whoami` to verify
- PyPI: Create API token at https://pypi.org/manage/account/token/
- Use token: `python3 -m twine upload dist/* -u __token__ -p YOUR_TOKEN`

## Next Steps After Publishing

1. Update documentation with actual package names
2. Add badges to README showing version
3. Test installation from clean environment
4. Announce on social media/GitHub

