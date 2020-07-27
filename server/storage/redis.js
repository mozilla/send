const promisify = require('util').promisify;

module.exports = function(config) {
  const redis_lib =
    config.env === 'development' && config.redis_host === 'mock'
      ? 'redis-mock'
      : 'redis';

  //eslint-disable-next-line security/detect-non-literal-require
  const redis = require(redis_lib);
  const client = redis.createClient({
    host: config.redis_host,
    retry_strategy: options => {
      if (options.total_retry_time > config.redis_retry_time) {
        client.emit('error', 'Retry time exhausted');
        return new Error('Retry time exhausted');
      }

      return config.redis_retry_delay;
    }
  });

  client.ttlAsync = promisify(client.ttl);
  client.hgetallAsync = promisify(client.hgetall);
  client.hgetAsync = promisify(client.hget);
  client.hincrbyAsync = promisify(client.hincrby);
  client.hmgetAsync = promisify(client.hmget);
  client.pingAsync = promisify(client.ping);
  client.existsAsync = promisify(client.exists);
  return client;
};
