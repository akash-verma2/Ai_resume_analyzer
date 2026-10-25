const SEED_JOBS = [
  {
    _id: "job_001",
    title: "Full Stack MERN Developer",
    company: "CloudScale Technologies",
    location: "Bengaluru, India (Hybrid)",
    experienceLevel: "Entry / Junior (0-2 yrs)",
    employmentType: "Full-time",
    salary: "₹6,00,000 - ₹9,50,000 / year",
    description: "Seeking a passionate Full Stack Developer to build high-performance web applications using MongoDB, Express.js, React, and Node.js. You will collaborate on RESTful APIs, develop reusable frontend UI components, integrate state management, and write unit tests.",
    requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB", "Express.js", "HTML", "CSS"],
    preferredSkills: ["TypeScript", "Docker", "Tailwind CSS", "Redux", "Git"],
    postedAt: new Date("2026-10-01")
  },
  {
    _id: "job_002",
    title: "Frontend React Engineer",
    company: "PixelCraft Interactive",
    location: "Remote",
    experienceLevel: "Junior / Mid-level (1-3 yrs)",
    employmentType: "Full-time",
    salary: "₹7,00,000 - ₹11,00,000 / year",
    description: "We are hiring a Frontend React Engineer to build responsive, accessible web interfaces. Must have solid knowledge of modern React (hooks, context, memoization), state management, Tailwind CSS, TypeScript, and modern frontend bundlers like Vite.",
    requiredSkills: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "HTML", "CSS", "Git"],
    preferredSkills: ["Next.js", "Redux Toolkit", "Jest", "Figma", "WebSockets"],
    postedAt: new Date("2026-10-03")
  },
  {
    _id: "job_003",
    title: "Backend Node.js & API Engineer",
    company: "DataStream Systems",
    location: "Hyderabad, India (On-site)",
    experienceLevel: "Entry / Junior (0-2 yrs)",
    employmentType: "Full-time",
    salary: "₹6,50,000 - ₹10,00,000 / year",
    description: "Looking for a Backend Engineer responsible for server-side logic, database query optimization, and REST API design using Node.js and Express. Experience with relational and NoSQL databases, JWT authentication, and caching is preferred.",
    requiredSkills: ["Node.js", "Express.js", "JavaScript", "REST APIs", "MongoDB", "SQL", "Git"],
    preferredSkills: ["PostgreSQL", "Redis", "Docker", "Microservices", "Jest"],
    postedAt: new Date("2026-10-05")
  },
  {
    _id: "job_004",
    title: "AI / Machine Learning Engineer",
    company: "NeuroTech Labs",
    location: "Bengaluru, India (Hybrid)",
    experienceLevel: "Entry-Level / Fresher (0-1 yr)",
    employmentType: "Full-time",
    salary: "₹8,00,000 - ₹13,00,000 / year",
    description: "Join our AI research and deployment team. You will build NLP pipelines, fine-tune transformer models, process unstructured text and document data, and deploy models via FastAPI microservices.",
    requiredSkills: ["Python", "Machine Learning", "NLP", "scikit-learn", "PyTorch", "FastAPI"],
    preferredSkills: ["Hugging Face", "Pandas", "NumPy", "Docker", "Large Language Models (LLMs)"],
    postedAt: new Date("2026-10-06")
  },
  {
    _id: "job_005",
    title: "Cloud & DevOps Associate Engineer",
    company: "Skyline Cloud Solutions",
    location: "Pune, India (Hybrid)",
    experienceLevel: "Junior (1-2 yrs)",
    employmentType: "Full-time",
    salary: "₹6,00,000 - ₹9,00,000 / year",
    description: "Responsible for continuous integration and delivery (CI/CD) pipelines, Docker containerization, cloud infrastructure management on AWS, and Linux server maintenance.",
    requiredSkills: ["Linux", "Docker", "CI/CD", "Git", "Bash", "AWS"],
    preferredSkills: ["Kubernetes", "Terraform", "GitHub Actions", "Python", "Nginx"],
    postedAt: new Date("2026-10-07")
  },
  {
    _id: "job_006",
    title: "Python Data Analyst / Junior Data Scientist",
    company: "Insight Analytics Corp",
    location: "Mumbai, India (Remote)",
    experienceLevel: "Entry-Level (0-2 yrs)",
    employmentType: "Full-time",
    salary: "₹5,50,000 - ₹8,50,000 / year",
    description: "Analyze large business datasets, generate interactive dashboards, write complex SQL queries, and implement predictive statistical models in Python.",
    requiredSkills: ["Python", "SQL", "Pandas", "NumPy", "Data Structures", "Statistics"],
    preferredSkills: ["Matplotlib", "Seaborn", "scikit-learn", "Tableau", "PowerBI"],
    postedAt: new Date("2026-10-08")
  },
  {
    _id: "job_007",
    title: "Mobile App Developer (React Native / Flutter)",
    company: "AppSphere Mobile Inc.",
    location: "Bengaluru, India (Hybrid)",
    experienceLevel: "Junior (1-3 yrs)",
    employmentType: "Full-time",
    salary: "₹6,50,000 - ₹10,50,000 / year",
    description: "Develop cross-platform mobile apps for iOS and Android. Experience with React Native or Flutter, REST API integration, state management, and mobile UI design is required.",
    requiredSkills: ["React", "JavaScript", "Mobile Development", "REST APIs", "Git"],
    preferredSkills: ["React Native", "TypeScript", "Redux", "Firebase", "App Store Deployment"],
    postedAt: new Date("2026-10-09")
  },
  {
    _id: "job_008",
    title: "Software Development Engineer (Core Java / Spring)",
    company: "FinServ Global Systems",
    location: "Chennai, India (On-site)",
    experienceLevel: "Entry-Level (0-2 yrs)",
    employmentType: "Full-time",
    salary: "₹7,50,000 - ₹11,00,000 / year",
    description: "Seeking a strong computer science graduate with solid foundations in Data Structures, Object-Oriented Programming, Java, Spring Boot, and relational databases for enterprise banking solutions.",
    requiredSkills: ["Java", "Object Oriented Programming", "Data Structures", "SQL", "Spring Boot", "Git"],
    preferredSkills: ["Microservices", "PostgreSQL", "Docker", "Unit Testing", "REST APIs"],
    postedAt: new Date("2026-10-10")
  }
];

