from typing import List, Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def calculate_job_matches(resume_text: str, resume_skills: Dict[str, List[str]], jobs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Ranks job listings using an explainable hybrid formula:
    Match Score = 70% Skill Coverage + 30% TF-IDF Cosine Semantic Similarity.
    """
    if not jobs:
        return []

    # Flatten all resume skills into a single set for fast lookup
    all_resume_skills_set = set(
        [s.lower() for s in resume_skills.get("technical", [])] +
        [s.lower() for s in resume_skills.get("tools", [])] +
        [s.lower() for s in resume_skills.get("soft", [])]
    )

    results = []
    
    # Prepare corpus for batch TF-IDF
    # Document 0 is the resume text, followed by each job description
    corpus = [resume_text] + [
        (j.get("description", "") + " " + " ".join(j.get("requiredSkills", [])))
        for j in jobs
    ]

    try:
        vectorizer = TfidfVectorizer(stop_words='english', max_features=1500, ngram_range=(1, 2))
        tfidf_matrix = vectorizer.fit_transform(corpus)
        # Cosine similarity between resume (row 0) and all jobs (rows 1..N)
        sim_scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
    except Exception:
        # Fallback if text is sparse
        sim_scores = np.zeros(len(jobs))

    for idx, job in enumerate(jobs):
        req_skills = job.get("requiredSkills", [])
        pref_skills = job.get("preferredSkills", [])
        
        matched_required = []
        missing_required = []

        for req in req_skills:
            # Check direct or substring match in canonical skills set
            req_lower = req.lower()
            if req_lower in all_resume_skills_set or any(req_lower in s or s in req_lower for s in all_resume_skills_set):
                matched_required.append(req)
            else:
                missing_required.append(req)

        # Matched preferred
        matched_preferred = []
        for pref in pref_skills:
            pref_lower = pref.lower()
            if pref_lower in all_resume_skills_set or any(pref_lower in s or s in pref_lower for s in all_resume_skills_set):
                matched_preferred.append(pref)

        # 1. Deterministic Skill Coverage %
        if len(req_skills) > 0:
            skill_score = round((len(matched_required) / len(req_skills)) * 100)
        else:
            skill_score = 100

        # 2. Semantic Similarity %
        semantic_sim = float(sim_scores[idx]) if idx < len(sim_scores) else 0.0
        # Scale cosine similarity (usually 0.1 - 0.7 for text) to an intuitive 0-100 score
        semantic_score = min(100, round(semantic_sim * 130))

        # 3. Composite Final Score
        overall_score = round((0.70 * skill_score) + (0.30 * semantic_score))
        overall_score = min(100, max(0, overall_score))

        # Fit categorization
        if overall_score >= 75:
            fit_badge = "High Match"
            badge_color = "green"
        elif overall_score >= 50:
            fit_badge = "Good Match"
            badge_color = "blue"
        elif overall_score >= 35:
            fit_badge = "Moderate Match"
            badge_color = "amber"
        else:
            fit_badge = "Skill Gap"
            badge_color = "red"

        # Explainable statement
        explanation = (
            f"Matches {len(matched_required)} of {len(req_skills)} required competencies ({skill_score}% explicit coverage). "
            f"Semantic context score: {semantic_score}%. "
            f"{'Key missing skills: ' + ', '.join(missing_required[:3]) if missing_required else 'All primary skill requirements satisfied.'}"
        )

        results.append({
            "jobId": str(job.get("_id", job.get("id", f"job_{idx}"))),
            "title": job.get("title", "Untitled Role"),
            "company": job.get("company", "Company"),
            "location": job.get("location", "Remote"),
            "experienceLevel": job.get("experienceLevel", "Entry-Level"),
            "employmentType": job.get("employmentType", "Full-time"),
            "salary": job.get("salary", "Competitive"),
            "description": job.get("description", ""),
            "overallScore": overall_score,
            "skillScore": skill_score,
            "semanticScore": semantic_score,
            "matchedSkills": matched_required,
            "missingSkills": missing_required,
            "preferredMatched": matched_preferred,
            "fitBadge": fit_badge,
            "badgeColor": badge_color,
            "explanation": explanation
        })

    # Sort descending by overallScore
    results.sort(key=lambda x: x["overallScore"], reverse=True)
    return results
