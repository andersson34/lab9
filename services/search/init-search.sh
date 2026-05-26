#!/usr/bin/env sh
set -e

OCR_URL=${OCR_URL:-http://ocr-service:8081}

until curl -fsS "$OCR_URL/health" >/dev/null; do
  sleep 2
done

exec "$@"
