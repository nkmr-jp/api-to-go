const {toPascalCase} = require('./common');

test('converts normal string to pascal case', () => {
    expect(toPascalCase('hello world')).toBe('HelloWorld');
});

test('converts snake_case string to pascal case', () => {
    expect(toPascalCase('some_demo_string')).toBe('SomeDemoString');
});

test('converts kebab-case string to pascal case', () => {
    expect(toPascalCase('another-example string')).toBe('AnotherExampleString');
});

test('converts all uppercase string to pascal case', () => {
    expect(toPascalCase('ALLUPPERCASE')).toBe('Alluppercase');
});

test('converts all uppercase string to pascal case', () => {
    expect(toPascalCase('GET')).toBe('Get');
});

test('keeps camelCase string in pascal case', () => {
    expect(toPascalCase('camelCaseInput')).toBe('CamelCaseInput');
});