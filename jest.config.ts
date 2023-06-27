/** @type {import('jest').Config} */
import type { Config } from 'jest';
import nextJest from 'next/jest';

const baseJestConfig = nextJest({
  dir: './'
});

const extendedJestConfig: Config = {
  preset: 'ts-jest',
  verbose: true,
  rootDir: './',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jestEnv.ts'],
  setupFilesAfterEnv: ['<rootDir>/jestSetup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.yarn/', '<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '^@auth/(.*)$': '<rootDir>/src/auth/$1',
    '^@challenge/(.*)$': '<rootDir>/src/challenge/$1',
    '^@banner/(.*)$': '<rootDir>/src/banner/$1',
    '^@user/(.*)$': '<rootDir>/src/user/$1',
    '^@workspace/(.*)$': '<rootDir>/src/workspace/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@layout/(.*)$': '<rootDir>/src/layout/$1'
  },
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest',
    '^.+\\.(css|scss|sass|less)$': 'jest-preview/transforms/css',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': 'jest-preview/transforms/file'
  }
};

export default baseJestConfig(extendedJestConfig);
