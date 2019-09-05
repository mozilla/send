#!/bin/bash

echo "checking package-lock.json for changes"
IFS=' '
read -ra G_PARAMS <<< "$HUSKY_GIT_PARAMS"
PREV=${G_PARAMS[0]}
NEXT=${G_PARAMS[1]}
if [ "$PREV" != "$NEXT" ]; then
  DIFF=$(git diff $PREV $NEXT package-lock.json)
  if [ "$DIFF" != "" ]; then
    npm install
  fi
fi