# Dinesh Gahlot – Task Management Application

A full-stack task management application developed as part of the technical assignment for **Dinesh Gahlot**.

The application provides a workspace-style interface for managing tasks, viewing task details, updating task properties, searching tasks, and organizing tasks based on status and priority.

## Live Demo

- **Frontend:** [PASTE YOUR VERCEL URL HERE]
- **Backend API:** https://ablespace-backend-h0ah.onrender.com
- **Swagger API Documentation:** https://ablespace-backend-h0ah.onrender.com/api

## GitHub Repository

This repository contains the complete source code for the frontend and backend.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- REST API integration

### Backend

- NestJS
- TypeScript
- Mongoose
- MongoDB
- REST APIs
- Swagger / OpenAPI
- Class Validator
- Class Transformer

### Database

- MongoDB Atlas

### Deployment

- Frontend: Vercel
- Backend: Render

## Features

### Task Management

- View tasks in a board-style layout
- View tasks in a list layout
- Create new tasks
- View individual task details
- Edit existing tasks
- Delete tasks
- Search tasks
- Update task status
- Set task priority
- Assign tasks
- Add due dates
- Add labels to tasks

### Task Statuses

Tasks can be organized into:

- To Do
- Doing
- Completed
- On Hold

### Priority Levels

- No Priority
- Urgent
- High
- Medium
- Low

### Projects

The application includes a Projects section with a workspace-style UI for organizing and displaying project-related information.

## Project Structure

```text
Dinesh-Gahlot/
│
├── Backend/
│   ├── src/
│   │   ├── tasks/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── seed.ts
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── ...
│
├── Frontend/
│   ├── src/
│   │   ├── Components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── assets/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   └── ...
│
└── README.md

API Endpoints

The backend provides REST APIs for task management.

Method	Endpoint	Description
GET	/tasks	Get all tasks
GET	/tasks/:id	Get a single task
POST	/tasks	Create a task
PATCH	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task

The API can also be explored and tested through Swagger.

Swagger Documentation

Swagger/OpenAPI documentation is available at:

https://ablespace-backend-h0ah.onrender.com/api

Swagger provides an interactive interface for viewing and testing the available API endpoints.

Environment Variables
Backend

Create a .env file inside the Backend directory:

MONGODB_URI=your_mongodb_connection_string
PORT=5000
CORS_ORIGIN=http://localhost:5173
Frontend

Create a .env file inside the Frontend directory:

VITE_API_URL=http://localhost:5000

For production, VITE_API_URL should point to the deployed backend URL.

Local Setup

The following instructions are intended to work from a clean clone of the repository.

1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd Dinesh-Gahlot
2. Setup the Backend

Navigate to the backend directory:

cd Backend

Install dependencies:

npm install

Create a .env file:

MONGODB_URI=your_mongodb_connection_string
PORT=5000
CORS_ORIGIN=http://localhost:5173

Start the backend in development mode:

npm run start:dev

The backend will run at:

http://localhost:5000

Swagger documentation will be available at:

http://localhost:5000/api
3. Setup the Frontend

Open another terminal and navigate to the frontend:

cd Frontend

Install dependencies:

npm install

Create a .env file:

VITE_API_URL=http://localhost:5000

Start the frontend:

npm run dev

The frontend will normally be available at:

http://localhost:5173
Production Build
Backend

From the Backend directory:

npm run build
Frontend

From the Frontend directory:

npm run build

Both projects were successfully built using their respective production build commands.

Decisions and Assumptions

A few implementation decisions and assumptions were made during development:

MongoDB with Mongoose was used for persistent task storage.
The frontend and backend were kept as separate applications to maintain a clear separation between the user interface and REST API.
React Router was used for navigation between task and project views.
Task statuses and priorities use predefined values to keep the UI and API data consistent.
Environment variables are used for database credentials, API URLs, ports, and CORS configuration.
Swagger was added to provide interactive API documentation and make the backend endpoints easier to test.
The Projects section was implemented as part of the workspace-style UI.
What I Would Improve With More Time

If I had more time, I would further improve the application by adding:

User authentication and authorization
User-specific tasks and projects
More advanced filtering and sorting
Drag-and-drop task management
Pagination for larger datasets
More comprehensive form validation and error handling
Unit and integration tests
Improved mobile responsiveness
More detailed project management functionality
Activity history and task comments
CI/CD integration and automated testing
Time Spent

Approximately 6 hours were spent designing, developing, integrating, testing, debugging, and deploying the application.

What I Learned

One of the interesting parts of the project was integrating a React frontend with a NestJS backend and connecting the backend to MongoDB using Mongoose.

I also worked with Swagger/OpenAPI documentation while building the REST API. It provided a useful way to test and understand the backend endpoints independently of the frontend.

Another useful learning experience was deploying the frontend and backend as separate services and configuring communication between them using environment variables and CORS.

Security

Sensitive environment variables such as database credentials are not committed to the repository.

A .env.example file is provided to show the required environment variables without exposing actual credentials.

The actual .env files should never be committed to Git.

Deployment

The application is deployed using:

React + Vite Frontend
        |
        v
      Vercel
        |
        v
NestJS REST API
        |
        v
      Render
        |
        v
   MongoDB Atlas

The deployed backend is available at:

https://ablespace-backend-h0ah.onrender.com

Swagger API documentation:

https://ablespace-backend-h0ah.onrender.com/api

The production frontend communicates with the deployed backend through the VITE_API_URL environment variable.
