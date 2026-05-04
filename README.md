# notification-challenge-web

A user portal for managing and sending notifications, built on top of the [notification-challenge](https://github.com/bgnoatto/notification-challenge) REST API.

## Features

- Register and log in with JWT-based authentication
- Dashboard showing your last 5 notifications, sorted by creation date
- Each notification displays its channel (EMAIL, SMS, PUSH), delivery status (SENDING, SENT, FAILED), and timestamps
- Create new notifications and dispatch them through the selected channel
- Edit an existing notification and re-dispatch it — triggers a new send without creating a new record

## Pre-Requisites

- Node.js 20+
- The [notification-challenge](https://github.com/bgnoatto/notification-challenge) backend running and reachable
- A `.env.local` file at the project root (see Env vars below)

## How to run in development

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## How to build for production

```bash
npm run build
npm start
```

## Env vars

| Variable     | Description                                                                | Default                             |
|--------------|----------------------------------------------------------------------------|-------------------------------------|
| `API_URL`    | Base URL of the notification-challenge backend                             | `http://localhost:8080`             |
| `JWT_SECRET` | Base64-encoded secret used to verify JWT tokens (must match the backend's) | insecure default — override in prod |

Create a `.env.local` file at the project root:

```env
API_URL=http://localhost:8080
JWT_SECRET=<your-base64-encoded-secret>
```

## Techs

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- jose (JWT verification in Edge Runtime)
- lucide-react (icons)

## Decisions made

- **App Router + Server Components**: Data fetching happens server-side — no API calls from the browser, no CORS configuration needed. The frontend acts as a BFF layer over the Spring Boot API.
- **Server Actions**: Form submissions (login, register, create, edit) use Server Actions directly. No client-side fetch, no extra API routes.
- **httpOnly cookies**: The JWT is stored in an httpOnly, SameSite=Strict cookie — inaccessible to JavaScript, XSS-safe.
- **jose**: JWT verification runs in Next.js proxy (Edge Runtime), which does not support Node.js built-ins. `jose` is the only standards-compliant JWT library that works in the Edge.
- **Tailwind CSS v4**: Tokens are defined in `globals.css` via `@theme` — no `tailwind.config.js` needed.

## Route

- Local: [http://localhost:3000](http://localhost:3000)

## Areas to improve

- Add refresh token support — current JWT sessions expire after 8 hours with no silent renewal.
- Paginate the notifications list — currently capped at the last 5 on the client side after fetching all records.
- Add toast notifications for action feedback instead of relying solely on URL-based error params.
