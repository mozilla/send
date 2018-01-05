## Take-down process

In cases of a DMCA notice, or other abuse yet to be determined, a file has to be removed from the service.

Files can be delisted and made inaccessible by removing their record from Redis.

Send share links contain the id of the file, for example `https://send.firefox.com/download/3d9d2bb9a1`

From a host with access to the Redis server run a `DEL` command with the file id.

For example:

```sh
redis-cli DEL 3d9d2bb9a1
```

Other redis-cli parameters like `-h` may also be required. See [redis-cli docs](https://redis.io/topics/rediscli) for more info.