# Sydexa Final Project

A web dashboard that implements CRUD operations on products (Create, Read, Update, Delete). It demonstrates building a production-oriented UI for managing a product catalog using modern React tooling and libraries.

## Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with concurrent features
- 🔷 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔍 **ESLint** - Code linting and quality
- ✨ **Prettier** - Code formatting
- 📦 **React Query** - Data fetching and caching
- 🗂️ **React Virtualized** - Efficient list rendering
- 🎯 **Zustand** - State management
- 📝 **React Hook Form** - Form handling
- ✅ **Zod** - Schema validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

### Build

```bash
npm run build
# or
yarn build
```

### Preview

```bash
npm run preview
# or
yarn preview
```

## Code Quality

### Linting

```bash
npm run lint
# or
yarn lint
```

### Code Formatting

```bash
# Format all files
npm run format
# or
yarn format

# Check formatting (CI/CD)
npm run format:check
# or
yarn format:check
```

See [FORMATTING.md](./FORMATTING.md) for detailed formatting guidelines.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   └── tabs/           # Page-level components
├── hooks/              # Custom React hooks
│   └── utils/          # Utility hooks
├── lib/                # Utilities and stores
├── schemas/            # Zod validation schemas
└── types/              # TypeScript type definitions
```

## Technologies Used

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **Virtualization**: React Virtualized
- **Notifications**: Sonner

## Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `lint` - Run ESLint
- `format` - Format code with Prettier
- `format:check` - Check code formatting

## Deployment

This project includes a GitHub Actions workflow that builds the app and deploys the `dist` output to the `gh-pages` branch on each push to `main`.

- The Vite `base` is set to `/sydexa-final-project/` so the site will work when served from GitHub Pages at `https://<your-username>.github.io/sydexa-final-project/`.
- After pushing to `main`, the action will publish to `gh-pages`; make sure GitHub Pages is configured to serve from the `gh-pages` branch (or accept the default Pages settings).

Quick checks and manual deploy:

```bash
# build locally
npm run build

# preview the production build
npm run preview
```
