
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatsCard from '../components/StatsCard';
import { StorageService } from '../services/storageService';
import { Member } from '../types';
import { useTranslation } from 'react-i18next';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalAssets: 0,
    activeInvestors: 0,
    pendingApprovals: 0,
    activeProjects: 0
  });
  const [recentMembers, setRecentMembers] = useState<Member[]>([]);

  // Mock data for charts
  const chartData = [
    { name: 'Jan', value: 4000, users: 2400 },
    { name: 'Feb', value: 3000, users: 1398 },
    { name: 'Mar', value: 2000, users: 9800 },
    { name: 'Apr', value: 2780, users: 3908 },
    { name: 'May', value: 1890, users: 4800 },
    { name: 'Jun', value: 2390, users: 3800 },
    { name: 'Jul', value: 3490, users: 4300 },
  ];

  useEffect(() => {
    // 1. Fetch Data
    const members = StorageService.getMembers();
    const regs = StorageService.getRegistrations();
    const projects = StorageService.getProjects();

    // 2. Calculate Metrics
    const assets = members.reduce((sum, m) => sum + (m.totalInvestment || 0), 0);
    const investors = members.filter(m => m.role === 'Investor' && m.status === 'Active').length;
    const pending = regs.filter(r => r.status === 'Pending').length;
    const activeProjs = projects.filter(p => p.status === 'Ongoing').length;

    setStats({ 
      totalAssets: assets, 
      activeInvestors: investors, 
      pendingApprovals: pending, 
      activeProjects: activeProjs 
    });

    // 3. Get Recent Members
    const sortedMembers = [...members].sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
    setRecentMembers(sortedMembers.slice(0, 5));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F5F63]">{t('dashboardOverview')}</h1>
          <p className="text-slate-500 text-sm font-medium">{t('dashboardSubtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-[#1F5F63] rounded-xl text-sm font-bold hover:bg-slate-50 shadow-sm transition-all">
            {t('exportReport')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title={t('totalCapital')} 
          value={`$${stats.totalAssets.toLocaleString()}`} 
          change="+12.5%" 
          isPositive={true} 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatsCard 
          title={t('activeInvestorsStats')} 
          value={stats.activeInvestors.toString()} 
          change="+3" 
          isPositive={true} 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
        <StatsCard 
          title={t('pendingApprovalsStats')} 
          value={stats.pendingApprovals.toString()} 
          change={stats.pendingApprovals > 0 ? t('actionNeeded') : t('allClear')} 
          isPositive={stats.pendingApprovals === 0} 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatsCard 
          title={t('activeProjectsStats')} 
          value={stats.activeProjects.toString()} 
          change={t('onTrack')} 
          isPositive={true} 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-8">
             <h3 className="text-lg font-bold text-[#1F5F63]">{t('capitalFlow')}</h3>
           </div>
           <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                 <defs>
                   <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                     <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                 <Tooltip cursor={{stroke: '#10B981'}} />
                 <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
        <div className="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-8">
             <h3 className="text-lg font-bold text-[#1F5F63]">{t('userGrowth')}</h3>
           </div>
           <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                 <Tooltip cursor={{fill: '#f8fafc'}} />
                 <Bar dataKey="users" radius={[6, 6, 0, 0]} barSize={20} fill="#10B981" />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 md:p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#1F5F63]">{t('recentMembers')}</h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('liveUpdates')}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                <th className="px-8 py-4">{t('name')}</th>
                <th className="px-8 py-4">{t('role')}</th>
                <th className="px-8 py-4">{t('status')}</th>
                <th className="px-8 py-4">{t('investment')}</th>
                <th className="px-8 py-4">{t('joined')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#1F5F63]">{member.name}</span>
                        <span className="text-xs text-slate-400">{member.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-xs font-bold text-slate-500">
                    {t(member.role.toLowerCase())}
                  </td>
                  <td className="px-8 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider ${member.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                      {t(member.status.toLowerCase())}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm font-bold text-[#1F5F63]">
                    {member.totalInvestment ? `$${member.totalInvestment.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-8 py-4 text-xs text-slate-400 font-medium">{member.joinedDate}</td>
                </tr>
              ))}
              {recentMembers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-8 text-center text-slate-400 italic">{t('noData')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
