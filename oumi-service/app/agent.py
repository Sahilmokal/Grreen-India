from typing import List, Dict

ALLOWED_LABELS = {
    "plastic_bottle",
    "plastic_bag",
    "plastic_container",
    "glass_bottle",
    "glass_container",
    "aluminum_can",
    "tin_can"
}

CONFUSION_PAIRS = {
    frozenset(["plastic_bag", "plastic_container"]),
    frozenset(["glass_bottle", "glass_container"]),
    frozenset(["aluminum_can", "tin_can"]),
}

CONFIDENCE_THRESHOLD = 0.5
CONFUSION_GAP_THRESHOLD = 0.15


def normalize(label: str) -> str:
    return label.strip().lower().replace(" ", "_")


def verify_with_confusion_resolution(detections: List[Dict]):
    if not detections:
        return reject("no_detections")

    candidates = []
    for d in detections:
        label = normalize(d.get("label", ""))
        confidence = float(d.get("confidence", 0.0))

        if label in ALLOWED_LABELS:
            candidates.append({
                "label": label,
                "confidence": confidence
            })

    if not candidates:
        return reject("invalid_labels")

    candidates.sort(key=lambda x: x["confidence"], reverse=True)

    top1 = candidates[0]
    top2 = candidates[1] if len(candidates) > 1 else None

    if top1["confidence"] < CONFIDENCE_THRESHOLD:
        return reject("low_confidence")

    if not top2:
        return approve(top1["label"], top1["confidence"], "single_candidate")

    gap = top1["confidence"] - top2["confidence"]
    pair = frozenset([top1["label"], top2["label"]])

    # 🔥 Confusion case → resolved here
    if gap < CONFUSION_GAP_THRESHOLD and pair in CONFUSION_PAIRS:
        return {
            "approved": True,
            "final_label": top1["label"],
            "confidence": round(top1["confidence"], 2),
            "reason": "confusion_resolved"
        }

    return approve(top1["label"], top1["confidence"], "clear_winner")


def approve(label, confidence, reason):
    return {
        "approved": True,
        "final_label": label,
        "confidence": round(confidence, 2),
        "reason": reason
    }


def reject(reason):
    return {
        "approved": False,
        "final_label": "unknown_item",
        "confidence": 0.0,
        "reason": reason
    }
