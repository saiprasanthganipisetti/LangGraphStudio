# LangGraph Adventure Studio – V4

A bright, browser-based workshop companion for a six-person LangGraph hackathon. The visual style uses an original cheerful explorer landscape (not copied characters or artwork).

## Run locally
No build step is required. Open `index.html` in a modern browser, or serve the folder:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Included destinations
- Welcome Village: adventure map and Byte mentor introduction.
- State Forest: TypedDict, Dataclass and Pydantic comparison with downloadable `state.py`.
- Graph Bridge: sequential, conditional and router graph patterns with downloadable `graph.py`.
- Puzzle Mountain: parallel execution, fan-out/fan-in, reducers, map-reduce with `Send`, and subgraphs. Includes examples, trade-offs, a knowledge check and local progress tracking.
- Agent Academy: workflow vs chain vs agent, tool calling, ReAct loop, bounded multi-agent collaboration, a safety-aware decision simulator, code recipes, quiz and local progress tracking.
- Memory Lake: thread-scoped short-term memory with checkpointers, cross-thread long-term memory with Store, Profile and Collection schemas, TeamPilot design choices, memory safety guidance, code recipes, quiz and local progress tracking.

## Important implementation notes
- The Python snippets are educational starter examples, not a claim of runtime validation. Before the workshop, choose and pin compatible Python, `langgraph`, `langchain` and `pydantic` versions; run each downloaded snippet in a clean virtual environment and adjust imports/APIs if needed.
- The fan-out/fan-in example writes to separate state keys. The reducer example demonstrates a shared list key with `Annotated[list[str], operator.add]`.
- Parallel branch completion order should not be relied upon for stable presentation order. Add source labels and sort results when deterministic ordering matters.
- Map-reduce uses `Send` to dispatch one research worker per technology. For a production workflow, add bounded concurrency, retries, error capture and real research tools.
- The subgraph example uses a shared state schema for clarity. More complex parent/child schemas may require adapter nodes or explicit state mapping.
- Byte's speech uses browser speech synthesis. Voice availability and pronunciation depend on the user's browser and installed voices.
- Choices and progress are stored in browser `localStorage`.

- Agent Academy snippets are instructional templates. The tool-calling graph uses `ToolNode` and `tools_condition`; verify imports and model integration against the exact pinned LangGraph/LangChain versions before the session. The specialist example is deterministic routing, not a claim that placeholder nodes are autonomous agents.

- Memory Lake snippets are educational starter examples. `InMemorySaver` and `InMemoryStore` are demo-only and are not durable across process restarts. Configure and test a persistent checkpointer and Store backend for deployment. Check the exact import paths and backend setup against the pinned LangGraph release.

## Project direction
The final product is TeamPilot AI: a project management assistant that analyses requirements, researches unfamiliar technologies, generates tasks, allocates work across six team members, validates assignments, requests human approval and drafts personalised emails. Workshop Studio remains separate from the TeamPilot backend.

- Time Travel Cave: checkpoints, static breakpoints, dynamic interrupts, resume with Command, inspect state/history, edit checkpoints, time-travel branching, and application-level double-texting strategies. Includes TeamPilot approval/rework examples and selectable Python recipes.

Time Travel Cave snippets are teaching templates. Use a durable production checkpointer, verify APIs against the pinned LangGraph version, and implement application-level concurrency and idempotency for external side effects. `InMemorySaver` is for local demonstrations only.

- Research Observatory: Research Assistant workflow, tool-calling lifecycle, source verification, evidence-aware reports, technology discovery decisions, and streaming progress. Includes selectable Python starter recipes and a simulated UI stream.

Research Observatory snippets are educational templates. Connect only approved tools and sources, validate tool inputs, preserve source provenance, and test streaming APIs against the pinned LangGraph release. The browser streaming demo is simulated and does not call a live provider.

- TeamPilot HQ: final MVP planning studio with project intake, six editable sample profiles, transparent allocation simulation, validation, manager approval gate, email previews and exportable preview payload. Includes a separate `teampilot-backend-starter/` FastAPI + LangGraph scaffold.

TeamPilot HQ is a local browser prototype; file selection does not upload or parse documents, allocation is keyword-based demonstration logic, and emails are never sent. Review the backend starter README before adapting it for real data or deployment.

## V10 curriculum audit and integration baseline

- `curriculum-audit.html` maps the named technical lessons in the official Introduction to LangGraph – Python course to workshop modules or explicit standalone labs. The Academy listing reports 55 total course lessons, including setup/resources/feedback items; the audit counts the named learning topics separately.
- `teampilot-backend-starter/` now targets Python 3.12 and pins LangGraph 1.2.20, FastAPI 0.162.4 and Pydantic 2.14.3. Provider SDK selection remains open.
- `teampilot-backend-starter/policy.py` and `tests/test_policy.py` provide deterministic capacity and approval-gate unit tests.

The snippets across the adventure modules have not all been runtime-tested against this baseline yet. Treat them as instructional recipes until each is ported into an executable test and verified in the workshop environment.
