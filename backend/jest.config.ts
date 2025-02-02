export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './src',  // ✅ Jest will only look inside `src/`
    testMatch: ['**/*.spec.ts'],  // ✅ Runs only unit test files
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: { '^.+\\.(t|j)s$': 'ts-jest' },
    collectCoverageFrom: ['**/*.ts'],
    coverageDirectory: '../coverage',
};