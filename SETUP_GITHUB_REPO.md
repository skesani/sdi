# Setup GitHub Repository

## Issue
The repository `https://github.com/skesani/sdi.git` doesn't exist yet on GitHub.

## Solution

### Step 1: Create Repository on GitHub

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name**: `sdi`
   - **Description**: "Synthetic Digital Immunity - AI-powered cybersecurity for microservices"
   - **Visibility**: Public (recommended) or Private
   - **DO NOT** check "Initialize with README" (we already have files)
   - **DO NOT** add .gitignore or license (we have them)
3. Click **"Create repository"**

### Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
# Make sure you're in the research directory
cd /Users/sasikesani/workspace/research

# Push main branch
git push -u origin main

# Push all tags (for Go and Java SDKs)
git push origin --tags
```

### Step 3: Verify

Check your repository:
- https://github.com/skesani/sdi

## Alternative: Use Existing Repository

If you want to use a different repository name or organization:

```bash
# Update remote URL
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Then push
git push -u origin main
git push origin --tags
```

## After Repository is Set Up

Once the repository exists, you can:

1. **Publish Go SDK:**
   ```bash
   git tag sdi-go-v1.0.0
   git push origin sdi-go-v1.0.0
   ```

2. **Publish Java SDK (JitPack):**
   ```bash
   git tag sdi-java-v1.0.0
   git push origin sdi-java-v1.0.0
   ```
   Then JitPack will build it: https://jitpack.io/#skesani/sdi

3. **Update npm package.json** (if needed):
   ```bash
   cd sdk/nodejs
   # Update repository URL in package.json if different
   ```

## Troubleshooting

### "Repository not found"
- Repository doesn't exist - create it on GitHub first
- Wrong URL - check with `git remote -v`
- No access - ensure you're logged into GitHub

### "Permission denied"
- Check GitHub authentication: `gh auth status` (if using GitHub CLI)
- Or use SSH: `git remote set-url origin git@github.com:skesani/sdi.git`

### "Tag already exists locally"
```bash
# Delete local tag
git tag -d sdi-go-v1.0.0

# Recreate
git tag sdi-go-v1.0.0
git push origin sdi-go-v1.0.0
```

