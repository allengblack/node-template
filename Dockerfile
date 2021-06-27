FROM node:alpine

WORKDIR /app

RUN apk add yarn

COPY package.json yarn.lock ./

RUN yarn 

COPY . .

RUN yarn build

CMD ["yarn", "start"]