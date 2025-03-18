# Event Flow

Event Flow is a web application designed to manage events. This app allows users to search and view detailed information about upcoming events. Also authenticated users can create, update and delete their own events.

## Features

- **Event Creation**: Create new events with details like title, date, and description.
- **Event Dashboard**: View all upcoming events in a clean dashboard.
- **User Authentication**: Secure sign-up and login functionality to manage your events.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, React Router DOM, React Query, Vite
- **Styling**: CSS modules
- **Backend**: Node.js, Express, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **File storage**: Cloudinary
- **Hosting**: Frontend on Vercel, Backend on Render
- **Database**: MongoDB

## Getting Started

To get a local copy of the project up and running, follow these simple steps.

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account (for the database)
- Cloudinary account (for image storage)

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
DB_URI=your mongodb uri
JWT_SECRET=your jwt secret
CLOUD_NAME=your cloudinary cloud name
CLOUDINARY_API_KEY=your cloudinary api key
CLOUDINARY_API_SECRET=your cloudinary api secret
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
VITE_API_URL=your backend url
```

4. Run the frontend locally:

```bash
npm run dev
```

The frontend will now be running at http://localhost:5173.
