# Smart Leads Backend

A production-grade backend architecture for a Lead Management Dashboard built using:

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose

The project follows a scalable enterprise-style layered architecture using:

```txt
Route
→ Controller
→ Service
→ Repository
→ Database
```

---

# Features

* JWT Authentication
* Role-Based Authorization
* Lead CRUD APIs
* Search, Filtering & Pagination
* TypeScript Strict Mode
* Zod Validation
* Centralized Error Handling
* Modular Architecture
* MongoDB Integration
* Authentication Middleware
* Repository Pattern
* Clean Code Structure

---

# Tech Stack

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose

## Validation

* Zod

## Authentication

* JWT
* bcrypt

## Developer Tools

* ts-node-dev
* ESLint
* Prettier

## Security

* Helmet
* CORS
* Morgan

---

# Folder Structure

```txt
src/
│
├── app.ts
├── server.ts
│
├── config/
│   ├── db.ts
│   ├── env.ts
│   └── logger.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.repository.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.validation.ts
│   │   ├── auth.types.ts
│   │   └── auth.interface.ts
│   │
│   └── leads/
│       ├── leads.controller.ts
│       ├── leads.service.ts
│       ├── leads.repository.ts
│       ├── leads.routes.ts
│       ├── leads.validation.ts
│       ├── leads.types.ts
│       └── leads.interface.ts
│
├── models/
│   ├── user.model.ts
│   └── lead.model.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   ├── role.middleware.ts
│   └── validate.middleware.ts
│
├── routes/
│   └── index.ts
│
├── utils/
│   ├── ApiError.ts
│   ├── ApiResponse.ts
│   ├── asyncHandler.ts
│   ├── jwt.ts
│   ├── constants.ts
│   └── pagination.ts
│
└── types/
    └── express.d.ts
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smart-leads

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d
```

---

# Running The Project

## Development Mode

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

---

## Start Production Server

```bash
npm start
```

---

# Available Scripts

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "lint": "eslint . --ext .ts"
}
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

---

### Login

```http
POST /api/auth/login
```

---

## Leads

### Create Lead

```http
POST /api/leads
```

---

### Get All Leads

```http
GET /api/leads
```

Supports:

* Search
* Filtering
* Pagination
* Sorting

Example:

```http
GET /api/leads?search=john&status=CONTACTED&page=1&limit=10
```

---

### Get Single Lead

```http
GET /api/leads/:id
```

---

### Update Lead

```http
PUT /api/leads/:id
```

---

### Delete Lead

```http
DELETE /api/leads/:id
```

---

# Authentication

Protected routes use JWT authentication.

Example Authorization Header:

```http
Authorization: Bearer <token>
```

---

# Roles

Supported Roles:

```txt
ADMIN
SALES
```

---

# Architecture Overview

## Controller Layer

Responsible for:

* Handling req/res
* Calling services
* Returning API responses

No business logic should exist here.

---

## Service Layer

Responsible for:

* Business logic
* Validation handling
* Repository coordination

---

## Repository Layer

Responsible for:

* Database queries
* MongoDB interactions
* Mongoose operations

No business logic should exist here.

---

# Error Handling

The application uses:

* Centralized Error Middleware
* Custom ApiError class
* asyncHandler wrapper

---

# Validation

All request validation is handled using Zod schemas.

---

# Security Features

* Helmet
* CORS
* Password Hashing
* JWT Authentication
* Role-Based Authorization

---

# Future Improvements

* Refresh Tokens
* Email Verification
* Swagger Documentation
* Redis Caching
* Docker Support
* Unit Testing
* CI/CD Pipelines
* Rate Limiting
* File Uploads

---

# Author

Built as part of a MERN Lead Management Dashboard assignment using scalable backend architecture principles.
