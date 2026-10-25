from typing import List, Dict, Any

# Curated reference resources database for tech skills
SKILL_RESOURCES = {
    "typescript": {
        "title": "TypeScript Official Handbook & Crash Course",
        "docUrl": "https://www.typescriptlang.org/docs/",
        "videoUrl": "https://youtube.com/results?search_query=typescript+full+course",
        "description": "Learn static typing, interfaces, generics, and configuring tsconfig for React and Node backends."
    },
    "docker": {
        "title": "Docker for Developers",
        "docUrl": "https://docs.docker.com/get-started/",
        "videoUrl": "https://youtube.com/results?search_query=docker+for+beginners",
        "description": "Containerize microservices, write Dockerfile, manage multi-container systems using Docker Compose."
    },
    "kubernetes": {
        "title": "Kubernetes Architecture & Basics",
        "docUrl": "https://kubernetes.io/docs/tutorials/",
        "videoUrl": "https://youtube.com/results?search_query=kubernetes+crash+course",
        "description": "Master Pods, Deployments, Services, Ingress, and cluster orchestration."
    },
    "redis": {
        "title": "Redis In-Memory Caching & Rate Limiting",
        "docUrl": "https://redis.io/docs/",
        "videoUrl": "https://youtube.com/results?search_query=redis+caching+tutorial",
        "description": "Implement caching strategies, session stores, and Pub/Sub message queues."
    },
    "graphql": {
        "title": "GraphQL Apollo Server & Client",
        "docUrl": "https://graphql.org/learn/",
        "videoUrl": "https://youtube.com/results?search_query=graphql+full+course",
        "description": "Define Schemas, Resolvers, Mutations, and solve over-fetching/under-fetching."
    },
    "aws": {
        "title": "AWS Cloud Practitioner & S3/EC2/Lambda",
        "docUrl": "https://aws.amazon.com/getting-started/",
        "videoUrl": "https://youtube.com/results?search_query=aws+basics+course",
        "description": "Deploy backend applications on EC2, store uploads on S3, and trigger serverless Lambda."
    },
    "ci/cd": {
        "title": "GitHub Actions CI/CD Pipeline Automation",
        "docUrl": "https://docs.github.com/en/actions",
        "videoUrl": "https://youtube.com/results?search_query=github+actions+tutorial",
        "description": "Automate testing, linting, Docker image builds, and cloud deployment on git push."
    },
    "system design": {
        "title": "System Design Primer & Scalable Architecture",
        "docUrl": "https://github.com/donnemartin/system-design-primer",
        "videoUrl": "https://youtube.com/results?search_query=system+design+interview+prep",
        "description": "Learn horizontal vs vertical scaling, load balancers, caching, database sharding, and CAP theorem."
    },
    "jest": {
        "title": "Automated Unit & Integration Testing",
        "docUrl": "https://jestjs.io/docs/getting-started",
        "videoUrl": "https://youtube.com/results?search_query=jest+testing+tutorial",
        "description": "Write deterministic unit tests, mock API calls, and maintain >80% test code coverage."
    },
    "microservices": {
        "title": "Microservices Architecture Patterns",
        "docUrl": "https://microservices.io/",
        "videoUrl": "https://youtube.com/results?search_query=microservices+architecture",
        "description": "Deconstruct monolithic apps into independent services using API Gateways and event buses."
    }
}

