# Software Requirements Specification (SRS)
## Project Title: AI-Powered Resume Analyzer and Job Matcher
**Document Version:** 1.0  
**Project Category:** Final Year CSE Capstone Project  
**Author / Team:** CSE Department Project Team  
**Standard:** Adhering to IEEE Std 830-1998  

---

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to provide a complete and detailed specification for the **AI-Powered Resume Analyzer and Job Matcher** web application. It specifies functional, non-functional, and interface requirements for software engineers, project evaluators, and academic defense committees.

### 1.2 Scope
The system addresses the widening gap between college graduates and modern job market demands. Many applicants face repeated rejections due to non-optimized resumes, missing ATS keywords, and lack of clarity on skill deficiencies. This system provides:
1. Automated parsing of unstructured PDF/DOCX resumes.
2. Skill extraction and canonical normalization across 500+ tech taxonomy categories.
3. Transparent Applicant Tracking System (ATS) scoring with section-by-section audit.
4. Explainable job matching using hybrid mathematical models (Skill Coverage + TF-IDF Semantic Cosine Similarity).
5. Personalized skill gap analysis and step-by-step role-based learning roadmap generation.
6. Real-time AI Resume Builder with ATS templates and PDF export.
7. Kanban-style Job Application Tracking system.
8. Interactive Mock Interview Prep simulator generating technical and behavioral questions with instant automated feedback.
9. Side-by-side Resume Version Comparison (Version A vs. Version B).
10. Administrative dashboard for job catalogue curation and analytics.

### 1.3 Definitions, Acronyms, and Abbreviations
- **ATS:** Applicant Tracking System.
- **NLP:** Natural Language Processing.
- **TF-IDF:** Term Frequency-Inverse Document Frequency.
- **Cosine Similarity:** A metric used to measure how similar two vectors are irrespective of their size.
- **JWT:** JSON Web Token for stateless authenticated client-server communication.
- **MERN:** MongoDB, Express.js, React.js, Node.js.
- **REST:** Representational State Transfer.

---

## 2. Overall System Description

### 2.1 Product Perspective
The application is a distributed multi-tier client-server system consisting of:
- **Presentation Layer (Frontend):** React.js single-page application built with Vite and Tailwind CSS.
- **Application Logic Layer (Backend):** Node.js and Express.js REST API service handling auth, persistence, and service orchestration.
- **AI/NLP Processing Engine (Microservice):** Python FastAPI service utilizing `pypdf`, `python-docx`, `scikit-learn`, and regularized skill taxonomy matchers.
- **Data Persistence Layer:** MongoDB NoSQL database (with seamless in-memory failover for instant local demonstration).

```
[ Client Browser: React SPA ]
             │  (HTTPS / REST)
             ▼
[ Backend: Node.js / Express Gateway ] ── (Mongoose / MongoDB) ──▶ [ MongoDB Cluster ]
             │  (Internal HTTP API)
             ▼
[ AI Microservice: Python FastAPI Engine ]
  (Text Extraction, Skill Normalizer, TF-IDF Matcher, ATS Evaluator)
```

### 2.2 User Classes and Characteristics
1. **Student / Job Seeker:** Uploads resumes, inspects ATS scores, examines matched jobs, inspects skill roadmaps, builds optimized resumes, tracks applications, and takes practice interviews.
2. **Academic Evaluator / Recruiter:** Reviews system benchmark datasets, tests explainability breakdown, and verifies scoring formulas.
3. **Administrator:** Curates company job listings, monitors user usage metrics, and benchmarks similarity algorithms.

---

## 3. Specific Functional Requirements (FR)

### Module 1: Authentication & User Profiles
- **FR-1.1:** System shall allow user registration with name, email, password, and target role preferences.
- **FR-1.2:** System shall hash passwords using `bcryptjs` and issue signed JWT tokens.
- **FR-1.3:** System shall provide role-based route protection for authenticated users and administrators.

### Module 2: Resume Parser & Text Extractor
- **FR-2.1:** System shall accept `.pdf`, `.docx`, and `.txt` file uploads up to 10MB.
- **FR-2.2:** Python AI service shall extract raw textual content preserving paragraph structures.
- **FR-2.3:** System shall extract candidate contact information (email, phone, LinkedIn/GitHub links).
- **FR-2.4:** System shall detect standard structural sections (Summary, Education, Experience, Skills, Projects, Certifications).

