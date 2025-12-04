#!/bin/bash

# Script to deploy SDI to Maven Central
# Prerequisites:
# 1. Sonatype OSSRH account created
# 2. GPG key generated and exported
# 3. ~/.m2/settings.xml configured with credentials

set -e

echo "🚀 Deploying SDI to Maven Central"
echo ""

# Check if we're in the right directory
if [ ! -f "pom.xml" ]; then
    echo "❌ Error: pom.xml not found. Run this script from sdi-core directory."
    exit 1
fi

# Check Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Error: Maven is not installed. Please install Maven first."
    exit 1
fi

# Check GPG is installed
if ! command -v gpg &> /dev/null; then
    echo "❌ Error: GPG is not installed. Please install GPG first."
    exit 1
fi

# Check if settings.xml exists
if [ ! -f "$HOME/.m2/settings.xml" ]; then
    echo "⚠️  Warning: ~/.m2/settings.xml not found."
    echo "   You need to create it with your Sonatype credentials."
    echo "   See MAVEN_CENTRAL_SETUP.md for details."
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Get version from pom.xml
VERSION=$(mvn help:evaluate -Dexpression=project.version -q -DforceStdout)
echo "📦 Version: $VERSION"
echo ""

# Check if this is a snapshot version
if [[ $VERSION == *"-SNAPSHOT"* ]]; then
    echo "📸 This is a SNAPSHOT version - will deploy to snapshots repository"
    PROFILE=""
else
    echo "🏷️  This is a RELEASE version - will deploy to staging repository"
    echo "   After deployment, you'll need to release it from Sonatype portal"
    PROFILE="-P release"
fi

echo ""
read -p "Continue with deployment? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo ""
echo "🔨 Building and deploying..."
echo ""

# Clean, build, and deploy
mvn clean deploy $PROFILE

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    
    if [[ $VERSION == *"-SNAPSHOT"* ]]; then
        echo "📦 Snapshot deployed to: https://s01.oss.sonatype.org/content/repositories/snapshots/"
        echo "   Available immediately for testing"
    else
        echo "📦 Release deployed to staging repository"
        echo ""
        echo "📋 Next steps:"
        echo "   1. Go to: https://s01.oss.sonatype.org/"
        echo "   2. Login with your Sonatype credentials"
        echo "   3. Navigate to 'Staging Repositories'"
        echo "   4. Find repository: comsdi-xxxx"
        echo "   5. Select it and click 'Close'"
        echo "   6. Wait for validation (check 'Activity' tab)"
        echo "   7. Once validated, click 'Release'"
        echo "   8. Artifact will be available on Maven Central in 10-30 minutes"
        echo ""
        echo "🔗 Check status: https://search.maven.org/search?q=g:com.sdi"
    fi
    
    echo ""
    echo "🎉 Done!"
else
    echo ""
    echo "❌ Deployment failed. Check the error messages above."
    exit 1
fi

