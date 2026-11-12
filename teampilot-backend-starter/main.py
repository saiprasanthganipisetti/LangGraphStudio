from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from graph import team_pilot_graph

app = FastAPI(title="TeamPilot API", version="0.1.0")

class ProjectRequest(BaseModel):
    project_id: str
    project_name: str
    requirements_text: str

@app.get("/health")
def health():
    return {"status": "ok", "service": "teampilot"}

@app.post("/projects/run")
def run_project(request: ProjectRequest):
    try:
        result = team_pilot_graph.invoke({
            "project_id": request.project_id,
            "project_name": request.project_name,
            "requirements_text": request.requirements_text,
        })
        return {"status": "prototype_scaffold", "result": result}
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Workflow execution failed") from exc

@app.get("/projects/{project_id}/status")
def project_status(project_id: str):
    # TODO: read persisted project/thread state after authentication.
    return {"project_id": project_id, "status": "not_connected_to_persistence"}
