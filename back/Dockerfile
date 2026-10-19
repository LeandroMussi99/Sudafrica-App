# Etapa 1: Compilar el proyecto con Java 21
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa 2: Levantar el servidor con Java 21
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/back-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]