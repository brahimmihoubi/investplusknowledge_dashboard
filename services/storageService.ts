
import { Member, Project, Expert, Investor, Partner, MethodologyStep, Achievement, Registration, Announcement } from '../types';

// DEFAULT MOCK DATA
const DEFAULT_MEMBERS: Member[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Investor', status: 'Active', joinedDate: '2024-01-12', totalInvestment: 250000 },
  { id: '2', name: 'Sarah Connor', email: 'sarah@example.com', role: 'Expert', status: 'Active', joinedDate: '2023-11-05', totalInvestment: 0 },
  { id: '3', name: 'Mike Ross', email: 'mike@example.com', role: 'Investor', status: 'Inactive', joinedDate: '2024-02-20', totalInvestment: 15000 },
  { id: '4', name: 'Donna Paulsen', email: 'donna@example.com', role: 'Investor', status: 'Active', joinedDate: '2024-03-01', totalInvestment: 500000 },
  { id: '5', name: 'Emily Clark', email: 'emily@investplus.com', role: 'Employee', status: 'Active', joinedDate: '2024-03-15' },
];

const DEFAULT_PROJECTS: Project[] = [
  { id: '1', name: 'Solar Farm Alpha', category: 'Renewable Energy', budget: '$5,000,000', status: 'Ongoing', startDate: '2024-02-01' },
  { id: '2', name: 'Tech Hub Expansion', category: 'Infrastructure', budget: '$2,500,000', status: 'Planned', startDate: '2024-06-15' },
  { id: '3', name: 'Urban Green Space', category: 'Environment', budget: '$800,000', status: 'Completed', startDate: '2023-08-10' }
];

const DEFAULT_EXPERTS: Expert[] = [
  { id: '1', name: 'Dr. Sarah Smith', role: 'Financial Analyst', email: 'sarah.smith@example.com', specialization: 'Risk Management', status: 'Active', joinedDate: '2024-01-15' },
  { id: '2', name: 'James Wilson', role: 'Legal Advisor', email: 'j.wilson@example.com', specialization: 'Corporate Law', status: 'Active', joinedDate: '2023-11-20' }
];

const DEFAULT_INVESTORS: Investor[] = [
  { id: '1', name: 'Atlas Capital', type: 'Venture Capital', portfolioSize: '$50M+', status: 'Active', joinedDate: '2023-09-15' },
  { id: '2', name: 'Michael Chen', type: 'Angel Investor', portfolioSize: '$2M', status: 'Active', joinedDate: '2024-01-10' }
];

const DEFAULT_PARTNERS: Partner[] = [
  { id: '1', name: 'TechGiant Corp', type: 'Strategic', website: 'https://techgiant.com', status: 'Active', partnershipDate: '2023-05-20' },
  { id: '2', name: 'Global Finance', type: 'Financial', website: 'https://globalfinance.com', status: 'Active', partnershipDate: '2024-02-15' }
];

const DEFAULT_STEPS: MethodologyStep[] = [
  { id: '1', title: 'Initial Screening', description: 'Rigorous screening of all investment opportunities.', order: 1 },
  { id: '2', title: 'Due Diligence', description: 'Comprehensive financial and legal due diligence.', order: 2 },
  { id: '3', title: 'Execution', description: 'Finalizing deals and transferring funds.', order: 3 }
];

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'Series A Funding', metric: '$10M Raised', description: 'Successfully closed Series A funding round.', date: '2023-11-01' },
  { id: '2', title: 'User Milestone', metric: '50k Users', description: 'Reached 50,000 active users.', date: '2024-03-10' }
];

