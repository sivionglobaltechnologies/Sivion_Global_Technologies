# SiviOn Global Technologies - Backend

This is the backend server for the SiviOn Global Technologies corporate website, built with Node.js, Express, and PostgreSQL (Neon).

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, bcrypt

## Getting Started

### 1. Prerequisites
- Node.js installed on your machine.
- A Neon PostgreSQL database instance.

### 2. Installation
Navigate to the backend directory and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=5000
DATABASE_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_secure_random_string
JWT_EXPIRES_IN=1d
```

### 4. Database Setup
Run the single setup script to verify the connection, migration schema, synchronize columns, and seed default data (admin and job positions):
```bash
node scripts/setup.js
```

### 5. Running the Server
Start the development server:
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

## API Endpoints Summary

### Public
- `POST /api/contact` - Submit contact form
- `POST /api/quote` - Submit quote request
- `POST /api/careers/apply` - Submit job application
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:slug` - Get single blog by slug
- `GET /api/portfolio` - Get portfolio projects
- `GET /api/positions` - Get all active job positions

### Admin (Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/contact` - View all contact messages
- `DELETE /api/contact/:id` - Delete contact message
- `GET /api/quote` - View all quote requests
- `DELETE /api/quote/:id` - Delete quote request
- `GET /api/careers` - View all job applications
- `PATCH /api/careers/:id/status` - Update job application status
- `DELETE /api/careers/:id` - Delete job application
- `GET /api/consultations` - View all consultation bookings
- `PATCH /api/consultations/:id/status` - Update consultation status
- `DELETE /api/consultations/:id` - Delete consultation booking
- `GET /api/positions` - Manage all job positions (CRUD)
- `POST /api/blogs` - Create blog post
- `PUT /api/blogs/:id` - Update blog post
- `DELETE /api/blogs/:id` - Delete blog post
- `POST /api/portfolio` - Create portfolio project
- `PUT /api/portfolio/:id` - Update portfolio project
- `DELETE /api/portfolio/:id` - Delete portfolio project
