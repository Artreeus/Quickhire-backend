# QuickHire - Backend API

A RESTful API for the QuickHire mini job board application, built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Validation:** express-validator
- **Environment:** dotenv

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Artreeus/Quickhire-backend.git
cd Quickhire-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickhire
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. Seed the database with sample data (optional):
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

## API Endpoints

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs (with search, filter, pagination) |
| GET | `/api/jobs/:id` | Get a single job by ID |
| POST | `/api/jobs` | Create a new job (Admin) |
| DELETE | `/api/jobs/:id` | Delete a job (Admin) |
| GET | `/api/jobs/categories` | Get all unique categories |

#### Query Parameters for GET /api/jobs

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by title, company, or description |
| `category` | string | Filter by category |
| `location` | string | Filter by location |
| `type` | string | Filter by job type (Full-Time, Part-Time, etc.) |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 12) |

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications` | Submit a job application |
| GET | `/api/applications` | Get all applications (Admin) |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check API status |

## Data Models

### Job

```javascript
{
  title: String,       // required
  company: String,     // required
  location: String,    // required
  type: String,        // required: Full-Time | Part-Time | Remote | Internship | Contract
  category: String,    // required
  description: String, // required
  requirements: [String],
  salary: String,
  companyLogo: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Application

```javascript
{
  jobId: ObjectId,     // required, references Job
  name: String,        // required
  email: String,       // required, valid email
  resumeLink: String,  // required, valid URL
  coverNote: String,   // optional, max 2000 chars
  createdAt: Date,
  updatedAt: Date
}
```

## Folder Structure

```
Backend/
├── server.js                # Entry point
├── package.json
├── .env                     # Environment variables
├── .gitignore
└── src/
    ├── config/
    │   └── db.js            # MongoDB connection
    ├── controllers/
    │   ├── jobController.js
    │   └── applicationController.js
    ├── middleware/
    │   ├── validate.js      # Input validation rules
    │   └── errorHandler.js  # Global error handler
    ├── models/
    │   ├── Job.js
    │   └── Application.js
    ├── routes/
    │   ├── jobRoutes.js
    │   └── applicationRoutes.js
    └── seed.js              # Database seeder
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm run seed` | Seed database with sample data |
