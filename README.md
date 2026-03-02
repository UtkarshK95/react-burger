# React Burger

An interactive burger builder built with React 19 and TypeScript.

---

## Overview

React Burger is a client-side single-page application that lets users compose a burger by stacking ingredient layers, reorder them via drag-and-drop, and review a priced order summary before confirming. It was built as a learning project and has since been modernized with a production-quality toolchain.

---

## Features

- Live burger preview — ingredient layers render in real time as they are added or removed
- Drag-and-drop reordering — grab any ingredient layer and move it up or down using pointer or keyboard
- Per-ingredient pricing — each ingredient has a fixed price; a running total updates on every change
- Order summary modal — review a grouped ingredient list and total before confirming; implemented with the native `<dialog>` element for full accessibility
- Constraint enforcement — Remove buttons are disabled when an ingredient count reaches zero
- Accessible — native focus trap and Escape key support in the modal, ARIA labels on interactive elements, `aria-live` announcements for price updates
- 11 unit tests covering all primary interactions

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI framework | React 19 |
| Language | TypeScript 5 (strict mode) |
| Build tool | Vite 7 |
| Drag-and-drop | @dnd-kit/core + @dnd-kit/sortable |
| Styling | CSS Modules |
| Testing | Vitest 4 + Testing Library |
| Linting | ESLint 9 (flat config) + typescript-eslint |
| Formatting | Prettier |
| Deployment | GitHub Pages via gh-pages |

---

## Project Structure

```text
react-burger/
├── src/
│   ├── components/
│   │   ├── Burger.tsx              # Main component — state, DnD, modal, pricing
│   │   ├── BurgerStyle.module.css  # Scoped styles
│   │   └── Burger.test.tsx         # Unit tests
│   ├── assets/                     # Ingredient and bun images (JPEG)
│   ├── test/
│   │   └── setup.ts                # jest-dom matchers + jsdom polyfills
│   ├── vite-env.d.ts               # Vite client type declarations
│   ├── App.tsx                     # Root component with Error Boundary
│   └── main.tsx                    # React entry point
├── public/
│   └── favicon.ico
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── .prettierrc
└── package.json
```

---

## Installation

Node.js is required for the development toolchain only. The built output is a static site with no server-side runtime dependency.

```bash
git clone https://github.com/UtkarshK95/react-burger.git
cd react-burger
npm install
```

---

## Running Locally

```bash
npm run dev
```

Open the local URL printed in the terminal (default: `http://localhost:5173/react-burger/`).

---

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Compile TypeScript and bundle for production |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Run TypeScript type checking without emitting files |
| `npm run lint` | Run ESLint across all source files |
| `npm run format` | Format all source files with Prettier |
| `npm test` | Run Vitest in watch mode |
| `npm run test:ui` | Open the Vitest browser UI |
| `npm run ci` | Full quality gate: typecheck, lint, and tests in one command |
| `npm run deploy` | Build and publish to GitHub Pages |

---

## Architecture Notes

### Component structure

All burger logic lives in `src/components/Burger.tsx`. It contains four co-located units: `SortableIngredient` (a single draggable layer), `IngredientControl` (the add/remove buttons for one ingredient type), `OrderModal` (the review dialog), and the top-level `Burger` component that owns all state.

### State management

State is local to `Burger` via `useState`. The ingredient stack is an ordered array of `{ id, type }` objects. A single `useMemo` loop over the stack derives both the per-type frequency map and the running total, avoiding repeated array scans on each render. Event handlers are stabilized with `useCallback`.

### Modal implementation

The order modal uses the native HTML `<dialog>` element with `showModal()`. This provides a built-in focus trap, Escape key handling, and correct `aria-modal` semantics without additional libraries. The `::backdrop` pseudo-element replaces a manual overlay div.

### Drag-and-drop

Drag-and-drop is powered by `@dnd-kit`. The `PointerSensor` handles mouse and touch input; the `KeyboardSensor` with `sortableKeyboardCoordinates` enables full keyboard reordering. IDs are generated with `crypto.randomUUID()` to guarantee uniqueness across rapid additions.

### Error resilience

An `ErrorBoundary` class component in `App.tsx` wraps the burger subtree. Any uncaught render error displays a fallback message instead of a blank page.

---

## Demo

Live site: [https://UtkarshK95.github.io/react-burger/](https://UtkarshK95.github.io/react-burger/)

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-change`
3. Make changes and verify the quality gate: `npm run ci`
4. Open a pull request with a clear description of the change

---

## Support

- GitHub: [github.com/UtkarshK95](https://github.com/UtkarshK95)
- Buy Me a Coffee: [buymeacoffee.com/utkarshk95](https://buymeacoffee.com/utkarshk95)

---

## License

MIT © Utkarsh Katiyar — see [LICENSE](LICENSE) for full terms.
