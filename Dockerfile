FROM node:4-onbuild

MAINTAINER Pavel Zinovev zombiqwerty@yandex.ru

ENV NODE_ENV=development

RUN mkdir -p /app

COPY ./src /app/src
COPY ./test /app/test
COPY ./data /app/data
COPY ./bin /app/bin
COPY ./public /app/public

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

WORKDIR /app

RUN apt-get update && apt-get install -y imagemagick

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN export PATH="$PATH:$HOME/.yarn/bin"

RUN npm install -g nodemon yarn
RUN yarn

ENTRYPOINT ["yarn", "run", "start"]
EXPOSE 9095

VOLUME /app/public
VOLUME /app/src
