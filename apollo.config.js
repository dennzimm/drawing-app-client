module.exports = {
  client: {
    service: {
      name: "drawing-app",
      localSchemaFile: "./src/api/@types/gql.schema.json",
    },
    includes: ["./src/**/*.ts"],
    excludes: ["**/__tests__/**", "**/node_modules/**", "**/dist/**"],
  },
};
