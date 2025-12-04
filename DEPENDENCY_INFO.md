# SDI Dependency Information

## Dependency Coordinates

```xml
<dependency>
    <groupId>com.sdi</groupId>
    <artifactId>sdi-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

## Status

✅ **Defined**: The dependency is properly defined in `sdi-core/pom.xml`
⚠️ **Not Published**: It's not yet published to Maven Central
✅ **Local Use**: Available after building locally

## How to Use

### Option 1: Build and Install Locally

```bash
cd sdi-core
mvn clean install -DskipTests
```

This installs it to your local Maven repository (`~/.m2/repository/com/sdi/sdi-spring-boot-starter/1.0.0/`)

Then use it in your projects:

```xml
<dependency>
    <groupId>com.sdi</groupId>
    <artifactId>sdi-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

### Option 2: Use from Local Project

If you're working in the same workspace:

```xml
<dependency>
    <groupId>com.sdi</groupId>
    <artifactId>sdi-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

And add the local repository:

```xml
<repositories>
    <repository>
        <id>local</id>
        <url>file://${project.basedir}/../sdi-core/target</url>
    </repository>
</repositories>
```

### Option 3: Publish to Maven Central (Future)

To make it publicly available:

1. Set up Sonatype OSSRH account
2. Configure GPG signing
3. Run: `mvn clean deploy -P release`

## Current Artifact Details

- **Group ID**: `com.sdi`
- **Artifact ID**: `sdi-spring-boot-starter`
- **Version**: `1.0.0`
- **Packaging**: `jar`
- **Java Version**: 17
- **Spring Boot**: 3.2.0

## Verification

To verify the dependency exists:

```bash
cd sdi-core
mvn help:evaluate -Dexpression=project.artifactId -q -DforceStdout
# Output: sdi-spring-boot-starter

mvn help:evaluate -Dexpression=project.groupId -q -DforceStdout
# Output: com.sdi

mvn help:evaluate -Dexpression=project.version -q -DforceStdout
# Output: 1.0.0
```

