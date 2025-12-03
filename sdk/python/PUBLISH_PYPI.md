# Publishing Python SDK to PyPI

## Step 1: Get PyPI API Token

1. **Create PyPI account** (if you don't have one):
   - Go to: https://pypi.org/account/register/
   - Verify your email

2. **Get API token**:
   - Go to: https://pypi.org/manage/account/token/
   - Click **"Add API token"**
   - Token name: `sdi-python-upload`
   - Scope: Choose **"Entire account"** (or "Project: sdi-python" if you prefer)
   - Click **"Add token"**
   - **Copy the token** (starts with `pypi-`)
   - ⚠️ **Save it now** - you won't see it again!

## Step 2: Upload Package

### Option A: Interactive (Current Method)

When prompted for "Enter your API token:", paste your token:
```
pypi-AgEIcHlwaS5vcmcCJGYyY2U...
```

### Option B: Command Line (Recommended)

```bash
python3 -m twine upload dist/* -u __token__ -p pypi-YOUR_TOKEN_HERE
```

Replace `pypi-YOUR_TOKEN_HERE` with your actual token.

### Option C: Environment Variable

```bash
export TWINE_USERNAME=__token__
export TWINE_PASSWORD=pypi-YOUR_TOKEN_HERE
python3 -m twine upload dist/*
```

## Step 3: Verify

After upload, verify:

```bash
pip install sdi-python
python3 -c "import sdi; print('✅ SDK installed!')"
```

Or check: https://pypi.org/project/sdi-python/

## Troubleshooting

### "Invalid or non-existent authentication information"
- Token expired or incorrect
- Get a new token from: https://pypi.org/manage/account/token/

### "File already exists"
- Version 1.0.0 already published
- Update version in `setup.py` to `1.0.1`
- Rebuild: `python3 -m build`
- Upload again

### "Package name already taken"
- Try: `sdi-python-sdk` or `sdi-cybersecurity-python`
- Update `name` in `setup.py`

## Security Note

⚠️ **Never commit your PyPI token to git!**

If you accidentally commit it:
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch sdk/python/.pypirc" \
  --prune-empty --tag-name-filter cat -- --all
```

