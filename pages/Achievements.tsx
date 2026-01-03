
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StorageService } from '../services/storageService';
import { Achievement } from '../types';

const Achievements: React.FC = () => {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', metric: '', description: '', date: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setAchievements(StorageService.getAchievements());
  }, []);

  const updateAchievements = (data: Achievement[]) => {
    setAchievements(data);
    StorageService.saveAchievements(data);
  };

  const handleAddStart = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ title: '', metric: '', description: '', date: '' });
  };

  const handleEditStart = (achievement: Achievement) => {
    setIsAdding(true);
    setEditingId(achievement.id);
    setFormData({
      title: achievement.title,
      metric: achievement.metric,
      description: achievement.description,
      date: achievement.date
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('confirmDeleteAchievement'))) {
      updateAchievements(achievements.filter(a => a.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.date) return;

    if (editingId) {
      updateAchievements(achievements.map(a => 
        a.id === editingId ? { ...a, ...formData } : a
      ).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } else {
      const newAchievement: Achievement = {
         id: Date.now().toString(),
         title: formData.title,
         metric: formData.metric,
         description: formData.description,
         date: formData.date
      };
      
      updateAchievements([newAchievement, ...achievements].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const filteredAchievements = achievements.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('achievementsTitle')}</h1>
          <p className="text-slate-500 text-sm">{t('achievementsSubtitle')}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <input 
              type="text" 
              placeholder={t('searchMilestones')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none shadow-sm"
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button 
            onClick={handleAddStart}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#10B981] text-white rounded-xl text-sm font-semibold hover:bg-[#064E3B] shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            {t('addMilestone')}
          </button>
        </div>
      </div>

      {isAdding && (
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 animate-in fade-in duration-300">
           <h2 className="text-lg font-bold text-slate-800 mb-4">{editingId ? t('editMilestone') : t('addMilestone')}</h2>
           <div className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">{t('title')}</label>
                   <input 
                     type="text" 
                     value={formData.title}
                     onChange={(e) => setFormData({...formData, title: e.target.value})}
                     className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                     placeholder="e.g. Series A Funding"
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">{t('keyMetric')}</label>
                   <input 
                     type="text" 
                     value={formData.metric}
                     onChange={(e) => setFormData({...formData, metric: e.target.value})}
                     className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                     placeholder="e.g. $10M Raised"
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">{t('date')}</label>
                   <input 
                     type="date" 
                     value={formData.date}
                     onChange={(e) => setFormData({...formData, date: e.target.value})}
                     className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                   />
                </div>
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('description')}</label>
               <textarea 
                 rows={3}
                 value={formData.description}
                 onChange={(e) => setFormData({...formData, description: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none resize-none"
                 placeholder={t('milestoneDesc')}
               />
             </div>
             
             <div className="flex justify-end gap-3 mt-6">
                 <button 
                   onClick={() => setIsAdding(false)}
                   className="px-4 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-lg transition-colors"
                 >
                  {t('cancel')}
                 </button>
                 <button 
                   onClick={handleSave}
                   className="px-6 py-2 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#064E3B] transition-colors"
                 >
                   {editingId ? t('updateMilestone') : t('saveMilestone')}
                 </button>
             </div>
           </div>
         </div>
      )}

      <div className="relative border-l-2 border-emerald-100 ml-4 space-y-8 py-4">
        {filteredAchievements.map((item) => (
          <div key={item.id} className="relative pl-8 group">
            <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-white border-4 border-[#10B981] shadow-sm"></div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all relative">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditStart(item)}
                      className="p-1.5 bg-slate-50 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">{item.date}</span>
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                   {item.metric && <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">{item.metric}</span>}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Achievements;
