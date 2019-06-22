##
# Firefox Send - Mozilla
#
# License https://github.com/mozilla/send/blob/master/LICENSE
##


# Build project
FROM node:10 AS builder
RUN set -x \
    # Add user
    && addgroup --gid 10001 app \
    && adduser --disabled-password \
        --gecos '' \
        --gid 10001 \
        --home /app \
        --uid 10001 \
        app \
    # Install system dependencies
    && npm install rimraf -g
USER app
COPY . /app/
WORKDIR /app
RUN set -x \
    # Build
    && rm -f package-lock.json \
    && npm install \
    && npm run build \
    # Delete 'node_modules' dir
    && rm -rf node_modules


# Download prod dependencies
FROM node:10 AS prod-dependencies
RUN set -x \
    # Add user
    && addgroup --gid 10001 app \
    && adduser --disabled-password \
        --gecos '' \
        --gid 10001 \
        --home /app \
        --uid 10001 \
        app \
    # Install system dependencies
    && npm install rimraf -g
COPY package*.json /app/
WORKDIR /app
RUN npm install --production


# Main image
FROM node:10-slim
WORKDIR /app
COPY --chown=10001:10001 --from=builder /app .
COPY --chown=10001:10001 --from=prod-dependencies /app/node_modules ./node_modules
RUN set -x \
    # Add user
    && addgroup --gid 10001 app \
    && adduser --disabled-password \
        --gecos '' \
        --gid 10001 \
        --home /app \
        --uid 10001 \
        app \
    # Fix permissions
    && chown 10001.10001 .

USER app

ENV PORT=1443

EXPOSE ${PORT}

CMD ["node", "server/bin/prod.js"]
