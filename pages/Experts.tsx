
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StorageService } from '../services/storageService';
import { Expert } from '../types';

const Experts: React.FC = () => {
  const { t } = useTranslation();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setExperts(StorageService.getExperts());
  }, []);

  const updateExperts = (data: Expert[]) => {
    setExperts(data);
    StorageService.saveExperts(data);
  };
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Expert, 'id' | 'joinedDate'>>({
    name: '',
    role: '',
    email: '',
    specialization: '',
    status: 'Active'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleAddStart = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      email: '',
      specialization: '',
      status: 'Active'
    });
  };

  const handleEditStart = (expert: Expert) => {
    setIsAdding(true);
    setEditingId(expert.id);
    setFormData({
      name: expert.name,
      role: expert.role,
      email: expert.email,
      specialization: expert.specialization,
      status: expert.status
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('confirmDeleteExpert'))) {
      updateExperts(experts.filter(e => e.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) return;

    if (editingId) {
      updateExperts(experts.map(exp => 
        exp.id === editingId 
          ? { ...exp, ...formData } 
          : exp
      ));
    } else {
      const newExpert: Expert = {
        id: Date.now().toString(),
        joinedDate: new Date().toISOString().split('T')[0],
        ...formData
      };
      updateExperts([newExpert, ...experts]);
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expert.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expert.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || expert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('expertsManagement')}</h1>
          <p className="text-slate-500 text-sm">{t('expertsSubtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="pl-4 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none shadow-sm appearance-none cursor-pointer"
             >
               <option value="All">{t('allStatus')}</option>
               <option value="Active">{t('active')}</option>
               <option value="Inactive">{t('inactive')}</option>
             </select>
             <svg className="w-4 h-4 absolute right-3 top-3 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder={t('searchExperts')}
               value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none w-64 shadow-sm"
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button 
            onClick={handleAddStart}
            className="px-5 py-2.5 bg-[#10B981] text-white rounded-xl text-sm font-semibold hover:bg-[#064E3B] shadow-md shadow-emerald-200 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            {t('addExpert')}
          </button>
        </div>
      </div>

      {isAdding && (
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 animate-in fade-in duration-300">
           <h2 className="text-lg font-bold text-slate-800 mb-4">{editingId ? t('editExpertProfile') : t('addExpert')}</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('fullName')}</label>
               <input 
                 type="text" 
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                 placeholder="e.g. Dr. John Doe"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('emailAddress')}</label>
               <input 
                 type="email" 
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                 placeholder="e.g. john@example.com"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('roleAndTitle')}</label>
               <input 
                 type="text" 
                 value={formData.role}
                 onChange={(e) => setFormData({...formData, role: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                 placeholder="e.g. Senior Analyst"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('specialization')}</label>
               <input 
                 type="text" 
                 value={formData.specialization}
                 onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                 placeholder="e.g. Cryptocurrency"
               />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('status')}</label>
                <select 
                   value={formData.status}
                   onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'Inactive'})}
                   className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
             </div>
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
                 {editingId ? t('updateExpert') : t('saveExpert')}
               </button>
           </div>
         </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4">{t('expertName')}</th>
                <th className="px-6 py-4">{t('roleSpecialization')}</th>
                <th className="px-6 py-4">{t('status')}</th>
                <th className="px-6 py-4">{t('joinedDate')}</th>
                <th className="px-6 py-4 text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExperts.map((expert) => (
                <tr key={expert.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border-2 border-white shadow-sm">
                        {expert.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{expert.name}</span>
                        <span className="text-xs text-slate-400">{expert.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-700">{expert.role}</span>
                      <span className="text-xs text-slate-500">{expert.specialization}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${expert.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {expert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{expert.joinedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEditStart(expert)}
                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(expert.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredExperts.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              {t('noExpertsFound')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experts;
