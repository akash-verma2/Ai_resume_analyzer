import React, { useState } from 'react';
import { UploadCloud, FileText, Lock, Loader2, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { resumeAPI } from '../services/api';

const ResumeUploader = ({ onUploadSuccess }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stage, setStage] = useState('');
  const [error, setError] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    setError(null);
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx', 'doc', 'txt'].includes(ext)) {
      setError('Please upload a PDF or DOCX file (Max 10MB).');
      return;
    }

    try {
      setUploading(true);
      setStage('Extracting document text stream (PyPDF / python-docx)...');
      
      const formData = new FormData();
      formData.append('file', file);

      setTimeout(() => setStage('Evaluating 27 crucial ATS criteria across 6 categories...'), 600);
      setTimeout(() => setStage('Normalizing skills across 500+ tech taxonomy...'), 1200);

      const res = await resumeAPI.upload(formData);
      if (res.data.success) {
        setStage('Analysis complete!');
        onUploadSuccess(res.data.resume);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to process resume. Please verify file integrity.');
    } finally {
      setUploading(false);
      setStage('');
    }
  };

  const loadSampleBenchmark = async () => {
    setError(null);
    try {
      setUploading(true);
      setStage('Loading CSE Benchmark MERN Developer Resume...');
      const res = await resumeAPI.getAll();
      if (res.data.resumes && res.data.resumes.length > 0) {
        onUploadSuccess(res.data.resumes[0]);
      } else {
        setError('No saved resumes found in database.');
      }
    } catch (err) {
      setError('Could not load benchmark sample.');
    } finally {
      setUploading(false);
      setStage('');
    }
  };

  return (
    <div className="w-full">
      {/* Upload Container */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-10 text-center transition-all duration-300 ${
          dragActive
            ? 'border-brand-400 bg-brand-400/5 scale-[1.01] shadow-brand-md'
            : 'border-surface-300 hover:border-brand-400/50 bg-surface-50/50'
        } ${uploading ? 'pointer-events-none opacity-80' : ''}`}
      >
        <input
          type="file"
          id="enhancv-resume-upload-input"
          accept=".pdf,.docx,.doc,.txt"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center justify-center">
          
          {/* Drop instruction */}
          <div className="mb-5">
            <div className={`w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 ${
              dragActive 
                ? 'bg-brand-400/15 text-brand-400 scale-110' 
                : 'bg-surface-100 text-surface-400'
            }`}>
              <UploadCloud className="w-7 h-7" />
            </div>
            <p className="text-surface-800 text-sm font-semibold">
              Drop your resume here or choose a file
            </p>
            <p className="text-surface-500 text-xs font-normal mt-1">
              PDF & DOCX only · Max 10MB file size
            </p>
          </div>

          {uploading ? (
            <div className="w-full max-w-sm bg-white rounded-2xl p-5 border border-brand-400/30 shadow-brand-md animate-scaleIn">
              <div className="flex items-center justify-center gap-2.5 text-xs font-bold text-brand-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{stage}</span>
              </div>
              {/* Progress shimmer bar */}
              <div className="mt-3 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-brand-400/30 via-brand-400 to-brand-400/30 rounded-full animate-shimmer" 
                  style={{ backgroundSize: '200% 100%' }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              <label
                htmlFor="enhancv-resume-upload-input"
                className="btn-brand-lg cursor-pointer"
              >
                <UploadCloud className="w-4.5 h-4.5" />
                <span>Upload Your Resume</span>
              </label>

              <button
                type="button"
                onClick={loadSampleBenchmark}
                className="btn-ghost"
              >
                <FileText className="w-4 h-4 text-brand-400" />
                <span>Load Sample MERN Resume (Viva Demo)</span>
              </button>
            </div>
          )}

          {/* Privacy Badge */}
          <div className="inline-flex items-center gap-1.5 text-[11px] text-surface-500 bg-white border border-surface-200 px-3 py-1.5 rounded-full shadow-sm mt-2">
            <Lock className="w-3 h-3 text-brand-400" />
            <span>We never share your data with 3rd parties or use it for AI model training.</span>
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-xl animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;
