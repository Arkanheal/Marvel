export default {
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    collectCoverageFrom: [
        'src/*',
        '!src/app.ts',
    ],

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",

    preset: "ts-jest",
    testEnvironment: 'node',

    testRegex: "./src/__tests__/.*\.test\.ts"
};
