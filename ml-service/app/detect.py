# app/detect.py
"""
Detection module.

Modes:
- Stub mode (default): deterministic simple rules for demo.
- Real YOLO mode: set environment var USE_REAL_MODEL=true and optionally MODEL_PATH
  to a weights file (e.g., best.pt). Requires 'ultralytics' installed.

API:
- run_detection(image_url: str) -> list[dict(label, confidence, bbox)]
"""

import os
import traceback
from typing import List, Dict

USE_REAL = os.environ.get("USE_REAL_MODEL", "false").lower() in ("1", "true", "yes")
MODEL_PATH = os.environ.get("MODEL_PATH", "yolov8n.pt")  # default to official yolov8n download
_model = None

def _load_model():
    global _model
    if _model is not None:
        return _model
    try:
        from ultralytics import YOLO
    except Exception as e:
        raise RuntimeError("Ultralytics not installed. Install via 'pip install ultralytics' to use real model.") from e

    # load model (this may download weights if not present)
    model = YOLO(MODEL_PATH)
    _model = model
    return _model

def run_detection_stub(image_url: str) -> List[Dict]:
    u = image_url.lower() if image_url else ""
    # heuristic deterministic rules for demo
    if any(k in u for k in ("plastic", "bottle", "demo1")):
        return [{"label": "plastic_bottle", "confidence": 0.95, "bbox": [10,10,100,200]}]
    if any(k in u for k in ("bulb", "lamp", "demo2")):
        return [{"label": "incandescent_bulb", "confidence": 0.92, "bbox": [20,20,80,160]}]
    if any(k in u for k in ("paper", "cup")):
        return [{"label": "paper_cup", "confidence": 0.88, "bbox": [5,5,60,120]}]
    return [{"label": "unknown_item", "confidence": 0.50, "bbox":[0,0,0,0]}]

def run_detection_yolo(image_path_or_url: str) -> List[Dict]:
    """
    Accepts either local path or URL (we download URL to temp file in main).
    Returns list of detections.
    """
    model = _load_model()
    # ultralytics accepts path or url; but to be robust, pass path
    results = model(image_path_or_url)  # returns Results object(s)
    out = []
    try:
        for res in results:  # usually a single result
            boxes = getattr(res, "boxes", None)
            if boxes is None:
                continue
            for box in boxes:
                conf = float(box.conf) if hasattr(box, "conf") else float(box.confidence)
                cls = int(box.cls)
                # model.names available
                name = model.names[cls] if hasattr(model, "names") and cls in model.names else str(cls)
                # get xyxy
                xyxy = box.xyxy[0].tolist() if hasattr(box, "xyxy") else []
                bbox = [int(x) for x in xyxy] if xyxy else [0,0,0,0]
                out.append({"label": name, "confidence": conf, "bbox": bbox})
    except Exception:
        # fallback: try results.boxes.xyxy etc.
        traceback.print_exc()
    return out

def run_detection(image_url: str) -> List[Dict]:
    """
    Public function used by FastAPI.
    If USE_REAL is false, returns stub results.
    If USE_REAL true, downloads image temporarily and runs YOLO inference.
    """
    if not USE_REAL:
        return run_detection_stub(image_url)

    # Real model path: download url to temp file (caller will remove)
    from .utils import download_image_to_temp, safe_remove
    local = None
    try:
        local = download_image_to_temp(image_url)
        detections = run_detection_yolo(local)
        return detections
    except Exception as ex:
        # if model fails, fallback to stub with an 'error' field added
        print("YOLO detection failed:", ex)
        traceback.print_exc()
        fallback = run_detection_stub(image_url)
        # attach an error marker for callers
        for d in fallback:
            d.setdefault("meta", {})["ml_error"] = str(ex)
        return fallback
    finally:
        safe_remove(local)
