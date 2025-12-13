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

- Node.js 20+ (required for some dev dependencies)
- yarn (preferred)

### Installation

```bash
yarn install --frozen-lockfile
```

### Development

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Preview

```bash
yarn preview
```

## Code Quality

### Linting

```bash
yarn lint
```

npm run format:check
### Code Formatting

```bash
# Format all files
yarn format

# Check formatting (CI/CD)
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
