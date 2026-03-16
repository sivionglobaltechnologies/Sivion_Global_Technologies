# SiviOn Global Technologies - Frontend

A premium, modern corporate website for SiviOn Global Technologies, built with React, Vite, and Tailwind CSS.

## Features
- **Modern UI/UX**: Professional dark-themed design with glassmorphism and premium aesthetics.
- **Interactive Animations**: Advanced micro-animations and page transitions using Framer Motion.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Dynamic Content**: Integrated with the backend for Blogs, Portfolio, Careers, and Lead Generation forms.
- **Admin Command Center**: Secure dashboard for managing all website content.
- **SEO Optimized**: Dynamic meta tags and titles using React Helmet.

## Tech Stack
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v6
- **API Client**: Axios

## Getting Started

### 1. Installation
Navigate to the frontend directory and install dependencies:
```bash
npm install
```

### 2. Configuration
Ensure the API client is pointing to the correct backend URL in `src/api/apiClient.js`.

### 3. Running the App
Start the development server:
```bash
npm run dev
```

### 4. Building for Production
Create an optimized production build:
```bash
npm run build
```

## Project Structure
- `src/components`: Reusable UI components (Navbar, Footer, Hero, etc.)
- `src/pages`: Individual page views
- `src/pages/admin`: Admin dashboard and management pages
- `src/api`: Axios instance and API configurations
- `src/assets`: Images and static assets
