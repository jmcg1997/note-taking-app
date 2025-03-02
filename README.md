
# Note-Taking App 📝

This project is part of the **Software Development Bootcamp** Midterm and represents **30% of the final grade**.  
The goal was to build a complete **Note-Taking Application** with:

- ✅ Full **Backend** (Node.js + Express.js + MongoDB)
- ✅ Full **Frontend** (EJS Templates + CSS + JavaScript)
- ✅ **User Authentication** with JWT
- ✅ RESTful API Implementation

---

## 📋 Project Overview

The **Note-Taking App** allows users to:

✔️ **Register** and **Login** securely.  
✔️ Perform **CRUD operations** on their notes.  
✔️ See **only their own notes** after login.  
✔️ Store notes in **MongoDB** database.  
✔️ Interact with a user-friendly interface (EJS + CSS).  
✔️ Use secure **JWT Authentication**.  

---

## 📂 Project Structure

```
backend/
├── config/
│   ├── db.js                  // Database connection
├── controllers/
│   ├── authController.js      // Authentication logic
│   ├── noteController.js      // Note management logic
├── middleware/
│   ├── authMiddleware.js      // JWT verification middleware
├── models/
│   ├── Note.js                // Note schema
│   ├── User.js                // User schema
├── routes/
│   ├── auth.js                // Auth routes (register, login, verify)
│   ├── notes.js               // Note CRUD routes
├── utils/
│   ├── generateToken.js       // JWT generation helper
├── server.js                  // Main Express server

frontend/
├── public/
│   ├── script.js              // Frontend logic (fetching notes, handling forms)
│   ├── style.css              // Main styling
├── views/
│   ├── partials/
│   │   ├── header.ejs         // Navbar
│   │   ├── footer.ejs         // Footer
│   ├── index.ejs              // Login/Register page
│   ├── home.ejs               // Home page after login
│   ├── notes.ejs              // Notes management page
```

---

## 💻 Requirements

| Tool    | Version (Recommended) |
|--------|--------------------|
| Node.js | 18+ |
| MongoDB | Local/Atlas |
| npm     | Latest |

---

## 🚀 Installation Guide

### 1️⃣ Clone the repository

```bash
git clone https://github.com/jmcg1997/note-taking-app.git
cd note-taking-app
```

### 2️⃣ Install dependencies

```bash
cd backend
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file inside `backend/` with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5004
```

### 4️⃣ Start the server

```bash
npm start
```

### 5️⃣ Open the App

Visit 👉 [http://localhost:5004/](http://localhost:5004/)

---

## 📡 API Documentation

### Base URL

```
http://localhost:5004/api/
```

### 🔐 Authentication Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login and get token |
| GET | /auth/verify | Verify user token |

**Sample Login Request**

```json
{
    "email": "user@example.com",
    "password": "123456"
}
```

**Sample Login Response**

```json
{
    "token": "jwt_token_here",
    "userId": "user_id_here",
    "username": "exampleUser"
}
```

---

### 🗒️ Notes Endpoints (Authenticated)

| Method | Endpoint | Description |
|---|---|---|
| GET | /notes | Get all user notes |
| POST | /notes | Create a new note |
| GET | /notes/:id | Get single note by ID |
| PUT | /notes/:id | Update note by ID |
| DELETE | /notes/:id | Delete note by ID |

**Authorization Header Example:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Sample Create Note Request**

```json
{
    "title": "My First Note",
    "content": "This is the content of my first note"
}
```

---

## 🌐 Frontend Pages

| Page | Path | Description |
|---|---|---|
| Login/Register | `/` | Initial page for authentication |
| Home | `/home` | Welcome page after login |
| My Notes | `/notes` | Notes management page |

---

## ✨ Features Summary

✅ User Registration & Login  
✅ JWT Authentication (stored in `localStorage`)  
✅ Protected API Endpoints  
✅ Full **Notes CRUD** (Create, Read, Update, Delete)  
✅ Only authenticated users can access their own notes  
✅ Responsive UI with CSS  
✅ Persistent storage using **MongoDB**  
✅ Clear error handling (invalid data, missing fields, etc.)

---

## 🛠️ Challenges & Learnings

### 🔴 Challenges
- Connecting **frontend and backend** seamlessly.
- Handling **JWT tokens** correctly across multiple pages.
- Ensuring only the **authenticated user** can modify their notes.
- Structuring a **clean, modular fullstack project**.

### ✅ Learnings
- Solid understanding of **REST APIs** and **Express.js middleware**.
- Best practices for **Fullstack Project Structure**.
- Hands-on experience with **MongoDB + Mongoose**.
- Better skills in **error handling & debugging**.
- Improved use of **EJS templates & partials**.

---

## 📜 Development Process Insights

This project strengthened my knowledge of:

- **Routing & Controllers** separation.
- Secure authentication with **JWT**.
- Dynamic rendering using **EJS**.
- Combining client-side **JavaScript** with backend logic.
- Designing a **responsive, user-friendly UI** with clear feedback.

---

## 👨‍💻 Author

**Jesus M. Camacho**  
Software Development Bootcamp - Midterm Project  
**Cohort:** 2025

---

## 📎 License

This project is intended for **educational purposes only**.

---

## 📬 Contact

For questions, suggestions or feedback feel free to:

- Open an issue or pull request in the repository.
- Reach me via my GitHub profile: [jmcg1997](https://github.com/jmcg1997)