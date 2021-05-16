# Build Stage
FROM maven:3.8.1-adoptopenjdk-8-openj9 AS build
COPY pom.xml .
COPY src src
RUN mvn dependency:go-offline -B
RUN mvn -f pom.xml clean package

# Run Stage
FROM openjdk:8-jre
COPY --from=build target/*.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ]
