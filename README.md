# PhonePe Merchant Dashboard

A modern, full-stack merchant dashboard inspired by PhonePe, built with Next.js, React, and Tailwind CSS. Manage payments, generate UPI QR codes, view analytics, and get 24/7 AI-powered support.

---

## ✨ Features

- **Instant UPI Payments**: Accept payments instantly with QR codes and UPI.
- **QR Code Generator**: Generate UPI QR codes for any VPA, name, and amount. Each QR generation logs a transaction.
- **Real-time Analytics**: Track business performance with live dashboards, revenue, transaction stats, and success rates.
- **Manual Transactions**: Add and edit transactions manually via modals.
- **Transaction Management**: View, filter, and edit all transactions with pagination and status updates.
- **Settlements**: Track daily, weekly, and monthly settlements with a detailed settlement history.
- **AI Support Chatbot**: 24/7 customer support powered by Google Gemini, accessible as a modal or on the support page.
- **Quick Actions**: Dashboard shortcuts for QR generation, analytics, settlements, and support.
- **Dark Mode**: Beautiful, persistent dark mode toggle across all dashboard pages.
- **Responsive UI**: Fully responsive, modern design with smooth transitions and pixel-perfect spacing.
- **Collapsible Sidebar**: Easily toggle the sidebar for more workspace.
- **Landing Page**: Marketing landing page with animated hero, features, pricing, and support sections.
- **Security**: Bank-grade security UI elements (demo only).

---

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3**
- **TypeScript**
- **Headless UI** (modals)
- **Chart.js** (analytics)
- **Google Gemini API** (AI chatbot)

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## ⚠️ Data Persistence Note

> **This app uses a file-based store for demo data (in `/data`).**
>
> - **Local development:** All features work and data persists.
> - **Vercel/serverless:** Data will NOT persist between requests. For production, connect a cloud database (e.g., PlanetScale, Neon, Supabase, MongoDB Atlas).

---

## 📦 Folder Structure

- `src/app/` — Next.js app routes (dashboard, api, landing, etc.)
- `src/components/` — UI components (Navbar, Sidebar, StatsCard, Chatbot, etc.)
- `src/lib/` — Data and utility functions
- `data/` — Demo data (transactions, merchants)

---

## 🧑‍💻 Main Pages

- `/` — Landing page
- `/dashboard` — Main dashboard (stats, quick actions, recent transactions)
- `/dashboard/qr` — UPI QR code generator
- `/dashboard/transactions` — Transaction history & management
- `/dashboard/analytics` — Analytics & charts
- `/dashboard/settlements` — Settlement tracking
- `/dashboard/support` — Support center & AI chatbot

---

## 🌐 Deployment

- **Vercel:** Deploys instantly, but demo data will reset on every request. Use a cloud DB for persistence.
- **Environment Variables:** Set `GEMINI_API_KEY` for AI chatbot support.

---

## 📄 License

This project is for educational/demo purposes only and is not affiliated with PhonePe.
