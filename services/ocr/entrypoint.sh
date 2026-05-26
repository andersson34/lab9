#!/usr/bin/env sh
set -e

PORT=${PORT:-8081}
export PORT

exec node src/server.js
