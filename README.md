# [![Firefox Send](./assets/icon.svg)](https://send.firefox.com/) Firefox Send

[![CircleCI](https://img.shields.io/circleci/project/github/mozilla/send.svg)](https://circleci.com/gh/mozilla/send)

**Docs:** [FAQ](docs/faq.md), [Encryption](docs/encryption.md), [Build](docs/build.md), [Docker](docs/docker.md), [Metrics](docs/metrics.md), [More](docs/)

---

## Table of Contents

* [What it does](#what-it-does)
* [Requirements](#requirements)
* [Development](#development)
* [Commands](#commands)
* [Configuration](#configuration)
* [Localization](#localization)
* [Contributing](#contributing)
* [Testing](#testing)
* [Deployment](#deployment)
* [Android](#android)
* [License](#license)

---

## What it does

A file sharing experiment which allows you to send encrypted files to other users.

---

## Requirements

- [Node.js 12.x](https://nodejs.org/)
- [Redis server](https://redis.io/) (optional for development)
- [AWS S3](https://aws.amazon.com/s3/) or compatible service. (optional)

---

## Development

To start an ephemeral development server run:

```sh
npm install
npm start
```

Then browse to http://localhost:8080

---

## Commands

| Command          | Description |
|------------------|-------------|
| `npm run format` | Formats the frontend and server code using **prettier**.
| `npm run lint`   | Lints the CSS and JavaScript code.
| `npm test`       | Runs the suite of mocha tests.
| `npm start`      | Runs the server in development configuration.
| `npm run build`  | Builds the production assets.
| `npm run prod`   | Runs the server in production configuration.

---

## Configuration

The server is configured with environment variables. See [server/config.js](server/config.js) for all options and [docs/docker.md](docs/docker.md) for examples.

---

## Localization

Firefox Send localization is managed via [Pontoon](https://pontoon.mozilla.org/projects/test-pilot-firefox-send/), not direct pull requests to the repository. If you want to fix a typo, add a new language, or simply know more about localization, please get in touch with the [existing localization team](https://pontoon.mozilla.org/teams/) for your language or Mozilla’s [l10n-drivers](https://wiki.mozilla.org/L10n:Mozilla_Team#Mozilla_Corporation) for guidance.

see also [docs/localization.md](docs/localization.md)

---

## Contributing

Pull requests are always welcome! Feel free to check out the list of ["good first issues"](https://github.com/mozilla/send/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

---

## Testing

| ENVIRONMENT | URL
|-------------|-----
| Production  | <https://send.firefox.com/>
| Stage       | <https://stage.send.nonprod.cloudops.mozgcp.net/>
| Development | <https://send2.dev.lcip.org/>

---

## Deployment

see also [docs/deployment.md](docs/deployment.md)

---

## Android

The android implementation is contained in the `android` directory, and can be viewed locally for easy testing and editing by running `ANDROID=1 npm start` and then visiting <http://localhost:8080>. CSS and image files are located in the `android/app/src/main/assets` directory.

---

## License

[Mozilla Public License Version 2.0](LICENSE)

---
