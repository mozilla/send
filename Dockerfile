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
        app
RUN npm i -g npm
COPY --chown=app:app . /app
COPY --chown=app:app .git /app/.git
USER app
WORKDIR /app
RUN set -x \
    # Build
    && npm ci \
    && npm run build

# Main image
FROM node:10-slim
RUN set -x \
    # Add user
    && addgroup --gid 10001 app \
    && adduser --disabled-password \
        --gecos '' \
        --gid 10001 \
        --home /app \
        --uid 10001 \
        app
RUN apt-get update && apt-get -y install \
    git-core \
    && rm -rf /var/lib/apt/lists/*
USER app
WORKDIR /app
COPY --chown=app:app package*.json ./
COPY --chown=app:app app app
COPY --chown=app:app common common
COPY --chown=app:app public/locales public/locales
COPY --chown=app:app server server

RUN npm ci --production && npm cache clean --force
RUN mkdir -p /app/.config/configstore
RUN ln -s dist/version.json version.json

ENV PORT=1443

EXPOSE ${PORT}

CMD ["node", "server/bin/prod.js"]
