# Drawing App Client

---

## Prerequisite

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/get-started)
- [make](https://www.gnu.org/software/make/)

- [drawing-app-server](https://github.com/dennzimm/drawing-app-server)

## Preparations

- **run** `make setup`
- **fill** the `.env` (**project root**) with your configuration or leave it as it is (_default configurations_)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**~~ OR ~~**

- **copy** `example.env` to `.env` (**project root**)
- **fill** the `.env` (project root) with your configuration or leave it as it is (_default configurations_)

## How to run this project (in production mode)

- **run** `make start` **or** `docker-compose -f docker-compose.prod.yml up -d --build`
- **open** the browser and go to `http://localhost:1337` to see the app

## How to run this project (in dev mode - for development)

- **run** `make dev` **or** `docker-compose -f docker-compose.prod.yml up -d --build`
- **open** the browser and go to `http://localhost:3000` to see the app

## How to stop this project

- **run** `make stop` **or** `docker-compose -f docker-compose.yml -f docker-compose.prod.yml stop`
