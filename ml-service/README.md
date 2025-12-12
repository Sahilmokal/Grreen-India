# ML Service (Green India)

This service exposes:
- `POST /detect` : { "image_url": "http://..." } -> { "detections": [...] }
- `GET /health` : health check
- `GET /info` : returns model info

Modes:
- Stub mode (default): deterministic responses (fast, no heavy deps).
- Real model mode: set `USE_REAL_MODEL=true` and ensure ultralytics + torch installed. Set `MODEL_PATH` env var to a weights file (e.g., `best.pt` or `yolov8n.pt`).

## Run locally (stub)
Windows:
```powershell
cd ml-service
python -m venv venv
venv\Scripts\Activate
pip install -r requirements-min.txt
uvicorn app.main:app --reload --port 8000
