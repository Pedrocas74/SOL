import nextJest from 'next/jest';
//this file connects Jest with Next.js, serves as a control panel for the testing enviroment

const createJestConfig = nextJest({
  dir: './', //the path to the app
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'], //loads the test setup (setupTests.ts)
  testEnvironment: 'jest-environment-jsdom', //sets the enviroment

  moduleNameMapper: { //fixes path aliases
    '^@/(.*)$': '<rootDir>/src/$1', 
  },
};

export default createJestConfig(customJestConfig);