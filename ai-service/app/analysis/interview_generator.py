from typing import List, Dict, Any

INTERVIEW_QUESTION_BANK = {
    "react": [
        {
            "id": "q_react_1",
            "category": "Technical (Frontend)",
            "question": "Explain the React reconciliation algorithm and how the Virtual DOM improves UI rendering performance.",
            "keyPoints": ["Virtual DOM tree representation", "Diffing heuristic O(n)", "Keys in lists", "Batch updates in React 18"]
        },
        {
            "id": "q_react_2",
            "category": "Technical (Frontend)",
            "question": "What is the difference between useEffect, useMemo, and useCallback hooks? When would you use each?",
            "keyPoints": ["Side effects vs memoization", "useMemo for expensive calculations", "useCallback to preserve function identity"]
        }
    ],
    "node.js": [
        {
            "id": "q_node_1",
            "category": "Technical (Backend)",
            "question": "How does the Node.js Event Loop handle asynchronous non-blocking I/O operations?",
            "keyPoints": ["Single threaded event loop", "Libuv thread pool", "Call stack, Microtask queue, Macrotask queue", "Phases: Timers, Poll, Check"]
        },
        {
            "id": "q_node_2",
            "category": "Architecture & Security",
            "question": "How do you securely handle user authentication and protect REST APIs against common vulnerabilities like SQL/NoSQL injection and CSRF?",
            "keyPoints": ["JWT with expiry and refresh tokens", "Sanitizing queries and parameterized ORM calls", "Rate limiting with Redis", "CORS headers"]
        }
    ],
    "mongodb": [
        {
            "id": "q_mongo_1",
            "category": "Databases",
            "question": "When would you choose embedding documents versus referencing documents in MongoDB schema design?",
            "keyPoints": ["1-to-few vs 1-to-many relationships", "Document size 16MB limit", "Atomic updates on single document", "Join performance ($lookup)"]
        }
    ],
    "system design": [
        {
            "id": "q_sys_1",
            "category": "System Architecture",
            "question": "How would you design a scalable resume parsing and job matching system to handle 10,000 concurrent uploads?",
            "keyPoints": ["Decoupled message queue (RabbitMQ/Kafka)", "Asynchronous worker pool", "Object storage (S3) for file binaries", "Database indexing and caching"]
        }
    ],
    "behavioral": [
        {
            "id": "q_hr_1",
            "category": "HR & Behavioral",
            "question": "Describe a challenging technical bug or architectural obstacle you encountered in a project and how you systematically resolved it.",
            "keyPoints": ["STAR method: Situation, Task, Action, Result", "Root-cause debugging approach", "Lessons learned and testing improvements"]
        },
        {
            "id": "q_hr_2",
            "category": "Teamwork & Culture",
            "question": "How do you prioritize competing deadlines when a critical production bug emerges while you are building a new feature?",
            "keyPoints": ["Triage severity and blast radius", "Stakeholder communication", "Hotfix deployment vs feature branch rollback", "Post-mortem analysis"]
        }
    ]
}

def generate_role_interview_questions(job_title: str, skills: List[str]) -> List[Dict[str, Any]]:
    """Selects and tailors 5 balanced interview questions based on job title and required skills."""
    selected_questions = []
    
    # 1. Add questions matching required skills
    lower_skills = [s.lower() for s in skills]
    for skill_key, questions in INTERVIEW_QUESTION_BANK.items():
        if skill_key in lower_skills or any(skill_key in s for s in lower_skills):
            selected_questions.extend(questions)
    
    # Always include at least 1 architecture/system design and 1 behavioral
    selected_questions.extend(INTERVIEW_QUESTION_BANK["system design"])
    selected_questions.extend(INTERVIEW_QUESTION_BANK["behavioral"])

    # Deduplicate by id and limit to 5 questions
    unique = {}
    for q in selected_questions:
        if q["id"] not in unique:
            unique[q["id"]] = q
    
    final_questions = list(unique.values())[:5]

    # If still fewer than 5, supplement from pool
    if len(final_questions) < 5:
        for cat in INTERVIEW_QUESTION_BANK.values():
            for q in cat:
                if q["id"] not in unique:
                    unique[q["id"]] = q
                    final_questions.append(q)
                if len(final_questions) >= 5:
                    break
            if len(final_questions) >= 5:
                break

    return final_questions[:5]

def evaluate_interview_answer(question_text: str, user_answer: str, key_points: List[str]) -> Dict[str, Any]:
    """
    Evaluates candidate's typed response against expected technical competencies.
    """
    answer_text = user_answer.strip().lower()
    word_count = len(answer_text.split())

    if word_count < 15:
        return {
            "score": 40,
            "grade": "Needs Improvement",
            "feedback": "Your answer is too brief. Provide detailed technical explanations, mention underlying architecture, and cite concrete examples.",
            "matchedKeyPoints": [],
            "missingKeyPoints": key_points,
            "strengths": ["Answer submitted"],
            "improvements": ["Elaborate on technical mechanics and trade-offs", "Use standard engineering terminology"]
        }

    matched_points = []
    missing_points = []

    for point in key_points:
        point_keywords = [w.lower() for w in point.split() if len(w) > 3]
        match_count = sum(1 for kw in point_keywords if kw in answer_text)
        if match_count >= 1:
            matched_points.append(point)
        else:
            missing_points.append(point)

    base_score = 50
    if len(key_points) > 0:
        point_score = (len(matched_points) / len(key_points)) * 40
    else:
        point_score = 30

    length_bonus = min(10, (word_count // 20) * 2)
    final_score = min(100, int(base_score + point_score + length_bonus))

    if final_score >= 80:
        grade = "Excellent"
        feedback = "Strong, comprehensive technical answer demonstrating solid grasp of fundamentals and terminology."
    elif final_score >= 65:
        grade = "Good"
        feedback = "Good response covering key aspects. You can strengthen it further by explicitly discussing performance edge cases and real-world scale."
    else:
        grade = "Average"
        feedback = "Acceptable initial overview, but lacked depth in critical architectural and algorithmic details."

    strengths = [f"Addressed key concept: {mp}" for mp in matched_points[:3]]
    if not strengths:
        strengths.append("Structured response format")

    improvements = [f"Incorporate discussion on: {mp}" for mp in missing_points[:2]]
    if not improvements:
        improvements.append("Consider mentioning metrics or benchmarks from past projects")

    return {
        "score": final_score,
        "grade": grade,
        "feedback": feedback,
        "matchedKeyPoints": matched_points,
        "missingKeyPoints": missing_points,
        "strengths": strengths,
        "improvements": improvements
    }
