# Task Management Application

This is a full-stack Task Management Application built with React for the frontend and Node.js with Express and MongoDB for the backend.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend (Node.js/Express)](#backend-nodejsexpress)
  - [Frontend (React)](#frontend-react)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
  - [Backend Environment Variables](#backend-environment-variables)
  - [Frontend Environment Variables](#frontend-environment-variables)

## Getting Started

These instructions will help to set up and run the project on your local machine for development and testing purposes.

## Prerequisites

Before  begin, ensure  have met the following requirements:

- **Node.js** (v14.x or later): [Download and install Node.js](https://nodejs.org/)
- **npm** (Node Package Manager) or **Yarn**: Installed with Node.js, or [Yarn](https://yarnpkg.com/)
- **MongoDB**: A local or cloud-based MongoDB instance (e.g., MongoDB Atlas)

## Installation

### Backend (Node.js/Express)

1. Navigate to the `server` directory:

   ```bash
   cd server
Install the backend dependencies:

```bash

npm install
```
Frontend (React)
Navigate to the client directory:

```bash
cd ../client
```
Install the frontend dependencies:

```bash
npm install
```

Running the Application
1. Start the Backend Server
Navigate to the server directory and start the Node.js server:

```bash
cd server
node index.js
```
This will start the backend server on the port specified in your environment variables (default is 3000).

2. Start the Frontend Server
Navigate to the client directory and start the React development server:

```bash
cd ../client
npm run dev
or
npm start
```
This will start the React development server on port 5173 by default. 
If this port is already in use (e.g., by the backend), the React server will start on another port, such as 3001.

3. Access the Application
Once both servers are running, you can access the application in your web browser:

```bash
http://localhost:5173
or the port on which the React application is running.
```

Folder Structure
```bash
your-repo-name/
│
├── client/          # React frontend
│   ├── public/      # Public assets and index.html
│   ├── src/         # React components and application logic
│   │   ├── components/ # Reusable components
│   │   ├── pages/   # Page components
│   │   ├── App.js   # Main application component
│   │   └── index.js # Entry point for React
│   ├── package.json # Frontend dependencies and scripts
│   └── ...
│
├── server/          # Node.js backend
│   ├── config/      # Configuration files (e.g., DB connection)
│   ├── controllers/ # Express route controllers
│   ├── models/      # Mongoose models
│   ├── routes/      # Express routes
│   ├── server.js    # Main server file
│   ├── package.json # Backend dependencies and scripts
│   └── ...
│
└── README.md        # This file
```
Environment Variables.
Backend Environment Variables
Create a .env file in the server directory with the following content:

```bash
MONGODB_CONNECTION_STRING = mongodb+srv://jithinbinoy2000:qwertyuiop@cluster0.f5uhq.mongodb.net/TaskManageApplication?retryWrites=true&w=majority&appName=Cluster0
JWTSECRET=test
PORT=3000
SESSION_SECRET=test
```

