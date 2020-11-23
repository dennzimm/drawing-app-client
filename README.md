## Prerequisite

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/get-started)
- [make](https://www.gnu.org/software/make/)

## Preparations

1. **copy** `example.env` to `.env`
2. **fill** the `.env` with your configuration or leave it as it is (_default configurations_)

## How to run this project (in production mode)

1. **run** `make start` **or** `docker-compose -f docker-compose.prod.yml up -d --build`
2. **open** the browser and go to `http://localhost:1337` to see the app

## How to run this project (in dev mode - for development)

1. **run** `make dev` **or** `docker-compose -f docker-compose.prod.yml up -d --build`
2. **open** the browser and go to `http://localhost:3000` to see the app

## How to stop this project

1. **run** `make stop` **or** `docker-compose -f docker-compose.yml -f docker-compose.prod.yml stop`
