# AbleSpace - Task Management Application

AbleSpace is a full-stack task management application built with React, TypeScript, Tailwind CSS, NestJS, MongoDB, and REST APIs.

The application provides a workspace-style interface for managing tasks, viewing task details, updating task properties, searching tasks, and organizing tasks based on status and priority.

---

## Features

### Task Management

- View tasks in a workspace-style interface
- Create new tasks
- View individual task details
- Edit existing tasks
- Delete tasks
- Search tasks
- Organize tasks by status
- Set task priority
- Assign tasks
- Set due dates
- Add labels

### Task Details

Each task has a dedicated details page where users can view and update:

- Title
- Description
- Status
- Priority
- Assignee
- Due date
- Labels

### Projects

The application includes a Projects section following the provided workspace-style UI.

### API Documentation

The backend includes Swagger/OpenAPI documentation for exploring and testing the available REST APIs.

Swagger documentation is available at:

https://ablespace-backend-h0ah.onrender.com/api

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- REST API integration

### Backend

- NestJS
- TypeScript
- MongoDB
- Mongoose
- REST APIs
- Class Validator
- Swagger / OpenAPI
- CORS

### Database

- MongoDB Atlas

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Project Structure

```text
AbleSpace/
│
├── Backend/
│   ├── src/
│   │   ├── tasks/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── seed.ts
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── tsconfig.tsbuildinfo
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── Components/
│   │   └── ...
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
│
└── README.md

Getting Started

These instructions are intended to work from a clean clone of the repository.

Prerequisites

Make sure the following are installed:

Node.js
npm
Git
MongoDB Atlas account or another MongoDB instance
Backend Setup
1. Navigate to the Backend directory
cd Backend
2. Install dependencies
npm install
3. Configure environment variables

Create a .env file inside the Backend directory.

Use the following structure:

MONGODB_URI=your_mongodb_connection_string
PORT=3000
CORS_ORIGIN=http://localhost:5173

The repository includes a .env.example file that can be used as a reference.

For MongoDB Atlas, the connection string will look similar to:

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ablespace

Do not commit your actual .env file or database credentials to the repository.

4. Start the backend in development mode
npm run start:dev

The backend will run at:

http://localhost:3000

Swagger API documentation will be available at:

http://localhost:3000/api
5. Build the backend
npm run build

The production build will be generated in the dist directory.

Frontend Setup

Open another terminal and navigate to the Frontend directory:

cd Frontend
1. Install dependencies
npm install
2. Configure the API URL

Create a .env file inside the Frontend directory:

VITE_API_URL=http://localhost:3000

This variable tells the frontend which backend API to communicate with.

3. Start the frontend
npm run dev

The frontend will normally be available at:

http://localhost:5173
4. Build the frontend
npm run build

The production build will be generated in:

dist/
API Endpoints

The backend provides REST APIs for task management.

Method	Endpoint	Description
GET	/tasks	Get all tasks
GET	/tasks/:id	Get a specific task
POST	/tasks	Create a new task
PATCH	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task

The API can also be explored and tested through Swagger:

https://ablespace-backend-h0ah.onrender.com/api
Implementation Decisions and Assumptions

A few implementation decisions and assumptions were made during development:

MongoDB with Mongoose was used for persistent task storage so that task data remains available after refreshing the application.
The frontend and backend were kept as separate applications to maintain a clear separation between the user interface and REST API.
React Router was used to handle navigation between the task list, task details, and project views.
Task statuses and priorities use predefined values to keep the UI and API data consistent.
Environment variables are used for database credentials, API URLs, ports, and CORS configuration instead of hard-coding deployment-specific values.
Swagger was added to provide interactive API documentation and make the backend endpoints easier to test.
The Projects section was implemented as part of the workspace UI based on the provided design.
What I Would Improve With More Time

If I had more time, I would improve the application by adding:

User authentication and authorization
User-specific workspaces and tasks
More complete project management functionality
Drag-and-drop task movement between statuses
More advanced filtering and sorting
Pagination for larger datasets
More comprehensive form validation
Improved error handling and user feedback
Automated unit and integration tests
More responsive/mobile-specific UI improvements
CI/CD checks for testing, linting, and production builds
Development Time

The project took approximately 6 hours to design, implement, test, debug, and deploy.

What I Learned

One of the most interesting parts of the project was working with NestJS, Mongoose, and Swagger together.

I learned how NestJS modules and controllers can be combined with Mongoose schemas to build a structured REST API, while Swagger can automatically provide interactive documentation for the API.

I also learned more about deploying a full-stack application with the frontend and backend deployed as separate services, and how environment variables and CORS are used to connect them securely.

Deployment

The application is deployed using the following architecture:

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

Environment Variables
Backend
MONGODB_URI=
PORT=3000
CORS_ORIGIN=http://localhost:5173
Frontend
VITE_API_URL=http://localhost:3000

For production deployment, the frontend API URL is configured to point to the deployed Render backend.

Security

Sensitive credentials are not included in the source code.

Environment variables are used for:

MongoDB connection credentials
Backend configuration
Frontend API URL
CORS configuration

The actual .env files containing secrets should never be committed to Git.

The repository contains .env.example files as references for the required environment variables.

Final Notes

The project was developed as a full-stack task management application with a focus on:

Clean and reusable React components
REST API integration
Persistent MongoDB storage
Structured NestJS backend architecture
Interactive API documentation
Workspace-style UI
Production deployment

The frontend and backend have both been built successfully and deployed for production use.



### One important thing before you push


I noticed your VS Code screenshot shows:


```text
Backend/
  .env
  .env.example

Make absolutely sure .env is in .gitignore and is NOT present on GitHub.

Your GitHub repository should have:

.env.example     ✅
.env             ❌

Also check that your MongoDB password is not visible in the GitHub repository or README.

Then simply save the file as:

AbleSpace/README.md

and run:

git add README.md
git commit -m "Add project README and setup instructions"
git push
