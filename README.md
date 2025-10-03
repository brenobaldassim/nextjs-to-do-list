# Task Manager (Gerenciador de Tarefas)

A modern task management application built with Next.js 15, tRPC, and TypeScript. Features include creating, editing, and deleting tasks with infinite scroll pagination and real-time updates.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (homepage)/        # Task list page
│   └── api/trpc/          # tRPC API routes
├── server/                # Backend logic
│   ├── routers/           # tRPC routers
│   └── repository/        # Data layer (fake ORM)
└── utils/                 # Utility functions
```


## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 20 or higher)
- **npm** or **pnpm** or **yarn**

To check if you have Node.js installed, run:
```bash
node --version
npm --version
```

## Installation

1. **Clone the repository** :
```bash
git clone https://github.com/brenobaldassim/nextjs-todo-list
cd nextjs-todo-list
```

2. **Install dependencies**:
```bash
npm install
# or
pnpm install
# or
yarn install
```

## Running the Project

### Development Mode

To start the development server with hot reload:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

To create an optimized production build:

```bash
npm run build
npm start
# or
pnpm build && pnpm start
```

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Infinite scroll pagination
- ✅ Type-safe API with tRPC
- ✅ Modern UI with Tailwind CSS
- ✅ Real-time toast notifications
- ✅ Responsive design