ROLE_TEMPLATES = {
    "Full Stack Developer": [
        {"title": "Core Typing & Architecture", "focus": ["TypeScript", "REST APIs", "System Design"], "duration": "Week 1 - 2"},
        {"title": "Containerization & DevOps", "focus": ["Docker", "CI/CD", "AWS"], "duration": "Week 3 - 4"},
        {"title": "Performance, Caching & Testing", "focus": ["Redis", "Jest", "GraphQL"], "duration": "Week 5 - 6"}
    ],
    "Frontend Engineer": [
        {"title": "Type Safety & State Management", "focus": ["TypeScript", "Redux Toolkit", "Next.js"], "duration": "Week 1 - 2"},
        {"title": "Performance Optimization & Testing", "focus": ["Jest", "Cypress", "Vite"], "duration": "Week 3 - 4"},
        {"title": "Modern UI Systems & Accessibility", "focus": ["Tailwind CSS", "Figma", "WebSockets"], "duration": "Week 5 - 6"}
    ],
    "Backend Engineer": [
        {"title": "Database Optimization & Caching", "focus": ["PostgreSQL", "Redis", "Prisma ORM"], "duration": "Week 1 - 2"},
        {"title": "Microservices & Distributed Systems", "focus": ["Docker", "Kubernetes", "gRPC", "Kafka"], "duration": "Week 3 - 4"},
        {"title": "Cloud Infrastructure & Testing", "focus": ["AWS", "CI/CD", "System Design", "Jest"], "duration": "Week 5 - 6"}
    ],
    "Data Scientist / AI Engineer": [
        {"title": "Deep Learning & Model Training", "focus": ["PyTorch", "TensorFlow", "Hugging Face"], "duration": "Week 1 - 2"},
        {"title": "Generative AI & LLMs", "focus": ["LangChain", "LLMs", "Vector Databases"], "duration": "Week 3 - 4"},
        {"title": "MLOps & Cloud Deployment", "focus": ["Docker", "FastAPI", "AWS", "MLflow"], "duration": "Week 5 - 6"}
    ]
}

def generate_learning_roadmap(target_role: str, missing_skills: List[str]) -> Dict[str, Any]:
    """
    Generates a personalized 3-phase curriculum with links and a capstone portfolio project.
    """
    clean_target = target_role or "Full Stack Developer"
    # Find matching role template or use default
    template = ROLE_TEMPLATES.get(clean_target, ROLE_TEMPLATES["Full Stack Developer"])

    # Collect missing skill details
    detailed_skills = []
    for skill in missing_skills:
        skill_key = skill.lower()
        res = SKILL_RESOURCES.get(skill_key, {
            "title": f"Mastering {skill}",
            "docUrl": f"https://www.google.com/search?q={skill}+documentation",
            "videoUrl": f"https://youtube.com/results?search_query={skill}+tutorial",
            "description": f"Learn foundational concepts, best practices, and integration patterns for {skill}."
        })
        detailed_skills.append({
            "skill": skill,
            "title": res["title"],
            "docUrl": res["docUrl"],
            "videoUrl": res["videoUrl"],
            "description": res["description"]
        })

    # Divide skills into 3 phases
    phases = []
    chunk_size = max(1, (len(detailed_skills) + 2) // 3)
    skill_chunks = [detailed_skills[i:i + chunk_size] for i in range(0, len(detailed_skills), chunk_size)]

    for idx, t_phase in enumerate(template):
        phase_skills = skill_chunks[idx] if idx < len(skill_chunks) else []
        phase_skill_names = [s["skill"] for s in phase_skills] or t_phase["focus"]

        phases.append({
            "phaseNumber": idx + 1,
            "title": f"Phase {idx + 1}: {t_phase['title']}",
            "timeline": t_phase["duration"],
            "targetSkills": phase_skill_names,
            "resources": phase_skills or [
                {
                    "skill": s,
                    "title": f"Official {s} Documentation & Crash Guides",
                    "docUrl": f"https://www.google.com/search?q={s}+docs",
                    "videoUrl": f"https://youtube.com/results?search_query={s}+course",
                    "description": f"Core concepts and implementation techniques for {s}."
                } for s in t_phase["focus"]
            ],
            "milestoneProject": f"Build a {phase_skill_names[0] if phase_skill_names else 'Full Stack'} production feature integrating real-world error handling and automated validation."
        })

    return {
        "targetRole": clean_target,
        "totalMissingSkills": len(missing_skills),
        "missingSkillsList": missing_skills,
        "roadmapPhases": phases,
        "recommendedCapstone": f"Complete an end-to-end {clean_target} Capstone Application demonstrating: " +
                                (", ".join(missing_skills[:4]) if missing_skills else "Full Stack Architecture") +
                                " with automated CI/CD and deployment on Cloud."
    }
