# Publishing SDI to Maven Repository

## Quick Answer

**Yes, for research publication, you should publish it!** But you have options:

## 🎯 Recommended: JitPack (Easiest)

**Zero configuration** - Just push to GitHub and tag a release!

### Steps:

1. **Push code to GitHub**:
```bash
git init
git add .
git commit -m "SDI v1.0.0 - Research Publication"
git remote add origin https://github.com/YOUR_USERNAME/sdi.git
git push -u origin main
```

2. **Create release tag**:
```bash
git tag v1.0.0
git push origin v1.0.0
```

3. **Users can use it**:
```xml
<repositories>
  <repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
  </repository>
</repositories>

<dependency>
  <groupId>com.github.YOUR_USERNAME</groupId>
  <artifactId>sdi</artifactId>
  <version>sdi-core-1.0.0</version>
</dependency>
```

**That's it!** JitPack automatically builds and serves your Maven artifact.

---

## Alternative: GitHub Packages

If you want more control:

1. **Update `pom.xml`** with GitHub Packages config (see `pom.xml.github` template)
2. **Create GitHub token** with `write:packages` permission
3. **Configure Maven** `settings.xml` with token
4. **Deploy**: `mvn clean deploy`

---

## For Research Paper

**Recommendation**: Use **JitPack** because:
- ✅ No setup required
- ✅ Works immediately after GitHub push
- ✅ Free
- ✅ Perfect for research artifacts
- ✅ Easy for reviewers to use

Just add to your paper:
> "The SDI library is available at: https://github.com/YOUR_USERNAME/sdi"
> "Users can add JitPack repository and use dependency: com.github.YOUR_USERNAME:sdi:sdi-core-1.0.0"

---

## Current Status

- ✅ **Built**: JAR exists locally
- ✅ **Installed**: Available in local Maven repo
- ⏳ **Published**: Not yet (choose method above)

## Next Steps

1. **For quick publication**: Use JitPack (just push to GitHub)
2. **For professional**: Setup GitHub Packages or Maven Central
3. **For research**: JitPack is perfect - zero config!

Would you like me to help you set up JitPack or GitHub Packages?

