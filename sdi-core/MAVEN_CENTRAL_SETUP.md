# Maven Central Publication Setup Guide

## Prerequisites

1. **Sonatype OSSRH Account**
   - Create account at: https://issues.sonatype.org/
   - Username: Your Sonatype username
   - Password: Your Sonatype password

2. **GPG Key** (for signing artifacts)
   - Install GPG: `brew install gnupg` (macOS) or `apt-get install gnupg` (Linux)
   - Generate key: `gpg --gen-key`
   - Export public key: `gpg --keyserver keyserver.ubuntu.com --send-keys YOUR_KEY_ID`
   - Verify: `gpg --keyserver keyserver.ubuntu.com --recv-keys YOUR_KEY_ID`

3. **GroupId Verification**
   - The groupId `com.sdi` needs to be verified
   - You'll need to create a JIRA ticket at: https://issues.sonatype.org/
   - Request: "Create repository for com.sdi"

## Step 1: Create Sonatype JIRA Ticket

1. Go to: https://issues.sonatype.org/
2. Create new ticket:
   - **Project**: OSSRH
   - **Issue Type**: New Project
   - **Summary**: Create repository for com.sdi
   - **Group Id**: com.sdi
   - **Project URL**: https://github.com/skesani/sdi
   - **SCM URL**: https://github.com/skesani/sdi.git
   - **Description**: Synthetic Digital Immunity (SDI) - AI-powered cybersecurity for microservices

3. Wait for approval (usually 1-2 business days)

## Step 2: Configure Maven Settings

Create/update `~/.m2/settings.xml`:

```xml
<settings>
  <servers>
    <server>
      <id>ossrh</id>
      <username>YOUR_SONATYPE_USERNAME</username>
      <password>YOUR_SONATYPE_PASSWORD</password>
    </server>
  </servers>
  
  <profiles>
    <profile>
      <id>ossrh</id>
      <activation>
        <activeByDefault>true</activeByDefault>
      </activation>
      <properties>
        <gpg.executable>gpg</gpg.executable>
        <gpg.passphrase>YOUR_GPG_PASSPHRASE</gpg.passphrase>
      </properties>
    </profile>
  </profiles>
</settings>
```

**Security Note**: For production, use Maven password encryption instead of plain text passwords.

## Step 3: Update Developer Information

Edit `pom.xml` and update the `<developers>` section with your actual information:

```xml
<developers>
    <developer>
        <name>Your Name</name>
        <email>your.email@example.com</email>
        <organization>Your Organization</organization>
        <organizationUrl>https://yourwebsite.com</organizationUrl>
    </developer>
</developers>
```

## Step 4: Build and Deploy

### For Snapshot Releases (1.0.0-SNAPSHOT):

```bash
cd sdi-core
mvn clean deploy
```

### For Release Versions (1.0.0):

```bash
cd sdi-core

# Remove -SNAPSHOT from version in pom.xml (if present)
# Update version to 1.0.0

# Build, sign, and deploy
mvn clean deploy -P release

# After successful deployment, create a git tag
git tag v1.0.0
git push origin v1.0.0
```

## Step 5: Release to Maven Central

After deploying, you need to release the staging repository:

### Option A: Using Maven Central Portal (Recommended)

1. Go to: https://s01.oss.sonatype.org/
2. Login with your Sonatype credentials
3. Navigate to "Staging Repositories"
4. Find your repository (should be `comsdi-xxxx`)
5. Select it and click "Close"
6. Wait for validation (check "Activity" tab)
7. Once validated, click "Release"
8. Confirm the release

### Option B: Using Maven Plugin (Automatic)

The `central-publishing-maven-plugin` in `pom.xml` should auto-release, but you can verify:

```bash
mvn central-publish:publish
```

## Step 6: Verify Publication

After release (usually takes 10-30 minutes):

1. Check Maven Central: https://repo1.maven.org/maven2/com/sdi/sdi-spring-boot-starter/
2. Search: https://search.maven.org/search?q=g:com.sdi

## Step 7: Update Documentation

Once published, update your README.md:

```markdown
## Published SDKs

- ✅ **Node.js**: [npm - sdi-nodejs](https://www.npmjs.com/package/sdi-nodejs)
- ⏳ **Python**: Ready to publish to PyPI
- ✅ **Java**: [Maven Central](https://search.maven.org/artifact/com.sdi/sdi-spring-boot-starter)
```

## Troubleshooting

### "GroupId not verified"
- Create JIRA ticket at Sonatype
- Wait for approval

### "GPG signing failed"
- Check GPG key is exported: `gpg --list-keys`
- Verify passphrase in `settings.xml`
- Test signing: `gpg --sign test.txt`

### "Repository not found"
- Ensure you've created the JIRA ticket
- Wait for approval (check email)

### "Staging repository validation failed"
- Check the "Activity" tab in Sonatype portal
- Fix any validation errors
- Common issues: missing javadoc, unsigned artifacts

## Next Steps After First Release

1. **Update version** for next release (e.g., 1.0.1)
2. **Create changelog** (CHANGELOG.md)
3. **Tag release** in Git
4. **Deploy** using same process

## References

- Sonatype OSSRH Guide: https://central.sonatype.org/publish/publish-guide/
- Maven Central Requirements: https://central.sonatype.org/publish/requirements/
- GPG Setup: https://central.sonatype.org/publish/requirements/gpg/

