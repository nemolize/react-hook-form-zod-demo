# React Hook Form Zod Demo

A demo application showcasing React Hook Form integration with Zod validation for number inputs. This demo focuses on specific edge cases and patterns you might encounter in real-world applications.

## Features

- **React Hook Form** for form state management
- **Zod** for schema validation with nullable() patterns
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Biome** for linting and formatting
- **Vitest** for unit testing with Testing Library
- **Playwright** for end-to-end testing
- **Tailwind CSS** for styling

## Demo Components

- Number input with `setValueAs` transformation
- Number input with `preprocess` validation

## Getting Started

### Prerequisites

- Node.js (see `mise.toml` for version requirements)
- pnpm package manager

### Installation

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

### Building

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

### Testing

Run unit tests:

```bash
pnpm test
```

Run end-to-end tests:

```bash
pnpm test:e2e
```

### Code Quality

Check code style and issues:

```bash
pnpm lint
```

Fix code style issues:

```bash
pnpm lint:fix
```

Run type checking:

```bash
pnpm typecheck
```

## License

MIT
