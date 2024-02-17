![](homeScreen.png)

# JPACRUDProject

## Description

This event tracker is meant to track the snakes and reptiles at San Diego zoo. Whenever I bring my kid to San Diego zoo, he spent a lot of time observing snakes, turtles, and reptiles. This snake database would be a good place to store and retrieve all the informaiton we get about the reptiles at San Diego Zoo. The database can be access using RESTful api with following end points

| HTTP Verb | URI                | Request Body                                     | Response Body                                  | Status Codes  |
| --------- | ------------------ | ------------------------------------------------ | ---------------------------------------------- | ------------- |
| GET       | `/api/snakes`      |                                                  | List all snakes and reptiles in the database   | 200           |
| GET       | `/api/snakes/{id}` |                                                  | JSON of snake/reptile with specific id         | 200, 404      |
| POST      | `/api/snakes`      | JSON of snake/reptile infornation                | JSON of added snake/reptile with associated id | 201, 400      |
| PUT       | `/api/snakes/{id}` | JSON of new version of snake/reptile information | JSON of updated snake/reptile information      | 200, 404, 400 |
| DELETE    | `/api/snakes/{id}` |                                                  |                                                | 204, 404, 400 |

## Technology used

- Java JPA/ JPA Repository
- Spring Boot
- Hibernate
- JUnit
- Gradle
- MySQL
