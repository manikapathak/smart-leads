# LeadFlow — Lead Management Dashboard

A production-grade MERN stack frontend built with React, TypeScript, Vite, Tailwind CSS, and more.

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS v3 + DM Sans font |
| Routing | React Router DOM v6 |
| State | Zustand |
| Server State | TanStack Query (React Query) |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Notifications | React Hot Toast |
| Icons | Lucide React |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create env file
cp .env.example .env
# Edit VITE_API_URL to point to your backend

# 3. Start dev server
npm run dev
```

## Project Structure

```
src/
├── api/            # Axios instance + endpoint constants
├── components/
│   ├── common/     # Button, Input, Select, Modal, Table, Loader, EmptyState
│   ├── layout/     # Navbar, DashboardLayout (sidebar)
│   └── leads/      # LeadCard, LeadForm, LeadsTable, LeadFilters, DeleteLeadModal
├── hooks/          # useAuth, useLeads, useDebounce
├── pages/
│   ├── auth/       # LoginPage, RegisterPage
│   └── dashboard/  # DashboardPage, LeadsListPage, CreateLeadPage, EditLeadPage, LeadDetailsPage
├── routes/         # AppRoutes, ProtectedRoute, RoleProtectedRoute
├── schemas/        # Zod validation schemas
├── services/       # auth.service, leads.service
├── store/          # Zustand auth store
├── types/          # TypeScript interfaces
└── utils/          # cn, storage, formatDate
```

## Backend API Contract

Your Express backend should expose:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Login → `{ user, token }` |
| POST | /api/auth/register | Register → `{ user, token }` |
| GET | /api/auth/me | Current user |
| GET | /api/leads | List leads (filters: search, status, source, page, limit, sortBy, sortOrder) |
| GET | /api/leads/:id | Single lead |
| POST | /api/leads | Create lead |
| PUT | /api/leads/:id | Update lead |
| DELETE | /api/leads/:id | Delete lead |

## Roles

- **ADMIN** — Full access including delete
- **SALES** — View, create, edit only

## Features

- JWT authentication with persistent login (localStorage)
- Protected routes with role-based access
- Lead CRUD with optimistic updates
- Search (debounced), filter by status/source, sort by column
- Pagination (10 leads/page)
- Responsive layout — sidebar collapses on mobile
- Toast notifications for all actions
- TypeScript strict mode — zero `any` usage
