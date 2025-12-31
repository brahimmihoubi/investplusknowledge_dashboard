
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AboutSection {
  id: string;
  title: string;
  content: string;
  image?: string;
  status: 'Published' | 'Draft';
  lastUpdated: string;
}

const mockSections: AboutSection[] = [
  {
    id: '1',
    title: 'Our Mission',
    content: 'To empower investors with data-driven insights and verified opportunities.',
    status: 'Published',
    lastUpdated: '2024-03-15'
  },
  {
    id: '2',
    title: 'Who We Are',
    content: 'We are a team of financial experts and technology innovators...',
    status: 'Published',
    lastUpdated: '2024-02-10'
  }
];

const About: React.FC = () => {
  const { t } = useTranslation();
  const [sections, setSections] = useState<AboutSection[]>(mockSections);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '', status: 'Draft' });

  const handleAddSection = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ title: '', content: '', status: 'Draft' });
  };

  const handleEdit = (section: AboutSection) => {
    setIsAdding(true);
    setEditingId(section.id);
    setFormData({
      title: section.title,
      content: section.content,
      status: section.status
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('confirmDeleteSection'))) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) return;
    
    if (editingId) {
      // Update existing section
      setSections(sections.map(section => 
        section.id === editingId 
          ? {
              ...section,
              title: formData.title,
              content: formData.content,
              status: formData.status as 'Published' | 'Draft',
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : section
      ));
    } else {
      // Add new section
      const newSection: AboutSection = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        status: formData.status as 'Published' | 'Draft',
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setSections([newSection, ...sections]);
    }
    
    setIsAdding(false);
    setEditingId(null);
    setFormData({ title: '', content: '', status: 'Draft' });
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('aboutManagement')}</h1>
          <p className="text-slate-500 text-sm">{t('aboutSubtitle')}</p>
        </div>
        <button 
          onClick={handleAddSection}
          className="px-5 py-2.5 bg-[#10B981] text-white rounded-xl text-sm font-semibold hover:bg-[#064E3B] shadow-md shadow-emerald-200 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          {t('addSection')}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 animate-in fade-in duration-300">
          <h2 className="text-lg font-bold text-slate-800 mb-4">{editingId ? t('editInfo') : t('addInfo')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('sectionTitle')}</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                placeholder="e.g. Our Vision"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('sectionContent')}</label>
              <textarea 
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={4}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none resize-none"
                placeholder={t('sectionContent') + "..."}
              />
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('status')}</label>
               <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
               >
                 <option value="Draft">{t('draft')}</option>
                 <option value="Published">{t('published')}</option>
               </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                }}
                className="px-4 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-lg transition-colors"
              >
                {t('cancel')}
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#064E3B] transition-colors"
              >
                {editingId ? t('updateSection') : t('saveSection')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {sections.map((section) => (
          <div key={section.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                 <h3 className="text-lg font-bold text-slate-800">{section.title}</h3>
                 <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${section.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                   {section.status}
                 </span>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(section)}
                  className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  title={t('edit')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button 
                  onClick={() => handleDelete(section.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  title={t('delete')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">{section.content}</p>
            <div className="text-xs text-slate-400 font-medium">
              {t('lastUpdated')}: {section.lastUpdated}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
