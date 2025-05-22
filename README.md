# Product Manager App

A simple, clean, and responsive React + TypeScript CRUD application to manage a list of products. Built with Vite, Material UI (MUI), and localStorage for persistence.

## How It Works

Watch this short demo to see the app in action:  
[Click here to view the demo](https://calipio.com/app/play/LgDSXibc#bf94Tn8f)

---

## Features

- Add, update, delete products
- Sort by price, filter by category
- LocalStorage persistence (no backend)
- Form validation with Formik + Yup
- Responsive UI with MUI
- Global snackbar system for notifications
- Reusable components and Atomic design structure
- Unit tests with Jest + React Testing Library
- Export all visible (filtered/searched) products to a downloadable .csv file
- Only 3 products are shown per page for better readability, with pagination controls(on the initial render everything loads still, this is only for UI purposes)
- Instantly search products by name or description

---

## Tech Stack

- React 18
- TypeScript
- Vite
- Material UI (MUI)
- Formik + Yup
- Jest + React Testing Library
- Atomic Design File Structure

---

## Folder Structure

```
src/
├── assets/styles          # Global CSS
├── components             # Atomic design: atoms, molecules, organisms
├── constants              # Static config (e.g. categories)
├── contexts               # React contexts (SnackbarContext)
├── hooks                  # Custom hooks
├── pages                  # Page-level views (e.g. ProductsPage)
├── providers              # Context Providers (e.g. SnackbarProvider)
├── tests                  # Jest component tests
├── types                  # TypeScript types
├── utils                  # Helpers (e.g. formatPrice)
```

---

## Testing

### Run all tests:

```bash
npm run test
```

### Example test file:

`src/tests/components/ProductRow.test.tsx`

## Start the app

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

---

## Author

**Atlantik Jashari**  
Product CRUD
