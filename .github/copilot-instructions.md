# Copilot Instructions for ExpenseTrackerCoPilot

## Project Overview
This is a full-stack expense tracker built with React (TypeScript, Vite) for the frontend and Node.js (Express, TypeScript) for the backend. It supports user authentication and expense management with fixed categories.

## Architecture
- **Frontend** (`src/`):
  - Built with React + TypeScript + Vite.
  - Main entry: `src/main.tsx` renders `App.tsx`.
  - Authentication (`Auth.tsx`), expense entry (`ExpenseForm.tsx`), and expense listing (`ExpenseList.tsx`) are the core UI components.
  - API calls are centralized in `src/api.ts`.
- **Backend** (`server/src/`):
  - Express server in TypeScript.
  - Routes: `routes/auth.ts` (register/login), `routes/expense.ts` (categories, add/list expenses).
  - Uses in-memory arrays for users and expenses (no database).
  - JWT-based authentication; secret is hardcoded for demo purposes.

## Developer Workflows
- **Frontend**
  - Start dev server: `npm run dev` (from project root)
  - Build: `npm run build`
  - Lint: `npm run lint`
- **Backend**
  - Start server: `npm start` (from `server/`)
  - TypeScript config: `server/tsconfig.json` (uses `commonjs` modules)

## Patterns & Conventions
- **API Communication**: All frontend API calls use `src/api.ts`. Endpoints are `/api/auth/*` and `/api/expenses/*`.
- **Authentication**: JWT is issued on login and required for expense routes. Token is stored in React state and sent via `Authorization: Bearer <token>`.
- **Categories**: Expense categories are fixed and served from backend (`Fuel`, `Household`, `EMI`, `Bills`, `Health`, `Useless`).
- **State Management**: React hooks (`useState`, `useEffect`) are used for all state and side effects.
- **No Database**: All data is stored in-memory; restarting the backend will reset users and expenses.
- **TypeScript**: Strict typing is enforced in both frontend and backend configs.
- **Linting**: ESLint is configured for both frontend and backend. See `eslint.config.js` for rules.

## Integration Points
- **Frontend/Backend**: Communicate via HTTP on `localhost:5000` (backend) and `localhost:5173` (frontend by default).
- **CORS**: Enabled on backend for local development.

## Example: Adding an Expense
1. User logs in/registers via `Auth.tsx` (calls `/api/auth/*`).
2. Auth token is stored in React state.
3. User submits expense via `ExpenseForm.tsx` (calls `/api/expenses` with token).
4. Expense is added to in-memory array and listed in `ExpenseList.tsx`.

## Key Files
- `src/App.tsx`, `src/Auth.tsx`, `src/ExpenseForm.tsx`, `src/ExpenseList.tsx`, `src/api.ts`
- `server/src/index.ts`, `server/src/routes/auth.ts`, `server/src/routes/expense.ts`
- `eslint.config.js`, `tsconfig*.json`

## Special Notes
- No persistent storage; for production, add a database.
- JWT secret is hardcoded; rotate and secure for real apps.
- All API errors are returned as JSON with a `message` field.

---

If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions.
