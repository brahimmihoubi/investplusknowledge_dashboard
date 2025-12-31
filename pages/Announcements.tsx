
import React, { useState, useEffect } from 'react';
import { generateAnnouncementSummary } from '../services/geminiService';
import { StorageService } from '../services/storageService';
import { Announcement } from '../types';

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [category, setCategory] = useState<'News' | 'Event' | 'Update'>('News');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    setAnnouncements(StorageService.getAnnouncements());
  }, []);

  const updateAnnouncements = (data: Announcement[]) => {
    setAnnouncements(data);
    StorageService.saveAnnouncements(data);
  };

  const handleGenerateAI = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const summary = await generateAnnouncementSummary(topic);
      setContent(summary);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditStart = (ann: Announcement) => {
    setEditingId(ann.id);
    setTopic(ann.title);
    setContent(ann.content);
    setCategory(ann.category);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      updateAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !content) return;

    if (editingId) {
      updateAnnouncements(announcements.map(a => 
        a.id === editingId 
          ? { ...a, title: topic, content, category, date: new Date().toISOString().split('T')[0] } 
          : a
      ));
      setEditingId(null);
    } else {
      const newAnn: Announcement = {
        id: Date.now().toString(),
        title: topic,
        content,
        date: new Date().toISOString().split('T')[0],
        category
      };
      updateAnnouncements([newAnn, ...announcements]);
    }
    setTopic('');
    setContent('');
    setCategory('News');
  };

  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'All' || a.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-[#112b3c] mb-6">{editingId ? 'Edit Announcement' : 'Broadcast News'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2 block">Subject Line</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Q3 Dividend Payout"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 focus:border-[#4ade80] outline-none transition-all"
              />
            </div>
            
            <div>
               <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2 block">Category</label>
               <select 
                 value={category} 
                 onChange={(e) => setCategory(e.target.value as any)}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 focus:border-[#4ade80] outline-none transition-all"
               >
                 <option value="News">News</option>
                 <option value="Event">Event</option>
                 <option value="Alert">Alert</option>
               </select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] block">Message Content</label>
                <button 
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isGenerating || !topic}
                  className="text-[9px] flex items-center gap-1.5 font-bold text-[#059669] hover:text-[#065f46] disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-wider"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-1">
                      <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Consulting AI
                    </span>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 2a2 2 0 00-2 2v2H2a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-3V4a2 2 0 00-2-2zM4 9h12v7H4V9z" /></svg>
                      AI Assist
                    </>
                  )}
                </button>
              </div>
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder="Draft your message or use AI to generate..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 focus:border-[#4ade80] outline-none resize-none transition-all"
              />
            </div>

            <div className="flex gap-2">
                {editingId && (
                  <button 
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setTopic('');
                      setContent('');
                      setCategory('News');
                    }}
                    className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  type="submit"
                  className="flex-1 py-3 brand-gradient text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:opacity-90 transition-all uppercase tracking-widest text-xs"
                >
                  {editingId ? 'Update' : 'Post'}
                </button>
            </div>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <h2 className="text-xl font-bold text-[#112b3c]">Live Platform Feed</h2>
           <div className="flex gap-2">
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:border-[#10B981] outline-none"
              >
                <option value="All">All Categories</option>
                <option value="News">News</option>
                <option value="Event">Events</option>
                <option value="Alert">Alerts</option>
              </select>
              <input 
                type="text" 
                placeholder="Search feed..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:border-[#10B981] outline-none w-48"
              />
           </div>
        </div>
        
        <div className="space-y-4">
          {filteredAnnouncements.map((ann) => (
            <div key={ann.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-[#4ade80] transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                    ann.category === 'Event' ? 'bg-indigo-50 text-indigo-600' : 
                    ann.category === 'Alert' ? 'bg-rose-50 text-rose-600' :
                    'brand-gradient text-white'
                  }`}>
                    {ann.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{ann.date}</span>
                </div>
                <div className="flex items-center gap-2">
                   <button 
                    onClick={() => handleEditStart(ann)}
                    className="text-slate-300 hover:text-blue-500 transition-colors"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                   </button>
                   <button 
                    onClick={() => handleDelete(ann.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                   </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#112b3c] mb-2 group-hover:text-[#059669] transition-colors relative z-10">{ann.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed relative z-10 font-medium">{ann.content}</p>
              <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full brand-gradient flex items-center justify-center text-[8px] text-white font-bold">A</div>
                  <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">System Broadcast</span>
                </div>
                <button className="text-[#059669] text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest hover:translate-x-1 transition-transform">
                  View Public Link <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          ))}
          {filteredAnnouncements.length === 0 && (
             <div className="text-center py-10 text-slate-400 text-sm font-medium">No announcements found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
