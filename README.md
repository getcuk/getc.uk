# getc.uk

Coding tutorial platform (Next.js App Router + TypeScript + Tailwind).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Structure

```
content/lessons/          # Lesson source files (markdown later)
src/
  app/
    api/health/           # Health check route
    api/lessons/          # Lessons JSON API
    lessons/              # Lessons index page
  components/
    layout/               # Site chrome (header, footer)
    lessons/              # Lesson UI
    ui/                   # Shared primitives
  lib/
    constants.ts
    content/              # Content loaders
    types/                # Shared types
    utils/                # Helpers (e.g. cn)
```
