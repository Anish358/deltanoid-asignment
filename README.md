# Dynamic Analytics Dashboard

## Project Overview

This is a comprehensive React.js dashboard application featuring user management and analytics capabilities, built with modern web development technologies.

## Tech Stack

- React.js
- Redux
- Axios (API | Data Fetching)
- React-Router (Routing)
- TypeScript
- Redux Thunk
- Charting Library (Recharts)
- Framer Motion (Animation)
- Tailwind CSS (Styling)

## Features

### Additional Features

- Route Protection
- Animations and Crisp UI
- Dynamic Routing for every user (UserDetails)

### User Management Dashboard

- Authentication with mock API
  Email: admin@example.com Password: password
- User table with actions (view details, delete)
- Search and filter functionality
- Pagination (10 users per page)

### Analytics Dashboard

#### Overview Cards

- Total Users count
- Active Users metric
- Deleted Users tracking

#### Charts

- User Registration Trend (Line Chart)
- Active vs Inactive Users (Pie Chart)
- Users by Region (Bar Chart)

#### Advanced Filtering

- Date range filters
- Region-based filtering

## Prerequisites

- Node.js (v14 or later)
- npm or Yarn

## Installation

1. Clone the repository

```bash
git clone https://your-repository-url.git
cd dynamic-dashboard
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm start
# or
yarn start
```

## Project Structure

```
src/
│
├── components/
│   ├── Analytics.tsx/
│   ├── UserDetails.tsx/
│   ├── Dashboard.tsx/
│   └── Login.tsx/
│
├── features/
│   ├── analytics/
│   │   ├── analyticsActions.ts
│   │   └── analyticsSlice.ts
│   ├── users/
│   │   ├── userSlice.ts
│   │   └── userSlice.ts
│   ├── login/
│   │   ├── loginSlice.ts
│   │   └── analyticsSlice.ts
│   ├── actions/
│   └── store.ts
│
├── redux/
│   └── store.ts
│
├── utils/
│   ├── ErrorModal.tsx/
│   └── index.tsx/
│
├── types/
│   └── index.ts
│
└── App.tsx/
```

## Key Technical Implementations

- Fully typed with TypeScript
- Redux for state management
- Redux Thunk for async actions
- Responsive design
- Mock API integration
- Protected Routes
- Session Managment

## Assumptions

- User "active" status is mocked
- Chart data is generated from mock datasets
- Authentication is simulated

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm test`: Runs the test suite

## Performance Optimizations

- Minimal use of `any` type
- Efficient Redux state management
- Optimized rendering strategies

## Contact

Anish Shejawale
anishwork69@gmail.com
+91 8127210707

# Live Link

```

```
