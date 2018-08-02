FROM node:10-alpine

RUN apk add --no-cache git
RUN addgroup -S -g 10001 app && adduser -S -D -G app -u 10001 app
COPY . /app
RUN chown -R app /app
USER app
WORKDIR /app
RUN mkdir static
RUN npm install --production && npm cache clean --force

ENV PORT=1443
EXPOSE $PORT

CMD ["npm", "run", "prod"]
