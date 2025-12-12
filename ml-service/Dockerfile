# ml-service/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# avoid prompts
ENV DEBIAN_FRONTEND=noninteractive

# copy requirements - choose minimal or full
COPY requirements-min.txt ./requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

# copy app
COPY app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
