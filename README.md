# JWT Authentication Demo (React + Express)

A simple beginner-friendly project that demonstrates **JWT (JSON Web Token) Authentication** using:

- Backend: Node.js + Express
- Frontend: React (Vite)
- Authentication: JSON Web Token (JWT)

The project shows how users can:

- Log in with a username and password
- Receive a JWT token
- Access a protected API using the token
- Log out

---

# Project Structure

```
project-folder/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Technologies Used

## Backend

- Node.js
- Express.js
- CORS
- JSON Web Token (jsonwebtoken)

## Frontend

- React
- Vite
- Fetch API

---

# JWT Authentication Flow

```
User
   │
   │ Login (username/password)
   ▼
Express Server
   │
   │ Verify credentials
   ▼
Generate JWT
   │
   │ Return Token
   ▼
React App
   │
   │ Store Token
   ▼
Protected API Request
Authorization: Bearer <token>
   │
   ▼
JWT Verification
   │
   ├── Valid → Access Granted
   └── Invalid → Access Denied
```

---

# Installation

## Backend

Open a terminal.

```
cd backend
```

Install dependencies.

```
npm install
```

Required packages:

```
npm install express cors jsonwebtoken
```

Run the server.

```
node index.js
```

Server starts at:

```
http://localhost:5000
```

---

## Frontend

Open another terminal.

```
cd frontend
```

Install dependencies.

```
npm install
```

Run the React application.

```
npm run dev
```

Usually available at:

```
http://localhost:5173
```

---

# Default Login Credentials

Username

```
alice
```

Password

```
1234
```

---

# API Endpoints

## 1. Login

**POST**

```
/login
```

### Request

```json
{
  "username": "alice",
  "password": "1234"
}
```

### Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Failure Response

```json
{
  "message": "Invalid username or password"
}
```

---

## 2. Protected Profile

**GET**

```
/profile
```

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

### Success Response

```json
{
  "message": "Welcome back, alice!"
}
```

### Failure Response

```json
{
  "message": "Invalid or expired token"
}
```

---

# Backend Explanation

## Login Route

```
POST /login
```

- Reads username and password.
- Checks if the user exists.
- Generates a JWT token.
- Returns the token to the client.

---

## Authentication Middleware

```
requireAuth
```

Responsibilities:

- Reads the Authorization header.
- Extracts the JWT token.
- Verifies the token.
- Allows access if valid.
- Rejects invalid or expired tokens.

---

## Protected Route

```
GET /profile
```

This route is accessible only when:

- A JWT token is sent.
- The token is valid.

Otherwise, the server returns an error.

---

# Frontend Explanation

The React application has three main features.

## Login

- Sends username and password.
- Receives JWT token.
- Saves the token in React state.

---

## Get Protected Profile

- Sends the token inside:

```
Authorization: Bearer <token>
```

The backend verifies the token before responding.

---

## Logout

- Removes the token from React state.
- Clears profile information.
- Returns to the login screen.

---

# JWT Payload

Example payload:

```json
{
    "username": "alice",
    "iat": 1710000000,
    "exp": 1710003600
}
```

Where:

- username = logged-in user
- iat = issued at
- exp = expiration time

---

# Error Messages

| Status Code | Message |
|------------|-----------------------------|
| 401 | No token provided |
| 401 | Invalid username or password |
| 403 | Invalid or expired token |

---

# Demo Steps

1. Start the backend.

```
node index.js
```

2. Start the frontend.

```
npm run dev
```

3. Open:

```
http://localhost:5173
```

4. Login using:

```
Username: alice
Password: 1234
```

5. A JWT token is generated.

6. Click:

```
Get Protected Profile
```

7. The server verifies the token.

8. If valid, the message is displayed:

```
Welcome back, alice!
```

---

# Learning Objectives

This project helps beginners understand:

- REST APIs
- Express.js
- React
- JWT Authentication
- Middleware
- Protected Routes
- HTTP Headers
- Authentication Flow
- Fetch API
- JSON Responses

---

# Future Improvements

- Store users in a database
- Password hashing using bcrypt
- Refresh Tokens
- Role-Based Authentication
- User Registration
- Logout using token blacklist
- Environment variables for JWT secret
- LocalStorage authentication
- Token auto-refresh
- Protected React Routes

---

# Security Notes

This project is intended for learning purposes.

For production applications:

- Never hardcode the JWT secret.
- Store secrets in environment variables.
- Hash passwords using bcrypt.
- Use HTTPS.
- Validate all user inputs.
- Implement refresh tokens.
- Set secure token expiration policies.

---

# Author

JWT Authentication Demo using **React**, **Express**, and **JSON Web Token (JWT)** for learning authentication and protected API concepts.
