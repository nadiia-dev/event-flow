# Event Flow

Event Flow is a web application designed to manage events. This app allows users to search and view detailed information about upcoming events. Also authenticated users can create? update and delete their own events.

## Features

- **Event Creation**: Create new events with details like title, date, and description.
- **Event Dashboard**: View all upcoming events in a clean dashboard.
- **User Authentication**: Secure sign-up and login functionality to manage your events.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, React Router DOM, React Query, Vite, CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Hosting**: Frontend on Vercel, Backend on Render
- **Database**: MongoDB

## Getting Started

To get a local copy of the project up and running, follow these simple steps.

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account (for the database)

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/nadiia-dev/event-flow.git
cd event-flow/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the backend directory and add the following:

```env
DB_URI=your-mongo-uri
JWT_SECRET=your-jwt-secret
```

4. Run the backend locally:

```bash
npm start
```

The backend will now be running at http://localhost:8080.

### Frontend Setup

1. Navigate to the root folder:

```bash
cd ..
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add the following:

```env
VITE_API_URL=your-backend-url
```

4. Run the frontend locally:

```bash
npm run dev
```

The frontend will now be running at http://localhost:5173.
