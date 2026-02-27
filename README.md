# React Burger

An interactive burger builder — one of my first React projects, now upgraded with TypeScript, drag-and-drop, and more.
Stack your ingredients, drag layers to reorder them, and place your order.

---

## ✨ Features

- Live burger preview — ingredient layers stack in real time as you add or remove
- Drag-and-drop reordering — grab any ingredient layer and move it up or down
- Price calculator — per-ingredient pricing with a live running total
- Order summary modal — review your full order and total before confirming
- Remove buttons disabled at zero — no negative stacks
- 11 Vitest unit tests covering all core interactions

---

## 🛠️ Tech Stack

- **React 19** + **Vite 7**
- **TypeScript 5** — full type safety across all components
- **@dnd-kit** — accessible drag-and-drop for ingredient reordering
- **CSS Modules** — scoped styles per component
- **Vitest** + **Testing Library** — fast unit tests
- **ESLint 9** with flat config

---

## ▶️ Run locally

```bash
npm install
npm run dev
```

Open the local development URL shown in the terminal.

---

## 🧪 Tests

```bash
npm test          # run all tests
npm run test:ui   # open the Vitest browser UI
```

---

## 🔍 Type checking

```bash
npm run typecheck
```

---

## 🚀 Deploy to GitHub Pages

```bash
npm run deploy
```

Builds the project and publishes the `dist/` folder to the `gh-pages` branch.
The site will be live at:

```text
https://UtkarshK95.github.io/react-burger/
```

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Burger.tsx            # Burger builder — state, DnD, modal, price
│   ├── BurgerStyle.module.css
│   └── Burger.test.tsx       # Vitest + Testing Library tests
├── assets/                   # Ingredient and bun images
├── test/
│   └── setup.ts              # jest-dom matchers
├── App.tsx
└── main.tsx
```

---

## 📄 License

MIT © Utkarsh
