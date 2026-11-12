"""Email adapter boundary. This scaffold never sends mail."""
from typing import TypedDict

class EmailDraft(TypedDict):
    to: str
    subject: str
    body: str

def preview_email(draft: EmailDraft) -> EmailDraft:
    if not draft.get("to") or "@" not in draft["to"]:
        raise ValueError("A valid recipient address is required")
    return draft

def send_approved_email(draft: EmailDraft, approval_id: str, *, aws_mode: bool = False):
    """TODO: implement the deployed SMTP service adapter.

    Require a persisted manager approval for this exact draft, verify recipient,
    use an idempotency key, log the outcome, and load credentials from a secret
    manager. Local mode must remain preview-only.
    """
    if not aws_mode:
        return {"status": "preview_only", "approval_id": approval_id}
    raise NotImplementedError("Configure and secure the AWS SMTP service adapter first.")
