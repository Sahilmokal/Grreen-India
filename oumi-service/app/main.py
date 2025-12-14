from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
from app.agent import verify_with_confusion_resolution

app = FastAPI(title="Oumi Verifier Service")

class VerifyRequest(BaseModel):
    detections: List[Dict]

@app.post("/verify")
def verify(req: VerifyRequest):
    return verify_with_confusion_resolution(req.detections)
