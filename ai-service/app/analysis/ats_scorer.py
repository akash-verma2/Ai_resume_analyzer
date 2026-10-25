import re
from typing import Dict, List, Any

ACTION_VERBS = [
    "architected", "engineered", "spearheaded", "orchestrated", "developed",
    "implemented", "designed", "optimized", "accelerated", "deployed",
    "automated", "streamlined", "reduced", "increased", "boosted",
    "scaled", "refactored", "integrated", "constructed", "built",
    "resolved", "migrated", "collaborated", "managed", "led", "enhanced"
]

SECTION_KEYWORDS = {
    "summary": ["summary", "objective", "about me", "profile", "professional summary"],
    "education": ["education", "academic", "university", "college", "degree", "bachelor", "b.tech", "m.tech"],
    "experience": ["experience", "employment", "work history", "internship", "work experience"],
    "skills": ["skills", "technical skills", "technologies", "competencies", "tools"],
    "projects": ["projects", "personal projects", "academic projects", "key projects"],
    "certifications": ["certifications", "certificates", "licenses", "awards", "achievements"]
}

ROLE_TAXONOMIES = {
    "Full Stack Developer": {
        "keywords": ["react", "node", "express", "mongodb", "mern", "full stack", "javascript", "rest api"],
        "expected_skills": ["TypeScript", "Docker", "Redis", "Jest / Unit Testing", "CI/CD"],
        "description": "Building full-stack client interfaces and scalable backend APIs with database persistence."
    },
    "Frontend Engineer": {
        "keywords": ["react", "vue", "angular", "html", "css", "tailwind", "next.js", "frontend", "redux"],
        "expected_skills": ["TypeScript", "Next.js", "State Management", "Performance Optimization", "Vite / Webpack"],
        "description": "Crafting responsive, high-performance, and accessible web user interfaces."
    },
    "Backend Engineer": {
        "keywords": ["node.js", "express", "python", "django", "fastapi", "sql", "postgresql", "backend", "microservices"],
        "expected_skills": ["Redis Caching", "Docker Containerization", "Database Indexing", "Message Queues", "Unit Testing"],
        "description": "Architecting secure server-side logic, high-throughput APIs, and database schemas."
    },
    "AI / Machine Learning Engineer": {
        "keywords": ["python", "machine learning", "nlp", "pytorch", "tensorflow", "scikit-learn", "data science"],
        "expected_skills": ["Model Deployment", "FastAPI / Flask", "MLOps", "Pandas / NumPy", "Deep Learning"],
        "description": "Developing statistical learning models, predictive algorithms, and NLP data pipelines."
    },
    "Cloud & DevOps Associate": {
        "keywords": ["docker", "kubernetes", "aws", "cloud", "ci/cd", "linux", "devops", "bash", "terraform"],
        "expected_skills": ["Kubernetes Orchestration", "Terraform / IaC", "Prometheus / Monitoring", "Security Auditing"],
        "description": "Automating continuous integration, containerization, and cloud infrastructure operations."
    },
    "Software Development Engineer (SDE)": {
        "keywords": ["java", "c++", "data structures", "algorithms", "spring boot", "oop"],
        "expected_skills": ["System Design", "Multithreading", "Spring Boot", "Design Patterns"],
        "description": "Engineering robust object-oriented software, data structures, and core enterprise systems."
    }
}

