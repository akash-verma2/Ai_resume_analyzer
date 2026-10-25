# AI-Powered Resume Analyzer and Job Matcher
### Final Year Computer Science & Engineering (CSE) Capstone Project

An enterprise-grade, full-stack AI web platform built using the **MERN Stack (MongoDB, Express.js, React, Node.js)** and **Python FastAPI (NLP & Machine Learning)**. The system helps college graduates and job seekers analyze their resumes against Applicant Tracking Systems (ATS), identify skill gaps, generate customized learning roadmaps, optimize resumes, track job applications, and practice mock technical interviews.

---

## 🌟 Key Functional Modules

1. **Resume Parser & ATS Score Auditor**
   - Supports `.pdf`, `.docx`, and `.txt` file uploads up to 10MB.
   - Extracts contact details (email, phone, LinkedIn/GitHub links).
   - Normalizes skills against a curated 500+ tech taxonomy (languages, frameworks, databases, cloud, DevOps, AI/ML, tools, soft skills).
   - Calculates a multi-axis ATS score (0-100) auditing section completeness, skill density, impact verbs, and formatting.

2. **Explainable AI Job Matcher**
   - Ranks active job listings based on an explainable mathematical formula:
     $$\text{Match Score} = (0.70 \times \text{Skill Coverage}) + (0.30 \times \text{TF-IDF Cosine Semantic Similarity})$$
   - Displays matched skills (green badges) and missing skills (amber badges) separately.
   - Filters by compatibility percentage, role, location, and keywords.

3. **Personalized Skill Gap Analyzer & Learning Roadmap**
   - Identifies deficient competencies for any target role (e.g., Full Stack Developer, Frontend, Backend, AI/ML).
   - Generates a 3-phase curriculum with links to official documentation and free video crash courses.
   - Recommends an end-to-end portfolio capstone project with practice tasks.

4. **AI-Powered Resume Builder**
   - Live WYSIWYG paper editor with real-time ATS preview.
   - Integrated AI action verb enhancer and professional summary rewriter.
   - Clean printable layout with 1-click PDF export (`window.print()`).

5. **Job Application Tracking System (Kanban)**
   - Tracks application stages: `Saved`, `Applied`, `Interview`, `Offered`, `Rejected`.
   - Records application dates, deadlines, and personal interview notes.

6. **AI Mock Interview Simulator**
   - Dynamically generates 5 targeted technical, architectural, and behavioral questions.
   - Evaluates candidate typed answers using automated rubric grading (0-100).
   - Identifies concepts covered and highlights topics requiring deeper preparation.

7. **Resume Version Comparator (Unique Differentiator)**
   - Compares Baseline Version A vs Revised Version B side-by-side.
   - Highlights score delta, newly acquired skills, and academic improvement verdict.

8. **Admin Management & Algorithmic Testbed**
   - Post and curate job listings.
   - Run algorithmic validation benchmarks on experimental candidate-job pairs.

---

## 🏗️ System Architecture

```
[ Client Browser: React.js (Vite + Tailwind CSS + Recharts) ]
             │  (REST / JSON API)
             ▼
[ API Gateway: Node.js / Express Server (Port 5000) ]
   ├── Authentication Middleware (JWT & Bcrypt)
   ├── In-Memory Failover Engine (High-Availability Demonstration)
   └── Mongoose ODM ──▶ [ MongoDB Cluster / Database ]
             │  (Internal Microservice HTTP Calls)
             ▼
[ AI NLP Microservice: Python FastAPI (Port 8000) ]
   ├── Document Extractors (PyPDF, python-docx)
   ├── Skill Taxonomy Canonical Normalizer
   ├── Scikit-learn TF-IDF Vectorizer & Cosine Similarity
   └── ATS Rubric Quality Scorer
```

---

## 📂 Project Directory Structure

```
ai-resume-analyzer-project/
├── frontend/                     # React 18 SPA (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/           # Navbar, Sidebar, ScoreGauge, RadarScoreChart, JobCard, etc.
│   │   ├── pages/                # Dashboard, ResumeAnalysis, JobMatcher, Roadmap, Builder, Tracker, etc.
│   │   ├── services/             # Axios API client
│   │   ├── context/              # AuthContext session management
│   │   └── App.jsx, index.css
│   └── package.json
│
├── backend/                      # Node.js / Express.js REST API
│   ├── config/db.js              # MongoDB connector with embedded in-memory fallback
│   ├── controllers/              # Auth, Resume, Job, Match, Application, Interview
│   ├── routes/                   # Express router endpoints
│   ├── middleware/               # JWT auth & Multer file upload
│   ├── services/aiService.js     # Python service client & JS fallback engine
│   ├── data/seedData.js          # Benchmark CSE jobs and sample resumes
│   └── server.js, package.json
│
├── ai-service/                   # Python FastAPI NLP Engine
│   ├── app/
│   │   ├── main.py               # FastAPI entry point
│   │   ├── extractors/           # PDF and DOCX text parsers
│   │   ├── nlp/                  # 500+ Skill taxonomy and contact extractor
│   │   ├── matching/             # TF-IDF Cosine & coverage matching
│   │   └── analysis/             # ATS rubric, roadmap, and interview prep
│   └── requirements.txt
│
├── docs/                         # Final Year CSE Documentation
│   ├── SRS.md                    # IEEE Std 830-1998 Software Requirements Specification
│   ├── architecture.md           # System Architecture & Data Flow Diagrams
│   ├── api-documentation.md      # REST API schemas & endpoints
│   ├── database-design.md        # Schemas & ER diagram
│   └── VIVA_QUESTIONS.md         # Comprehensive Viva Defense Guide
│
├── start-dev.bat                 # 1-Click Windows batch launcher
├── start-all.ps1                 # PowerShell startup script
└── package.json                  # Root runner script
```

---

## 🚀 Quickstart & Installation

### Prerequisites
- **Node.js**: v18 or higher (v22 installed)
- **Python**: 3.10 or higher (v3.12 installed)
- **MongoDB**: (Optional — application automatically activates an embedded in-memory store if local MongoDB is not running).

### Option 1: 1-Click Launch (Windows)
Double-click `start-dev.bat` or run in PowerShell:
```powershell
.\start-all.ps1
```

### Option 2: Manual Step-by-Step

#### 1. Start Python AI Microservice (Port 8000)
```powershell
cd ai-service
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
*Interactive Swagger API Docs available at `http://localhost:8000/docs`.*

#### 2. Start Express.js Backend (Port 5000)
```powershell
cd backend
npm run dev
```
*Health check endpoint at `http://localhost:5000/health`.*

#### 3. Start React Frontend (Port 5173)
```powershell
cd frontend
npm run dev
```
*Visit `http://localhost:5173` in your browser.*

---

## 🎯 Viva Defense Shortcuts
- **Instant Student Login:** Click **"Student"** or **"Load Sample MERN Resume"** on the upload screen to instantly populate the benchmark dataset without searching for files.
- **Instant Admin Login:** Click **"Admin"** to open the Department Faculty console.
- **Explainable Formula:** Open any Job Card and click **"View AI Formula"** to present the exact breakdown of Skill Coverage and TF-IDF Cosine distance to evaluators.
- **Review Viva Notes:** Open [`docs/VIVA_QUESTIONS.md`](docs/VIVA_QUESTIONS.md) for expected questions and theoretical answers.

---

## 📜 License
MIT License — Final Year CSE Academic Project.