const DEFAULT_REGISTRATIONS: Registration[] = [
  { id: '1', name: 'Alice Wonder', email: 'alice@example.com', type: 'Investor', appliedDate: '2024-03-10', status: 'Pending', documents: [{ name: 'Passport.pdf', url: '#' }] },
  { id: '2', name: 'Bob Builder', email: 'bob@example.com', type: 'Expert', appliedDate: '2024-03-12', status: 'Pending', documents: [{ name: 'CV.pdf', url: '#' }] }
];

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  { id: '1', title: 'Expert Webinar: Market Trends 2026', content: 'Don\'t miss our live session on Market Trends 2026. Register through the admin portal for full access and premium insights.', date: '2025-12-15', category: 'Event' },
  { id: '2', title: 'Annual Audit Report 2024', content: 'The annual audit report for the fiscal year 2024 is now available for review by all premium members. Compliance confirmed.', date: '2024-12-01', category: 'News' }
];

// GENERIC STORAGE HELPER
const getStored = <T>(key: string, defaults: T[]): T[] => {
  if (typeof window === 'undefined') return defaults;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaults;
};

const setStored = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

// ADMIN PROFILE
const DEFAULT_ADMIN = {
  name: 'Adam Miller',
  role: 'Super Admin',
  image: 'https://picsum.photos/seed/admin/100/100'
};

export const StorageService = {
  // ... existing methods ...

  // ADMIN
  getAdminProfile: () => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('adminProfile') : null;
    return stored ? JSON.parse(stored) : DEFAULT_ADMIN;
  },
  saveAdminProfile: (data: typeof DEFAULT_ADMIN) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('adminProfile', JSON.stringify(data));
  },

  // MEMBERS
  getMembers: () => getStored('members', DEFAULT_MEMBERS),
  // ...

  saveMembers: (data: Member[]) => setStored('members', data),

  // PROJECTS
  getProjects: () => getStored('projects', DEFAULT_PROJECTS),
  saveProjects: (data: Project[]) => setStored('projects', data),

  // EXPERTS
  getExperts: () => getStored('experts', DEFAULT_EXPERTS),
  saveExperts: (data: Expert[]) => setStored('experts', data),

  // INVESTORS
  getInvestors: () => getStored('investors', DEFAULT_INVESTORS),
  saveInvestors: (data: Investor[]) => setStored('investors', data),

  // PARTNERS
  getPartners: () => getStored('partners', DEFAULT_PARTNERS),
  savePartners: (data: Partner[]) => setStored('partners', data),

  // METHODOLOGY
  getSteps: () => getStored('steps', DEFAULT_STEPS),
  saveSteps: (data: MethodologyStep[]) => setStored('steps', data),

  // ACHIEVEMENTS
  getAchievements: () => getStored('achievements', DEFAULT_ACHIEVEMENTS),
  saveAchievements: (data: Achievement[]) => setStored('achievements', data),

  // ANNOUNCEMENTS
  getAnnouncements: () => getStored('announcements', DEFAULT_ANNOUNCEMENTS),
  saveAnnouncements: (data: Announcement[]) => setStored('announcements', data),

  // REGISTRATIONS & WORKFLOW
  getRegistrations: () => getStored('registrations', DEFAULT_REGISTRATIONS),
  saveRegistrations: (data: Registration[]) => setStored('registrations', data),

  approveRegistration: async (registrationId: string): Promise<void> => {
    const regs = StorageService.getRegistrations();
    const reg = regs.find(r => r.id === registrationId);
    if (!reg) throw new Error('Registration not found');
    
    // Update Reg
    const updatedRegs = regs.map(r => r.id === registrationId ? { ...r, status: 'Approved' as const } : r);
    StorageService.saveRegistrations(updatedRegs);

    // Create Member
    const members = StorageService.getMembers();
    const newMember: Member = {
      id: Date.now().toString(),
      name: reg.name,
      email: reg.email,
      role: reg.type === 'Expert' ? 'Expert' : 'Investor',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      totalInvestment: 0
    };
    StorageService.saveMembers([newMember, ...members]);
  },

  rejectRegistration: (registrationId: string) => {
    const regs = StorageService.getRegistrations();
    const updatedRegs = regs.map(r => r.id === registrationId ? { ...r, status: 'Rejected' as const } : r);
    StorageService.saveRegistrations(updatedRegs);
  }
};
