# Server Code

The server provides the API, serves static assets, and renders the pages for Send. The production entrypoint is [prod.js](./bin/prod.js) and the development entrypoint is [dev.js](./bin/dev.js) via `webpack-dev-server`.

## Server configuration

[config.js](./config.js) contains the schema for our configuration options. Environment variables are the preferred method for setting configuration.

## Middleware

Contains authentication and localization middleware.

## Routes

Contains all the server routes and handlers for the API and pages

## Storage

Contains implementations of possible storage engines for the files and metadata
