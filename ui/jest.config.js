module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
