import re
from typing import Dict, List, Set, Tuple

# Canonical taxonomy mapping: alias (lowercase) -> (Canonical Name, Category)
# Categories: 'technical', 'tools', 'soft'
SKILL_TAXONOMY: Dict[str, Tuple[str, str]] = {
    # Programming Languages
    "javascript": ("JavaScript", "technical"),
    "js": ("JavaScript", "technical"),
    "typescript": ("TypeScript", "technical"),
    "ts": ("TypeScript", "technical"),
    "python": ("Python", "technical"),
    "python3": ("Python", "technical"),
    "java": ("Java", "technical"),
    "c++": ("C++", "technical"),
    "cpp": ("C++", "technical"),
    "c#": ("C#", "technical"),
    "csharp": ("C#", "technical"),
    "c": ("C", "technical"),
    "go": ("Go", "technical"),
    "golang": ("Go", "technical"),
    "rust": ("Rust", "technical"),
    "ruby": ("Ruby", "technical"),
    "php": ("PHP", "technical"),
    "swift": ("Swift", "technical"),
    "kotlin": ("Kotlin", "technical"),
    "scala": ("Scala", "technical"),
    "r": ("R", "technical"),
    "dart": ("Dart", "technical"),
    "html": ("HTML", "technical"),
    "html5": ("HTML", "technical"),
    "css": ("CSS", "technical"),
    "css3": ("CSS", "technical"),
    "sass": ("Sass", "technical"),
    "scss": ("Sass", "technical"),
    "sql": ("SQL", "technical"),
    "bash": ("Bash", "technical"),
    "shell": ("Shell Scripting", "technical"),
    "powershell": ("PowerShell", "technical"),

    # Frontend Frameworks & Libraries
    "react": ("React", "technical"),
    "react.js": ("React", "technical"),
    "reactjs": ("React", "technical"),
    "next.js": ("Next.js", "technical"),
    "nextjs": ("Next.js", "technical"),
    "vue": ("Vue.js", "technical"),
    "vue.js": ("Vue.js", "technical"),
    "vuejs": ("Vue.js", "technical"),
    "nuxt.js": ("Nuxt.js", "technical"),
    "nuxtjs": ("Nuxt.js", "technical"),
    "angular": ("Angular", "technical"),
    "angularjs": ("Angular", "technical"),
    "svelte": ("Svelte", "technical"),
    "sveltekit": ("SvelteKit", "technical"),
    "redux": ("Redux", "technical"),
    "redux toolkit": ("Redux Toolkit", "technical"),
    "zustand": ("Zustand", "technical"),
    "tailwind": ("Tailwind CSS", "technical"),
    "tailwind css": ("Tailwind CSS", "technical"),
    "tailwindcss": ("Tailwind CSS", "technical"),
    "bootstrap": ("Bootstrap", "technical"),
    "material ui": ("Material UI", "technical"),
    "mui": ("Material UI", "technical"),
    "chakra ui": ("Chakra UI", "technical"),
    "webpack": ("Webpack", "tools"),
    "vite": ("Vite", "tools"),
    "babel": ("Babel", "tools"),

    # Backend & Frameworks
    "node": ("Node.js", "technical"),
    "node.js": ("Node.js", "technical"),
    "nodejs": ("Node.js", "technical"),
    "express": ("Express.js", "technical"),
    "express.js": ("Express.js", "technical"),
    "expressjs": ("Express.js", "technical"),
    "nestjs": ("NestJS", "technical"),
    "nest.js": ("NestJS", "technical"),
    "django": ("Django", "technical"),
    "flask": ("Flask", "technical"),
    "fastapi": ("FastAPI", "technical"),
    "spring": ("Spring", "technical"),
    "spring boot": ("Spring Boot", "technical"),
    "springboot": ("Spring Boot", "technical"),
    "asp.net": ("ASP.NET", "technical"),
    "asp.net core": ("ASP.NET Core", "technical"),
    ".net": (".NET", "technical"),
    "laravel": ("Laravel", "technical"),
    "ruby on rails": ("Ruby on Rails", "technical"),
    "rails": ("Ruby on Rails", "technical"),
    "graphql": ("GraphQL", "technical"),
    "rest": ("REST APIs", "technical"),
    "rest api": ("REST APIs", "technical"),
    "rest apis": ("REST APIs", "technical"),
    "restful": ("REST APIs", "technical"),
    "restful apis": ("REST APIs", "technical"),
    "grpc": ("gRPC", "technical"),
    "websocket": ("WebSockets", "technical"),
    "websockets": ("WebSockets", "technical"),
    "microservices": ("Microservices", "technical"),
    "serverless": ("Serverless", "technical"),

    # Databases & Caching
    "mongodb": ("MongoDB", "technical"),
    "mongo": ("MongoDB", "technical"),
    "mongoose": ("Mongoose", "technical"),
    "postgresql": ("PostgreSQL", "technical"),
    "postgres": ("PostgreSQL", "technical"),
    "psql": ("PostgreSQL", "technical"),
    "mysql": ("MySQL", "technical"),
    "sqlite": ("SQLite", "technical"),
    "oracle": ("Oracle DB", "technical"),
    "redis": ("Redis", "technical"),
    "cassandra": ("Cassandra", "technical"),
    "dynamodb": ("DynamoDB", "technical"),
    "firebase": ("Firebase", "technical"),
    "firestore": ("Firestore", "technical"),
    "supabase": ("Supabase", "technical"),
    "prisma": ("Prisma ORM", "technical"),
    "typeorm": ("TypeORM", "technical"),
    "sequelize": ("Sequelize", "technical"),
    "elasticsearch": ("Elasticsearch", "technical"),

    # Cloud & DevOps
    "docker": ("Docker", "tools"),
    "kubernetes": ("Kubernetes", "tools"),
    "k8s": ("Kubernetes", "tools"),
    "aws": ("AWS", "technical"),
    "amazon web services": ("AWS", "technical"),
    "ec2": ("AWS EC2", "technical"),
    "s3": ("AWS S3", "technical"),
    "lambda": ("AWS Lambda", "technical"),
    "azure": ("Microsoft Azure", "technical"),
    "gcp": ("Google Cloud Platform", "technical"),
    "google cloud": ("Google Cloud Platform", "technical"),
    "ci/cd": ("CI/CD", "technical"),
    "cicd": ("CI/CD", "technical"),
    "github actions": ("GitHub Actions", "tools"),
    "jenkins": ("Jenkins", "tools"),
    "gitlab ci": ("GitLab CI", "tools"),
    "terraform": ("Terraform", "tools"),
    "ansible": ("Ansible", "tools"),
    "nginx": ("Nginx", "tools"),
    "linux": ("Linux", "technical"),
    "git": ("Git", "tools"),
    "github": ("GitHub", "tools"),
    "gitlab": ("GitLab", "tools"),
    "bitbucket": ("Bitbucket", "tools"),

    # AI, ML & Data Science
    "machine learning": ("Machine Learning", "technical"),
    "deep learning": ("Deep Learning", "technical"),
    "nlp": ("NLP", "technical"),
    "natural language processing": ("NLP", "technical"),
    "computer vision": ("Computer Vision", "technical"),
    "tensorflow": ("TensorFlow", "technical"),
    "keras": ("Keras", "technical"),
    "pytorch": ("PyTorch", "technical"),
    "torch": ("PyTorch", "technical"),
    "scikit-learn": ("scikit-learn", "technical"),
    "sklearn": ("scikit-learn", "technical"),
    "pandas": ("Pandas", "technical"),
    "numpy": ("NumPy", "technical"),
    "scipy": ("SciPy", "technical"),
    "matplotlib": ("Matplotlib", "tools"),
    "seaborn": ("Seaborn", "tools"),
    "opencv": ("OpenCV", "technical"),
    "huggingface": ("Hugging Face", "technical"),
    "langchain": ("LangChain", "technical"),
    "llm": ("Large Language Models (LLMs)", "technical"),
    "llms": ("Large Language Models (LLMs)", "technical"),
    "generative ai": ("Generative AI", "technical"),
    "genai": ("Generative AI", "technical"),
    "prompt engineering": ("Prompt Engineering", "technical"),
    "spacy": ("spaCy", "technical"),
    "nltk": ("NLTK", "technical"),
    "bert": ("BERT", "technical"),
    "transformers": ("Transformers", "technical"),

    # Testing & Quality
    "jest": ("Jest", "tools"),
    "mocha": ("Mocha", "tools"),
    "chai": ("Chai", "tools"),
    "cypress": ("Cypress", "tools"),
    "playwright": ("Playwright", "tools"),
    "selenium": ("Selenium", "tools"),
    "unit testing": ("Unit Testing", "technical"),
    "integration testing": ("Integration Testing", "technical"),
    "pytest": ("Pytest", "tools"),
    "junit": ("JUnit", "tools"),

    # Architecture & Core CS
    "data structures": ("Data Structures", "technical"),
    "algorithms": ("Algorithms", "technical"),
    "dsa": ("Data Structures & Algorithms", "technical"),
    "system design": ("System Design", "technical"),
    "oop": ("Object Oriented Programming", "technical"),
    "object oriented programming": ("Object Oriented Programming", "technical"),
    "dbms": ("DBMS", "technical"),
    "operating systems": ("Operating Systems", "technical"),
    "computer networks": ("Computer Networks", "technical"),

    # Developer Tools
    "postman": ("Postman", "tools"),
    "vs code": ("VS Code", "tools"),
    "vscode": ("VS Code", "tools"),
    "jira": ("Jira", "tools"),
    "confluence": ("Confluence", "tools"),
    "figma": ("Figma", "tools"),

    # Soft Skills
    "problem solving": ("Problem Solving", "soft"),
    "communication": ("Communication", "soft"),
    "teamwork": ("Teamwork", "soft"),
    "leadership": ("Leadership", "soft"),
    "critical thinking": ("Critical Thinking", "soft"),
    "adaptability": ("Adaptability", "soft"),
    "time management": ("Time Management", "soft"),
    "agile": ("Agile Methodology", "soft"),
    "scrum": ("Scrum", "soft"),
}

