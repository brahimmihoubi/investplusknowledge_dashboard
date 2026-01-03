
import React, { useState, useEffect } from 'react';
import { Registration } from '../types';
import { StorageService } from '../services/storageService';

const Registrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null); // For Review Modal

  useEffect(() => {
    setRegistrations(StorageService.getRegistrations());
  }, []);

  const refreshData = () => {
    setRegistrations(StorageService.getRegistrations());
  };

  const handleApprove = async (id: string) => {
    await StorageService.approveRegistration(id);
    refreshData();
    setSelectedReg(null);
  };

  const handleReject = (id: string) => {
    if (window.confirm('Are you sure you want to reject this registration?')) {
      StorageService.rejectRegistration(id);
      refreshData();
      setSelectedReg(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this record permanently?')) {
      const updated = registrations.filter(r => r.id !== id);
      StorageService.saveRegistrations(updated);
      setRegistrations(updated);
      setSelectedReg(null);
    }
  };

  const [statusFilter, setStatusFilter] = useState('All');

  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Registrations</h1>
          <p className="text-slate-500 text-sm">Review, verify, and approve new user applications.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
               <select 
                 value={statusFilter}
                 onChange={(e) => setStatusFilter(e.target.value)}
                 className="w-full sm:w-auto pl-4 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none shadow-sm appearance-none cursor-pointer"
               >
                 <option value="All">All Status</option>
                 <option value="Pending">Pending</option>
                 <option value="Approved">Approved</option>
                 <option value="Rejected">Rejected</option>
               </select>
               <svg className="w-4 h-4 absolute right-3 top-3 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
            <div className="relative w-full sm:w-auto">
                <input 
                  type="text" 
                  placeholder="Search applications..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-[#10B981] outline-none shadow-sm"
                />
                <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Applied Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border-2 border-white shadow-sm">
                        {reg.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{reg.name}</span>
                        <span className="text-xs text-slate-400">{reg.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-sm text-slate-600 font-medium">{reg.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{reg.appliedDate}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                      reg.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                      reg.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => setSelectedReg(reg)}
                        className="px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        Review
                      </button>
                      <button 
                        onClick={() => handleDelete(reg.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Record"
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

      {/* Review Modal */}
      {selectedReg && (
         <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden">
               <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-800">Review Application</h2>
                  <button onClick={() => setSelectedReg(null)} className="text-slate-400 hover:text-slate-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
               </div>
               
               <div className="p-4 md:p-6 space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-400">
                        {selectedReg.name.charAt(0)}
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-slate-800">{selectedReg.name}</h3>
                        <p className="text-slate-500">{selectedReg.email}</p>
                        <div className="mt-2 flex gap-2">
                           <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">{selectedReg.type}</span>
                           <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">Applied: {selectedReg.appliedDate}</span>
                        </div>
                     </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                     <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Submitted Documents</h4>
                     <div className="space-y-2">
                        {selectedReg.documents?.map((doc, idx) => (
                           <a key={idx} href={doc.url} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-400 transition-colors group">
                              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                              </div>
                              <span className="flex-1 text-sm font-medium text-slate-700 group-hover:text-blue-600">{doc.name}</span>
                              <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                           </a>
                        ))}
                        {(!selectedReg.documents || selectedReg.documents.length === 0) && (
                           <p className="text-sm text-slate-400 italic">No documents uploaded.</p>
                        )}
                     </div>
                  </div>
               </div>

               <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                  {selectedReg.status === 'Pending' ? (
                     <>
                        <button 
                           onClick={() => handleReject(selectedReg.id)}
                           className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all"
                        >
                           Reject Application
                        </button>
                        <button 
                           onClick={() => handleApprove(selectedReg.id)}
                           className="px-5 py-2.5 bg-[#10B981] text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-[#059669] transition-all"
                        >
                           Approve & Add Member
                        </button>
                     </>
                  ) : (
                     <span className="text-sm font-bold text-slate-500 flex items-center">
                        This application has been {selectedReg.status.toLowerCase()}.
                     </span>
                  )}
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default Registrations;
