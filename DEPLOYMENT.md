# Weavy Workflow Builder - Deployment Guide

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# Trigger.dev
TRIGGER_API_KEY=your_trigger_api_key
TRIGGER_API_URL=https://api.trigger.dev

# Google Gemini API
GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# Transloadit
NEXT_PUBLIC_TRANSLOADIT_KEY=your_transloadit_key
TRANSLOADIT_SECRET=your_transloadit_secret
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Setup database:
```bash
npx prisma generate
npx prisma db push
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Vercel Deployment

1. Push code to GitHub repository

2. Import project in Vercel dashboard

3. Add environment variables in Vercel project settings

4. Deploy!

### Database Setup for Production

- Use a PostgreSQL database (e.g., Vercel Postgres, Supabase, Railway)
- Update `DATABASE_URL` in Vercel environment variables
- Run `npx prisma db push` after deployment

## Features

✅ Clerk authentication with protected routes
✅ React Flow canvas with DAG validation
✅ 6 node types: Text, Upload Image, Upload Video, LLM, Crop Image, Extract Frame
✅ Transloadit file uploads
✅ Trigger.dev background job execution
✅ Google Gemini LLM integration
✅ FFmpeg image/video processing
✅ Parallel DAG execution engine
✅ Workflow history tracking
✅ Export/Import workflows as JSON
✅ Undo/Redo functionality
✅ Pixel-perfect Weavy UI clone

## Tech Stack

- **Framework**: Next.js 16 App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Workflow Canvas**: React Flow
- **State Management**: Zustand
- **Database**: PostgreSQL + Prisma
- **Authentication**: Clerk
- **Background Jobs**: Trigger.dev
- **LLM**: Google Gemini API
- **File Uploads**: Transloadit
- **Media Processing**: FFmpeg
