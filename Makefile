variables ?= .env
args = $(filter-out $@,$(MAKECMDGOALS))

include $(variables)
export $(shell sed 's/=.*//' $(variables))

create-generated-gql-folder:
	mkdir -p $(REACT_APP_GRAPHQL_GENERATED_OUTPUT_PATH)

introspect-schema:
	apollo-codegen introspect-schema $(REACT_APP_GRAPHQL_ENDPOINT) --output $(REACT_APP_GRAPHQL_GENERATED_SCHEMA_PATH)

generate-types-from-schema:
	apollo-codegen generate ./src/**/*.ts --schema $(REACT_APP_GRAPHQL_GENERATED_SCHEMA_PATH) --target typescript --output $(REACT_APP_GRAPHQL_GENERATED_TYPES_PATH)

generate-types: create-generated-gql-folder introspect-schema generate-types-from-schema
