#!/usr/bin/env bats

load helper/helper

setup() {
  if [ "$BATS_TEST_NUMBER" -eq 1 ]; then
      init_doc
      rm -rf ./jsonplaceholder.typicode.com
  fi

  BASE_URL="https://jsonplaceholder.typicode.com"
  API_TO_GO="node ../bin/api-to-go.js"
  doc "## $BATS_TEST_DESCRIPTION"
}

teardown(){
  write_doc_details "api-to-go"
}

@test "Command with valid URL should succeed" {
  COMMAND="$API_TO_GO $BASE_URL/todos/1"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]
}

@test "Command with URL and JSON body" {
  DATA='{"title": "foo", "body": "bar", "userId": 1}'
  COMMAND="$API_TO_GO $BASE_URL/posts '$DATA'"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]
}

@test "Command with custom headers" {
  HEADERS='{"Content-Type": "application/json"}'
  COMMAND="$API_TO_GO --headers '$HEADERS' $BASE_URL/todos/1"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]
}

@test "Command with POST method" {
  DATA='{"title": "foo", "body": "bar", "userId": 1}'
  COMMAND="$API_TO_GO --method POST $BASE_URL/posts '$DATA'"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]
}

@test "Command with GET method" {
  COMMAND="$API_TO_GO --method GET $BASE_URL/posts/1"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]
}

@test "Debug mode activation" {
  COMMAND="$API_TO_GO -D $BASE_URL/posts"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]
}

@test "Display help message" {
  COMMAND="$API_TO_GO --help"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]
  [ "${lines[0]}" = "Usage: api-to-go [options] <url> [body]" ]
}

@test "Display version information" {
  COMMAND="$API_TO_GO --version"
  run eval "$COMMAND"
  [ "$status" -eq 0 ]
}