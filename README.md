# 🪙 SpotTracker

### 📈 Commercial cryptocurrency tracker with an interactive portfolio and real-time data

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://crypto-back-phi.vercel.app/)
[![GitHub](https://img.shields.io/github/stars/DanyaLavr/SpotTracker?style=social)](https://github.com/DanyaLavr/SpotTracker)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0-purple)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/deploy-Vercel-success)](https://vercel.com/)

---

# 💖 Support the Project

If you like **SpotTracker**, you can support the development of the project.

**USDT (TRC-20)**

`TN2mmwi8bcatCKmttUc3m1WL8DBrGDothj`

⭐ Any support helps improve the project.

---

# 📋 Table of Contents

- [📌 About the Project](#-about-the-project)
- [💼 Business Value](#-business-value)
- [🛠 Technology Stack](#-technology-stack)
- [⚙️ Key Engineering Decisions](#-key-engineering-decisions)
- [🏗 Architecture](#-architecture)
- [📊 Performance](#-performance)
- [🛡 Security](#-security)
- [🎨 UI/UX](#-uiux)
- [📬 Contacts](#-contacts)

---

# 📌 About the Project

**SpotTracker** is a web application for managing a cryptocurrency portfolio in real time.

Users can:

- 📊 Track the current value of **600+ cryptocurrencies**
- 💰 Add assets to their portfolio and see the total value
- ⚡ Receive instant price updates without page reloads
- 📈 View market dynamics on individual currency pages

> The project was developed individually following commercial development best practices:  
> git flow, modular testing (planned), CI/CD.

---

# 💼 Business Value

- ⚡ **Speed**  
  Optimized bundles and lazy loading provide fast startup even on mobile devices with slow internet.

- 🔒 **Security**  
  No API keys are exposed to the client; protected routes are verified before the page loads.

- 📱 **Accessibility**  
  Responsive design and accessibility support make the application convenient for all users.

- 🔄 **Fresh Data**  
  Thanks to ISR and server caching, data updates without performance loss.

---

# 🛠 Technology Stack

| Category | Technologies |
|-----------|------------|
| **Framework** | Next.js (App Router), React 18 |
| **Language** | TypeScript |
| **State Management** | Redux Toolkit |
| **Styling** | Tailwind CSS |
| **API** | CoinGecko API |
| **Tools** | Vercel, Git, Webpack, Postman |
| **Methodologies** | Feature-Sliced Design (FSD), SOLID, DRY |

---

# ⚙️ Key Engineering Decisions

### 1️⃣ Performance Optimization

**Problem:**  
Heavy portfolio components slowed down the initial load.

**Solution:**

- Additional user data loads only when needed
- `React.lazy` and `Suspense` used for chart code splitting
- Bundle analysis with `@next/bundle-analyzer`
- Third-party libraries moved to separate chunks

**Result:**  
TTI (Time To Interactive) reduced by **60%**

---

### 2️⃣ Working with API Limits

**Problem:**  
CoinGecko API has request limits.

**Solution:**

- 🧠 **Server caching** — `fetch` with `revalidate: 60`
- ⏱ **Client debounce** — request after **500 ms**
- 🔄 **RTK** — caching, background synchronization, optimistic updates

---

### 3️⃣ Page Generation (ISR)

**Problem:**  
Need to combine the speed of static pages with up-to-date price data.

**Solution:**

- **Incremental Static Regeneration (ISR)**
- Cryptocurrency pages generated statically
- Prices updated **every 60 seconds**

---

### 4️⃣ Migration to TypeScript

**Problem:**  
Initial JavaScript code did not provide type safety.

**Solution:**

- Gradual refactoring
- Strict types for CoinGecko API
- Redux state typing

**Result:**  
Reduced runtime errors and improved developer experience.

---

### 5️⃣ Security

**Problem:**  
API keys must not appear in client-side code.

**Solution:**

- Keys stored in **.env.local** and **Vercel Secrets**
- Authorization checks via **Next.js Middleware**

---

### 6️⃣ UI/UX

- 📱 **Mobile-first approach**
- ⏳ **Skeleton screens** during loading
- ♿ **Accessibility** (ARIA, focus, contrast)

---

# 🏗 Architecture

The project is built using **Feature-Sliced Design (FSD)**.

```bash
src
│
├─ app
│  └─ store, providers, layout
│
├─ pages
│  └─ application pages
│
├─ widgets
│  └─ large UI blocks
│
├─ features
│  └─ functional modules
│
├─ entities
│  └─ business entities
│
└─ shared
   └─ ui, hooks, utils
```

### Key Principles

-  Clear separation of responsibilities  
-  Feature isolation  
-  Reusable shared components

---

# 📊 Performance

| Metric | Before Optimization | After Optimization | Improvement |
|--------|--------------------|-------------------|------------|
| ⏱ **TTI (Time To Interactive)** | 3.2 s | 1.3 s | ⚡ **60%** |
| 🖼 **First Contentful Paint** | 1.8 s | 0.9 s | ⚡ **50%** |
| 📦 **Main bundle size** | 245 kB | 147 kB | ⚡ **40%** |
| 📈 **Lighthouse Performance** | 72 | 98 | ⚡ **+26** |

> *Measured on an emulated mobile device (Moto G4, 3G).*

---

# 🛡 Security

- 🔐 **Middleware protection** — protected routes checked on the server
- 🗝 **Environment variables** — API keys never exposed to client code
- 🍪 **Secure sessions** — httpOnly cookies
- ⚔️ **XSS protection** — automatic React escaping

---

# 🎨 UI/UX

### Design System

- 🎨 Tailwind CSS with custom configuration
- 📱 Responsive layout

### UX Features

- ⏳ Skeleton screens
- 🔍 Search debounce
- 🔗 Filter state saved in URL
- 🎬 Page transitions (Framer Motion)

---

# 📬 Contacts

**Danylo Lavrovskyi — Frontend Developer**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danylo-lavrovskyi-23751a27a/)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](http://t.me/DanyaLavr)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:lavrovskyi.danya@gmail.com)

**License:** MIT

⭐ If you like the project, please give it a star on GitHub — it really motivates development!
