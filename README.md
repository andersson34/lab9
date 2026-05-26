# Capstone CI/CD Lab

Proyecto base para integrar microservicios OCR y Search con pipeline profesional de CI/CD.

## Arquitectura

- `services/ocr`: microservicio de extraccion de texto.
- `services/search`: microservicio de indexacion y busqueda.
- `tests/e2e`: pruebas end-to-end del flujo completo.
- `prototype/ci-cd`: artefactos de provisionamiento y estandares del pipeline.
- `.github/workflows/capstone-ci.yml`: pipeline principal de GitHub Actions.

## Requisitos

- Node.js 20+
- npm 10+
- Docker Engine activo para pruebas de contrato y E2E en contenedores

## Ejecucion local

Instalar dependencias:

```bash
npm install
```

Iniciar microservicios en modo desarrollo:

```bash
docker compose up --build
```

En desarrollo, `docker-compose.override.yml` se aplica automaticamente y expone:

- OCR en `http://localhost:8081`
- Search en `http://localhost:8082`

## Pruebas

Pruebas unitarias:

```bash
npm run test:unit
```

Flujo completo de CI local (unit + contrato + E2E):

```bash
docker compose -f docker-compose.yml -f docker-compose.test.yml up -d --build
sh prototype/ci-cd/scripts/wait-for-health.sh
docker compose exec -T ocr-service npm run test:unit
docker compose exec -T search-service npm run test:unit
docker compose exec -T search-service npm run test:contract
docker compose run --rm test-runner npm run test:e2e
docker compose -f docker-compose.yml -f docker-compose.test.yml down -v
```

## Pipeline CI/CD

El workflow aplica tres etapas:

1. `build`: construye imagenes Docker de OCR y Search.
2. `test`: ejecuta unitarias, contrato y E2E en entorno efimero.
3. `push`: publica imagenes en GHCR solo si la rama es `main` y todas las pruebas pasaron.

## Contratos de API

OCR:

- `GET /health`
- `POST /extract`
	- Request: `{ "documentId": "id", "content": "texto" }`
	- Response: `{ "documentId", "text", "wordCount", "extractedAt" }`

Search:

- `GET /health`
- `POST /index`
- `POST /ingest`
- `GET /search?q=...`

## Reglas de calidad

- Ningun push de imagen ocurre si hay fallas de pruebas.
- Las pruebas de contrato validan el acuerdo OCR-Search en cada ejecucion de CI.
- Las pruebas E2E garantizan el recorrido completo de ingest y busqueda.
