import { pathsToModuleNameMapper } from "ts-jest/utils";

import { compilerOptions } from "./tsconfig.json";

export default {
  bail: true,

  clearMocks: true,

  coverageProvider: "v8",

  preset: "ts-jest",

  testMatch: ["**/*.spec.ts"],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),

  collectCoverage: true,

  collectCoverageFrom: ["<rootDir>/src/modules/**/useCases/**/*.ts"],

  coverageDirectory: "coverage",

  coverageReporters: ["text-summary", "lcov"],
};
