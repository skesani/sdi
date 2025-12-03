# Publishing SDI to Maven Repository

## Options for Publishing

### Option 1: GitHub Packages (Recommended for Research) ⭐

**Easiest and fastest** - Works directly with your GitHub repository.

#### Setup Steps:

1. **Add GitHub Packages configuration to `pom.xml`**:

```xml
<distributionManagement>
   <repository>
     <id>github</id>
     <name>GitHub Packages</name>
     <url>https://maven.pkg.github.com/YOUR_USERNAME/sdi</url>
   </repository>
</distributionManagement>
```

2. **Create GitHub Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Create token with `write:packages` permission

3. **Configure Maven `settings.xml`** (`~/.m2/settings.xml`):

```xml
<settings>
  <servers>
    <server>
      <id>github</id>
      <username>YOUR_USERNAME</username>
      <password>YOUR_GITHUB_TOKEN</password>
    </server>
  </servers>
</settings>
```

4. **Deploy**:
```bash
cd sdi-core
mvn clean deploy
```

5. **Use in projects**:
```xml
<repositories>
  <repository>
    <id>github</id>
    <url>https://maven.pkg.github.com/YOUR_USERNAME/sdi</url>
  </repository>
</repositories>

<dependency>
  <groupId>com.sdi</groupId>
  <artifactId>sdi-spring-boot-starter</artifactId>
  <version>1.0.0</version>
</dependency>
```

**Pros**: Free, easy setup, works with GitHub
**Cons**: Requires GitHub account, token management

---

### Option 2: JitPack (Easiest) 🚀

**No configuration needed** - Just push to GitHub!

#### Steps:

1. **Push code to GitHub** (if not already)
2. **Create a release tag**:
```bash
git tag v1.0.0
git push origin v1.0.0
```

3. **Use in projects**:
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

**Pros**: Zero configuration, automatic builds
**Cons**: Slightly different dependency coordinates

---

### Option 3: Maven Central (Most Professional) 🏆

**Standard repository** - Most professional but requires setup.

#### Requirements:
- Sonatype OSSRH account
- GPG signing
- Domain verification (or use GitHub.io)
- Proper project metadata

#### Setup Steps:

1. **Create Sonatype account**: https://issues.sonatype.org/
2. **Create JIRA ticket** for groupId approval
3. **Setup GPG signing**
4. **Configure `pom.xml`** with:
   - SCM information
   - Developer information
   - License information
   - Distribution management

5. **Deploy**:
```bash
mvn clean deploy -P release
```

**Pros**: Standard repository, professional
**Cons**: Complex setup, requires approval process

---

## Recommendation for Research Publication

For your research project, I recommend **GitHub Packages** or **JitPack**:

- ✅ **GitHub Packages**: Best if you want control and GitHub integration
- ✅ **JitPack**: Best if you want zero configuration

Both are free and perfect for research publications!

## Quick Start: JitPack (Recommended)

1. Push your code to GitHub
2. Create release tag
3. Users can add JitPack repository and use your dependency

No Maven configuration needed on your side!