def detect_applied_role(text: str, extracted_skills: Dict[str, List[str]]) -> Dict[str, Any]:
    lower_text = text.lower()
    tech = extracted_skills.get("technical", []) if isinstance(extracted_skills, dict) else []
    tools = extracted_skills.get("tools", []) if isinstance(extracted_skills, dict) else []
    soft = extracted_skills.get("soft", []) if isinstance(extracted_skills, dict) else []
    all_skills = [s.lower() for s in tech + tools + soft]

    best_role = "Full Stack Developer"
    best_score = 0

    for role, data in ROLE_TAXONOMIES.items():
        score = 0
        for kw in data["keywords"]:
            if kw in lower_text or any(kw in s for s in all_skills):
                score += 1
        if score > best_score:
            best_score = score
            best_role = role

    role_info = ROLE_TAXONOMIES.get(best_role, ROLE_TAXONOMIES["Full Stack Developer"])
    missing_for_role = [s for s in role_info["expected_skills"] if not any(s.lower() in sk for sk in all_skills)]
    alignment_percent = min(96, max(55, int((best_score / max(1, len(role_info["keywords"]))) * 100) + 35))

    return {
        "appliedRole": best_role,
        "alignmentScore": alignment_percent,
        "description": role_info["description"],
        "missingSkillsForRole": missing_for_role,
        "expectedSkills": role_info["expected_skills"]
    }

