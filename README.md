# NorAI Technologies — Official Web Platform

Welcome to the official web repository for **NorAI Technologies**, building practical, high-reliability AI products and enterprise automation pipelines. Headquartered in its regional development hub in **Uttar Pradesh, India**, NorAI engineers micro-SaaS utilities and bespoke enterprise intelligence architectures.

---

## 🚀 Tech Stack & Architecture

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
- **UI Runtime**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss`
- **Design System**: "Parchment & Terracotta" bespoke editorial hardware tokens
- **Typography**: `Instrument Serif` (Display), `Plus Jakarta Sans` (Body & UI), `JetBrains Mono` (Readouts & Code)
- **Primitives & Accessibility**: [Radix UI](https://www.radix-ui.com/) Primitives
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Optimized for `prefers-reduced-motion`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)

---

## 📁 Repository Structure

```
NorAi_Ofiicial_Web/
├── app/                          # Next.js App Router root
│   ├── (marketing)/              # Marketing routes (RSC by default)
│   │   ├── page.tsx              # Homepage & CandidateScreenerWorkbench
│   │   ├── products/             # Product catalog & dynamic [slug] routes
│   │   ├── services/             # Enterprise Solution Architecture Matrix
│   │   ├── pricing/              # Transparent pricing brackets
│   │   ├── about/                # Origin story & regional UP hub roster
│   │   ├── team/                 # Team directory & credentials
│   │   ├── contact/              # Interactive inquiry form with URL pre-fill
│   │   └── careers/              # Open engineering positions
│   ├── (content)/                # Content hub
│   │   ├── blog/                 # Editorial technical blog & [slug] reader
│   │   ├── docs/                 # Product reference guide
│   │   └── faq/                  # Searchable FAQ hub
│   ├── (legal)/                  # Compliance & legal
│   │   ├── privacy/              # Privacy Policy
│   │   └── terms/                # Terms of Service
│   ├── api/                      # Route handlers (e.g., /api/contact)
│   ├── globals.css               # Design tokens, ramps, font variables
│   └── layout.tsx                # Root layout, font definitions, SEO metadata
├── components/                   # Atomic Design component hierarchy
│   ├── foundation/               # Base layout primitives (Container, Grid, Section, Heading)
│   ├── atoms/                    # Atomic controls (Button, Badge, Input, Link, BrandLogo)
│   ├── molecules/                # Multi-atom patterns (FormField, SearchBar, Accordion)
│   ├── organisms/                # Complex organisms (HeroWorkbench, ServicesDirectory, Header, Footer)
│   ├── templates/                # Full page layouts (LegalTemplate, EditorialReader)
│   └── illustrations/            # Bespoke editorial SVGs and wireframe matrices
├── config/                       # Site metadata, routes, and navigation definitions
├── lib/                          # Data layers, schemas, SEO helpers, and utility functions
│   ├── products.ts               # Canonical product data catalog
│   ├── schemas/                  # Zod validation schemas
│   └── seo/                      # Dynamic metadata & OpenGraph generators
├── public/                       # Static brand assets, favicons, logos
├── directives/                   # Layer 1 SOPs & workflows
└── execution/                    # Layer 3 deterministic execution scripts
```

---

## 🛠️ Getting Started

### 1. Prerequisites

- Node.js `18.18+` or `20+`
- npm, pnpm, or yarn

### 2. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 3. Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure your environment variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_EMAIL_RECIPIENT=contact@noraitech.com
```

### 4. Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 Quality & Verification Commands

```bash
# Typecheck TypeScript
npx tsc --noEmit

# Run ESLint checks
npm run lint

# Format codebase with Prettier
npm run format:write

# Build production bundle
npm run build

# Start production server
npm start
```

---

## 🎨 Design System & Context Guidelines

Key project context, design guidelines, and technical references are documented in:

- [`PRODUCT.md`](PRODUCT.md) — Product mission, the 4 flagship tools, enterprise services, and core values.
- [`DESIGN.md`](DESIGN.md) — "Parchment & Terracotta" design ethos, typography system, and CSS tokens reference.
- [`AGENTS.md`](AGENTS.md) (mirrored to `CLAUDE.md` and `GEMINI.md`) — Tech stack, directory architecture, key conventions, and developer guidelines.
- [`project_progress_context.md`](project_progress_context.md) — Complete phase roadmap and rebuild execution history.

---

## 🚢 Deployment

Production is a self-hosted **VPS** (Hostinger, Ubuntu) serving `norai.tech`, with
nginx in front of a pm2-managed `next start` process.

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. `preflight` typechecks the tree.
2. `deploy` SSHes to the server and runs `/var/www/official-website/deploy.sh`.

The server-side script fetches `origin/main`, runs `npm ci` and `next build`, restarts
pm2, then polls the app for up to 60s. If it never returns 200 it resets to the previous
commit, rebuilds, restarts, and fails the run. A tracked copy of the script lives at
[`scripts/deploy-vps.sh`](scripts/deploy-vps.sh).

Required repository secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_PORT`, `VPS_SSH_KEY`.
The server pulls this repository with a read-only **deploy key**.

`mr-sonu-singh/Final_NorAi_Website` is kept as a one-way mirror for the partner's
reference. It is not a deploy source.
