# TeamPilot backend starter

This is a scaffold for the TeamPilot MVP, not a production-ready backend.

## Run locally

Use Python 3.12.x. Create and activate a virtual environment, install the pinned baseline from `requirements.txt`, then run:

```bash
uvicorn main:app --reload
```

The starter uses placeholder graph nodes. It does not yet parse PDF/DOCX files, call an LLM, persist checkpoints, authenticate users, research the web, or send email.

## Before a real workshop build

1. Agree and pin compatible Python, LangGraph, LangChain and model-provider versions.
2. Replace placeholder nodes with tested implementations and structured output schemas.
3. Add secure document ingestion, size/type limits, malware scanning and extraction.
4. Configure a durable checkpointer and application database.
5. Add authentication, authorisation, tenant/project isolation and audit logs.
6. Implement research tools with allow-listed sources, provenance and rate limits.
7. Add human interrupts and a persisted manager approval record.
8. Add tests for routing, reducers, retries, interrupts, concurrency and failure recovery.
9. Keep email preview separate from sending; require approval for the exact draft and idempotency protection.
10. Store provider and SMTP credentials in a secret manager. Never commit secrets.

The graph is intentionally a simple sequential skeleton. Add parallel branches, subgraphs, conditional edges, streaming and memory only where the product workflow needs them.

## Baseline and validation

The baseline pins LangGraph 1.2.20, FastAPI 0.162.4 and Pydantic 2.14.3 (checked against PyPI on 2026-11-12). Uvicorn is constrained to a compatible major range. The chosen model-provider SDK is intentionally not installed until the team chooses a provider.

Run the deterministic policy tests with:

```bash
python -m unittest discover -s tests -v
```

These tests cover simple workload-capacity checks and the email approval predicate only. They do not validate LangGraph runtime APIs, model behaviour, persistence, document parsing or AWS email delivery.
