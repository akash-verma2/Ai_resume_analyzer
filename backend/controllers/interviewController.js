const axios = require('axios');
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

const FALLBACK_QUESTIONS = [
  {
    id: "q_fe_1",
    category: "Frontend & Architecture",
    question: "Explain the lifecycle and reconciliation process in React. What are the key performance considerations with large component trees?",
    keyPoints: ["Virtual DOM diffing", "Keys in lists", "React.memo and useCallback", "Fiber architecture reconciliation"]
  },
  {
    id: "q_be_1",
    category: "Backend & Systems",
    question: "How does Node.js handle concurrent requests with a single-threaded event loop? What is the role of Libuv?",
    keyPoints: ["Event Loop non-blocking I/O", "Libuv worker thread pool for file/crypto ops", "Microtask queue vs timer phase"]
  },
  {
    id: "q_db_1",
    category: "Databases & Scaling",
    question: "How do you optimize slow database queries in MongoDB and PostgreSQL when handling large collections?",
    keyPoints: ["Compound and covering indexes", "Explain plan analysis", "Pagination with cursor rather than large skip", "Redis caching"]
  },
  {
    id: "q_sec_1",
    category: "Security & Architecture",
    question: "Explain how JWT authentication works. How do you mitigate token theft and XSS vulnerabilities?",
    keyPoints: ["Header, payload, signature with secret", "HttpOnly cookies vs LocalStorage", "Short-lived access tokens with refresh tokens"]
  },
  {
    id: "q_hr_1",
    category: "Behavioral & Engineering Culture",
    question: "Describe a project where you faced a significant technical roadblock or bug. How did you diagnose the issue and verify the solution?",
    keyPoints: ["Root-cause investigation", "Systematic debugging and logging", "Testing and post-mortem reflection"]
  }
];

const generateQuestions = async (req, res) => {
  try {
    const { jobTitle = "Full Stack Engineer", skills = [] } = req.body;

    try {
      const response = await axios.post(`${AI_SERVICE_URL}/api/v1/interview/questions`, {
        jobTitle,
        skills
      }, { timeout: 4000 });
      return res.json(response.data);
    } catch (err) {
      // Fallback
      return res.json({
        success: true,
        jobTitle,
        questions: FALLBACK_QUESTIONS
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const evaluateAnswer = async (req, res) => {
  try {
    const { questionText, userAnswer, keyPoints = [] } = req.body;
    if (!userAnswer || !userAnswer.trim()) {
      return res.status(400).json({ success: false, message: "Please provide an answer to evaluate." });
    }

    try {
      const response = await axios.post(`${AI_SERVICE_URL}/api/v1/interview/evaluate`, {
        questionText,
        userAnswer,
        keyPoints
      }, { timeout: 4000 });
      return res.json(response.data);
    } catch (err) {
      // Embedded fallback evaluation
      const words = userAnswer.trim().split(/\s+/).length;
      const matched = keyPoints.filter(kp => {
        const tokens = kp.toLowerCase().split(/\s+/).filter(t => t.length > 3);
        return tokens.some(t => userAnswer.toLowerCase().includes(t));
      });

      const score = Math.min(100, Math.max(35, Math.round(50 + (matched.length * 12) + Math.min(15, words / 5))));

      return res.json({
        success: true,
        evaluation: {
          score,
          grade: score >= 80 ? "Excellent" : score >= 65 ? "Good" : "Average",
          feedback: score >= 75
            ? "Solid technical answer showing clear comprehension of core concepts."
            : "Satisfactory response. Expand on technical edge-cases and performance trade-offs.",
          matchedKeyPoints: matched,
          missingKeyPoints: keyPoints.filter(kp => !matched.includes(kp)),
          strengths: matched.length > 0 ? matched.map(m => `Highlighted: ${m}`) : ["Structured response"],
          improvements: ["Consider mentioning production scale and real-world metrics"]
        }
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  generateQuestions,
  evaluateAnswer
};
