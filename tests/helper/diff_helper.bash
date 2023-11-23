#!/usr/bin/env bash

assert_files_match() {
  local generated_file="./$BASE_HOST$1"
  local fixture_file="./fixture/$BASE_HOST$1"

  diff_output=$(diff "$generated_file" "$fixture_file")
  diff_status=$?

  [ "$diff_status" -eq 0 ]
}
