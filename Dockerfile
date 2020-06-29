FROM ubuntu:20.04

RUN apt-get update -y && \
    apt-get install -y software-properties-common

RUN apt-get install -y \
  curl \
  vim \
  git \
  unzip

RUN curl -sL https://deb.nodesource.com/setup_13.x | bash - && \
    apt-get install -y nodejs

RUN npm install

EXPOSE 9000
EXPOSE 3000

RUN adduser pai
USER pai
WORKDIR /home/brandysm/projekt
VOLUME /home/brandysm/projekt
