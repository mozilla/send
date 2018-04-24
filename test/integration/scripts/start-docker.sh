#!/bin/bash
# piping to dev/null for starting the server within the firefox docker image
npm install > "/dev/null" 2>&1
npm start > "/dev/null" 2>&1 &
