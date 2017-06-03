FROM node:8-alpine

RUN yarn global add nodemon

COPY . /src
WORKDIR /src

RUN cd /src && yarn

EXPOSE 8080

CMD ["node", "index.js"]
