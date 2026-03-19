# Addis Cup Coffee House

A modern coffee house website designed to turn online visitors into in-store customers through a fast menu experience, premium brand presentation, and clear contact paths.

## Short Pitch

Addis Cup Coffee House is a conversion-focused digital storefront for a cafe business. It showcases products, allows customers to explore and customize drinks, and guides them toward action (visit, call, or contact), helping the business increase discoverability, trust, and repeat sales.

## How The Website Works

1. Visitors land on a premium home page that builds brand trust with visuals, featured products, and social proof.
2. They browse the menu by category and view product cards optimized for fast image loading and smooth transitions.
3. Coffee items open a "Build Your Coffee" modal so customers can personalize size, milk, and sugar preferences.
4. Contact and location pages make it easy to call, find the shop, or send inquiries.
5. Lightweight API routes handle contact and auth flows, keeping the app dynamic and ready for growth.

## How It Helps Business Grow

- Increases conversion: customers can quickly move from discovery to decision.
- Improves retention: a polished, memorable experience encourages return visits.
- Strengthens brand perception: premium design communicates quality and professionalism.
- Reduces friction: clear navigation, fast loading, and mobile-ready pages improve engagement.
- Supports marketing: a central web presence for campaigns, social traffic, and local search.

## Stack

- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- Next API Routes (serverless handlers)
- Cloudinary-ready image delivery path

## Professional Architecture

- `app/`
  - Route entries only (`page.jsx` wrappers and `api/*/route.js` handlers)
- `src/components/`
  - `ui/`: reusable presentational primitives (Button, InputField, Modal)
  - `layout/`: global layout components (Navbar, Footer)
- `src/features/`
  - Feature modules grouped by domain (`home`, `menu`, `about`, `contact`, `auth`)
  - Each feature owns page logic, components, and local data
- `src/server/`
  - `auth/`, `contact/`: service layer for server logic
  - `shared/`: server utilities and error primitives

## Routes

- `/` Home
- `/menu` Menu with category tabs and build-your-coffee customizer
- `/about` Story and process
- `/contact` Contact form, map, social links

## Development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Run production server:

```bash
npm run start
```

## Business Notes

- Product images can be served from local assets or Cloudinary for better performance at scale.
- The architecture is modular, so adding online ordering, loyalty features, or admin content management is straightforward.
