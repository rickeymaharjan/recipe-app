# Full-Stack Application

## Overview

This project has a **frontend** (React) and a **backend** (Node.js/Express). Both need to be run in separate terminals.

## Setup

### 1. Clone the repository:

```bash
git clone https://github.com/rickeymaharjan/recipe-app.git
cd recipe-app
```

### 2. Install dependencies
#### Frontend setup

```bash
cd frontend
npm install
```

#### Backend setup
```bash
cd ../backend
npm install
```

## Environment Variables
Create a .env file in the backend folder with this format:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-db
JWT_SECRET=your-jwt-secret
```
Create another .env file in the frontend folder with this format: 

```
VITE_BACKEND_URL=http://localhost:3000
```

## Running the Application

### 1. Backend (Terminal 1)
```bash
cd backend
npm run dev
```

### 2. Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```