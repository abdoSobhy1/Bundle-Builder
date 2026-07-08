# Bundle Builder

Welcome to the **Bundle Builder** project! This is my submission for the Ecom Experts evaluation task. I've put a lot of care into ensuring this isn't just functional, but genuinely matches the provided design down to the finest detail.

## Why CSS Modules over Tailwind?

One of the first big decisions I made was choosing **pure CSS Modules** instead of a utility-first framework like Tailwind CSS.

Here's why: **Pixel-perfect precision.**

While analyzing the design, I noticed a lot of highly specific, non-standard sizing—things like exactly `11px` for padding, `31.88px` for typography, or unique grid gap requirements across different breakpoints. Tailwind is fantastic for rapid development within a standardized design system, but trying to override its utility classes with arbitrary values (like `p-[11px]`) everywhere defeats its purpose and clutters the JSX.

By using CSS Modules, I could:

- Focus entirely on matching the exact layout pixel-by-pixel.
- Confidently use CSS Nesting to organize complex states without global side effects.
- Ensure the code remains clean, scalable, and scoped securely to individual components.

## Technical Highlights

### The Magic of CSS Grid for Accordions

Historically, animating an accordion to an `auto` height required JavaScript calculations or hacky `max-height` transitions that ruined the easing curve.

I solved this elegantly using modern CSS Grid. By transitioning `grid-template-rows` from `0fr` to `1fr`, the browser natively handles calculating the dynamic height of the content. It’s highly performant, buttery smooth, and requires zero JavaScript dimension measuring.

### Independent Variant State Management

State can get tricky when products have multiple variants. I structured the Context API state (`selections[productId][variantId]`) to track each variant completely independently. Adding a Red sensor doesn't accidentally override the Blue sensor—they sync perfectly across the entire UI and the Review Panel.

### Fully Data-Driven

The entire interface renders dynamically based on `src/assets/data/products.json`. There are no hardcoded layouts here—this system is built to scale if new bundles or products are added in the future.

### Local Storage Persistence

Accidentally closed the tab? No problem. The builder automatically persists your current selections to `localStorage`. When you come back, the app seamlessly re-hydrates your progress so you can pick up right where you left off.

## Getting Started

If you want to spin this up locally:

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation & Running

1. Clone the repository and navigate into the directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser to the URL provided in the terminal (usually `http://localhost:5173`).

### Building for Production

To generate a heavily optimized production build, simply run:

```bash
npm run build
```

---

Thank you for taking time to review my submission!
