FROM node:16-alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app

RUN chown node:node /usr/src/app

USER node

COPY --chown=node:node package.json /usr/src/app
COPY --chown=node:node yarn.lock /usr/src/app

RUN yarn install --production

COPY --chown=node:node . /usr/src/app

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
