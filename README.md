# Firefox Send

[![CircleCI](https://img.shields.io/circleci/project/github/mozilla/send.svg)](https://circleci.com/gh/mozilla/send)
[![Available on Test Pilot](https://img.shields.io/badge/available_on-Test_Pilot-0996F8.svg)](https://testpilot.firefox.com/experiments/send)

**Docs:** [Docker](docs/docker.md), [Metrics](docs/metrics.md)

## What it does

A file sharing experiment which allows you to send encrypted files to other users.

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

Firefox Send localization is managed via [Pontoon](https://pontoon.mozilla.org/projects/test-pilot-firefox-send/), not direct pull requests to the repository. If you want to fix a typo, add a new language, or simply know more about localization, please get in touch with the [existing localization team](https://pontoon.mozilla.org/teams/) for your language, or Mozilla’s [l10n-drivers](https://wiki.mozilla.org/L10n:Mozilla_Team#Mozilla_Corporation) for guidance.

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
