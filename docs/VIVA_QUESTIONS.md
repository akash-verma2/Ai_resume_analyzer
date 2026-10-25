# Final Year CSE Viva Defense & Evaluation Guide
## AI-Powered Resume Analyzer and Job Matcher

This document contains frequently asked viva questions, architectural justifications, algorithmic explanations, and sample answers for the university project examination committee.

---

### Q1: Why did you choose a Decoupled Architecture (Node.js/Express + Python FastAPI) instead of a monolithic stack?
**Answer:**
1. **Specialization:** Python is the de-facto standard for NLP and Machine Learning with battle-tested libraries (`pypdf`, `python-docx`, `scikit-learn`, `spacy`).
2. **Asynchronous I/O Performance:** Node.js/Express excel at high-concurrency REST API gateways, non-blocking file streaming, JWT authentication, and MongoDB transactions.
3. **Microservices Scalability:** The compute-heavy NLP processing (vectorization, cosine distance) can be scaled horizontally without blocking client web requests or authentication flows.
4. **Resilience & Fault-Tolerance:** Our Node.js backend includes an embedded fallback NLP parser. Even if the Python microservice is restarting, the web application maintains 100% availability.

---

### Q2: How does the AI Job Matching Algorithm work mathematically?
**Answer:**
Rather than using an opaque "black-box" model, our system implements an **Explainable Hybrid Dual-Score Formula**:

1. **Skill Coverage Score ($S_{cov}$):**
   $$S_{cov} = \frac{|\mathcal{S}_{resume} \cap \mathcal{S}_{job\_req}|}{|\mathcal{S}_{job\_req}|} \times 100$$
   *Example:* If a job requires [React, Node.js, TypeScript, Docker, MongoDB] (5 skills) and the resume contains [React, Node.js, MongoDB] (3 skills), $S_{cov} = \frac{3}{5} \times 100 = 60\%$.

2. **Semantic Similarity Score ($S_{sem}$):**
   Using TF-IDF (Term Frequency-Inverse Document Frequency) vectorization, the resume content and job description are transformed into normalized vector embeddings $\vec{v}_r$ and $\vec{v}_j$. We compute Cosine Similarity:
   $$\cos(\theta) = \frac{\vec{v}_r \cdot \vec{v}_j}{\|\vec{v}_r\| \|\vec{v}_j\|}$$
   $$S_{sem} = \cos(\theta) \times 100$$

3. **Composite Match Score:**
   $$\text{Final Score} = \text{round}(0.70 \times S_{cov} + 0.30 \times S_{sem})$$
   *Explainability:* The system displays both the overall score and the breakdown of Matched vs. Missing skills so the student understands exactly why they received that score.

---

### Q3: What is TF-IDF and why is it used here?
**Answer:**
- **Term Frequency (TF):** Measures how frequently a word appears in a document.
- **Inverse Document Frequency (IDF):** Discounts common stop words (e.g., "the", "and", "with") while amplifying discriminative technical terms (e.g., "Kubernetes", "GraphQL", "TensorFlow").
- **Cosine Similarity:** Measures the angular similarity between two document vectors in multidimensional vector space, regardless of resume length or document size.

---

### Q4: How is the ATS Score calculated?
**Answer:**
The ATS score is a rubric-based quality index out of 100 with four core components:
1. **Section Completeness (25%):** Checks for standard sections (Summary, Skills, Work Experience, Education, Projects).
2. **Skill Density & Categorization (30%):** Validates technical skills, tools, and domain competencies against the industry taxonomy.
3. **Action Verbs & Quantified Metrics (25%):** Scans for impactful verbs (e.g., *Architected*, *Implemented*, *Optimized*, *Accelerated*) and quantifiable results (percentages, metrics, scale numbers).
4. **Structure & Formatting (20%):** Validates word count, contact info presence (email, phone, LinkedIn/GitHub), bullet point structure, and absence of parsing errors.

---

### Q5: How does Skill Normalization work?
**Answer:**
Resumes have varied terminology for the same competency (e.g., `React`, `React.js`, `ReactJS`, or `K8s` vs `Kubernetes`).
Our taxonomy normalization engine applies:
- Case normalization & token boundary matching.
- Canonical alias mapping (e.g., mapping `postgres`, `postgresql`, `psql` $\rightarrow$ `PostgreSQL`).
- Categorization into Technical Skills, Soft Skills, and Tools & Platforms.

---

### Q6: How do you handle database persistence in MongoDB?
**Answer:**
We designed 6 normalized collections (`users`, `resumes`, `jobs`, `matches`, `applications`, `analyses`) connected by Mongo ObjectIds:
- Passwords are encrypted using **Bcrypt with 10 salt rounds**.
- Private endpoints are guarded with **JWT tokens** validated via Bearer Authorization headers.
- Large resume files are parsed into textual structured data in the database while temporary uploads are sanitized.

---

### Q7: What are the unique differentiators in your project?
**Answer:**
1. **Transparent Explainability:** Displays matched vs missing skills and mathematical score breakdown.
2. **Personalized Skill Gap Roadmap:** Automatically creates a targeted 3-phase learning path for missing competencies with direct resources.
3. **Side-by-side Resume Comparison:** Allows applicants to evaluate whether a resume revision increased their score before submitting.
4. **Integrated AI Mock Interview Simulator:** Generates role-specific questions and evaluates applicant answers.
