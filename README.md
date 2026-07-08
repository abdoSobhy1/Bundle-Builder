# Bundle Builder

Welcome to the **Bundle Builder** project! This is my submission for the Ecom Experts evaluation task. I've put a lot of care into ensuring this isn't just functional, but genuinely matches the provided design down to the finest detail.

## Getting Started

To run this project locally:

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation & Running

1. Clone or download the repository and navigate into the directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server and the JSON Server mock API concurrently:
   ```bash
   npm run dev
   ```
4. Open your browser to the URL provided in the terminal (typically `http://localhost:5173`). The mock database runs quietly in the background on `http://localhost:3001`.

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

### Fully Data-Driven Architecture (Bonus JSON Server)

The entire interface renders dynamically based on a robust, decoupled data architecture. The product catalog acts as a true external database located in `db/products.json`, served via a mock `json-server` API (`http://localhost:3001/products`).

Because the provided design only showed the visual layout for the "Cameras" section, the data and structures for the remaining sections (Plans, Sensors, Accessories) were proactively derived by analyzing the line items in the Review Panel mockup. There are no hardcoded layouts—the system is built to scale seamlessly if new bundles or products are added in the future.

### Clean Client/Server State Separation

To manage asynchronous data effectively, a custom `useProductsData` hook handles all network operations. This architectural pattern keeps the "Server State" (the fetched product catalog) strictly isolated from the "Client State" (the user's cart selections inside the `BundleContext`).

To ensure a premium user experience during network requests, the application features custom-designed, animated **Loading and Error states**. These micro-interactions match the premium aesthetic of the application, ensuring users are never left looking at a blank screen or unstyled text during data fetching or API failures.

### Local Storage Persistence

Accidentally closed the tab? No problem. The builder automatically persists your current selections to `localStorage`. When you come back, the app seamlessly re-hydrates your progress so you can pick up right where you left off.

### Custom Checkout Experience

Instead of relying on a standard browser `alert()` for the checkout action, I built a polished, custom React Portal popup (`CheckoutPopup`). It's fully animated with CSS transitions, breaks out of the DOM hierarchy safely, and provides a much more premium feel that aligns with the rest of the high-quality design.

Thank you for taking time to review my submission!
