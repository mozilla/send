FROM node:8-alpine

RUN adduser -S app
COPY . /app
RUN chown -R app /app
USER app
WORKDIR /app
RUN mkdir static
RUN npm install

ENV PORT=1443
EXPOSE $PORT

CMD ["npm", "start"]
