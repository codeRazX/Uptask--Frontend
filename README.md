# 🚀 UpTask

**UpTask** is a full-stack (MERN) application designed for collaborative project management. Built for teams that need to plan, assign tasks, coordinate by roles, and maintain a clear and visual workflow.

This project includes both the **frontend** (React + TypeScript) and the **backend** (Node.js + Express + TypeScript).

---

## 🎯 Key Features

- 📁 Create projects with customizable tasks
- ✏️ Add internal notes to each task
- 👥 Invite collaborators via email with controlled access
- 🚦 Role management:  
  - **Manager**: full access  
  - **Collaborator**: limited interactions, no critical actions
- 🔄 Update task status via modal or drag & drop
- 📬 Account validation and password recovery through email
- 🧠 Secure authentication using JWT with httpOnly cookies
- ⚡ Optimized requests and validation across frontend and backend
- 💻 Clean, modern interface that is **100% responsive**

---

## 🧰 Tech Stack

### 🖥️ Frontend

- React + Vite + TypeScript
- TailwindCSS
- React Query
- React Hook Form
- Zod
- Axios with interceptors
- @dnd-kit/core
- React Router DOM

### ⚙️ Backend

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Express Validator
- JSON Web Tokens (JWT)
- Nodemailer
- Bcrypt
- CORS

---

## 🧱 Architecture & Technical Details

- Modular structure with separate controllers, routes, middlewares, and validations
- Input and API response validation using Zod and Express Validator
- Robust error handling and secure auth logic
- Fast, responsive drag & drop powered by optimized requests
- Seamless communication between frontend and backend via REST API

---

Backend is available is a [Backend UpTask](https://github.com/codeRazX/UpTask--Backend)
