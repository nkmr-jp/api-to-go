#!/usr/bin/env bash

# ファイルが一致するかどうかを確認する関数
assert_files_match() {
  local generated_file="./$BASE_HOST$1"
  local fixture_file="./fixture/$BASE_HOST$1"

  diff_output=$(diff "$generated_file" "$fixture_file")
  diff_status=$?

  [ "$diff_status" -eq 0 ] # diff コマンドが0を返した場合、ファイルは一致しています
}
