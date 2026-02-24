# Student Feedback and Evaluation System

Production-style SaaS dashboard for anonymous student feedback and institutional analytics.

## Stack
- Frontend: React (Vite), Tailwind, Router, Context API, React Hook Form, Recharts, Framer Motion
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, RBAC

## Local setup

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:4000`.

## Run on local network (LAN)
1. Get your machine IP:
```bash
ipconfig getifaddr en0
```
2. Backend config (`backend/.env`):
```bash
CLIENT_URL=http://<LAN_IP>:5173
CLIENT_URLS=http://localhost:5173,http://127.0.0.1:5173,http://<LAN_IP>:5173
```
3. Frontend config (`frontend/.env`):
```bash
VITE_API_URL=http://<LAN_IP>:4000/api/v1
```
4. Start services:
```bash
cd backend && npm run dev
cd frontend && npm run dev
```
5. Access from any device on same Wi-Fi:
- `http://<LAN_IP>:5173`

## Seed data
```bash
cd backend
npm run seed
```

Seeded credentials:
- Admin: `soumya.mishra.7812@gmail.com / 321123`
- Student: `student1@example.com / Student@123`

## Docker deployment
```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- MongoDB: `mongodb://localhost:27017`

## Key capabilities implemented
- JWT access token + httpOnly refresh cookie flow
- Role-based route and API protection (`ADMIN`, `STUDENT`)
- Dynamic feedback form builder (MCQ, Rating, Text, Emoji, Likert)
- Anonymous feedback submission with one response per student/form
- Aggregated analytics with privacy suppression for small cohorts
- Student insights unlocked after feedback submission
- Report exports: CSV and PDF

## Tests
```bash
cd backend
npm test
```

## CI
- GitHub Actions workflow added at `.github/workflows/ci.yml`
- Runs backend tests and frontend production build on push/PR
