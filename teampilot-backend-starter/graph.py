"""TeamPilot graph scaffold. Replace placeholder nodes with tested implementations."""
from langgraph.graph import StateGraph, START, END
from state import TeamPilotState

def analyse_requirements(state: TeamPilotState):
    # TODO: invoke a structured-output model; preserve source excerpts.
    return {"analysis": {"status": "needs_model", "brief_length": len(state.get("requirements_text", ""))}}

def research_technologies(state: TeamPilotState):
    # TODO: call approved search/docs tools; persist source metadata.
    return {"research_evidence": []}

def design_components(state: TeamPilotState):
    # TODO: produce components and dependency links from verified analysis.
    return {"components": []}

def generate_tasks(state: TeamPilotState):
    # TODO: produce stories, estimates and acceptance criteria.
    return {"tasks": []}

def allocate_tasks(state: TeamPilotState):
    # TODO: use explainable skill/capacity matching; unknown tech must not be assigned blindly.
    return {"tasks": state.get("tasks", [])}

def validate_plan(state: TeamPilotState):
    # TODO: enforce capacity, missing owner, dependency and policy checks.
    return {"allocation_validation": {"status": "not_implemented"}}

def approval_gate(state: TeamPilotState):
    # TODO: add interrupt(payload) and resume via Command(resume=...).
    return {"manager_decision": {"status": "pending"}}

def prepare_emails(state: TeamPilotState):
    # TODO: create drafts only after approved manager decision.
    return {"email_previews": []}

builder = StateGraph(TeamPilotState)
for name, fn in [
    ("analyse", analyse_requirements),
    ("research", research_technologies),
    ("components", design_components),
    ("stories", generate_tasks),
    ("allocate", allocate_tasks),
    ("validate", validate_plan),
    ("approval", approval_gate),
    ("emails", prepare_emails),
]:
    builder.add_node(name, fn)

builder.add_edge(START, "analyse")
builder.add_edge("analyse", "research")
builder.add_edge("research", "components")
builder.add_edge("components", "stories")
builder.add_edge("stories", "allocate")
builder.add_edge("allocate", "validate")
builder.add_edge("validate", "approval")
builder.add_edge("approval", "emails")
builder.add_edge("emails", END)

# Configure a durable checkpointer for deployment; in-memory is demo-only.
team_pilot_graph = builder.compile()
