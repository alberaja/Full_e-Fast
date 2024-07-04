# Utiliza una imagen base de OpenJDK para Java 11
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo JAR de la aplicación en el contenedor
COPY target/ms-elastic-eFast-0.0.1-SNAPSHOT.jar /app/ms-elastic-eFast-0.0.1-SNAPSHOT.jar

# Expone el puerto en el que la aplicación Spring Boot se ejecutará (puerto 8080 por defecto)
#EXPOSE 8080

# Define el comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app/ms-elastic-eFast-0.0.1-SNAPSHOT.jar"]