def analyze_ats_quality(text: str, extracted_skills: Dict[str, List[str]], contact_info: Dict[str, Any]) -> Dict[str, Any]:
    """Computes transparent ATS quality score breakdown and generates actionable tips."""
    lower_text = text.lower()
    words = re.findall(r'\b\w+\b', text)
    word_count = len(words)

    # 1. Section Completeness Audit
    detected_sections = {}
    for section, keywords in SECTION_KEYWORDS.items():
        found = any(re.search(rf'\b{re.escape(kw)}\b', lower_text) for kw in keywords)
        detected_sections[section] = found

    # Required primary sections
    essential_sections = ["education", "skills", "projects", "experience"]
    found_essential = sum(1 for s in essential_sections if detected_sections.get(s, False))
    completeness_score = int((found_essential / len(essential_sections)) * 80)
    if detected_sections.get("summary", False):
        completeness_score += 10
    if detected_sections.get("certifications", False):
        completeness_score += 10
    completeness_score = min(100, max(20, completeness_score))

    # 2. Skill Repertoire Audit
    total_tech_skills = len(extracted_skills.get("technical", []))
    total_tools = len(extracted_skills.get("tools", []))
    total_soft = len(extracted_skills.get("soft", []))
    total_skills_count = total_tech_skills + total_tools + total_soft

    if total_skills_count >= 14:
        skills_score = 95
    elif total_skills_count >= 10:
        skills_score = 85
    elif total_skills_count >= 6:
        skills_score = 72
    elif total_skills_count >= 3:
        skills_score = 55
    else:
        skills_score = 35

    # 3. Action Verbs & Quantified Metrics Audit
    detected_verbs = [v for v in ACTION_VERBS if re.search(rf'\b{v}\b', lower_text)]
    verb_count = len(detected_verbs)

    # Quantifiable metrics: numbers with %, +, k, x, ms, scale
    metrics_matches = re.findall(r'(\d+[\d,.]*\s*(?:%|percent|k\b|x\b|ms\b|users|times|faster|reduction|increase|\+))', lower_text)
    metric_count = len(metrics_matches)

    verb_metric_score = min(100, (min(verb_count, 8) * 8) + (min(metric_count, 5) * 8) + 10)

    # 4. Formatting, Length & Contact Audit
    formatting_score = 100
    tips = []

    # Check word count
    if word_count < 250:
        formatting_score -= 25
        tips.append({
            "category": "Length",
            "priority": "High",
            "text": f"Your resume is relatively short ({word_count} words). Expand on your project details and responsibilities to provide more context."
        })
    elif word_count > 1200:
        formatting_score -= 15
        tips.append({
            "category": "Length",
            "priority": "Medium",
            "text": f"Resume is lengthy ({word_count} words). Strive for a concise 1-2 page format highlighting key achievements."
        })

    # Contact checks
    if not contact_info.get("email"):
        formatting_score -= 20
        tips.append({
            "category": "Contact",
            "priority": "High",
            "text": "Missing direct email address in contact header. ATS parsers need this for applicant identification."
        })
    if not contact_info.get("phone"):
        formatting_score -= 10
        tips.append({
            "category": "Contact",
            "priority": "Medium",
            "text": "Add a clear contact phone number."
        })
    if not contact_info.get("links"):
        formatting_score -= 10
        tips.append({
            "category": "Portfolio",
            "priority": "Medium",
            "text": "Include your GitHub and LinkedIn profile URLs to demonstrate active open-source contributions."
        })

    formatting_score = max(30, formatting_score)

    # Additional tips based on audit
    if not detected_sections.get("projects"):
        tips.append({
            "category": "Sections",
            "priority": "High",
            "text": "Add a dedicated 'Projects' section featuring 2-3 significant full-stack or systems engineering projects."
        })
    if not detected_sections.get("summary"):
        tips.append({
            "category": "Sections",
            "priority": "Low",
            "text": "Add a 2-line Professional Summary stating your engineering focus, key stack, and career objective."
        })
    if verb_count < 4:
        tips.append({
            "category": "Action Verbs",
            "priority": "High",
            "text": "Begin bullet points with strong action verbs (e.g., 'Architected', 'Implemented', 'Optimized', 'Automated')."
        })
    if metric_count < 2:
        tips.append({
            "category": "Impact",
            "priority": "High",
            "text": "Quantify project impact with measurable numbers (e.g., 'boosted API response by 35%', 'reduced query time by 200ms')."
        })
    if total_tech_skills < 6:
        tips.append({
            "category": "Skills",
            "priority": "High",
            "text": "List core technical skills clearly under structured groupings (Languages, Frameworks, Databases, Tools)."
        })

    # Weighted Overall Score
    overall_score = round(
        (0.25 * completeness_score) +
        (0.30 * skills_score) +
        (0.25 * verb_metric_score) +
        (0.20 * formatting_score)
    )

    # Detect Applied Role and Specific Improvements Needed
    role_analysis = detect_applied_role(text, extracted_skills)

    improvements_needed = [
        {
            "category": "Missing Target Skills",
            "title": f"Skill Gaps for {role_analysis['appliedRole']}",
            "priority": "High",
            "details": f"Recruiters looking for {role_analysis['appliedRole']} roles expect competencies in: " + ", ".join(role_analysis["missingSkillsForRole"][:4]) + ".",
            "action": f"Integrate {', '.join(role_analysis['missingSkillsForRole'][:2])} into your projects or skills summary."
        },
        {
            "category": "Quantified Metrics",
            "title": "Unquantified Project Duties",
            "priority": "High" if metric_count < 3 else "Medium",
            "details": f"Found {metric_count} measurable numbers. Bullets without percentages (%) or scale (users, latency) read like responsibilities rather than achievements.",
            "action": "Add specific metrics like 'reduced API latency by 35%' or 'served 1,000+ active users'."
        },
        {
            "category": "Action Verbs",
            "title": "Action Verb Strength",
            "priority": "Medium",
            "details": f"Found {verb_count} active power verbs. Avoid weak phrasing like 'Worked on', 'Helped with', or 'Responsible for'.",
            "action": "Lead bullet points with 'Architected', 'Engineered', 'Optimized', or 'Automated'."
        },
        {
            "category": "ATS Section Compliance",
            "title": "Header Links & Section Chronology",
            "priority": "Low" if (contact_info.get("links") and detected_sections.get("projects")) else "Medium",
            "details": "Applicant Tracking Systems parse standard headers (Experience, Projects, Education) in reverse-chronological order.",
            "action": "Ensure GitHub and LinkedIn links are clear in contact header and section headings use standard names."
        }
    ]

    return {
        "overallScore": overall_score,
        "breakdown": {
            "completeness": completeness_score,
            "skillsRepertoire": skills_score,
            "actionVerbs": verb_metric_score,
            "formatting": formatting_score
        },
        "stats": {
            "wordCount": word_count,
            "actionVerbsFound": verb_count,
            "actionVerbsList": detected_verbs[:10],
            "quantifiedMetricsFound": metric_count,
            "detectedSections": detected_sections
        },
        "roleAnalysis": role_analysis,
        "improvementsNeeded": improvements_needed,
        "tips": tips
    }
