FROM mhart/alpine-node:8.3.0

RUN yarn global add @angular/cli@1.3.0

WORKDIR /src

ADD . /src/

RUN yarn install

EXPOSE 4200

CMD ["ng", "serve", "-H", "0.0.0.0"]
