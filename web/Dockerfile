FROM mhart/alpine-node:8.3.0

WORKDIR /app

ADD html/package.json /app/package.json
ADD html/yarn.lock /app/yarn.lock
#RUN npm config set registry http://registry.npmjs.org
RUN yarn upgrade -v

ADD html /app/.

EXPOSE 3000

RUN ./node_modules/typescript/bin/tsc

CMD ["node", "/app/server.js"]