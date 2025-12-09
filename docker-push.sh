#!/bin/bash

source ./dockerhub-config.txt

set -e

docker build -t "$IMAGE_NAME:$TAG" ./master-relax-app

# echo "$REGISTRY_PASSWORD" | docker login -u "$REGISTRY_USER" --password-stdin

# docker push "$IMAGE_NAME:$TAG"

# echo "✅ Done! Image pushed to $IMAGE_NAME:$TAG"