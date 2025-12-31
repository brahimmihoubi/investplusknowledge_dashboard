# Invest Plus - Admin Dashboard

A modern, comprehensive admin dashboard for managing the Invest Plus platform. Built with React, TypeScript, and Tailwind CSS, featuring a responsive design, multi-language support (English, French, Arabic), and interactive data visualization components.

## Features

- **Multi-Language Support**: Full internationalization (i18n) for English, French, and Arabic with automatic RTL (Right-to-Left) layout adjustments.
- **Responsive Design**: Fully responsive layout that adapts seamlessly to desktop, tablet, and mobile screens.
- **Interactive Dashboard**: Real-time overview with stats cards, charts, and activity feeds.
- **Member Management**: Tools to view and manage team members, experts, and investors.
- **Project Tracking**: dedicated section for monitoring investment projects, budgets, and milestones.
- **Notification System**: Real-time notification center with "Mark as Read" and "Read All" functionality, including a dropdown summary and detailed view.
- **Modern UI/UX**: Polished interface using Tailwind CSS, featuring glassmorphism effects, smooth transitions (Framer Motion), and a clean aesthetic.

## Tech Stack

- **Framework**: [React](https://reactjs.org/) (v18) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Heroicons](https://heroicons.com/) / SVG
- **Internationalization**: [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/invest-plus-admin-dashboard.git
   cd invest-plus-admin-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
invest-plus-admin-dashboard/
├── src/
│   ├── components/       # Reusable UI components (Sidebar, StatsCard, etc.)
│   ├── pages/            # Main page views (Dashboard, Members, Settings, etc.)
│   ├── services/         # Data services (StorageService, etc.)
│   ├── App.tsx           # Main application entry point & routing logic
│   ├── i18n.ts           # Internationalization configuration & translations
│   ├── types.ts          # TypeScript type definitions
│   └── index.css         # Global styles & Tailwind directives
├── public/               # Static assets
└── ...config files
```

## Customizable

You can easily customize the color scheme and branding keys in `tailwind.config.js` and `index.css`. The project is designed with modularity in mind, making it simple to add new pages or components.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
