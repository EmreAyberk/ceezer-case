## Ceezer Portfolio Case

This NestJS project is designed to implement a specific use-case scenario through its controllers, services, and modules. The core functionality revolves around handling requests through a dedicated controller and processing logic within corresponding service layers.

### Features
- 	Modular Structure: Organized into modules to keep features and functionalities well-structured and maintainable.
- 	Built-in Validation & Error Handling: Utilizes NestJS decorators and exception filters to ensure input data integrity and provide meaningful error responses.
- 	Scalable & Testable: The project structure, along with NestJS’s core principles, ensures easy scalability and straightforward testing.

### Requirements
- 	Operating System: Windows, macOS, or Linux
- 	Node.js: v14 or higher
- 	npm: v6 or higher (or yarn equivalent)

Ensure you have the required dependencies and tools installed before proceeding.

### Installation

Clone the repository and navigate into the project directory:


```bash
$ git clone https://github.com/EmreAyberk/ceezer-case.git
$ cd ceezer-case
```

Install all project dependencies:

```bash
$ npm install
```

before you run the project you need to set env
```bash
nano .env
```
and then copy this fields

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio
DB_USER=admin
DB_PASSWORD=root
NODE_ENV=development
PORT=8080
```
now you can easily start your application

```bash
$ npm run start
```

#### Run tests

```bash
$ npm run test
```

### Project Structure

WA typical NestJS project structure is followed, with the main components including:
•	src Folder: Contains all source code (controllers, services, modules, etc.).
•	main.ts: The entry point of the application.
•	app.module.ts: The root module importing and configuring other modules.
•	app.controller.ts & app.service.ts: Example controller and service to handle incoming requests and business logic.

A sample structure:

### A typical top-level directory layout
    src
    ├─ config
    ├─ portfolio
    │  ├─ controller
    │  ├─ dto
    │  ├─ entity
    │  ├─ interface
    │  ├─ repository
    │  ├─ service
    │  └─ portfolio.module.ts
    ├─ seed
    ├─ shared
    │  ├─ filters
    │  └─ services
    ├─ types
    │  ├─ http
    ...

### Example Endpoint

You can interact with the API using the following example endpoint:
-	POST http://localhost:8080/portfolio/generate: Generate a portfolio based on the provided input parameters.

```
curl --location 'http://localhost:8080/portfolio/generate' \
--header 'Content-Type: application/json' \
--data '{
    "desiredVolumeInTons": 79
}'
```

### Swagger

Once the application is running, you can access the Swagger UI at:

URL: http://localhost:8080/swagger


### Running with Docker Compose

This project includes a docker-compose.yml file to simplify running the application and its dependencies. Ensure that both Docker and Docker Compose are installed on your machine.

#### Build and Run:
```bash
docker-compose up --build
```

This command will:
-	Build the project’s Docker image.
-	Start all defined services (such as the NestJS application and Postgresql databese) as specified in the docker-compose.yml file.