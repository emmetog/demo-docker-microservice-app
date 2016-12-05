FROM mhart/alpine-node:5.11.0

WORKDIR /app

ADD html/package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm ls

ADD html /app/.

EXPOSE 80

RUN ./node_modules/typescript/bin/tsc

CMD ["node", "/app/server.js"]