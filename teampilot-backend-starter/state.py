from typing import TypedDict, Any

class TeamMember(TypedDict):
    member_id: str
    name: str
    role: str
    skills: list[str]
    interests: list[str]
    weekly_capacity_hours: float
    email: str

class Task(TypedDict):
    task_id: str
    title: str
    description: str
    acceptance_criteria: list[str]
    estimated_hours: float
    required_skills: list[str]
    proposed_owner_id: str | None

class TeamPilotState(TypedDict, total=False):
    project_id: str
    project_name: str
    requirements_text: str
    analysis: dict[str, Any]
    research_evidence: list[dict[str, Any]]
    components: list[dict[str, Any]]
    tasks: list[Task]
    team_members: list[TeamMember]
    allocation_validation: dict[str, Any]
    manager_decision: dict[str, Any]
    email_previews: list[dict[str, str]]
