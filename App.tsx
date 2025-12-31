
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Experts from './pages/Experts';
import Members from './pages/Members';
import Announcements from './pages/Announcements';
import Projects from './pages/Projects';
import Methodology from './pages/Methodology';
import Investors from './pages/Investors';
import Partners from './pages/Partners';
import Achievements from './pages/Achievements';
import Registrations from './pages/Registrations';
import Settings from './pages/Settings';
import LanguageSwitcher from './components/languagesSwitcher';
import { StorageService } from './services/storageService';
import { Page, Notification } from './types';
import NotificationsDropdown from './components/NotificationsDropdown';
import Notifications from './pages/Notifications';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [adminProfile, setAdminProfile] = useState(StorageService.getAdminProfile());

  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Investor Application',
      message: 'Green Tech Ventures has submitted an application.',
      time: '10 min ago',
      read: false,
      type: 'info'
    },
    {
      id: '2',
      title: 'Project Milestone Reached',
      message: 'Desert Solar Plant Phase 1 is officially complete.',
      time: '2 hours ago',
      read: false,
      type: 'success'
    },
    {
      id: '3',
      title: 'Security Alert',
      message: 'Unusual login attempt detected from new IP address.',
      time: '5 hours ago',
      read: true,
      type: 'warning'
    },
    {
      id: '4',
      title: 'Server Maintenance',
      message: 'Scheduled maintenance for tonight at 02:00 AM.',
      time: '1 day ago',
      read: true,
      type: 'info'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const handleProfileUpdate = () => {
      setAdminProfile(StorageService.getAdminProfile());
    };
    window.addEventListener('adminProfileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('adminProfileUpdated', handleProfileUpdate);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'about': return <About />;
      case 'members': return <Members />;
      case 'experts': return <Experts />;
      case 'projects': return <Projects />;
      case 'method': return <Methodology />;
      case 'investisor': return <Investors />;
      case 'partners': return <Partners />;
      case 'achievements': return <Achievements />;
      case 'registrations': return <Registrations />;
      case 'announcements': return <Announcements />;
      case 'settings': return <Settings />;
      case 'notifications': 
        return (
          <Notifications 
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onDelete={handleDeleteNotification}
          />
        );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      <main className={`flex-1 p-8 min-h-screen transition-all duration-300 ${i18n.dir() === 'rtl' ? 'mr-64' : 'ml-64'}`}>
        <header className="flex items-center justify-between mb-8">
          <div className="relative">
            <span className="text-sm text-slate-400 font-medium capitalize">
               {t('pages')} / {t(activePage)}
            </span>
            <h2 className="text-lg font-bold text-slate-800 mt-1 capitalize">
              {activePage === 'dashboard' ? t('overview') : t(activePage)}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative" ref={notificationRef}>
              <button 
                className="relative p-2 text-slate-400 hover:text-emerald-500 transition-colors outline-none"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
                )}
              </button>
              
              {showNotifications && (
                <NotificationsDropdown 
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onClose={() => setShowNotifications(false)}
                  onViewAll={() => {
                    setActivePage('notifications');
                    setShowNotifications(false);
                  }}
                />
              )}
            </div>
            
            <LanguageSwitcher />
            
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className={`hidden sm:block ${i18n.dir() === 'rtl' ? 'text-left' : 'text-right'}`}>
                <p className="text-sm font-bold text-slate-800">{adminProfile.name}</p>
                <p className="text-[11px] text-[#00c896] font-bold uppercase tracking-wider">{adminProfile.role}</p>
              </div>
              <img src={adminProfile.image} className="w-10 h-10 rounded-2xl border-2 border-white shadow-sm ring-1 ring-emerald-100 object-cover" alt="Admin" />
            </div>
          </div>
        </header>

        <div className="max-w-[1400px] mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
