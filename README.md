# StaffSync — MERN HR management system

React + Redux Toolkit + React Router + Axios + Bootstrap frontend; Express + MongoDB/Mongoose + JWT + bcrypt backend.

## Start on Windows

Install a supported Node.js LTS release and MongoDB Community Server (running locally), or obtain a MongoDB Atlas connection string.

1. Extract this ZIP and open the `staffsync` folder in VS Code.
2. Open its terminal and run:

```powershell
npm install
npm run install:all
Copy-Item server/.env.example server/.env
```

3. Open `server/.env`. Set `MONGODB_URI` to your database connection. Set `JWT_SECRET` to at least 32 random characters. Add `SEED_PASSWORD=your-chosen-strong-password` (8+ characters) for demo accounts. Do not commit this file.
4. Create demo accounts and run both servers:

```powershell
npm run seed
npm run dev
```

5. Open http://localhost:5173 . Sign in with your chosen SEED_PASSWORD:

| Role | Email |
|---|---|
| HR | hr@staffsync.test |
| Manager | manager@staffsync.test |
| Employee | employee@staffsync.test |

The seed is non-destructive and does not reset existing passwords. Remove SEED_PASSWORD from .env once accounts exist.

On macOS/Linux use `cp server/.env.example server/.env` instead of Copy-Item.

## What is implemented

- Public registration always creates an employee; privileged roles cannot be self-selected.
- JWT login, hashed passwords, active-account checks, protected APIs and role restrictions, authentication request limiting, security headers and input checks.
- HR creates employee/manager accounts, assigns managers, reviews performance, disables accounts, views people by department, attendance, leaves and dashboard counts.
- Managers see assigned employees, add performance ratings/reviews, approve/reject team leaves, view team attendance, schedule/delete their training programs.
- Employees edit personal details, check in/out, request leave, see status, company announcements, assigned training and personal notifications.
- Attendance unique per user/UTC date, overlapping non-rejected leave prevention, no self-approval, no second leave decision.
- Paginated people list, indexed emails/attendance/leaves, lazy-loaded app pages, responsive layouts, error and empty states.
- Required Users, Employees, Managers, Attendance, Leaves, Announcements, Trainings and Notifications collections.

## Production deployment

This is an ordinary MERN application. It needs a Node.js host and a reachable MongoDB database; a static-only host cannot run its Express API.

For one Node host, run `npm install`, `npm run install:all`, `npm run build`, then `npm start` in the repository root. Set environment variables in your host dashboard: MONGODB_URI, JWT_SECRET, PORT (if required), CLIENT_ORIGIN (your actual frontend origin). Both frontend and API can be served by Express. Configure SPA fallback if hosting the frontend separately; set VITE_API_URL to your API's full `/api` URL before building the frontend. Configure exact CLIENT_ORIGIN accordingly. Use HTTPS. If a reverse proxy is used, configure Express trust proxy for that host's topology before enabling the authentication rate limiter in production.

Upload source to your own GitHub repository, excluding node_modules and .env. Submit the actual GitHub URL and verified live URL in SkillWallet. This ZIP does not create a GitHub repository or a live deployment.

## Verification and scope

See VALIDATION.md for checks actually run in the delivery environment. MongoDB-dependent end-to-end testing must be done with your database before submission.

This is an educational project starter implementation, not a production HR/payroll system. Performance analytics consist of employee ratings/review notes and department counts, rather than historic charts. API lists other than people are capped (attendance/leaves: 200; announcements/training: 100); implement cursor pagination for larger deployments. Training attendees are the owner's team at creation time. Notifications are in-app, not email/push. Attendance dates use UTC, not local timezone. No password recovery, password change screen, leave balances, payroll, audit trail or automated production monitoring is included. No real employee data is bundled.

## Manual acceptance checks

1. Seed and log in with all three roles in separate browser sessions.
2. As HR create an employee and assign the manager. As manager confirm that employee appears. Verify another manager cannot see that employee's attendance or review their leave.
3. As employee check in, reject a second check-in, check out, reject a second checkout.
4. Request leave, reject an overlapping request, approve through the assigned manager. Confirm employee sees decision and notification; repeat decision and self-approval must fail.
5. HR publishes announcement; all roles see it. Manager creates training; assigned team sees it. Unassigned employee should not see that training.
6. HR disables an account; its existing token must fail subsequent API calls.
7. Inspect dashboard, people pagination, profile edits and mobile layout.
8. Test wrong password, invalid dates, malformed IDs, duplicate email, API failure and refreshing a deep link.
