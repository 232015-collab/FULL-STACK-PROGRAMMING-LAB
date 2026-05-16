# 🌿 Rustik Plant — Furniture Store

A full-stack MERN ecommerce application for a premium furniture store.

**Student:** Sundas Maria Hayat | **Roll No:** 232015 | **Lab:** FSP Lab 12

---

## 📁 Project Structure

```
rustik-plant/
├── backend/          # Node.js + Express + MongoDB API
│   ├── models/       # Mongoose schemas (Product, User, Order)
│   ├── routes/       # API routes
│   ├── utils/        # Seed data & helpers
│   └── server.js     # Entry point
└── frontend/         # Next.js + Tailwind CSS
    ├── app/          # App Router pages
    ├── components/   # Reusable UI components
    └── context/      # Cart & Auth context
```

---

## 🚀 Getting Started

### Backend
```bash
cd backend
npm install
npm start
```
> Runs on `http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
> Runs on `http://localhost:3000`

---

## 🛠 Tech Stack

| Layer    | Technology                     |
|----------|-------------------------------|
| Frontend | Next.js, Tailwind CSS          |
| Backend  | Node.js, Express.js            |
| Database | MongoDB + Mongoose             |
| Auth     | JWT                            |

---

## 🪑 Features

- 6 Furniture Categories: Chairs, Sofas, Beds, Tables, Cabinets, Outdoor
- Product listing & detail pages
- Shopping cart with context API
- Backend REST API with MongoDB
- Database seeding with sample products
