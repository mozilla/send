# Firefox Send

[![CircleCI](https://circleci.com/gh/mozilla/send.svg?style=svg)](https://circleci.com/gh/mozilla/send)

## What it does

A P2P file sharing experiment which allows you to send encrypted files to other users.

## Requirements

- [Node.js 8+](https://nodejs.org/)
- [Redis server](https://redis.io/)

**NOTE:** To run the project, make sure you have a Redis server running locally:

```sh
$ redis-server /usr/local/etc/redis.conf
```

## How to use it

| Command          | Description |
|------------------|-------------|
| `npm run dev`    | Builds and starts the web server locally for development.
| `npm run format` | Formats the frontend and server code using **prettier**.
| `npm run lint`   | Lints the CSS and JavaScript code.
| `npm start`      | Starts the Express web server.
| `npm test`       | Runs the suite of mocha tests.

## Localization

_Coming soon_ (see [#57](https://github.com/mozilla/send/issues/57))

## Contributing

Pull requests are always welcome! Feel free to check out the list of ["good first bugs"](https://github.com/mozilla/send/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+bug%22).

## Testing

| ENVIRONMENT | URL
|-------------|-----
| Production  | <https://send.firefox.com/>
| Stage       | <https://send.stage.mozaws.net/>
| Development | <https://send.dev.mozaws.net/>

## License

[Mozilla Public License Version 2.0](LICENSE)
