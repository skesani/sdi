FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the entire sdi-core directory
COPY sdi-core/pom.xml ./pom.xml
COPY sdi-core/src ./src

# Build SDI
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Install wget for healthcheck
RUN apk add --no-cache wget

# Copy SDI jar
COPY --from=build /app/target/*.jar sdi.jar

# Expose REST API port
EXPOSE 8080

# Expose gRPC port (optional, for future use)
EXPOSE 9090

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/v1/health || exit 1

# Run SDI
ENTRYPOINT ["java", "-jar", "sdi.jar"]
