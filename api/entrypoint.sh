#!/usr/bin/env sh

HOST=mongo;
PORT=27017;
TIMEOUT=20;
END=$(($(date "+%s+$TIMEOUT")));
while [ $(date "+%s") -lt $END ];
do
    nc -z -w1 $HOST $PORT && break;
done

if [ $? != 0 ]; then
    echo "Timeout waiting for mongodb server"
    exit 1
fi

echo "Connected to mongodb, launching nodejs"

/usr/bin/node /app/server.js