
# SOL - Modern E‑commerce Experience

SOL is a **technical, performance‑focused e‑commerce project** built to demonstrate advanced frontend architecture using **Next.js App Router** and **Redux Toolkit**. It is designed primarily as a **portfolio project for recruiters and technical reviewers**, emphasizing state management, performance, and scalable UI patterns.

A defining feature of SOL is its **dynamic inventory simulation**: every page reload represents a significant time jump, recalculating stock levels across all products as if thousands of users had been shopping meanwhile. This creates a living storefront where availability constantly changes.

* **Live Demo:** https://sol-shop.vercel.app/

## Tech Stack

* **Next.js (App Router)** — modern routing, layouts, and server/client separation

* **Redux Toolkit** — predictable global state management

* **CSS Modules** — scoped, maintainable styling

* **LocalStorage** — cart persistence across sessions

* **Clerk** - user authentication API component

* **Turbopack** — fast development builds

* **MUI (Skeleton only)** — loading states

* **Headless UI** — accessible, unstyled *select* components

* *FakeStore API* - https://fakestoreapi.com/

## Key Features

### Dynamic Inventory Simulation

* On every browser reload, stock levels are recalculated

* Products can sell out or restock dynamically

* Simulates real‑world demand and inventory fluctuation

### Advanced Cart Logic (Redux)

* Size‑aware cart items (e.g. clothing variants)

* Quantity management per variant

* Stock status validation before adding items

* Currency conversion support

* Persistent cart state via LocalStorage

### High‑Performance Hero Animation

* Scroll‑based hero animation

* Optimized for **excellent Lighthouse performance metrics**

* Minimal layout shift and efficient rendering

### UX & UI Enhancements

* Skeleton loading states for perceived performance

* Image magnifier for product details

* Related products slider

* Accessible custom select components

---
## Architecture Highlights

* Clear separation between **UI**, **state**, and **business logic**

* Redux slices designed for scalability and extension

* Client‑only logic isolated where required

* Layout‑driven App Router structure

* Reusable, composable components

## Authentication

Authentication logic is designed to support:

* User sessions

* Auth‑aware cart behavior

* Protected routes

## Challenges, Questions or Edge-Cases

### How is the stock status of each product randomly generated? 

Product stock is simulated on the client right after we fetch the products list. For each product, we assign a stock value using a simple probability rule:

> - **80% chance** -> `"In stock"`
> - **20% chance** -> `"Sold out"`

### How do we ensure the stock status stays the same after login or signup?

To avoid the UI “changing its mind” every time the user navigates, we store the generated result in a **session-scoped stock map** (`sessionStorage`). That way, once a product gets a status, it stays consistent for the rest of the browser session (until a full reload resets the session map). This is done by keeping a `stockMap` keyed by `product.id`, and only generating a new random status if that product doesn’t already exist in the map.

### What happens to conflicts of products between the guest cart and the user cart?

When a user logs in, the app **merges the guest cart into the user cart** to resolve any “conflicts”:
* It loads both carts from `localStorage`:
  * Guest: `cart:guest`
  * User: `cart:${userId}`
* It combines items using a unique per-line key:
`itemKey = "${product.id}-${selectedSize || 'default'}"`
* **If the same itemKey exists in both carts**, it’s treated as the *same cart line* and the quantities are **added together**
* **If the item differs** (e.g., same product but different `selectedSize`), it stays as a **separate line item** (because the itemKey is different).
* After merging:
  * The merged cart is saved under the **user key**
  * The **guest cart is cleared** (`cart:guest` is removed), so guest becomes empty after login.
  

## Getting Started 

### Prerequisites

* Node.js 18+

* npm 

### Installation
```
npm install
```

### Development Server 
```
npm run dev
```

Open http://localhost:3000 to view the app.

### Build
```
npm run build
npm run start 
``` 


## Project Status

* Core functionality: **Complete**

* Inventory simulation: **Complete**

* Cart logic:  **Complete**

* Authentication:  **Complete**

## Purpose

This project was built to:

* Demonstrate **real‑world Redux usage** in a Next.js App Router environment

* Showcase performance‑conscious UI decisions

* Simulate complex e‑commerce behavior without a backend dependency

* Serve as a technical portfolio piece for frontend engineering roles

##License

This project is for educational and portfolio purposes.
