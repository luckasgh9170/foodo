# FOODO

Premium bilingual (FA/EN) restaurant & cafe platform with a public menu and a professional admin panel. Real-time updates are delivered via Socket.IO, and all data is stored in a local PostgreSQL database.

## Features
- Public menu website with bilingual toggle, search, and filters
- Product detail page with image gallery and optional 3D model viewer (GLB/GLTF)
- Professional admin dashboard with CRUD for categories and products
- Settings panel for branding and SEO
- Real-time sync between admin and public site (Socket.IO)

## Tech Stack
- Next.js (App Router)
- Prisma + PostgreSQL
- Socket.IO
- Tailwind CSS
- React Three Fiber

## Setup
1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
copy .env.example .env
```
Update `DATABASE_URL`, `AUTH_SECRET`, and `ADMIN_PASSWORD`.

3. Initialize database:
```bash
npx prisma migrate dev --name init
npm run db:seed
```

4. Run the app:
```bash
npm run dev
```

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the admin panel.

## Production
```bash
npm run build
npm run start
```

The app uses a custom Node server (`server.js`) to enable WebSocket realtime updates. Keep it running in production.

## Default Admin
- Email: `admin@foodo.local`
- Password: `ADMIN_PASSWORD` from `.env` (default `ChangeMe123!`)

## Notes
- Currency is locked to Iranian Toman (تومان)
- When updating admin password, re-run `npm run db:seed` or update the user record manually.

## GitHub Pages Demo
A static demo is available in the `docs/` folder for quick previews.

Steps:
1. In GitHub repo settings, enable **Pages**.
2. Source: `Deploy from a branch`
3. Branch: `main` and folder `/docs`

Then open the provided GitHub Pages URL to view the demo.
