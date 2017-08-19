#!/usr/bin/env bash

set -e

# Get the current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "\n>>>> STARTING DOCKER-COMPOSE"
docker-compose build
docker-compose up -d

# Add a trap so the containers will always be cleaned
# up properly, no matter what happens.
cleanup() {
    echo -e "\n>>>> CLEANING UP DOCKER-COMPOSE"
    docker-compose kill
    docker-compose rm -f
}
trap "cleanup" INT TERM EXIT

echo "Waiting for mongo and the app to spin up";
# TODO: Improve this by polling instead
sleep 20

# Insert data
echo -e "\n>>>> PRE-POPULATING DATABASE"
docker run --rm -it --net web_default -v $DIR/db-preload-data.js:/db-preload-data.js mongo:3.2.11 bash -c "mongo mongo/favourite-foods < /db-preload-data.js"

# Run tests
echo -e "\n>>>> RUNNING TESTS"
docker run --rm -it --net web_default -v $DIR/behat:/root/project tvial/behat behat


if [ "$?" != "0" ]; then
    echo "Integration tests FAILED :("
    exit 1
fi

echo "Integration tests PASSED!"
