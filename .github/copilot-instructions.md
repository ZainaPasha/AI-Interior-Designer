# Copilot Instructions for AI Interior Designer

## Project Overview
- **Type:** Next.js 15 app with TypeScript, Clerk authentication, Prisma ORM, and Cloudinary integration.
- **Purpose:** Users upload room images, generate AI-enhanced designs (via HuggingFace), and save/view results.
- **Key Flows:**
  - Upload image → Generate design (API: `/api/generate`) → Save result (API: `/api/results`) → View in dashboard.

## Architecture & Data Flow
- **Frontend:**
  - Main UI in `app/dashboard/_components/client.tsx` (handles upload, prompt, generate, save, and progress UI).
  - Uses custom UI components from `components/` and `components/ui/`.
  - Room and style options from `lib/helper.ts`.
- **Backend:**
  - API routes in `app/api/`:
    - `generate/route.ts`: Calls HuggingFace model, uploads output to Cloudinary, returns permanent URL.
    - `results/route.ts`: Saves design metadata to DB (Prisma model: `GenerateRoom`).
    - `results/[id]/route.ts`: (WIP) Likely for updating/deleting results.
  - Database schema in `prisma/schema.prisma` (PostgreSQL, see `GenerateRoom` model).
  - DB client in `lib/db.ts` (Prisma output in `lib/generated/prisma/`).

## Developer Workflows
- **Dev server:** `pnpm dev` (uses Next.js Turbopack)
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Prisma:**
  - Generate client: `pnpm prisma generate`
  - Migrate: `pnpm prisma migrate dev`
- **Environment:**
  - Set `DATABASE_URL` (Postgres) and `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env`.

## Project Conventions
- **API:** Use Next.js route handlers (`route.ts`) for all backend logic.
- **Auth:** Use Clerk (`@clerk/nextjs/server`) for user context in API routes.
- **DB:** All DB access via Prisma client (`db` from `lib/db.ts`).
- **UI:** Prefer custom components in `components/` and `components/ui/`.
- **Image Upload:** Always use Cloudinary for storing generated images.
- **Prompts:** Room and AI style options are defined in `lib/helper.ts`.

## Integration Points
- **HuggingFace:** Model called in `app/api/generate/route.ts` via `@gradio/client`.
- **Cloudinary:** Used for all image uploads (see API route and client code).
- **Clerk:** Handles authentication and user context.

## Examples
- See `app/dashboard/_components/client.tsx` for the main user flow and API usage patterns.
- See `prisma/schema.prisma` for DB structure.
- See `app/api/generate/route.ts` for external API integration.

---
If any section is unclear or missing, please provide feedback for further refinement.
