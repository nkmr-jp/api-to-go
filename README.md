# api-to-go

Convert REST API's JSON payload to Golang struct.
using [JSON-to-Go](https://github.com/mholt/json-to-go)

# Install
```sh
npm i -g @nkmr-jp/api-to-go
```

# Usage
```sh
$ api-to-go --help
Usage: api-to-go [options] <url> [body]

Convert REST API's JSON payload to Golang struct.

Arguments:
  url                     URL (required)
  body                    HTTP request body. specify by json string or file.

Options:
  -v, --version           output the current version
  -H, --headers <string>  http request headers. specify by json string or file.
  -X, --method <string>   specify request method to use.
  --config <string>       location of client config files. (default: "./.api-to-go.yml")
  -D, --debug             enable debug mode
  -h, --help              display help for command
```


# Quick Start

Add config file `.api-to-go.yml`.
```yml
api.github.com:
  docs:
    - https://docs.github.com/en/rest
  format:
    - /users/{user}
    - /users/{user}/repos
```

Run command.
```sh
cd [your project dir]
api-to-go  https://api.github.com/users/github/repos
# > Status:  200 OK
# > Request: GET https://api.github.com/users/github/repos
# > Format:  /users/{user}/repos
# > Docs:    https://docs.github.com/en/rest

# > Response Body:
# >   - api.github.com/users/user/repos_get.go:1
# >   - api.github.com/users/user/repos_get.json:1
```

Generated files and directories.
```sh
 tree -a .
# > .
# > ├── .api-to-go.yml
# > └── api.github.com
# >     └── users
# >         └── user
# >             ├── repos_get.go
# >             └── repos_get.json
```

Generated struct file `./api.github.com/users/user/repos.go`.
```go
// Generated Code But Editable.
// Format The Code with `go fmt` or something and edit it manually to use it.
//
// Generated by: api-to-go (https://github.com/nkmr-jp/api-to-go).

package user

import "time"

// ReposGet is the struct of the HTTP Response Body.
//
//	Status:  200 OK
//	Request: GET https://api.github.com/users/github/repos
//	Format:  /users/{user}/repos
//	Docs:    https://docs.github.com/en/rest
type ReposGet []struct {
	ID int `json:"id"`
	NodeID string `json:"node_id"`
	Name string `json:"name"`
	FullName string `json:"full_name"`
	Private bool `json:"private"`
	Owner Owner `json:"owner"`
	HTMLURL string `json:"html_url"`
	Description string `json:"description"`
	Fork bool `json:"fork"`
	URL string `json:"url"`
	ForksURL string `json:"forks_url"`
	KeysURL string `json:"keys_url"`
	CollaboratorsURL string `json:"collaborators_url"`
	TeamsURL string `json:"teams_url"`
	HooksURL string `json:"hooks_url"`
	IssueEventsURL string `json:"issue_events_url"`
	EventsURL string `json:"events_url"`
	AssigneesURL string `json:"assignees_url"`
	BranchesURL string `json:"branches_url"`
	TagsURL string `json:"tags_url"`
	BlobsURL string `json:"blobs_url"`
	GitTagsURL string `json:"git_tags_url"`
	GitRefsURL string `json:"git_refs_url"`
	TreesURL string `json:"trees_url"`
	StatusesURL string `json:"statuses_url"`
	LanguagesURL string `json:"languages_url"`
	StargazersURL string `json:"stargazers_url"`
	ContributorsURL string `json:"contributors_url"`
	SubscribersURL string `json:"subscribers_url"`
	SubscriptionURL string `json:"subscription_url"`
	CommitsURL string `json:"commits_url"`
	GitCommitsURL string `json:"git_commits_url"`
	CommentsURL string `json:"comments_url"`
	IssueCommentURL string `json:"issue_comment_url"`
	ContentsURL string `json:"contents_url"`
	CompareURL string `json:"compare_url"`
	MergesURL string `json:"merges_url"`
	ArchiveURL string `json:"archive_url"`
	DownloadsURL string `json:"downloads_url"`
	IssuesURL string `json:"issues_url"`
	PullsURL string `json:"pulls_url"`
	MilestonesURL string `json:"milestones_url"`
	NotificationsURL string `json:"notifications_url"`
	LabelsURL string `json:"labels_url"`
	ReleasesURL string `json:"releases_url"`
	DeploymentsURL string `json:"deployments_url"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	PushedAt time.Time `json:"pushed_at"`
	GitURL string `json:"git_url"`
	SSHURL string `json:"ssh_url"`
	CloneURL string `json:"clone_url"`
	SvnURL string `json:"svn_url"`
	Homepage interface{} `json:"homepage"`
	Size int `json:"size"`
	StargazersCount int `json:"stargazers_count"`
	WatchersCount int `json:"watchers_count"`
	Language interface{} `json:"language"`
	HasIssues bool `json:"has_issues"`
	HasProjects bool `json:"has_projects"`
	HasDownloads bool `json:"has_downloads"`
	HasWiki bool `json:"has_wiki"`
	HasPages bool `json:"has_pages"`
	ForksCount int `json:"forks_count"`
	MirrorURL interface{} `json:"mirror_url"`
	Archived bool `json:"archived"`
	Disabled bool `json:"disabled"`
	OpenIssuesCount int `json:"open_issues_count"`
	License interface{} `json:"license"`
	AllowForking bool `json:"allow_forking"`
	IsTemplate bool `json:"is_template"`
	WebCommitSignoffRequired bool `json:"web_commit_signoff_required"`
	Topics []interface{} `json:"topics"`
	Visibility string `json:"visibility"`
	Forks int `json:"forks"`
	OpenIssues int `json:"open_issues"`
	Watchers int `json:"watchers"`
	DefaultBranch string `json:"default_branch"`
}
type Owner struct {
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

# Credits
All credits for the original json-to-go belong to [mholt](https://github.com/mholt/)
