#!/usr/bin/env bash
#
# This is a very simple test suite using curl. It
# simply makes sure that all urls give a 200 response
# code. If any of the urls does not give a 200 response
# code then the test will fail.
#

echo "Running tests now"

set -e

# Add any urls you want to test here.
# "api" is the host name of the api that we are testing,
# this hostname is resolved by docker to the IP of the container.
urls=(
    api/
    api/favourite-foods
)

for url in ${urls[@]}; do
    # Check the url to make sure it gives 200
    printf "$url -> "
    response=`curl --fail -sS -I -L $url | grep 'HTTP/1.1'`

    printf "$response\n"
done