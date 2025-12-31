
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification } from '../types';

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead,
  onDelete
}) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return (
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('notifications')}</h1>
          <p className="text-slate-500 mt-1">{t('notificationsSubtitle')}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onMarkAllAsRead}
            className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            {t('markAllRead')}
          </button>
        </div>
      </div>

      <div className="flex gap-2 bg-slate-100/50 p-1 rounded-xl w-fit">
        {(['all', 'unread', 'read'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              filter === f 
                ? 'bg-white text-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t(f)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-center p-8">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">{t('noNotifications')}</h3>
            <p className="text-slate-500 max-w-sm">{t('noNotificationsDesc')}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            <AnimatePresence>
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-6 hover:bg-slate-50 transition-colors flex gap-4 ${!notification.read ? 'bg-emerald-50/20' : ''}`}
                >
                  <div className="flex-shrink-0 pt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`text-base font-semibold ${!notification.read ? 'text-slate-800' : 'text-slate-600'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-slate-500 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button 
                            onClick={() => onMarkAsRead(notification.id)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors text-xs font-semibold"
                            title={t('markAsRead')}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          </button>
                        )}
                        <button 
                          onClick={() => onDelete(notification.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title={t('delete')}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
