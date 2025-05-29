Social Blogging Platform (Vritant)
Project Overview
Vritant is a full-stack social blogging platform built with React (frontend) and Node.js/Express.js (backend) with a MySQL database. It enables users to register, log in, create/edit/delete blogs, and interact socially through a follow system with request, accept, and reject functionalities. The application features a responsive UI with animations, secure authentication, and efficient data handling.

Backend
Overview
The backend is built with Node.js and Express.js, providing RESTful APIs for user management, blog operations, and social interactions. It uses MySQL for data persistence and implements secure session management and data validation.

Features
User Management: Handles user registration, login, logout, profile updates, and deletion with validation for unique usernames/emails.
Blog Operations: Supports creating, updating, deleting, and retrieving blogs with pagination for efficient data loading.
Follow System: Manages follow requests with pending, accepted, and rejected states, including follower/following counts and request handling.
Security: Implements UUID-based session management with 1-hour expiration and soft deletion for data integrity.
Database: Structured MySQL schema with tables for users, blogs, and follow relationships.

Technologies
Node.js, Express.js
MySQL (mysql2 package)
CORS for cross-origin requests
JavaScript, ES6+
Dependencies: express, mysql2, cors, uuid

Setup Instructions
Prerequisites:
Node.js (v16 or higher)
MySQL (v8 or higher)

Installation:
cd backend
npm install

Database Configuration:
Create a MySQL database named vritant_db.
Update database credentials in db.js (host, user, password).
The schema and tables (user, blog, follow) are automatically created on server startup.

Run the Backend:
npm start
Server runs on http://localhost:8000.

API Endpoints:
User: POST /user/registration, POST /user/login, POST /user/logout, POST /user/update, POST /user/delete, POST /user/getUser
Blog: POST /blog/new, GET /blog/all, POST /blog/limited, POST /blog/update, POST /blog/delete
Follow: POST /follow/status, POST /follow/request, POST /follow/action, POST /follow/all

Folder Structure
backend/
├── db.js               # Database connection and schema setup
├── user/
│   └── userRoutes.js   # User-related API routes
├── blogs/
│   └── blogRoutes.js   # Blog-related API routes
├── follow/
│   └── followRoutes.js # Follow-related API routes
├── utils/
│   └── utils.js        # Utility functions (e.g., validateUserLogin)
├── clearDb.js          # Database clearing routes (if applicable)
└── index.js            # Main server file

Frontend
Overview
The frontend is built with React, featuring a responsive and visually appealing UI with Tailwind CSS and Framer Motion for animations. It supports user authentication, blog creation/editing, profile management, and a dynamic follow system with real-time interactions.

Features
User Authentication: Provides login and registration pages with password hashing using SHA-256 and session storage for user data.
Blog Management: Allows users to create, edit, and delete blogs with a form supporting title, content, and category selection.
Profile Management: Displays user profiles with follower/following counts, follow request modals, and profile editing capabilities.
Social Interactions: Enables users to send, accept, or reject follow requests, with real-time search for users.
UI/UX: Features animated UI elements (e.g., blobs, cards), toast notifications with react-toastify, and a paginated blog feed.

Technologies
React, React Router, Framer Motion
Tailwind CSS for styling
Axios for API requests
react-toastify for notifications
crypto-js for SHA-256 password hashing
Dependencies: react, react-router-dom, axios, framer-motion, react-toastify, crypto-js, lucide-react

Setup Instructions
Prerequisites:
Node.js 

Installation:
cd frontend
npm install

Run the Frontend:
npm start
Application runs on http://localhost:5173.

Configuration:
Ensure the backend server is running at http://localhost:8000 for API connectivity.
Update Axios base URL in the frontend if the backend runs on a different port.

Folder Structure
frontend/
├── src/
│   ├── components/
│   │   ├── Card.js          # BlogCard and LandingBlogCard components
│   │   ├── Navbar.js        # Navbar and HomeNavbar components
│   │   ├── ReqModal.js      # Modal for follow requests
│   │   ├── EditProfileModal.js # Modal for profile editing
│   │   ├── Ui.js            # Reusable Input and Button components
│   │   ├── UserAvater.js    # User avatar component
│   │   └── Footer.js        # Footer component
│   ├── pages/
│   │   ├── BlogPage.js      # Blog creation/editing page
│   │   ├── HomePage.js      # Home page with blog feed
│   │   ├── LandingPage.js   # Landing page with featured blogs
│   │   └── UserProfile.js   # User profile page
│   ├── Auth/
│   │   ├── Login.js         # Login page
│   │   └── Register.js      # Registration page
│   ├── utils/
│   │   └── hash.js          # SHA-256 password hashing utility
│   └── App.js               # Main app with routing
└── public/
    └── user.png             # Default user avatar

Prerequisites
Node.js (v16 or higher)
MySQL (v8 or higher for backend)
Git (for cloning the repository)

Installation
Clone the repository:
git clone https://github.com/K25anjali/vritant.git

Follow backend and frontend setup instructions above.

Running the Application
Start the backend server (npm start in the backend folder).
Start the frontend application (npm start in the frontend folder).
Access the application at http://localhost:5173.

Usage
Register or log in to create a user account.
Create, edit, or delete blogs from the profile or blog creation page.
Follow other users, manage follow requests, and view blogs on the home page.
Use the search bar to find users and visit their profiles.

Contributing
Fork the repository.
Create a new branch for your feature or bug fix.
Submit a pull request with a clear description of changes.

Author
Anjali (GitHub: K25anjali)
