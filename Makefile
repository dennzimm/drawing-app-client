variables ?= .env
args = $(filter-out $@,$(MAKECMDGOALS))

DOCKER_DEV=drawing-app:dev
DOCKER_PROD=drawing-app:prod

include $(variables)
export $(shell sed 's/=.*//' $(variables))

create-generated-gql-folder:
	mkdir -p $(REACT_APP_GQL_GENERATED_OUTPUT_PATH)

introspect-schema:
	apollo-codegen introspect-schema $(REACT_APP_GQL_ENDPOINT) --output $(REACT_APP_GQL_GENERATED_SCHEMA_PATH)

generate-types-from-schema:
	apollo-codegen generate ./src/**/graphql/**/*.ts --schema $(REACT_APP_GQL_GENERATED_SCHEMA_PATH) --target typescript --output $(REACT_APP_GQL_GENERATED_TYPES_PATH) --addTypename

generate-types: create-generated-gql-folder introspect-schema generate-types-from-schema

# Docker
build-dev:
	docker build -t $(DOCKER_DEV) .

build-prod:
	docker build -f Dockerfile.prod -t $(DOCKER_PROD) .

run-dev:
	docker-compose up -d --build --remove-orphans

run-prod:
	docker-compose -f docker-compose.prod.yml up -d --build --remove-orphans

stop:
	docker-compose stop
