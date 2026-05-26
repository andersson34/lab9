#!/usr/bin/env sh
set -e

for service in ocr-service search-service; do
  container_id="$(docker compose ps -q "$service")"

  if [ -z "$container_id" ]; then
    echo "Service $service is not running"
    exit 1
  fi

  while true; do
    status="$(docker inspect --format='{{.State.Health.Status}}' "$container_id")"
    if [ "$status" = "healthy" ]; then
      break
    fi
    if [ "$status" = "unhealthy" ]; then
      echo "Service $service is unhealthy"
      exit 1
    fi
    sleep 2
  done

done

echo "All services are healthy"
