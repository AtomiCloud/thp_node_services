#!/usr/bin/env bash
set -e

version="$1"

docker build -t "kirinnee/random-v1:$version" random/v1
docker build -t "kirinnee/random-v2:$version" random/v2
docker build -t "kirinnee/write-v1:$version" write/v1
docker build -t "kirinnee/write-v2:$version" write/v2
docker build -t "kirinnee/time-v1:$version" time/v1
docker build -t "kirinnee/time-v2:$version" time/v2

docker push "kirinnee/random-v1:$version"
docker push "kirinnee/random-v2:$version"
docker push "kirinnee/write-v1:$version"
docker push "kirinnee/write-v2:$version"
docker push "kirinnee/time-v1:$version"
docker push "kirinnee/time-v2:$version"
