#!/usr/bin/env sh
set -e

PORT=${PORT:-8082}
export PORT

exec node src/server.js
