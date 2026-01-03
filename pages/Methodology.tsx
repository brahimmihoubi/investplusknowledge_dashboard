
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';
import { MethodologyStep } from '../types';

const Methodology: React.FC = () => {
  const [steps, setSteps] = useState<MethodologyStep[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setSteps(StorageService.getSteps());
  }, []);

  const updateSteps = (data: MethodologyStep[]) => {
    setSteps(data);
    StorageService.saveSteps(data);
  };
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', order: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddStart = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ title: '', description: '', order: (steps.length + 1).toString() });
  };

  const handleEditStart = (step: MethodologyStep) => {
    setIsAdding(true);
    setEditingId(step.id);
    setFormData({
      title: step.title,
      description: step.description,
      order: step.order.toString()
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this step?')) {
      updateSteps(steps.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) return;
    
    const orderNum = parseInt(formData.order) || steps.length + 1;

    if (editingId) {
      updateSteps(steps.map(s => 
        s.id === editingId 
          ? { ...s, title: formData.title, description: formData.description, order: orderNum } 
          : s
      ).sort((a,b) => a.order - b.order));
    } else {
      const newStep: MethodologyStep = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        order: orderNum
      };
      updateSteps([...steps, newStep].sort((a,b) => a.order - b.order));
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const filteredSteps = steps.filter(step => 
    step.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    step.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Work Methodology</h1>
          <p className="text-slate-500 text-sm">Define the steps and processes for your workflow.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <input 
              type="text" 
              placeholder="Search steps..." 
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
            Add New Step
          </button>
        </div>
      </div>

      {isAdding && (
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6 animate-in fade-in duration-300">
           <h2 className="text-lg font-bold text-slate-800 mb-4">{editingId ? 'Edit Step' : 'Add New Step'}</h2>
           <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Step Title</label>
               <input 
                 type="text" 
                 value={formData.title}
                 onChange={(e) => setFormData({...formData, title: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
                 placeholder="e.g. Initial Screening"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
               <textarea 
                 rows={3}
                 value={formData.description}
                 onChange={(e) => setFormData({...formData, description: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none resize-none"
                 placeholder="Description of this step..."
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Order Sequence</label>
               <input 
                 type="number" 
                 value={formData.order}
                 onChange={(e) => setFormData({...formData, order: e.target.value})}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none"
               />
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
                   {editingId ? 'Update Step' : 'Save Step'}
                 </button>
             </div>
           </div>
         </div>
      )}

      <div className="flex flex-col gap-4">
        {filteredSteps.map((step) => (
          <div key={step.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center shrink-0">
               {step.order}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                 <h3 className="text-lg font-bold text-slate-800 mb-1">{step.title}</h3>
                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditStart(step)}
                      className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(step.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                 </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Methodology;
