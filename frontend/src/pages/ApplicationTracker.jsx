import React, { useState, useEffect } from 'react';
import {
  Kanban,
  Building2,
  Calendar,
  MessageSquare,
  Trash2,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  Award,
  Loader2
} from 'lucide-react';
import { applicationAPI, jobAPI } from '../services/api';

const STATUS_COLUMNS = [
  { id: 'Saved', label: 'Saved', color: 'border-surface-300 bg-surface-100 text-surface-800' },
  { id: 'Applied', label: 'Applied', color: 'border-indigo-200 bg-indigo-50 text-indigo-900' },
  { id: 'Interview', label: 'Interview Scheduled', color: 'border-purple-200 bg-purple-50 text-purple-900' },
  { id: 'Offered', label: 'Offer Received', color: 'border-brand-200 bg-brand-50 text-brand-900' },
  { id: 'Rejected', label: 'Archived / Rejected', color: 'border-rose-200 bg-rose-50 text-rose-900' },
];

const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [notesText, setNotesText] = useState('');

  const fetchApps = async () => {
    try {
      setLoading(true);
      const res = await applicationAPI.getAll();
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await applicationAPI.update(appId, { status: newStatus });
      setApplications(prev =>
        prev.map(a => (a._id === appId ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveNotes = async (appId) => {
    try {
      await applicationAPI.update(appId, { notes: notesText });
      setApplications(prev =>
        prev.map(a => (a._id === appId ? { ...a, notes: notesText } : a))
      );
      setEditingNotesId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (appId) => {
    try {
      await applicationAPI.delete(appId);
      setApplications(prev => prev.filter(a => a._id !== appId));
    } catch (err) {
      console.error(err);
    }
  };

  const total = applications.length;
  const interviews = applications.filter(a => a.status === 'Interview').length;
  const offers = applications.filter(a => a.status === 'Offered').length;

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="enhancv-card bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-brand flex items-center gap-1.5">
                <Kanban className="w-3.5 h-3.5" />
                Pipeline Tracking Dashboard
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-surface-900 font-heading">
              Job Application Tracker
            </h1>
            <p className="text-xs sm:text-sm text-surface-600 mt-1 max-w-xl font-medium">
              Organize your job search across application stages, log technical interview dates, and keep track of employer follow-ups.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-white border border-surface-200 px-4 py-2.5 rounded-2xl text-center shadow-2xs">
              <span className="text-[10px] text-surface-500 uppercase font-bold block">Total In Pipeline</span>
              <span className="text-lg font-extrabold text-surface-900 font-heading">{total}</span>
            </div>
            <div className="bg-purple-50 border border-purple-200 px-4 py-2.5 rounded-2xl text-center shadow-2xs">
              <span className="text-[10px] text-purple-700 uppercase font-bold block">Interviews</span>
              <span className="text-lg font-extrabold text-purple-900 font-heading">{interviews}</span>
            </div>
            <div className="bg-brand-50 border border-brand-200 px-4 py-2.5 rounded-2xl text-center shadow-2xs">
              <span className="text-[10px] text-brand-700 uppercase font-bold block">Offers</span>
              <span className="text-lg font-extrabold text-brand-900 font-heading">{offers}</span>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500 mx-auto mb-3" />
          <p className="text-sm text-surface-600 font-medium">Loading application pipeline...</p>
        </div>
      )}

      {/* Kanban Board Columns Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {STATUS_COLUMNS.map(col => {
            const colApps = applications.filter(a => a.status === col.id);

            return (
              <div
                key={col.id}
                className="bg-surface-50 border border-surface-200 rounded-2xl p-3.5 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className={`p-2.5 rounded-xl border mb-3 flex items-center justify-between text-xs font-bold ${col.color}`}>
                  <span>{col.label}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white border border-surface-200 text-[11px] font-mono font-bold text-surface-900 shadow-2xs">
                    {colApps.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                  {colApps.map(app => {
                    const job = app.job || {};
                    const isEditingNotes = editingNotesId === app._id;

                    return (
                      <div
                        key={app._id}
                        className="bg-white border border-surface-200 rounded-xl p-3.5 text-xs space-y-2.5 hover:border-brand-300 hover:shadow-brand transition-all shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-surface-900 text-xs font-heading line-clamp-1">
                              {job.title || 'Software Engineer'}
                            </h4>
                            <p className="text-[11px] text-surface-600 flex items-center gap-1 mt-0.5 font-bold">
                              <Building2 className="w-3 h-3 text-brand-500" />
                              {job.company || 'Tech Company'}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDelete(app._id)}
                            className="text-surface-400 hover:text-rose-600 p-1 transition-colors rounded-lg hover:bg-rose-50"
                            title="Remove Application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Date badge */}
                        <div className="text-[10px] text-surface-500 flex items-center gap-1 font-medium">
                          <Calendar className="w-3 h-3 text-surface-400" />
                          <span>Applied: {new Date(app.appliedAt || Date.now()).toLocaleDateString()}</span>
                        </div>

                        {/* Notes preview or editor */}
                        {isEditingNotes ? (
                          <div className="space-y-1.5 pt-1 border-t border-surface-100">
                            <textarea
                              rows={2}
                              value={notesText}
                              onChange={(e) => setNotesText(e.target.value)}
                              className="w-full p-2 bg-white border border-surface-300 rounded-lg text-[11px] text-surface-900 focus:outline-none focus:border-brand-400"
                              placeholder="Interview rounds, contacts, notes..."
                            />
                            <div className="flex justify-end gap-1.5">
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="px-2 py-0.5 rounded text-[10px] text-surface-600 hover:bg-surface-100 font-medium"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveNotes(app._id)}
                                className="px-2.5 py-0.5 rounded text-[10px] bg-brand-400 text-surface-950 font-bold shadow-2xs hover:bg-brand-500 transition-colors"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setEditingNotesId(app._id);
                              setNotesText(app.notes || '');
                            }}
                            className="bg-surface-50 p-2.5 rounded-lg border border-surface-200 text-[11px] text-surface-700 cursor-pointer hover:border-surface-300 transition-colors"
                            title="Click to edit notes"
                          >
                            <div className="flex items-center gap-1 text-[10px] font-bold text-surface-600 mb-0.5">
                              <MessageSquare className="w-2.5 h-2.5 text-brand-500" />
                              <span>Notes:</span>
                            </div>
                            <p className="line-clamp-2 italic font-normal">
                              {app.notes || 'Click to add interview schedule or round feedback...'}
                            </p>
                          </div>
                        )}

                        {/* Move Status Dropdown */}
                        <div className="pt-2 border-t border-surface-100 flex items-center justify-between text-[11px]">
                          <span className="text-[10px] text-surface-600 font-bold">Stage:</span>
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                            className="bg-white border border-surface-300 text-[10px] text-surface-900 rounded-lg px-2 py-0.5 focus:outline-none cursor-pointer font-bold shadow-2xs"
                          >
                            {STATUS_COLUMNS.map(c => (
                              <option key={c.id} value={c.id}>{c.label}</option>
                            ))}
                          </select>
                        </div>

                      </div>
                    );
                  })}

                  {colApps.length === 0 && (
                    <div className="h-28 border border-dashed border-surface-300 rounded-xl flex items-center justify-center text-[11px] text-surface-400 italic">
                      No applications
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default ApplicationTracker;
