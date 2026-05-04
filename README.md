# notification-challenge-web

A user portal for managing and sending notifications, built on top of the [notification-challenge](https://github.com/bgnoatto/notification-challenge) REST API.

## Features

- Register and log in with JWT-based authentication
- Dashboard showing your last 5 notifications, sorted by creation date
- Each notification displays its channel (EMAIL, SMS, PUSH), delivery status (SENDING, SENT, FAILED), and timestamps
- Create new notifications and dispatch them through the selected channel
- Edit an existing notification and re-dispatch it — triggers a new send without creating a new record

## Pre-Requisites

- Docker installed
- Docker Compose installed
- The [notification-challenge](https://github.com/bgnoatto/notification-challenge) backend running and reachable
- Port 3000 free

## How to run the APP

```bash
chmod +x ./run-app.sh
./run-app.sh
```

## How to run in development

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Env vars

| Variable     | Description                                                                | Default                              |
|--------------|----------------------------------------------------------------------------|--------------------------------------|
| `API_URL`    | Base URL of the notification-challenge backend                             | `http://host.docker.internal:8080`   |
| `JWT_SECRET` | Base64-encoded secret used to verify JWT tokens (must match the backend's) | insecure default — override in prod  |

For local development, create a `.env.local` file at the project root:

```env
API_URL=http://localhost:8080
JWT_SECRET=<your-base64-encoded-secret>
```

To override env vars at runtime with Docker:

```bash
API_URL=https://your-backend.com JWT_SECRET=your-secret ./run-app.sh
```

## Techs

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- jose (JWT verification in Edge Runtime)
- lucide-react (icons)
- Docker + Docker Compose

## Decisions made

- **App Router + Server Components**: Data fetching happens server-side — no API calls from the browser, no CORS configuration needed. The frontend acts as a BFF layer over the Spring Boot API.
- **Server Actions**: Form submissions (login, register, create, edit) use Server Actions directly. No client-side fetch, no extra API routes.
- **httpOnly cookies**: The JWT is stored in an httpOnly, SameSite=Strict cookie — inaccessible to JavaScript, XSS-safe.
- **jose**: JWT verification runs in Next.js proxy (Edge Runtime), which does not support Node.js built-ins. `jose` is the only standards-compliant JWT library that works in the Edge.
- **Tailwind CSS v4**: Tokens are defined in `globals.css` via `@theme` — no `tailwind.config.js` needed.
- **Docker standalone output**: `output: "standalone"` in `next.config.mjs` generates a minimal production image without the full `node_modules`. Significantly reduces image size.
- **host.docker.internal**: The Docker container reaches the external backend via `host.docker.internal`, resolved to the host gateway via `extra_hosts` in `docker-compose.yml` — required on Linux.

## Route

- Local: [http://localhost:3000](http://localhost:3000)

## Areas to improve

- Add refresh token support — current JWT sessions expire after 8 hours with no silent renewal.
- Paginate the notifications list — currently capped at the last 5 on the client side after fetching all records.
- Add toast notifications for action feedback instead of relying solely on URL-based error params.
