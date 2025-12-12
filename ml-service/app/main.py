# app/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from .detect import run_detection, USE_REAL, MODEL_PATH
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GreenIndia ML Service")

# allow local frontend to call
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DetectRequest(BaseModel):
    image_url: str

class Detection(BaseModel):
    label: str
    confidence: float
    bbox: List[int] = []

@app.get("/health")
def health():
    return {"status":"ok", "use_real_model": USE_REAL}

@app.get("/info")
def info():
    return {"status":"ok", "use_real_model": USE_REAL, "model_path": MODEL_PATH}

@app.post("/detect")
def detect(req: DetectRequest):
    if not req.image_url:
        raise HTTPException(status_code=400, detail="image_url required")
    detections = run_detection(req.image_url)
    return {"detections": detections}

# Optional: rank endpoint placeholder (backend may call)
@app.post("/rank")
def rank(payload: Dict):
    """
    Placeholder: accept suggestions+detections and return ranked suggestions.
    Implement your ranking logic here or call ML policy.
    """
    # simple example: sort suggestions by impactScore (if present)
    suggestions = payload.get("suggestions", [])
    try:
        suggestions_sorted = sorted(suggestions, key=lambda s: s.get("impactScore", s.get("impact_score", 0)), reverse=True)
    except Exception:
        suggestions_sorted = suggestions
    return {"ranked": suggestions_sorted}

# Optional: train endpoint for manual triggering (stub)
@app.post("/train")
def train(payload: Dict = {}):
    """
    Triggers training job. For now we return accepted.
    Integrate Oumi or training script here.
    """
    # In production you'd queue a job or call Oumi CLI/notebook
    return {"status": "queued", "note": "Training is not implemented in this stub. Use Oumi for training orchestration."}
