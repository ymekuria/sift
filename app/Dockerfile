FROM node:latest

RUN npm install nodemon -g

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src/ && cp -a /tmp/node_modules /src/


WORKDIR /src
ADD . /src

EXPOSE 3000

CMD npm start
