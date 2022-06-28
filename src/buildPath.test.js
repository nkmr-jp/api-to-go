const buildPath = require('./buildPath');

test('build path', () => {
  const expected = {
    "dir": "api.github.com/users/user",
    "goFilePath": "api.github.com/users/user/repos.go",
    "jsonFilePath": "api.github.com/users/user/repos_sample.json",
    "path": {
      "pathFormat": "/users/{user}/repos",
      "pathname": "/users/github/repos",
      "replacedPath": "/users/user/repos",
      "replacedUrl": "api.github.com/users/user/repos"
    },
    "pkg": "user",
    "struct": "Repos"
  }
  const received = buildPath(
    "https://api.github.com/users/github/repos",
    "./.api-to-go.test.yaml"
  )
  expect(received).toEqual(expected);
});