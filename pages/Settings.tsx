
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';

const Settings: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const [profile, setProfile] = useState(StorageService.getAdminProfile());
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    StorageService.saveAdminProfile(profile);
    window.dispatchEvent(new Event('adminProfileUpdated'));
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       
       {/* Profile Section */}
       <div className="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-xl font-bold text-slate-800">Admin Profile</h2>
             <button 
               onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
               className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${isEditing ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
             >
               {isEditing ? 'Save Changes' : 'Edit Profile'}
             </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="relative group">
                <img 
                  src={profile.image} 
                  alt="Admin" 
                  className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-50 shadow-sm"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-xs text-white font-bold">Change</span>
                  </div>
                )}
             </div>
             
             <div className="flex-1 space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Display Name</label>
                      <input 
                        type="text" 
                        value={profile.name}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 disabled:opacity-75 disabled:cursor-not-allowed focus:border-emerald-500 outline-none transition-colors"
                      />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Role Title</label>
                      <input 
                        type="text" 
                        value={profile.role}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({...profile, role: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 disabled:opacity-75 disabled:cursor-not-allowed focus:border-emerald-500 outline-none transition-colors"
                      />
                   </div>
                </div>
                {isEditing && (
                   <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Avatar URL</label>
                      <input 
                        type="text" 
                        value={profile.image}
                        onChange={(e) => setProfile({...profile, image: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:border-emerald-500 outline-none transition-colors"
                      />
                   </div>
                )}
             </div>
          </div>
       </div>

       {/* System Settings Section */}
      <div className="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6">System Configuration</h2>
        <div className="space-y-6">
          
          {/* Maintenance Mode Toggle */}
          <div className="flex items-center justify-between py-4 border-b border-slate-50">
            <div>
              <h4 className="font-bold text-slate-700">Maintenance Mode</h4>
              <p className="text-sm text-slate-500">Temporarily disable user access</p>
            </div>
            <button 
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${maintenanceMode ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all duration-300 ${maintenanceMode ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>

          {/* Email Notifications Toggle */}
          <div className="flex items-center justify-between py-4 border-b border-slate-50">
            <div>
              <h4 className="font-bold text-slate-700">Email Notifications</h4>
              <p className="text-sm text-slate-500">Send updates to all members</p>
            </div>
            <button 
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${emailNotifications ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all duration-300 ${emailNotifications ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>

        </div>
        
        {(maintenanceMode || !emailNotifications) && (
           <div className="mt-8 p-4 bg-amber-50 text-amber-800 text-sm rounded-xl border border-amber-100 font-medium">
              Note: Changes are applied immediately to the system configuration.
           </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
