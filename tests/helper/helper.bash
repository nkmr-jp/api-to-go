#!/bin/bash

load helper/doc_helper
load helper/diff_helper

setup() {
  echo "--start--"
}

teardown() {
  echo "command:"
  echo "$COMMAND"
  echo ""
  echo "status:"
  echo "$status"
  echo ""
  echo "output:"
  if jq -e . >/dev/null 2>&1 <<< "$output"; then
    echo "$output" | jq
  else
    echo "$output"
  fi
  echo "--end--"
}