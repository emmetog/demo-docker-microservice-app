FROM mhart/alpine-node:5.11.0

WORKDIR /app

ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm ls
RUN mv /app/node_modules /node_modules

COPY entrypoint.sh /entrypoint.sh
RUN chmod 0500 /entrypoint.sh
ENTRYPOINT /entrypoint.sh

ADD . /app

EXPOSE 80