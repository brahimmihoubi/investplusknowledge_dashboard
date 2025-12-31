
export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Investor' | 'Expert' | 'Admin' | 'Employee';
  status: 'Active' | 'Inactive';
  joinedDate: string;
  totalInvestment?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Event' | 'News' | 'Alert';
}

export type Page = 'dashboard' | 'about' | 'members' | 'experts' | 'projects' | 'method' | 'investisor' | 'partners' | 'achievements' | 'registrations' | 'announcements' | 'settings' | 'notifications';

export interface Project {
  id: string;
  name: string;
  category: string;
  budget: string;
  status: 'Ongoing' | 'Completed' | 'Planned';
  startDate: string;
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  email: string;
  specialization: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

export interface Investor {
  id: string;
  name: string;
  type: string;
  portfolioSize: string;
  status: 'Active' | 'Pending' | 'Inactive';
  joinedDate: string;
}

export interface Partner {
  id: string;
  name: string;
  type: string;
  website: string;
  status: 'Active' | 'Inactive';
  partnershipDate: string;
}

export interface MethodologyStep {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  metric: string;
  description: string;
  date: string;
}

export interface Registration {
  id: string;
  name: string;
  email: string;
  type: string;
  appliedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  documents?: { name: string; url: string }[];
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}
