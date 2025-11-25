const {normalizeUrl} = require('./crawl');
const {test, expect} = require('@jest/globals');
const input = 'https://api.boot.dev/v1/courses_rest_api/learn-http/';

test('normalizeUrl strip protocol', () => {
    const expectedOutput = 'api.boot.dev/v1/courses_rest_api/learn-http';
    const actualOutput = normalizeUrl(input);
    expect(actualOutput).toBe(expectedOutput);
});

test('normalizeUrl strip protocol and trailing slash', () => {
    const expectedOutput = 'api.boot.dev/v1/courses_rest_api/learn-http';
    const actualOutput = normalizeUrl(input);
    expect(actualOutput).toBe(expectedOutput);
});

//URL constructor lowercases the url automatically
test('normalizeUrl capital letters', () => {
    const expectedOutput = 'api.boot.dev/v1/courses_rest_api/learn-http';
    const actualOutput = normalizeUrl(input);
    expect(actualOutput).toBe(expectedOutput);
});