def extract_skills_from_text(text: str) -> Dict[str, List[str]]:
    """
    Extracts, normalizes, and groups skills into technical, soft, and tools categories.
    Sorts dictionary keys by descending length so multi-word terms (e.g. 'react native') match first.
    """
    cleaned_text = " " + text.lower() + " "
    # Replace common separators with spaces for boundary detection
    cleaned_text = re.sub(r'[/,;:()\[\]\n\r\t]', ' ', cleaned_text)

    detected_canonical: Set[str] = set()
    category_map: Dict[str, str] = {}

    # Sort aliases by length descending to match multi-word phrases first
    sorted_aliases = sorted(SKILL_TAXONOMY.keys(), key=lambda x: len(x), reverse=True)

    for alias in sorted_aliases:
        canonical_name, category = SKILL_TAXONOMY[alias]
        if canonical_name in detected_canonical:
            continue

        # Regex boundary logic: handle special characters like c++, c#, .net
        if alias in ["c++", "c#", ".net"]:
            escaped = re.escape(alias)
            pattern = rf'(?:^|\s){escaped}(?:\s|$)'
        elif len(alias) <= 2:
            # Short tokens (r, c, go, js, ts, etc.) need strict boundary
            escaped = re.escape(alias)
            pattern = rf'\b{escaped}\b'
        else:
            escaped = re.escape(alias)
            pattern = rf'(?:\b|\s){escaped}(?:\b|\s)'

        if re.search(pattern, cleaned_text):
            detected_canonical.add(canonical_name)
            category_map[canonical_name] = category

    result = {
        "technical": [],
        "tools": [],
        "soft": []
    }

    for skill in sorted(detected_canonical):
        cat = category_map.get(skill, "technical")
        result[cat].append(skill)

    return result

def extract_contact_info(text: str) -> Dict[str, any]:
    """Extracts email, phone numbers, and web profiles from resume text."""
    # Email regex
    email_match = re.search(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', text)
    email = email_match.group(0) if email_match else ""

    # Phone regex (international & national formats)
    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)
    phone = phone_match.group(0) if phone_match else ""

    # Links (GitHub, LinkedIn, Portfolio)
    links = []
    github_match = re.findall(r'(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+', text, re.IGNORECASE)
    linkedin_match = re.findall(r'(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+', text, re.IGNORECASE)
    
    links.extend(list(set(github_match)))
    links.extend(list(set(linkedin_match)))

    # Candidate Name (heuristic: look at the top non-empty lines)
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    candidate_name = ""
    for line in lines[:5]:
        # Filter out headers, emails, numbers
        if "@" not in line and not re.search(r'\d', line) and 2 <= len(line.split()) <= 4:
            if not any(header in line.lower() for header in ["resume", "curriculum", "vitae", "contact", "profile"]):
                candidate_name = line
                break
    if not candidate_name and lines:
        candidate_name = lines[0][:40]

    return {
        "name": candidate_name,
        "email": email,
        "phone": phone,
        "links": links
    }
