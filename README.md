# CineBook — Movie Booking App

A full-stack movie booking app built with React + TypeScript (Vite) and Node.js + Express + MongoDB.

## Features
- 🎬 Browse movies and shows
- 💺 Real-time seat locking (2-minute hold)
- 📅 Book seats
- ❤️ Watchlist — save favourite movies
- 🔐 JWT authentication

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, React Router |
| Backend | Node.js, Express 5, TypeScript |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Testing | Jest + Supertest (backend) |

## Getting Started

### 1. Clone
```bash
git clone https://github.com/SanagapalliVarshitha/BookingApp.git
cd BookingApp
```

### 2. Server
```bash
cd server
cp .env.example .env   # fill in your MONGO_URI and JWT_SECRET
npm install
npm run dev            # runs on http://localhost:3000
```

### 3. Client
```bash
cd client/vite-project
npm install
npm run dev            # runs on http://localhost:5173
```

### 4. Run tests
```bash
cd server && npx jest
```

## API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /auth/register | No | Register |
| POST | /auth/login | No | Login |
| GET | /movies | No | List movies |
| GET | /shows | No | List shows |
| POST | /bookings | No | Book seats |
| GET | /watchlist | Yes | My watchlist |
| POST | /watchlist | Yes | Add to watchlist |
| DELETE | /watchlist/:movieId | Yes | Remove from watchlist |
