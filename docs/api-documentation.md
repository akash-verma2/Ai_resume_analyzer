# REST API Documentation

Base URL: `http://localhost:5000/api`  
AI Service Base URL: `http://localhost:8000/api/v1`

---

## 1. Authentication Endpoints

### 1.1 Register New User
- **Method:** `POST`
- **Route:** `/auth/register`
- **Request Body:**
```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "password": "Password123!",
  "role": "user",
  "targetRole": "Full Stack Developer"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "670123...",
    "name": "Alex Johnson",
    "email": "alex@example.com",
    "role": "user",
    "targetRole": "Full Stack Developer"
  }
}
```

### 1.2 User Login
- **Method:** `POST`
- **Route:** `/auth/login`
- **Request Body:**
```json
{
  "email": "alex@example.com",
  "password": "Password123!"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### 1.3 Get Current User Profile
- **Method:** `GET`
- **Route:** `/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
```json
{
  "success": true,
  "user": { ... }
}
```

---

## 2. Resume Management Endpoints

### 2.1 Upload and Analyze Resume
- **Method:** `POST`
- **Route:** `/resumes/upload`
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Body:** `file` (`.pdf`, `.docx`, `.txt`)
- **Response (200 OK):**
```json
{
  "success": true,
  "resume": {
    "id": "res_101",
    "fileName": "Alex_Johnson_Resume.pdf",
    "contact": {
      "name": "Alex Johnson",
      "email": "alex.j@gmail.com",
      "phone": "+1 555-019-2834",
      "links": ["github.com/alexj", "linkedin.com/in/alexj"]
    },
    "skills": {
      "technical": ["JavaScript", "React", "Node.js", "MongoDB", "Express", "Python", "Git"],
      "soft": ["Problem Solving", "Team Leadership"],
      "tools": ["Docker", "Postman", "VS Code"]
    },
    "atsScore": {
      "overall": 82,
      "breakdown": {
        "completeness": 88,
        "skillsRepertoire": 80,
        "actionVerbs": 78,
        "formatting": 85
      },
      "tips": [
        "Include quantitative impact metrics (e.g., 'improved performance by 25%')",
        "Consider adding TypeScript to expand full-stack compatibility"
      ]
    },
    "createdAt": "2026-10-12T17:45:00.000Z"
  }
}
```

### 2.2 List User Resumes
- **Method:** `GET`
- **Route:** `/resumes`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):** Array of saved resumes for current user.

### 2.3 Get Resume By ID
- **Method:** `GET`
- **Route:** `/resumes/:id`

### 2.4 Delete Resume
- **Method:** `DELETE`
- **Route:** `/resumes/:id`

---

## 3. Job Matcher Endpoints

### 3.1 Get All Jobs (with Search & Filters)
- **Method:** `GET`
- **Route:** `/jobs`
- **Query Params:** `search`, `role`, `location`, `experienceLevel`, `employmentType`

### 3.2 Match Resume Against All Jobs
- **Method:** `POST`
- **Route:** `/matches/:resumeId`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
```json
{
  "success": true,
  "resumeId": "res_101",
  "totalJobsEvaluated": 15,
  "matches": [
    {
      "jobId": "job_01",
      "title": "Full Stack MERN Engineer",
      "company": "CloudScale Technologies",
      "location": "Bengaluru, India (Hybrid)",
      "experienceLevel": "Entry / Junior (0-2 yrs)",
      "employmentType": "Full-time",
      "overallScore": 84,
      "skillScore": 80,
      "semanticScore": 92,
      "matchedSkills": ["JavaScript", "React", "Node.js", "MongoDB"],
      "missingSkills": ["TypeScript", "Docker"],
      "explanation": "You match 4 out of 5 required skills (80% explicit coverage). Contextual analysis shows strong alignment with their web architecture requirements."
    }
  ]
}
```

---

## 4. Skill Gap & Learning Roadmap Endpoints

### 4.1 Generate Skill Gap Roadmap
- **Method:** `POST`
- **Route:** `/resumes/:id/roadmap`
- **Body:** `{ "targetRole": "Full Stack Developer" }`
- **Response (200 OK):**
```json
{
  "success": true,
  "targetRole": "Full Stack Developer",
  "missingSkills": ["TypeScript", "Docker", "Redis", "Jest"],
  "roadmap": [
    {
      "phase": "Phase 1: Strongly Typed JavaScript (TypeScript)",
      "duration": "2 Weeks",
      "skills": ["TypeScript", "Interfaces", "Generics", "TS with React"],
      "resources": [
        { "title": "Official TypeScript Handbook", "url": "https://www.typescriptlang.org/docs/" },
        { "title": "TypeScript Crash Course (freeCodeCamp)", "url": "https://youtube.com" }
      ],
      "project": "Refactor your React todo/e-commerce app to full TypeScript with strict type checking."
    }
  ]
}
```

---

## 5. Job Application Tracker Endpoints

- `GET /applications` - List all applications with status
- `POST /applications` - Create/save a job application
- `PATCH /applications/:id` - Update status (`Saved`, `Applied`, `Interview`, `Offered`, `Rejected`) or notes
- `DELETE /applications/:id` - Remove application

---

## 6. AI Mock Interview Simulator Endpoints

### 6.1 Generate Interview Questions
- **Method:** `POST`
- **Route:** `/interview/generate`
- **Body:** `{ "jobId": "job_01", "resumeId": "res_101" }`
- **Response:** Array of 5 questions with categories (Technical, System Architecture, Behavioral, Project Deep-Dive).

### 6.2 Evaluate User Interview Answer
- **Method:** `POST`
- **Route:** `/interview/evaluate`
- **Body:**
```json
{
  "questionId": "q_1",
  "questionText": "How does React Virtual DOM diffing work?",
  "userAnswer": "The virtual DOM is an in-memory representation. React compares it with the previous snapshot using a heuristic reconciliation algorithm..."
}
```
- **Response:**
```json
{
  "score": 88,
  "strengths": ["Clear understanding of reconciliation heuristic", "Accurate definition of memory tree"],
  "improvements": ["Mention key prop optimization in list diffing"],
  "modelAnswer": "..."
}
```

---

## 7. Resume Version Comparison Endpoint

- **Method:** `POST`
- **Route:** `/resumes/compare`
- **Body:** `{ "resumeIdA": "res_101", "resumeIdB": "res_102" }`
- **Response:** Side-by-side metric comparison, newly acquired skills, ATS score variance.
