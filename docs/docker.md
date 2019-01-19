## Setup

Before building the Docker image, you must build the production assets:

```sh
npm run build
```

Then you can run either `docker build` or `docker-compose up`.


## Environment variables:

| Name             | Description
|------------------|-------------|
| `PORT`           | Port the server will listen on (defaults to 1443).
| `S3_BUCKET`  | The S3 bucket name.
| `REDIS_HOST` | Host name of the Redis server.
| `SENTRY_CLIENT` | Sentry Client ID
| `SENTRY_DSN` | Sentry DSN
| `MAX_FILE_SIZE` | in bytes (defaults to 2147483648)
| `NODE_ENV`       | "production"

## Example:

```sh
$ docker run --net=host -e 'NODE_ENV=production' \
  -e 'S3_BUCKET=testpilot-p2p-dev' \
  -e 'REDIS_HOST=dyf9s2r4vo3.bolxr4.0001.usw2.cache.amazonaws.com' \
  -e 'SENTRY_CLIENT=https://51e23d7263e348a7a3b90a5357c61cb2@sentry.prod.mozaws.net/168' \
  -e 'SENTRY_DSN=https://51e23d7263e348a7a3b90a5357c61cb2:65e23d7263e348a7a3b90a5357c61c44@sentry.prod.mozaws.net/168' \
  mozilla/send:latest
```
