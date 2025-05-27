/** @type {import('jest').Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testTimeout: 10000,
  clearMocks: true,
  moduleFileExtensions: ["ts", "js"],
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
};
