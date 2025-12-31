
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Sidebar
      dashboard: 'Dashboard',
      about: 'About Us',
      members: 'Members',
      experts: 'Experts',
      projects: 'Projects',
      methodology: 'Methodology',
      investors: 'Investors',
      partners: 'Partners',
      achievements: 'Achievements',
      registrations: 'Registrations',
      announcements: 'Announcements',
      settings: 'Settings',
      overview: 'Overview',
      
      // Aliases
      method: 'Methodology',
      investisor: 'Investors',

      // Common Actions & Labels
      search: 'Search',
      addNew: 'Add New',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      active: 'Active',
      inactive: 'Inactive',
      status: 'Status',
      role: 'Role',
      actions: 'Actions',
      name: 'Name',
      email: 'Email',
      all: 'All',
      pages: 'Pages',
      date: 'Date',
      description: 'Description',
      title: 'Title',
      type: 'Type',
      joined: 'Joined',
      investment: 'Investment',
      noData: 'No data found.',

      // Dashboard
      dashboardOverview: 'Dashboard Overview',
      dashboardSubtitle: 'Real-time metrics from across the platform.',
      exportReport: 'Export Report',
      totalCapital: 'Total Capital',
      activeInvestorsStats: 'Active Investors',
      pendingApprovalsStats: 'Pending Approvals',
      activeProjectsStats: 'Active Projects',
      actionNeeded: 'Action Needed',
      allClear: 'All Clear',
      onTrack: 'On Track',
      capitalFlow: 'Capital Flow (Projection)',
      userGrowth: 'User Growth Trend',
      recentMembers: 'Most Recent Members',
      liveUpdates: 'Live Updates',

      // Members
      membersManagement: 'Members Management',
      membersSubtitle: 'View and manage all registered platform users and employees.',
      allRoles: 'All Roles',
      employee: 'Employee',
      admin: 'Admin',
      expert: 'Expert',
      investor: 'Investor',
      
      // Projects
      projectsTitle: 'Investment Projects',
      projectsSubtitle: 'Track and manage ongoing and planned investment initiatives.',
      budget: 'Budget',
      location: 'Location',
      progress: 'Progress',
      category: 'Category',

      // Announcements
      announcementsTitle: 'Broadcast News',
      announcementsSubtitle: 'Manage platform announcements and alerts.',
      subject: 'Subject',
      content: 'Content',

      // Settings
      adminProfile: 'Admin Profile',
      systemConfig: 'System Configuration',
      maintenanceMode: 'Maintenance Mode',
      emailNotifications: 'Email Notifications',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      displayName: 'Display Name',
      roleTitle: 'Role Title',
      avatarUrl: 'Avatar URL',

      // Notifications
      notifications: 'Notifications',
      notificationsSubtitle: 'View and manage all your system alerts and messages.',
      markAllRead: 'Read All',
      noNotifications: 'No new notifications',
      noNotificationsDesc: 'You are all caught up! Check back later for new alerts.',
      viewAllNotifications: 'View All Notifications',
      markAsRead: 'Mark as read',
      unread: 'Unread',
      read: 'Read'
    }

  },
  fr: {
    translation: {
      dashboard: 'Tableau de bord',
      about: 'À propos',
      members: 'Membres',
      experts: 'Experts',
      projects: 'Projets',
      methodology: 'Méthodologie',
      investors: 'Investisseurs',
      partners: 'Partenaires',
      achievements: 'Réalisations',
      registrations: 'Inscriptions',
      announcements: 'Annonces',
      settings: 'Paramètres',
      overview: 'Aperçu',
      
      method: 'Méthodologie',
      investisor: 'Investisseurs',

      search: 'Rechercher',
      addNew: 'Ajouter',
      edit: 'Modifier',
      delete: 'Supprimer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      active: 'Actif',
      inactive: 'Inactif',
      status: 'Statut',
      role: 'Rôle',
      actions: 'Actions',
      name: 'Nom',
      email: 'Email',
      all: 'Tout',
      pages: 'Pages',
      date: 'Date',
      description: 'Description',
      title: 'Titre',
      type: 'Type',
      joined: 'Rejoint',
      investment: 'Investissement',
      noData: 'Aucune donnée trouvée.',

      dashboardOverview: 'Aperçu du tableau de bord',
      dashboardSubtitle: 'Métriques en temps réel de la plateforme.',
      exportReport: 'Exporter rapport',
      totalCapital: 'Capital Total',
      activeInvestorsStats: 'Investisseurs Actifs',
      pendingApprovalsStats: 'Approbations En Attente',
      activeProjectsStats: 'Projets Actifs',
      actionNeeded: 'Action Requise',
      allClear: 'Tout est clair',
      onTrack: 'En bonne voie',
      capitalFlow: 'Flux de Capitaux (Projection)',
      userGrowth: 'Croissance des Utilisateurs',
      recentMembers: 'Membres Récents',
      liveUpdates: 'Mises à jour en direct',

      membersManagement: 'Gestion des Membres',
      membersSubtitle: 'Voir et gérer tous les utilisateurs et employés.',
      allRoles: 'Tous les rôles',
      employee: 'Employé',
      admin: 'Admin',
      expert: 'Expert',
      investor: 'Investisseur',

      projectsTitle: 'Projets d\'Investissement',
      projectsSubtitle: 'Suivre et gérer les initiatives d\'investissement.',
      budget: 'Budget',
      location: 'Lieu',
      progress: 'Progrès',
      category: 'Catégorie',

      announcementsTitle: 'Diffuser des nouvelles',
      announcementsSubtitle: 'Gérer les annonces et alertes de la plateforme.',
      subject: 'Sujet',
      content: 'Contenu',

      adminProfile: 'Profil Admin',
      systemConfig: 'Configuration Système',
      maintenanceMode: 'Mode Maintenance',
      emailNotifications: 'Notifications Email',
      editProfile: 'Modifier Profil',
      saveChanges: 'Enregistrer Changements',
      displayName: 'Nom d\'affichage',
      roleTitle: 'Titre du rôle',
      avatarUrl: 'URL Avatar',

      // Notifications
      notifications: 'Notifications',
      notificationsSubtitle: 'Consultez et gérez toutes vos alertes et messages système.',
      markAllRead: 'Tout lire',
      noNotifications: 'Aucune nouvelle notification',
      noNotificationsDesc: 'Vous êtes à jour ! Revenez plus tard pour de nouvelles alertes.',
      viewAllNotifications: 'Voir toutes les notifications',
      markAsRead: 'Marquer comme lu',
      unread: 'Non lu',
      read: 'Lu'
    }

  },
  ar: {
    translation: {
      dashboard: 'لوحة القيادة',
      about: 'معلومات عنا',
      members: 'الأعضاء',
      experts: 'الخبراء',
      projects: 'المشاريع',
      methodology: 'المنهجية',
      investors: 'المستثمرون',
      partners: 'الشركاء',
      achievements: 'الإنجازات',
      registrations: 'التسجيلات',
      announcements: 'الإعلانات',
      settings: 'الإعدادات',
      overview: 'نظرة عامة',
      
      method: 'المنهجية',
      investisor: 'المستثمرون',

      search: 'بحث',
      addNew: 'إضافة جديد',
      edit: 'تعديل',
      delete: 'حذف',
      save: 'حفظ',
      cancel: 'إلغاء',
      active: 'نشط',
      inactive: 'غير نشط',
      status: 'الحالة',
      role: 'الدور',
      actions: 'إجراءات',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      all: 'الكل',
      pages: 'الصفحات',
      date: 'التاريخ',
      description: 'الوصف',
      title: 'العنوان',
      type: 'النوع',
      joined: 'تاريخ الانضمام',
      investment: 'الاستثمار',
      noData: 'لم يتم العثور على بيانات.',

      dashboardOverview: 'نظرة عامة على اللوحة',
      dashboardSubtitle: 'إحصائيات فورية من المنصة.',
      exportReport: 'تصدير التقرير',
      totalCapital: 'إجمالي رأس المال',
      activeInvestorsStats: 'مستثمرون نشطون',
      pendingApprovalsStats: 'موافقات معلقة',
      activeProjectsStats: 'مشاريع نشطة',
      actionNeeded: 'إجراء مطلوب',
      allClear: 'الكل تمام',
      onTrack: 'على المسار',
      capitalFlow: 'تدفق رأس المال (توقعات)',
      userGrowth: 'نمو المستخدمين',
      recentMembers: 'أحدث الأعضاء',
      liveUpdates: 'تحديثات مباشرة',

      membersManagement: 'إدارة الأعضاء',
      membersSubtitle: 'عرض وإدارة جميع مستخدمي المنصة والموظفين.',
      allRoles: 'كل الأدوار',
      employee: 'موظف',
      admin: 'مدير',
      expert: 'خبير',
      investor: 'مستثمر',

      projectsTitle: 'مشاريع الاستثمار',
      projectsSubtitle: 'تتبع وإدارة مبادرات الاستثمار.',
      budget: 'الميزانية',
      location: 'الموقع',
      progress: 'التقدم',
      category: 'الفئة',

      announcementsTitle: 'بث الأخبار',
      announcementsSubtitle: 'إدارة إعلانات وتنبيهات المنصة.',
      subject: 'الموضوع',
      content: 'المحتوى',

      adminProfile: 'ملف المسؤول',
      systemConfig: 'تكوين النظام',
      maintenanceMode: 'وضع الصيانة',
      emailNotifications: 'إشعارات البريد',
      editProfile: 'تعديل الملف',
      saveChanges: 'حفظ التغييرات',
      displayName: 'الاسم المعروض',
      roleTitle: 'المسمى الوظيفي',
      avatarUrl: 'رابط الصورة',

      // Notifications
      notifications: 'الإشعارات',
      notificationsSubtitle: 'عرض وإدارة جميع تنبيهات ورسائل النظام الخاصة بك.',
      markAllRead: 'قراءة الكل',
      noNotifications: 'لا توجد إشعارات جديدة',
      noNotificationsDesc: 'أنت على اطلاع! تحقق مرة أخرى لاحقًا للحصول على تنبيهات جديدة.',
      viewAllNotifications: 'عرض كل الإشعارات',
      markAsRead: 'وضع علامة كمقروء',
      unread: 'غير مقروء',
      read: 'مقروء'
    }

  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
