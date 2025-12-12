# app/utils.py
import requests
import tempfile
import os

def download_image_to_temp(url: str, timeout=15):
    """
    Download an image from URL to a temporary file.
    Returns path to temp file. Caller must remove it.
    """
    resp = requests.get(url, stream=True, timeout=timeout)
    resp.raise_for_status()
    suffix = ".jpg"
    tf = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    try:
        for chunk in resp.iter_content(chunk_size=8192):
            if chunk:
                tf.write(chunk)
        tf.flush()
    finally:
        tf.close()
    return tf.name

def safe_remove(path: str):
    try:
        if path and os.path.exists(path):
            os.remove(path)
    except Exception:
        pass
