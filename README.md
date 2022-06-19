# api-to-go

Convert Rest API's JSON payload to Golang struct.
using [json-to-go](https://github.com/mholt/json-to-go)

# Install
```sh
git clone https://github.com/nkmr-jp/api-to-go.git
cd api-to-go
yarn install
yarn fetch # fetch json-to-go code
npm link   # make the command available
```

# Usage
```sh
api-to-go https://api.github.com/users/github
```

```sh
tree .
# > .
# > └── api.github.com
# >     └── users.go
```

```go
// ./api.github.com/users.go
package apigithubcom

type Users []struct {
  Login string `json:"login"`
  ID int `json:"id"`
  NodeID string `json:"node_id"`
  AvatarURL string `json:"avatar_url"`
  GravatarID string `json:"gravatar_id"`
  URL string `json:"url"`
  HTMLURL string `json:"html_url"`
  FollowersURL string `json:"followers_url"`
  FollowingURL string `json:"following_url"`
  GistsURL string `json:"gists_url"`
  StarredURL string `json:"starred_url"`
  SubscriptionsURL string `json:"subscriptions_url"`
  OrganizationsURL string `json:"organizations_url"`
  ReposURL string `json:"repos_url"`
  EventsURL string `json:"events_url"`
  ReceivedEventsURL string `json:"received_events_url"`
  Type string `json:"type"`
  SiteAdmin bool `json:"site_admin"`
}
```
