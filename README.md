# Pia Amazon 2

A full-stack web application inspired by Amazon, built for internship learning purposes. The project consists of a Java Spring Boot backend, an Angular frontend, and MongoDB for data storage. It includes features such as user authentication, product browsing, cart management, and a reels (short video) system.

## Project Structure

```
.
├── backend/         # Java Spring Boot backend API
├── frontend/        # Angular frontend application
├── gen-database/    # Scripts for populating the MongoDB database
├── mongo-init.js    # MongoDB initialization script
├── docker-compose.yml
└── README.md
```

## Tech Stack

- [Node.js](https://nodejs.org/) (for frontend)
- [Spring Boot](https://spring.io/projects/spring-boot) (for backend)
- [MongoDB](https://www.mongodb.com/) (for database)

## Getting Started

### 1. Start the app with Docker

```sh
docker-compose up
```

This will start 3 containers with the frontend, backend and the database. This will run the Angular on development mode. For production builds have a look at the `frontend/Dockerfile`.

### 2. Populate the Database (Optional)

The starter database will be emtpy. You can generate sample data for reels and other collections:

```sh
cd gen-database
node main.js
node populateReels.js
```

First script will scrape the Amazon 1 and put those products into the database. Second script will create a Reel for every product on the database.

## Features

- User authentication and profile management
- Product browsing and search
- Shopping cart functionality
- Purchase workflow
- Reels (short video) feed and comments
