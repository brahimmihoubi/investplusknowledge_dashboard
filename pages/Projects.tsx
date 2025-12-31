
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setProjects(StorageService.getProjects());
  }, []);

  const updateProjects = (data: Project[]) => {
    setProjects(data);
    StorageService.saveProjects(data);
  };

  const [formData, setFormData] = useState<Omit<Project, 'id' | 'startDate'>>({
    name: '',
    category: '',
    budget: '',
    status: 'Planned'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleAddStart = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ name: '', category: '', budget: '', status: 'Planned' });
  };

  const handleEditStart = (project: Project) => {
    setIsAdding(true);
    setEditingId(project.id);
    setFormData({
      name: project.name,
      category: project.category,
      budget: project.budget,
      status: project.status
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      updateProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.budget) return;

    if (editingId) {
      updateProjects(projects.map(p => 
        p.id === editingId ? { ...p, ...formData } : p
      ));
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        startDate: new Date().toISOString().split('T')[0],
        ...formData
      };
      updateProjects([newProject, ...projects]);
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Investment Projects</h1>
          <p className="text-slate-500 text-sm">Track and manage ongoing and planned investments.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="pl-4 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none shadow-sm appearance-none cursor-pointer"
             >
               <option value="All">All Status</option>
               <option value="Planned">Planned</option>
               <option value="Ongoing">Ongoing</option>
               <option value="Completed">Completed</option>
             </select>
             <svg className="w-4 h-4 absolute right-3 top-3 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search projects..." 
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
            Add New Project
          </button>
        </div>
      </div>

      {isAdding && (
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 animate-in fade-in duration-300">
           <h2 className="text-lg font-bold text-slate-800 mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
               <input 
                 type="text" 
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                 placeholder="e.g. Green Energy Plant"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
               <input 
                 type="text" 
                 value={formData.category}
                 onChange={(e) => setFormData({...formData, category: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                 placeholder="e.g. Infrastructure"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Budget</label>
               <input 
                 type="text" 
                 value={formData.budget}
                 onChange={(e) => setFormData({...formData, budget: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                 placeholder="e.g. $1,000,000"
               />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select 
                   value={formData.status}
                   onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                   className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                >
                  <option value="Planned">Planned</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
             </div>
           </div>
           <div className="flex justify-end gap-3 mt-6">
               <button 
                 onClick={() => setIsAdding(false)}
                 className="px-4 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-lg transition-colors"
               >
                 Cancel
               </button>
               <button 
                 onClick={handleSave}
                 className="px-6 py-2 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#064E3B] transition-colors"
               >
                 {editingId ? 'Update Project' : 'Save Project'}
               </button>
           </div>
         </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{p.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{p.category}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{p.budget}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                      p.status === 'Ongoing' ? 'bg-emerald-100 text-emerald-700' : 
                      p.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{p.startDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEditStart(p)}
                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)}
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

export default Projects;
