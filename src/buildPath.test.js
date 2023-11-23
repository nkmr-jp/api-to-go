const buildPath = require('./buildPath');

test('build path', () => {
  const expected = {
    "dir": "api.github.com/users/user",
    "goFilePath": "api.github.com/users/user/repos_get.go",
    "jsonFilePath": "api.github.com/users/user/repos_get.json",
    "queryGoFilePath": "api.github.com/users/user/repos_get_query.go",
    "queryJsonFilePath": "api.github.com/users/user/repos_get_query.json",
    "bodyGoFilePath": "api.github.com/users/user/repos_get_body.go",
    "bodyJsonFilePath": "api.github.com/users/user/repos_get_body.json",
    "path": {
      "pathFormat": "/users/{user}/repos",
      "pathname": "/users/github/repos",
      "replacedPath": "/users/user/repos",
      "replacedUrl": "api.github.com/users/user/repos"
    },
    "pkg": "user",
    "struct": "Repos"
  }
  let opts = {
    method: "GET",
  }
  const received = buildPath(
    new URL("https://api.github.com/users/github/repos"),
    "./src/.api-to-go.test.yml",
      opts
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
    "./src/.api-to-go.test.yml"
  )
  expect(received.path).toEqual(expected);
});