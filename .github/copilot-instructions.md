## Repo overview

This repository is a simple two-part example: a Vite + React frontend in `Cliente/` and an Express + MongoDB backend in `Servidor/`.

- Frontend: `Cliente/` (Vite, React, axios). Key files: `src/login/UsuarioLogin.jsx`, `src/modules/UsuariosDB.jsx`, `src/modules/Rutes.jsx`.
- Backend: `Servidor/` (Express, Mongoose). Key files: `index.js`, `database.js`, `middleware.js`.

## Big-picture architecture

- Single-page React app (served separately with `vite`) talks to a local API server on port 3000.
- The server exposes at least two endpoints used by the client:
  - POST `/usuariosdb` — creates a user (see `Servidor/index.js`).
  - POST `/login` — authenticates and returns a JWT (short-lived: `expiresIn: "1m"`).
- DB connection uses `process.env.MONGOOSE_URI` in `Servidor/database.js`.
- JWT signing uses `process.env.JWT_ACCESS_SECRET` (see `Servidor/index.js`).

## How to run (developer workflow)

Run these from PowerShell (Windows):

1) Start the server

```powershell
cd "Servidor"
npm install
npm run dev   # starts nodemon index.js
```

2) Start the client

```powershell
cd "Cliente"
npm install
npm run dev   # starts Vite dev server
```

There are no automated tests in this repo. The client has an ESLint script: `npm run lint` (in `Cliente`).

## Important environment variables

- `Servidor/.env` should contain at least:
  - `PORT=3000`
  - `MONGOOSE_URI=<your mongodb uri>`
  - `JWT_ACCESS_SECRET=<strong secret>`

Do NOT commit real secrets. Use `.env` in `Servidor/` for local development.

## Project-specific patterns and gotchas (useful for an AI agent)

- Usernames are normalized on the server: `nombre.trim().toLowerCase()` in `Servidor/index.js`. Mirror that behavior when creating or searching users.
- Passwords are hashed with `bcrypt` (`await bcrypt.hash(password, 10)`) and compared with `bcrypt.compare`.
- JWT payload shape: `{ sub, nombre, role }` and tokens are signed with `JWT_ACCESS_SECRET` and expire in a very short time (`"1m"`) — agents should account for quick expiration while testing (re-login often or modify expiration when adding features).
- The server enables CORS (`app.use(cors())`), and the client directly calls `http://localhost:3000` in Axios calls (see `Cliente/src/*` files). Hard-coded URLs exist (search for `localhost:3000`).

## Middleware and authentication notes

- `Servidor/middleware.js` currently extracts a bearer token but does not verify it. Expected behavior for the middleware is:
  1. extract token (already present),
  2. verify with `jwt.verify(token, process.env.JWT_ACCESS_SECRET)`,
  3. attach decoded payload to `req.user` and call `next()`.

If you modify auth behavior, update both server token creation (`index.js`) and client flows that expect `data.status` and `data.usuario` after login.

## Integration points to inspect when changing behavior

- `Cliente/src/login/UsuarioLogin.jsx` — posts to `/login` and navigates to `/dashboard` on success.
- `Cliente/src/modules/UsuariosDB.jsx` — posts to `/usuariosdb`.
- `Servidor/index.js` — implements the endpoints and JWT creation (single file server). Use this to find how data is created and returned.

## Examples an AI agent might produce or alter (concrete)

- Example environment placeholder (do not commit):

```
PORT=3000
MONGOOSE_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/mydb?retryWrites=true&w=majority
JWT_ACCESS_SECRET=change_this_to_a_long_random_string
```

- Example middleware implementation to finish `Servidor/middleware.js` (REFERENCE only — modify in a PR):

```
import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default authenticate;
```

## Where to look first for changes

- For UI changes: `Cliente/src/` — components are small and self-contained.
- For API changes: `Servidor/index.js` and `Servidor/database.js` (DB wiring + endpoints).
- For auth flow: `Servidor/middleware.js` and `Cliente/src/login/UsuarioLogin.jsx`.

## Final notes

- There is no CI or existing `.github/copilot-instructions.md` to merge; this file is the initial guidance tailored to patterns I observed.
- If you want this file to be more prescriptive (tests, token refresh, stronger secrets policy), tell me which area to expand and I will update it.