### Module 3: Skill Taxonomy & Normalization Engine
- **FR-3.1:** Engine shall scan textual tokens against a curated multi-domain tech skill dictionary (Languages, Frameworks, Databases, Cloud/DevOps, AI/ML, Testing, Core CS).
- **FR-3.2:** Engine shall canonicalize synonyms (e.g., `React.js` -> `React`, `k8s` -> `Kubernetes`, `Node` -> `Node.js`, `Mongo` -> `MongoDB`).
- **FR-3.3:** Engine shall classify skills into Technical, Soft, and Domain categories.

### Module 4: ATS Score & Quality Auditor
- **FR-4.1:** System shall calculate an overall ATS score on a scale of 0 to 100.
- **FR-4.2:** ATS score shall consist of transparent sub-scores:
  - Section Completeness (25%)
  - Skill Density & Repertoire (30%)
  - Action Verbs & Quantified Metrics (25%)
  - Structural Formatting & Length (20%)
- **FR-4.3:** System shall generate actionable, categorized improvement recommendations.

### Module 5: Explainable Job Matching Engine
- **FR-5.1:** System shall calculate Match Compatibility between a candidate's resume and job requirements using a hybrid formula:
  $$\text{Match Percentage} = (w_1 \times \text{Skill Coverage}) + (w_2 \times \text{Semantic Similarity})$$
  Default: $w_1 = 0.70$ (Explicit Skill Coverage), $w_2 = 0.30$ (TF-IDF Cosine Similarity).
- **FR-5.2:** Explicit Skill Coverage formula:
  $$\text{Skill Coverage} = \frac{|\text{Extracted Skills} \cap \text{Required Job Skills}|}{|\text{Required Job Skills}|} \times 100$$
- **FR-5.3:** System shall display matched skills (green badges) and missing skills (amber badges) separately for complete transparency.

### Module 6: Skill Gap Analyzer & Learning Roadmap
- **FR-6.1:** System shall identify deficient competencies for any target role.
- **FR-6.2:** System shall construct an ordered, multi-phase curriculum (Foundation -> Intermediate -> Advanced Production).
- **FR-6.3:** Each phase shall list free high-quality documentation links, YouTube/Coursera references, and suggested portfolio capstone projects.

### Module 7: AI Resume Builder & PDF Generation
- **FR-7.1:** System shall provide interactive forms with live WYSIWYG preview.
- **FR-7.2:** System shall offer AI bullet-point enhancer injecting strong action verbs and metrics.
- **FR-7.3:** System shall allow one-click PDF compilation and download.

### Module 8: Application Tracking System (ATS Kanban)
- **FR-8.1:** System shall allow users to bookmark jobs and track applications through statuses: `Saved`, `Applied`, `Interview`, `Offered`, `Rejected`.
- **FR-8.2:** System shall log application dates, interview deadlines, contact names, and notes.

### Module 9: AI Mock Interview Simulator
- **FR-9.1:** System shall dynamically generate 5+ targeted interview questions (Technical, Architecture, Behavioral, Project-specific) based on candidate resume and selected job role.
- **FR-9.2:** Candidate can type their response and submit for automated evaluation.
- **FR-9.3:** System shall provide scored feedback (0-100), key highlights, and suggested model answers.

### Module 10: Resume Version Comparator
- **FR-10.1:** System shall allow selecting two distinct resume uploads or revisions.
- **FR-10.2:** System shall render side-by-side metric diffs (score delta, new skills gained, enhanced job coverage).

---

## 4. Non-Functional Requirements (NFR)

1. **Performance:** Text extraction and skill parsing completed within $\le 2.5$ seconds for standard resumes ($\le 3$ pages).
2. **Reliability & Fault Tolerance:** If the Python FastAPI microservice is offline, the Node.js backend seamlessly executes an embedded JavaScript fallback matching engine so that no user request fails.
3. **Security:** JWT authentication with HMAC-SHA256, BCrypt 10-round salt password hashing, file type validation, and sanitized inputs.
4. **Usability & Aesthetics:** Modern responsive UI built with Tailwind CSS, clean dark/light mode accents, glassmorphic card overlays, accessible WCAG contrast standards, and responsive viewport support from 375px to 4K displays.
