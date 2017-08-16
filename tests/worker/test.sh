#!/bin/bash

echo "Verifying that mongo has no data in it before the test"
count=`docker run --rm -it --net worker_default mongo:3.2.11 bash -c "mongo mongo/favourite-foods --quiet --eval \"db['favourite-foods'].count()\""`
count="$(echo -e "${count}" | tr -d '[:space:]')"

if [ "$count" != "0" ]; then
   echo "TEST FAILED: favourite-foods table was not empty before starting test";
   exit 1;
fi

# Add something to the redis queue
echo "Adding something to the redis queue"
docker run --rm -it --net worker_default redis:4.0.1-alpine redis-cli -h redis -p 6379 lpush new-foods "{person:Celene,food:Broccoli}"

echo "Waiting a few seconds to give the worker a chance to process"
sleep 2

echo "Verifying that the worker inserted into the database"
count=`docker run --rm -it --net worker_default mongo:3.2.11 bash -c "mongo mongo/favourite-foods --quiet --eval \"db['favourite-foods'].count()\""`
count="$(echo -e "${count}" | tr -d '[:space:]')"

if [ "$count" != "1" ]; then
   echo "TEST FAILED: Expecting worker to insert one row into DB but it didnt";
   exit 1;
fi