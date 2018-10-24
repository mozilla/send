FROM node:8-alpine
ENV NODE_ENV=production

RUN apk add --no-cache git \
    && addgroup -S -g 10001 app \
    && adduser -S -D -G app -u 10001 app \
    && mkdir -p /app/static

COPY . /app
WORKDIR /app
RUN chown -R app /app
USER app

# npm install --production <= This is currently not working since there are missing dependencies for a production build
# Workaround to remove .git files as webpack build uses git-rev-sync and fails otherwise
RUN npm install --dev \
    && npm cache clean --force \
    && npm run build \
    && rm -rf .git

ENV PORT=1443
EXPOSE $PORT

CMD ["npm", "run", "prod"]
