
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Notification } from '../types';

interface NotificationsDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClose: () => void;
  onViewAll: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead,
  onClose,
  onViewAll
}) => {
  const { t } = useTranslation();

  return (
    <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800">{t('notifications')}</h3>
        <button 
          onClick={onMarkAllAsRead}
          className="text-xs text-slate-400 hover:text-emerald-500 transition-colors"
        >
          {t('markAllRead')}
        </button>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-400 text-sm">{t('noNotifications')}</p>
          </div>
        ) : (
          <div>
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${!notification.read ? 'bg-emerald-50/30' : ''}`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    notification.type === 'success' ? 'bg-emerald-500' :
                    notification.type === 'warning' ? 'bg-amber-500' :
                    notification.type === 'error' ? 'bg-rose-500' :
                    'bg-blue-500'
                  }`} />
                  <div>
                    <h4 className={`text-sm font-medium ${!notification.read ? 'text-slate-800' : 'text-slate-600'}`}>
                      {notification.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-2 block">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
        <button 
          onClick={onViewAll}
          className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          {t('viewAllNotifications')}
        </button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