const SAMPLE_BENCHMARK_RESUMES = [
  {
    id: "sample_mern_dev",
    fileName: "Aman_Sharma_MERN_Resume.pdf",
    targetRole: "Full Stack Developer",
    rawText: `AMAN SHARMA
Email: aman.sharma@example.com | Phone: +91 9876543210
GitHub: github.com/amansharma-dev | LinkedIn: linkedin.com/in/amansharma-cs

PROFESSIONAL SUMMARY
Motivated Full Stack Web Developer with strong foundation in JavaScript, React, Node.js, and MongoDB. Passionate about engineering high-scalability web systems, clean modular architectures, and responsive user experiences.

EDUCATION
B.Tech in Computer Science and Engineering | 2022 - 2026
CGPA: 8.8 / 10.0

TECHNICAL SKILLS
- Programming Languages: JavaScript (ES6+), Python, C++, HTML5, CSS3, SQL
- Frameworks & Libraries: React, Node.js, Express.js, Tailwind CSS, Redux
- Databases: MongoDB, PostgreSQL, Mongoose
- Developer Tools: Git, GitHub, VS Code, Postman, Docker
- Core CS: Data Structures & Algorithms, DBMS, Operating Systems, OOP

PROJECTS
1. E-Commerce Microservices Platform
- Architected and deployed full-stack web application with React and Node.js serving 5,000+ simulated users.
- Implemented JWT authentication, password hashing with bcrypt, and optimized MongoDB indexes reducing query latency by 35%.
- Integrated responsive product catalog using Tailwind CSS and dynamic cart checkout.

2. AI Task Orchestrator & Notes App
- Engineered reactive single-page app utilizing React, Express.js, and MongoDB.
- Automated API unit tests with Jest achieving 85% code coverage.
- Deployed frontend to Vercel and backend to Render with continuous integration.

WORK EXPERIENCE
Full Stack Web Intern | TechNovation Labs (June 2025 - August 2025)
- Developed and maintained 12+ RESTful API endpoints using Express and Node.js.
- Refactored legacy UI components into reusable React hooks, improving render speed by 28%.
- Collaborated in Agile Scrum sprints and conducted weekly code reviews with senior engineers.`,
    skills: {
      technical: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Python", "C++", "HTML", "CSS", "SQL", "PostgreSQL", "Redux", "Data Structures", "Algorithms", "Object Oriented Programming", "DBMS", "REST APIs"],
      tools: ["Git", "GitHub", "VS Code", "Postman", "Docker"],
      soft: ["Problem Solving", "Teamwork", "Agile Methodology", "Communication"]
    },
    atsScore: 88,
    breakdown: {
      completeness: 95,
      skillsRepertoire: 90,
      actionVerbs: 88,
      formatting: 85
    },
    tips: [
      { category: "Impact", priority: "Medium", text: "Add more quantifiable metrics to your second project." },
      { category: "Skill Expansion", priority: "Low", text: "Consider learning TypeScript to further enhance full-stack profile." }
    ]
  }
];

module.exports = {
  SEED_JOBS,
  SAMPLE_BENCHMARK_RESUMES
};
