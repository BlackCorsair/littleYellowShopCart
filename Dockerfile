FROM maven:3.6.3-jdk-11-slim

ADD . /app/

WORKDIR /app/

RUN mvn install

ENTRYPOINT ["java", "-jar", "/app/target/littleyellowshopcart-0.0.1-SNAPSHOT.jar"]
