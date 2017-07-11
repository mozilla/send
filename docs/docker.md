## Environment variables:

| Name             | Description
|------------------|-------------|
| `PORT`           | Port the server will listen on (defaults to 1443).
| `P2P_S3_BUCKET`  | The S3 bucket name.
| `P2P_REDIS_HOST` | Host name of the Redis server.
| `NODE_ENV`       | "production"

## Example:

```sh
$ docker run --net=host -e 'NODE_ENV=production' -e 'P2P_S3_BUCKET=testpilot-p2p-dev' -e 'P2P_REDIS_HOST=dyf9s2r4vo3.bolxr4.0001.usw2.cache.amazonaws.com' mozilla/send:latest
```
