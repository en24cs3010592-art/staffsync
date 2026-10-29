# Validation performed

- Frontend production build: passed, Vite 6.4.5, 97 modules transformed.
- Node syntax checks: app.js, models.js, index.js, seed.js passed.
- API security tests: 9 passed using real HTTP requests against Express, with database methods stubbed. Checks cover missing authentication, role restrictions, invalid calendar dates, cross-team leave access, self-approval denial and disabled accounts. Run with `npm test --prefix server`.
- Dependency installation: server and client completed successfully; lockfiles included.

Not verified: real MongoDB persistence, complete browser workflows, visual layouts, production hosting, GitHub upload. A MongoDB instance was unavailable in this environment. Follow README manual acceptance checks before submission. No live URL has been deployed.
