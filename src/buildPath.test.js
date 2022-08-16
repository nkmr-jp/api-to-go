const buildPath = require('./buildPath');

test('build path', () => {
  const expected = {
    "dir": "api.github.com/users/user",
    "goFilePath": "api.github.com/users/user/repos.go",
    "jsonFilePath": "api.github.com/users/user/repos.json",
    "paramGoFilePath": "api.github.com/users/user/repos_param.go",
    "paramJsonFilePath": "api.github.com/users/user/repos_param.json",
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
    new URL("https://api.github.com/users/github/repos"),
    "./.api-to-go.test.yml"
  )
  expect(received).toEqual(expected);
});

test('build path without format setting', () => {
  const expected = {
    "pathFormat": null,
    "pathname": "/organizations",
    "replacedPath": "/organizations",
    "replacedUrl": "api.github.com/organizations"
  }
  const received = buildPath(
    new URL("https://api.github.com/organizations"),
    "./.api-to-go.test.yml"
  )
  expect(received.path).toEqual(expected);
});