const {sortPages} = require('./report')

test('sortPages', () => {
    const input = {
        'wagslane.dev/tags': 3,
        'wagslane.dev/about': 62 
    };
    const expectedOutput = [
        ['wagslane.dev/about', 62],
        ['wagslane.dev/tags', 3]
    ]
    const actualOutput = sortPages(input);
    expect(actualOutput).toStrictEqual(expectedOutput);
});