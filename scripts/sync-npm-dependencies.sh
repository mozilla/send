#!/bin/bash

echo "checking package-lock.json for changes"
if [ "$1" != "$2" ]; then
  DIFF=$(git diff $1 $2 package-lock.json)
  if [ "$DIFF" != "" ]; then
    npm install
  fi
fi