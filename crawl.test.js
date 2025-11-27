const {normalizeUrl, getUrlsFromHtml} = require('./crawl');
// const {test, expect} = require('@jest/globals');



test('normalizeUrl strip protocol', () => {
    const inputUrl = 'https://api.boot.dev/v1/courses_rest_api/learn-http';
    const expectedOutput = 'api.boot.dev/v1/courses_rest_api/learn-http';
    const actualOutput = normalizeUrl(inputUrl);
    expect(actualOutput).toBe(expectedOutput);
});

test('normalizeUrl strip protocol and trailing slash', () => {
    const inputUrl = 'https://api.boot.dev/v1/courses_rest_api/learn-http/';
    const expectedOutput = 'api.boot.dev/v1/courses_rest_api/learn-http';
    const actualOutput = normalizeUrl(inputUrl);
    expect(actualOutput).toBe(expectedOutput);
});

//URL constructor lowercases the url automatically
test('normalizeUrl capital letters', () => {
    const inputUrl = 'https://api.BOOT.dev/v1/courses_rest_api/learn-http/';
    const expectedOutput = 'api.boot.dev/v1/courses_rest_api/learn-http';
    const actualOutput = normalizeUrl(inputUrl);
    expect(actualOutput).toBe(expectedOutput);
});

test('getUrlsFromHtml', () => {
    const inputHtml = `
<html>
    <body>
        <a href="https://api.boot.dev/v1/courses_rest_api/learn-http/">
            Boot.dev Blog
        </a>
    </body>
</html>
`;
    const inputUrl = 'api.boot.dev/v1/courses_rest_api/learn-http';
    const expectedOutput = ["api.boot.dev/v1/courses_rest_api/learn-http"];
    const actualOutput = getUrlsFromHtml(inputHtml, inputUrl);
    expect(actualOutput).toStrictEqual(expectedOutput);
});

//To be only works with primitives, since it is not checking the value, but the equality. For anything else, I should use toStrictEqual

test('getUrlsFromHtml relative', () => {
    const inputHtml = `
<html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
`;
    const inputUrl = 'https://api.boot.dev/v1/courses_rest_api/learn-http';
    const expectedOutput = ["api.boot.dev/v1/courses_rest_api/learn-http/path"];
    const actualOutput = getUrlsFromHtml(inputHtml, inputUrl);
    expect(actualOutput).toStrictEqual(expectedOutput);
});

test('getUrlsFromHtml multiple', () => {
    const inputHtml = `
<html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
        <a href="https://api.boot.dev/v1/courses_rest_api/learn-http/">
            Boot.dev Blog
        </a>
    </body>
</html>
`;
    const inputUrl = 'https://api.boot.dev/v1/courses_rest_api/learn-http';
    const expectedOutput = ["api.boot.dev/v1/courses_rest_api/learn-http/path", "api.boot.dev/v1/courses_rest_api/learn-http"];
    const actualOutput = getUrlsFromHtml(inputHtml, inputUrl);
    expect(actualOutput).toStrictEqual(expectedOutput);
});

test('getUrlsFromHtml invalid', () => {
    const inputHtml = `
<html>
    <body>
        <a href="nonsense">
            Boot.dev Blog
        </a>
    </body>
</html>
`;
    const inputUrl = 'https://api.boot.dev/v1/courses_rest_api/learn-http';
    const expectedOutput = [];
    const actualOutput = getUrlsFromHtml(inputHtml, inputUrl);
    expect(actualOutput).toStrictEqual(expectedOutput);
});