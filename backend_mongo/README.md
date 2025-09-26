# Travel App Backend (MongoDB)

## Setup Instructions

1. **Install dependencies**
   ```powershell
   cd backend_mongo
   npm install
   ```

2. **Configure environment variables**
   - Edit `.env` and set your MongoDB Atlas connection string for `MONGODB_URI`.

3. **Run the backend server**
   ```powershell
   npm run dev
   ```

## API Endpoints
- `GET /api/health` — Health check
- `GET /api/users` — User route placeholder
- `GET /api/trips` — Trip route placeholder

## Next Steps
- Implement authentication, CRUD for users/trips, and connect frontend to these endpoints.
- Expand database schema as needed for new features.
