module.exports = {
    // The glob patterns Jest uses to detect test files (default: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ])
    testMatch: [
        '<rootDir>/src/tests/*test.js'
    ],
    setupFilesAfterEnv: ['./src/tests/setupTests.js'] // setup server to test on
}