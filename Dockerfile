FROM node:10 AS builder
RUN addgroup --gid 10001 app && adduser --disabled-password --gecos '' --gid 10001 --home /app --uid 10001 app
COPY package*.json /app/
WORKDIR /app
RUN npm install --production

FROM node:10-slim
RUN addgroup --gid 10001 app && adduser --disabled-password --gecos '' --gid 10001 --home /app --uid 10001 app
USER app
WORKDIR /app
COPY --chown=app:app --from=builder /app .
COPY --chown=app:app . .
RUN mkdir -p /app/.config/configstore
RUN ln -s dist/version.json version.json

ENV PORT=1443
EXPOSE $PORT

CMD ["node", "server/bin/prod.js"]
