module.exports = {
  client: {
    service: {
      name: "drawing-app",
      localSchemaFile: "./src/api/@types/generated/gql.schema.json",
    },
    includes: ["./src/**/*.ts"],
    excludes: ["**/__tests__/**", "**/node_modules/**", "**/dist/**"],
  },
};
