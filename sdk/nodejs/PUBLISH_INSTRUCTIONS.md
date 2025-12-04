# Publishing sdi-nodejs to npm

## Step 1: Login to npm

```bash
npm login
```

You'll be prompted for:
- **Username**: Your npmjs.com username
- **Password**: Your npmjs.com password  
- **Email**: Your npmjs.com email
- **OTP**: One-time password (if 2FA is enabled)

### Don't have an npm account?

1. Go to: https://www.npmjs.com/signup
2. Create a free account
3. Verify your email
4. Then run `npm login`

## Step 2: Verify Login

```bash
npm whoami
```

Should show your username.

## Step 3: Publish

```bash
npm publish --access public
```

## Step 4: Verify Published Package

```bash
npm view sdi-nodejs
```

Or visit: https://www.npmjs.com/package/sdi-nodejs

## Troubleshooting

### "Access token expired"
- Run `npm login` again to refresh token

### "Package name already taken"
- The name `sdi-nodejs` is available (we checked)
- If it becomes unavailable, use: `@yourusername/sdi-nodejs`

### "2FA Required"
- Enable 2FA at: https://www.npmjs.com/settings/yourusername/auth
- Use OTP when prompted during `npm login`

### "Permission denied"
- Make sure you're logged in: `npm whoami`
- Check you own the package name (or it's available)

## After Publishing

Users can install with:
```bash
npm install sdi-nodejs
```

