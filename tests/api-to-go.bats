#!/usr/bin/env bats

load helper/helper

setup() {
  if [ "$BATS_TEST_NUMBER" -eq 1 ]; then
      init_doc
      rm -rf ./jsonplaceholder.typicode.com
  fi

  BASE_HOST="jsonplaceholder.typicode.com"
  BASE_URL="https://$BASE_HOST"
  API_TO_GO="node ../bin/api-to-go.js"
  doc "## $BATS_TEST_DESCRIPTION"
}

teardown(){
  write_doc_details "api-to-go"
}

@test "Command with Path parameters" {
  COMMAND="$API_TO_GO $BASE_URL/todos/1"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]

  assert_files_match /todos/todo_get.go
  assert_files_match /todos/todo_get.json
}

@test "Command with Query parameters" {
  QUERY='?userId=1&completed=false'
  COMMAND="$API_TO_GO $BASE_URL/todos$QUERY"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]

  assert_files_match /todos_get.go
  assert_files_match /todos_get.json
  assert_files_match /todos_get_query.go
  assert_files_match /todos_get_query.json
}

@test "Command with Body parameters" {
  DATA=' {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  }'
  COMMAND="$API_TO_GO $BASE_URL/todos '$DATA'"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]

  assert_files_match /todos_post.go
  assert_files_match /todos_post.json
  assert_files_match /todos_post_body.go
  assert_files_match /todos_post_body.json
}

@test "Command with custom headers" {
  HEADERS='{"Content-Type": "application/json"}'
  COMMAND="$API_TO_GO --headers '$HEADERS' $BASE_URL/todos/1"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]
}

@test "Command with GET method" {
  COMMAND="$API_TO_GO --method GET $BASE_URL/todos/1"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]
}

@test "Display help message" {
  COMMAND="$API_TO_GO --help"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]
  [ "${lines[0]}" = "Usage: api-to-go [options] <url> [body]" ]
}
