
import React, { useState, useEffect } from 'react';
import { Member } from '../types';
import { StorageService } from '../services/storageService';
import { useTranslation } from 'react-i18next';

const Members: React.FC = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState<Member[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [formData, setFormData] = useState<Omit<Member, 'id' | 'joinedDate'>>({
    name: '',
    email: '',
    role: 'Investor',
    status: 'Active',
    totalInvestment: 0
  });

  useEffect(() => {
    setMembers(StorageService.getMembers());
  }, []);

  const updateMembers = (newMembers: Member[]) => {
    setMembers(newMembers);
    StorageService.saveMembers(newMembers);
  };

  const handleAddStart = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ name: '', email: '', role: 'Investor', status: 'Active', totalInvestment: 0 });
  };

  const handleEditStart = (member: Member) => {
    setIsAdding(true);
    setEditingId(member.id);
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role,
      status: member.status,
      totalInvestment: member.totalInvestment || 0
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('delete') + '?')) {
      updateMembers(members.filter(m => m.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) return;

    if (editingId) {
      updateMembers(members.map(m => 
        m.id === editingId ? { ...m, ...formData } : m
      ));
    } else {
      const newMember: Member = {
        id: Date.now().toString(),
        joinedDate: new Date().toISOString().split('T')[0],
        ...formData
      };
      updateMembers([newMember, ...members]);
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Expert': return 'bg-amber-100 text-amber-700';
      case 'Employee': return 'bg-purple-100 text-purple-700';
      case 'Admin': return 'bg-rose-100 text-rose-700';
      default: return 'bg-blue-100 text-blue-700'; // Investor
    }
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || m.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('membersManagement')}</h1>
          <p className="text-slate-500 text-sm">{t('membersSubtitle')}</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
             <select 
               value={roleFilter}
               onChange={(e) => setRoleFilter(e.target.value)}
               className="w-full sm:w-auto pl-4 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none shadow-sm appearance-none cursor-pointer"
             >
               <option value="All">{t('allRoles')}</option>
               <option value="Investor">{t('investor')}</option>
               <option value="Expert">{t('expert')}</option>
               <option value="Employee">{t('employee')}</option>
               <option value="Admin">{t('admin')}</option>
             </select>
             <svg className="w-4 h-4 absolute right-3 top-3 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
          <div className="relative w-full sm:w-auto">
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="w-full sm:w-auto pl-4 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none shadow-sm appearance-none cursor-pointer"
             >
               <option value="All">{t('all')}</option>
               <option value="Active">{t('active')}</option>
               <option value="Inactive">{t('inactive')}</option>
             </select>
             <svg className="w-4 h-4 absolute right-3 top-3 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
          <div className="relative w-full sm:w-auto">
            <input 
              type="text" 
              placeholder={t('search') + '...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-48 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none shadow-sm"
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button 
            onClick={handleAddStart}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#10B981] text-white rounded-xl text-sm font-semibold hover:bg-[#064E3B] shadow-md shadow-emerald-200 transition-all text-nowrap flex items-center justify-center"
          >
            + {t('addNew')}
          </button>
        </div>
      </div>

      {isAdding && (
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 animate-in fade-in duration-300">
           <h2 className="text-lg font-bold text-slate-800 mb-4">{editingId ? t('edit') : t('addNew')}</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('name')}</label>
               <input 
                 type="text" 
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('email')}</label>
               <input 
                 type="email" 
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('role')}</label>
               <select 
                 value={formData.role}
                 onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
               >
                 <option value="Investor">{t('investor')}</option>
                 <option value="Expert">{t('expert')}</option>
                 <option value="Employee">{t('employee')}</option>
                 <option value="Admin">{t('admin')}</option>
               </select>
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t('status')}</label>
               <select 
                 value={formData.status}
                 onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'Inactive'})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
               >
                 <option value="Active">{t('active')}</option>
                 <option value="Inactive">{t('inactive')}</option>
               </select>
             </div>
             
             {(formData.role === 'Investor' || formData.role === 'Expert') && (
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">{t('investment')} ($)</label>
                 <input 
                   type="number"
                   value={formData.totalInvestment}
                   onChange={(e) => setFormData({...formData, totalInvestment: Number(e.target.value)})}
                   className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                 />
               </div>
             )}
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
                 {t('save')}
               </button>
           </div>
         </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                <th className="px-8 py-4">{t('name')}</th>
                <th className="px-8 py-4">{t('role')}</th>
                <th className="px-8 py-4">{t('status')}</th>
                <th className="px-8 py-4">{t('joined')}</th>
                <th className="px-8 py-4 text-right">{t('investment')}</th>
                <th className="px-8 py-4">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border-2 border-white shadow-sm">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{member.name}</span>
                        <span className="text-xs text-slate-400">{member.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${getRoleBadgeColor(member.role)}`}>
                      {t(member.role.toLowerCase())}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-[#10B981]' : 'bg-slate-300'}`}></div>
                      <span className="text-sm text-slate-600">{t(member.status.toLowerCase())}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-500">{member.joinedDate}</td>
                  <td className="px-8 py-4 text-sm font-bold text-slate-800 text-right">
                    {member.totalInvestment && member.totalInvestment > 0 ? `$${member.totalInvestment.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditStart(member)}
                        className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(member.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Members;
