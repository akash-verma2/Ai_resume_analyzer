import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

export const resumeAPI = {
  upload: (formData) => api.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: () => api.get('/resumes'),
  getById: (id) => api.get(`/resumes/${id}`),
  delete: (id) => api.delete(`/resumes/${id}`),
  compare: (resumeIdA, resumeIdB) => api.post('/resumes/compare', { resumeIdA, resumeIdB }),
  getRoadmap: (id, targetRole, missingSkills) => api.post(`/resumes/${id}/roadmap`, { targetRole, missingSkills }),
  improve: (originalText, targetRole) => api.post('/resumes/improve', { originalText, targetRole }),
};

export const jobAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (jobData) => api.post('/jobs', jobData),
  getMatchesForResume: (resumeId) => api.post(`/matches/${resumeId || 'default'}`),
};

export const matchAPI = {
  matchResume: (resumeId) => api.post(`/matches/${resumeId || 'default'}`),
};

export const applicationAPI = {
  getAll: () => api.get('/applications'),
  create: (data) => api.post('/applications', data),
  update: (id, data) => api.patch(`/applications/${id}`, data),
  delete: (id) => api.delete(`/applications/${id}`),
};

export const interviewAPI = {
  generate: (jobTitle, skills) => api.post('/interview/generate', { jobTitle, skills }),
  evaluate: (questionText, userAnswer, keyPoints) => api.post('/interview/evaluate', { questionText, userAnswer, keyPoints }),
};

export default api;
