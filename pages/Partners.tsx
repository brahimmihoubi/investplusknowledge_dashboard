
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StorageService } from '../services/storageService';
import { Partner } from '../types';

const Partners: React.FC = () => {
  const { t } = useTranslation();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setPartners(StorageService.getPartners());
  }, []);

  const updatePartners = (data: Partner[]) => {
    setPartners(data);
    StorageService.savePartners(data);
  };
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Partner, 'id' | 'partnershipDate'>>({
    name: '',
    type: '',
    website: '',
    status: 'Active'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleAddStart = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ name: '', type: '', website: '', status: 'Active' });
  };

  const handleEditStart = (partner: Partner) => {
    setIsAdding(true);
    setEditingId(partner.id);
    setFormData({
      name: partner.name,
      type: partner.type,
      website: partner.website,
      status: partner.status
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('confirmDeletePartner'))) {
      updatePartners(partners.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name) return;

    if (editingId) {
      updatePartners(partners.map(p => 
        p.id === editingId ? { ...p, ...formData } : p
      ));
    } else {
      const newPartner: Partner = {
        id: Date.now().toString(),
        partnershipDate: new Date().toISOString().split('T')[0],
        ...formData
      };
      updatePartners([newPartner, ...partners]);
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const filteredPartners = partners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('partnersTitle')}</h1>
          <p className="text-slate-500 text-sm">{t('partnersSubtitle')}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="w-full sm:w-auto pl-4 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none shadow-sm appearance-none cursor-pointer"
             >
               <option value="All">{t('allStatus')}</option>
               <option value="Active">{t('active')}</option>
               <option value="Inactive">{t('inactive')}</option>
             </select>
             <svg className="w-4 h-4 absolute right-3 top-3 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
          <div className="relative w-full sm:w-auto">
            <input 
              type="text" 
              placeholder={t('searchPartners')}
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
            {t('addPartner')}
          </button>
        </div>
      </div>

      {isAdding && (
         <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 animate-in fade-in duration-300">
           <h2 className="text-lg font-bold text-slate-800 mb-4">{editingId ? t('editPartner') : t('addPartner')}</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('companyName')}</label>
               <input 
                 type="text" 
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('partnershipType')}</label>
               <input 
                 type="text" 
                 value={formData.type}
                 onChange={(e) => setFormData({...formData, type: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                 placeholder="e.g. Strategic"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('website')}</label>
               <input 
                 type="url" 
                 value={formData.website}
                 onChange={(e) => setFormData({...formData, website: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                 placeholder="https://..."
               />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('status')}</label>
                <select 
                   value={formData.status}
                   onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                   className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                >
                  <option value="Active">{t('active')}</option>
                  <option value="Inactive">{t('inactive')}</option>
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
                 {editingId ? t('updatePartner') : t('savePartner')}
               </button>
           </div>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <div key={partner.id} className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group relative">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                onClick={() => handleEditStart(partner)}
                className="p-1.5 bg-slate-100 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button 
                onClick={() => handleDelete(partner.id)}
                className="p-1.5 bg-slate-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
            
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl mb-4 text-slate-300 font-bold">
               {partner.name.charAt(0)}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">{partner.name}</h3>
            <p className="text-sm text-emerald-600 font-medium mb-4">{partner.type}</p>
            
            <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-50">
               <span>{t('since')} {partner.partnershipDate}</span>
               <a href={partner.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                 {t('visitWebsite')}
               </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
