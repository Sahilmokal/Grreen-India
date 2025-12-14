# 🌱 Green India – AI-Powered Sustainability Assistant

Green India is an end-to-end AI-powered web application that helps users make **eco-friendly decisions** by detecting everyday objects from images and providing **actionable sustainability suggestions**.  
The system combines **computer vision, backend orchestration, and user feedback learning** to move beyond awareness and enable real-world environmental impact.

---

## 🚀 Live Deployment
- **Frontend (Vercel):** Deployed and live using standard Vercel workflow
- **Backend:** Spring Boot (API orchestration)
- **ML Service:** FastAPI (YOLO-based object detection)

---

## 🧠 Key Features

- 📷 **Image-based object detection** using a YOLO model
- 🌍 **Eco-friendly suggestions** mapped to detected objects
- 🔐 **User authentication** (Register / Login)
- 👍👎 **User feedback system** (Like / Dislike suggestions)
- 📈 **Feedback-based learning** to improve suggestion ranking
- 🔍 **Explainable AI** (“Why this suggestion?”)
- ⚙️ **Production-oriented architecture**
- ☁️ **Globally accessible frontend via Vercel**

---

## 🏗️ Tech Stack

### Frontend
- **React (Vite)**
- Deployed on **Vercel**
- Handles authentication, image upload, and displaying suggestions

### Backend
- **Spring Boot**
- REST APIs for authentication, uploads, suggestions, and feedback
- Acts as a secure orchestrator between frontend and ML service
- Stores suggestions and feedback data

### Machine Learning
- **YOLO-based object detection**
- Served via **FastAPI**
- Detects waste-related objects (plastic bottles, bags, containers, etc.)
- Returns labels and confidence scores

### AI-Assisted Development
- **Cline CLI**
- Used to accelerate:
  - API scaffolding
  - Service layer generation
  - Refactoring and integration
 "The CLI improved developer productivity and reduced boilerplate."

---

## 🧩 Architecture Overview

