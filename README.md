# 🛒 Simple E-commerce Store

A full-stack e-commerce platform built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) featuring user authentication, dynamic product listings, cart management, order placement, admin panel, and much more.

---

## 🚀 Features

### 👤 User Features
- 🔐 Login/Register with JWT-based token auth
- 🛍️ Browse all available products
- 🔎 Search with live match highlighting
- 🛒 Add to cart with quantity controls
- ⚡ Buy Now for instant checkout
- 📦 Place orders and track delivery timeline
- 🧾 View your past orders

### 🛠️ Admin Features
- ➕ Add new products
- 📝 Edit existing products
- 🗑️ Delete any product
- 📊 Admin dashboard for product control

---

## 🧩 Tech Stack

| Layer     | Tech Used                                          |
|-----------|----------------------------------------------------|
| Frontend  | React, React Router, Axios, Context API, Toastify  |
| Backend   | Node.js, Express.js, MongoDB, Mongoose             |
| Auth      | JWT-based Auth with Role-based Authorization       |
| Styling   | Vanilla CSS3 + Custom Responsive Styling           |

---

## 📁 Folder Structure

```bash
.
├── backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── .env        # 🔒 Mongo URI & JWT_SECRET here
│
├── frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/
│   └── public/
│
├── structure.txt    # 📦 Auto-generated file structure
└── README.md


🛠️ Setup Instructions
📦 Prerequisites
~ Node.js ≥ 16.x
~ MongoDB Atlas cluster or local MongoDB
~ Git

⚙️ Environment Variables
~ Create a .env file inside the backend folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

🔧 Backend Setup
cd backend
npm install
npm run dev
Runs the backend server at: http://localhost:5000

💻 Frontend Setup
cd frontend
npm install
npm start
Runs React app at: http://localhost:3000

📌 Notes
✅ Admin Role is required to access /admin routes
🛑 Sensitive files like .env are ignored with .gitignore
🔒 JWT stored in localStorage, passed via Authorization header

🧠 Credits
Developed by Brijesh Rakholiya
Submitted for CodeAlpha Internship Task
GitHub: @brijeshrakholiya17

