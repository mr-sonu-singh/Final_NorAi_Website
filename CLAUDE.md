# NorAI Agent & Developer Guide (`AGENTS.md`)

> **Notice:** This file is mirrored identically across `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md` to ensure a consistent, unified operating context across all AI engineering environments.

## 1. Project Overview & Role

Welcome to the **NorAI Technologies** official web platform. This repository powers the marketing site, product showcases, interactive sandboxes, and documentation for NorAI's autonomous tools and enterprise services.

As an AI agent or engineer working in this codebase, your role is to help build, refine, and maintain high-quality, performant, and visually engaging web experiences. You are empowered to make thoughtful design, architectural, and copy decisions that serve the project's goals.

---

## 2. Technology Stack & Core Concepts

- **Framework**: [Next.js 15](https://nextjs.org/) App Router
- **UI Runtime**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS custom properties in `app/globals.css`
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Motion & Physics**: [Framer Motion](https://www.framer.com/motion/) (with `prefers-reduced-motion` support)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Validation**: [Zod](https://zod.dev/)

### Key Conventions

- **Server Components by Default**: Keep marketing pages, static content, and layout shells as React Server Components (RSC) for optimal load times and SEO.
- **Client Components for Interactivity**: Use `'use client'` on interactive leaves (e.g., interactive workbenches, filter tabs, copy buttons, modal dialogs).
- **Design Tokens**: Prefer using the semantic CSS variables (`var(--surface-canvas)`, `var(--text-primary)`, `var(--accent-primary)`, etc.) or corresponding Tailwind token classes to maintain visual consistency with the "Parchment & Terracotta" design system.

---

## 3. Repository Structure

```
NorAi_Ofiicial_Web/
├── app/                          # Next.js App Router root
│   ├── (marketing)/              # Marketing routes (Home, Products, Services, Team, etc.)
│   ├── (content)/                # Content hub (Blog, Docs, FAQ)
│   ├── (legal)/                  # Legal & compliance (Privacy, Terms)
│   ├── api/                      # Route handlers & server endpoints
│   ├── globals.css               # Design tokens, font definitions, and utility classes
│   └── layout.tsx                # Root layout, fonts, and global metadata
├── components/                   # Component architecture
│   ├── foundation/               # Base primitives (Container, Grid, Section)
│   ├── atoms/                    # Fundamental elements (Button, Badge, Link, Input)
│   ├── molecules/                # Multi-part patterns (Card, FormField, SearchBar)
│   ├── organisms/                # Complex sections (Header, Footer, HeroStudioWorkbench)
│   └── templates/                # Full page layout wrappers
├── config/                       # Site configuration, metadata, and navigation routes
├── lib/                          # Data catalogs, validation schemas, and SEO helpers
│   ├── schemas/                  # Zod input schemas
│   └── seo/                      # Dynamic metadata & OpenGraph generators
└── public/                       # Static brand assets and images
```

---

## 4. Context & Reference Files

When you need deeper context about specific aspects of the project, consult these files:

- [`PRODUCT.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/PRODUCT.md): Overview of NorAI, the 4 flagship tools, enterprise services, and product mission.
- [`DESIGN.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/DESIGN.md): Visual ethos, typography hierarchy, and core color tokens.
- [`project_progress_context.md`](file:///home/gourav/coding/startup/NorAi_Ofiicial_Web/project_progress_context.md): Chronological history of milestones, rebuild phases, and project context.

You also have access to specialized skills in your environment (e.g., landing page craft, micro-interactions, minimalist UI, DevTools testing). Feel free to draw on these skills whenever they are helpful for the task at hand.

---

## 5. Development & Verification Workflow

Run standard verification commands to ensure code correctness when making changes:

```bash
# Typecheck TypeScript
npx tsc --noEmit

# Run ESLint
npm run lint

# Format code
npm run format:write
```

---

## 6. Philosophy of Creative Autonomy

This project values craftsmanship, speed, and creative problem-solving:

- **Think Critically**: Suggest and implement improvements to layout, visual hierarchy, ergonomics, and accessibility that make the site feel premium and delightful.
- **Keep It Simple & Distilled**: Favor clean, readable code and clear UI rather than unnecessary complexity.
- **Empowered Execution**: You do not need to follow rigid or bureaucratic multi-step procedures for every edit. Understand the user's intent, execute with care, and verify that the results look and work great.
