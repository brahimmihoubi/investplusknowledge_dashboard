
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4 group hover:border-[#10B981] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-emerald-50 text-[#064E3B] rounded-2xl transition-all group-hover:brand-gradient group-hover:text-white">
          {icon}
        </div>
        <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {isPositive ? '+' : ''}{change}
        </div>
      </div>
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-bold text-[#1F5F63] mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default StatsCard;
