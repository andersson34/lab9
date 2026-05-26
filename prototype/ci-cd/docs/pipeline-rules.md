# Pipeline Rules

- Build must pass for OCR and Search before tests can start.
- Unit, contract and E2E tests must pass before image publishing.
- Merge to main requires all checks green.
- Image push is allowed only for direct pushes to main.
- Teardown must run even when tests fail.
