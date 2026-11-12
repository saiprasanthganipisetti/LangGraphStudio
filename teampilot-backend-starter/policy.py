"""Small deterministic policy checks shared by graph nodes and API routes."""
from collections import defaultdict

def validate_capacity(tasks: list[dict], members: list[dict]) -> list[str]:
    totals = defaultdict(float)
    issues = []
    valid_ids = {m["member_id"] for m in members}
    for task in tasks:
        owner = task.get("proposed_owner_id")
        if owner is None:
            continue
        if owner not in valid_ids:
            issues.append(f"Unknown owner for task {task.get('task_id', '<unknown>')}")
            continue
        totals[owner] += float(task.get("estimated_hours", 0))
    for member in members:
        assigned = totals[member["member_id"]]
        capacity = float(member.get("weekly_capacity_hours", 0))
        if assigned > capacity:
            issues.append(
                f"{member['name']}: {assigned:g}h assigned exceeds {capacity:g}h capacity"
            )
    return issues

def may_prepare_emails(manager_decision: dict | None) -> bool:
    """Draft generation is allowed only after explicit approved decision."""
    return bool(manager_decision and manager_decision.get("status") == "approved")
