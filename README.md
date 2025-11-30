# Task Manager (MERN)

**A full-stack MERN application enabling users to sign up / log in, manage tasks with priority, status, and due dates — built with MongoDB, Express, React and Node.**



---

## 📌 Table of Contents  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Folder Structure](#folder-structure)  
- [Installation & Setup](#installation--setup)  
- [Running the Project Locally](#running-the-project-locally)  
- [API Endpoints](#api-endpoints)  
- [Screenshots](#screenshots)  
- [Future Enhancements](#future-enhancements)  
- [License](#license)

---

## ✅ Features

- User authentication with secure JWT + bcrypt password hashing.  
- Full CRUD for tasks: create, read, update, and delete.  
- Task properties: **Title**, **Description**, **Priority** (low / medium / high), **Status** (todo / in-progress / done), **Due Date**.  
- Clean and responsive React frontend UI with badge-based priority/status visualisation.  
- RESTful APIs and protected routes (only logged-in users can manage tasks).  
- Separation of backend and frontend — easy to understand & deploy.  

---

## 🧰 Tech Stack

| Layer       | Technology |
|-------------|------------|
| Frontend    | React, Redux, Axios, React Router |
| Backend     | Node.js, Express.js, MongoDB (Mongoose), JWT, bcrypt |
| Styling     | Tailwind CSS / custom CSS (or your styling choice) |
| Database    | MongoDB Atlas (cloud) |
| Version Control | Git + GitHub |

---

## 📁 Folder Structure
/task-manager
├── backend/ # Express API + MongoDB
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── utils/
│ ├── app.js
│ └── .env
├── frontend/ # React client app
│ ├── src/
│ ├── public/
│ └── package.json
├── .gitignore
└── README.md


This separation keeps frontend and backend independent — ideal for maintenance or separate deployment. :contentReference[oaicite:0]{index=0}

---

## 🛠️ Installation & Setup

> **Prerequisites**: Node.js and npm installed  

1. Clone the repo  
   ```bash
   git clone https://github.com/Tanmay0405/task-manager.git
   cd task-manager
2. Setup backend
    ```bash
   cd backend
   npm install

3.Create a .env file and add:

MONGODB_URL=your_mongo_db_connection_string
ACCESS_TOKEN_SECRET=someVeryStrongSecret


4. Setup frontend
    ```bash
   cd ../frontend
   npm install

Running the Project Locally

From project root, open two consoles:

Backend

   cd backend
   npm start


Frontend

   cd frontend
   npm start


Now open: http://localhost:3000
 in browser.
Backend runs at http://localhost:5000

🔗 API Endpoints
| Method | Path               | Description                     | Auth Required |
| ------ | ------------------ | ------------------------------- | ------------- |
| POST   | `/api/auth/signup` | Register new user               | No            |
| POST   | `/api/auth/login`  | Login user, returns JWT         | No            |
| GET    | `/api/profile/`    | Get user profile info           | Yes           |
| GET    | `/api/tasks/`      | Get all tasks of logged-in user | Yes           |
| POST   | `/api/tasks/`      | Create new task                 | Yes           |
| GET    | `/api/tasks/:id`   | Get single task                 | Yes           |
| PUT    | `/api/tasks/:id`   | Update task                     | Yes           |
| DELETE | `/api/tasks/:id`   | Delete task                     | Yes           |

📸 Screenshots

<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/dbd9dab7-c85e-4a5a-a6ae-68e35ef61661" />

<img width="1919" height="871" alt="image" src="https://github.com/user-attachments/assets/dadc9b0a-2748-485b-a236-1b113769a898" />

<img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/55136e07-5fb6-4596-9f91-f3c857d48ebf" />

🚧 Future Enhancements

Add user profile edit options

Add due-date reminders / email notifications

Pagination and sorting for tasks

Dark / light mode toggle

Deploy backend and frontend on production (Heroku / Vercel / Render)

Add unit/integration tests

🎓 Why This Project Matters

This project demonstrates how to build a full-stack, production-ready web application using the popular MERN stack.
It shows you understand:

RESTful API design

Authentication with JWT

Secure password storage

Clean frontend-backend separation

React + Redux state management

CRUD operations with complex data models

Deployment-ready architecture

