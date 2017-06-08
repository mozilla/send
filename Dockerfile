FROM node:8-alpine

COPY . /app
WORKDIR /app
RUN mkdir static
RUN npm install

EXPOSE 1443
CMD ["npm", "start"]
