FROM alpine:latest

RUN apk update && apk add \
    bash \
    nano \
    git
RUN apk add npm && \
    npm install -g npm@6.8 && \
    hash -r

WORKDIR /home/backend
COPY . .
RUN npm i