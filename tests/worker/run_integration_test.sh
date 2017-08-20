#!/usr/bin/env bash

set -e

# Get the current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR

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

echo "Waiting for mongo to spin up";
# TODO: Improve this by polling instead
sleep 3

# Run tests
echo -e "\n>>>> RUNNING TESTS"
$DIR/test.sh

if [ "$?" != "0" ]; then
    echo "Integration tests FAILED :("
    exit 1
fi

echo "Integration tests PASSED!"
