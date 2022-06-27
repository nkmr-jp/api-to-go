const buildPath = require('./buildPath');

test('build path', () => {
  const expected = {
    "dir": "api.github.com/users/github",
    "goFilePath": "api.github.com/users/github/repos.go",
    "jsonFilePath": "api.github.com/users/github/repos_sample.json",
    "pkg": "github",
    "struct": "Repos"
  }
  const received = buildPath(
    "https://api.github.com/users/github/repos",
    "./.api-to-go.test.yaml"
  )
  expect(received).toEqual(expected);
});