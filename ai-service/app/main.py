from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from app.extractors.pdf_extractor import extract_text_from_pdf
from app.extractors.docx_extractor import extract_text_from_docx
from app.nlp.skill_taxonomy import extract_skills_from_text, extract_contact_info
from app.analysis.ats_scorer import analyze_ats_quality
from app.matching.matcher import calculate_job_matches
from app.analysis.roadmap_generator import generate_learning_roadmap
from app.analysis.interview_generator import generate_role_interview_questions, evaluate_interview_answer

app = FastAPI(
    title="AI Resume Analyzer & Job Matcher - NLP Microservice",
    description="Python FastAPI engine for PDF/DOCX resume extraction, skill normalization, ATS quality scoring, and hybrid job matching.",
    version="1.0.0"
)

# Enable CORS for communication with Node.js backend and React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Request Models ---
class AnalyzeRequest(BaseModel):
    text: str
    fileName: Optional[str] = "resume.txt"

class MatchRequest(BaseModel):
    resumeText: str
    resumeSkills: Dict[str, List[str]]
    jobs: List[Dict[str, Any]]

class RoadmapRequest(BaseModel):
    targetRole: str
    missingSkills: List[str]

class InterviewQuestionsRequest(BaseModel):
    jobTitle: str
    skills: List[str]

class InterviewEvaluateRequest(BaseModel):
    questionText: str
    userAnswer: str
    keyPoints: List[str] = []

class CompareRequest(BaseModel):
    resumeA: Dict[str, Any]
    resumeB: Dict[str, Any]


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AI Resume Analyzer & Job Matcher NLP Microservice",
        "version": "1.0.0"
    }

@app.post("/api/v1/extract")
async def extract_file_endpoint(file: UploadFile = File(...)):
    """Extracts raw text content from uploaded PDF or DOCX file."""
    contents = await file.read()
    filename = file.filename.lower()

    try:
        if filename.endswith(".pdf"):
            text = extract_text_from_pdf(contents)
        elif filename.endswith(".docx") or filename.endswith(".doc"):
            text = extract_text_from_docx(contents)
        elif filename.endswith(".txt"):
            text = contents.decode("utf-8", errors="ignore")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF, DOCX, or TXT.")

        return {
            "success": True,
            "fileName": file.filename,
            "text": text,
            "charCount": len(text),
            "wordCount": len(text.split())
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text extraction failed: {str(e)}")

@app.post("/api/v1/analyze")
def analyze_text_endpoint(req: AnalyzeRequest):
    """Analyzes pre-extracted resume text: skills, contact info, and ATS scoring."""
    text = req.text
    if not text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty.")

    contact = extract_contact_info(text)
    skills = extract_skills_from_text(text)
    ats_result = analyze_ats_quality(text, skills, contact)

    return {
        "success": True,
        "contact": contact,
        "skills": skills,
        "atsScore": ats_result["overallScore"],
        "breakdown": ats_result["breakdown"],
        "stats": ats_result["stats"],
        "roleAnalysis": ats_result.get("roleAnalysis", {}),
        "improvementsNeeded": ats_result.get("improvementsNeeded", []),
        "tips": ats_result["tips"]
    }

@app.post("/api/v1/extract-and-analyze")
async def extract_and_analyze_endpoint(file: UploadFile = File(...)):
    """All-in-one endpoint: uploads file, extracts text, and performs full analysis."""
    contents = await file.read()
    filename = file.filename.lower()

    if filename.endswith(".pdf"):
        text = extract_text_from_pdf(contents)
    elif filename.endswith(".docx") or filename.endswith(".doc"):
        text = extract_text_from_docx(contents)
    elif filename.endswith(".txt"):
        text = contents.decode("utf-8", errors="ignore")
    else:
        raise HTTPException(status_code=400, detail="Unsupported format. Upload PDF, DOCX, or TXT.")

    contact = extract_contact_info(text)
    skills = extract_skills_from_text(text)
    ats_result = analyze_ats_quality(text, skills, contact)

    return {
        "success": True,
        "fileName": file.filename,
        "text": text,
        "contact": contact,
        "skills": skills,
        "atsScore": ats_result["overallScore"],
        "breakdown": ats_result["breakdown"],
        "stats": ats_result["stats"],
        "roleAnalysis": ats_result.get("roleAnalysis", {}),
        "improvementsNeeded": ats_result.get("improvementsNeeded", []),
        "tips": ats_result["tips"]
    }

@app.post("/api/v1/match-jobs")
def match_jobs_endpoint(req: MatchRequest):
    """Calculates explainable match scores between a resume and a collection of jobs."""
    ranked_matches = calculate_job_matches(req.resumeText, req.resumeSkills, req.jobs)
    return {
        "success": True,
        "totalEvaluated": len(req.jobs),
        "matches": ranked_matches
    }

@app.post("/api/v1/roadmap")
def roadmap_endpoint(req: RoadmapRequest):
    """Generates a personalized 3-phase curriculum based on target role & missing competencies."""
    roadmap = generate_learning_roadmap(req.targetRole, req.missingSkills)
    return {
        "success": True,
        "roadmap": roadmap
    }

@app.post("/api/v1/interview/questions")
def interview_questions_endpoint(req: InterviewQuestionsRequest):
    """Generates 5 tailored technical & HR questions for a job profile."""
    questions = generate_role_interview_questions(req.jobTitle, req.skills)
    return {
        "success": True,
        "jobTitle": req.jobTitle,
        "questions": questions
    }

@app.post("/api/v1/interview/evaluate")
def interview_evaluate_endpoint(req: InterviewEvaluateRequest):
    """Evaluates candidate answer against expected technical concepts."""
    evaluation = evaluate_interview_answer(req.questionText, req.userAnswer, req.keyPoints)
    return {
        "success": True,
        "evaluation": evaluation
    }

@app.post("/api/v1/compare")
def compare_resumes_endpoint(req: CompareRequest):
    """Compares two resume versions side-by-side."""
    resA = req.resumeA
    resB = req.resumeB

    scoreA = resA.get("atsScore", 0)
    scoreB = resB.get("atsScore", 0)
    delta = scoreB - scoreA

    skillsA = set(
        [s.lower() for s in resA.get("skills", {}).get("technical", [])] +
        [s.lower() for s in resA.get("skills", {}).get("tools", [])]
    )
    skillsB = set(
        [s.lower() for s in resB.get("skills", {}).get("technical", [])] +
        [s.lower() for s in resB.get("skills", {}).get("tools", [])]
    )

    new_skills = [s for s in skillsB if s not in skillsA]
    removed_skills = [s for s in skillsA if s not in skillsB]

    return {
        "success": True,
        "scoreA": scoreA,
        "scoreB": scoreB,
        "delta": delta,
        "improved": delta > 0,
        "newSkillsCount": len(new_skills),
        "newSkillsGained": [s.title() for s in new_skills],
        "removedSkills": [s.title() for s in removed_skills],
        "summary": (
            f"Version B achieved an ATS score of {scoreB} ({'+' if delta >= 0 else ''}{delta} points vs Version A). "
            f"Added {len(new_skills)} newly recognized competencies."
        )
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
