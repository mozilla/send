Environment Variables:

PORT - port the server will listen on (defaults to 1443)
P2P_S3_BUCKET - the S3 bucket name
P2P_REDIS_HOST - host name of the redis server
NODE_ENV - production

Example

docker run --net=host -e 'NODE_ENV=production' -e 'P2P_S3_BUCKET=testpilot-p2p-dev' -e 'P2P_REDIS_HOST=dyf9s2r4vo3.bolxr4.0001.usw2.cache.amazonaws.com' mozilla/portal:latest
