
# AZIMI PERFUMES — Luxury Perfume Shop

> A complete, professional, and responsive **Luxury Perfume E-Commerce Experience** built for a Web Design class project.  
> An elegant online perfume shop for AZIMI PERFUMES with a luxury brand aesthetic, multilingual support, shopping cart functionality, and responsive design.
---

## 🌐 Live azimi

**GitHub Pages:** `https://maryamazimi.github.io/azimi-perfumes/`

**GitHub Repository:** `https://github.com/maryamazimi/azimi-perfumes`


---

## 📁 Project Structure

```
azimi-perfumes/
├── index.html          → Home page (Hero, Featured Products, Banners, Video, Testimonials)
├── about.html          → About page (Story, Team, Values, Milestones Table)
├── products.html       → All Products (Filter, Sort, Search, Grid)
├── cart.html           → Shopping Cart (Items, Quantities, Totals, Promo Code)
├── checkout.html       → Checkout (Form + Payment + Order Summary)
├── contact.html        → Contact (Form, Info, FAQ Accordion)
├── css/
│   └── style.css       → Main external stylesheet (all custom styles)
├── js/
│   └── script.js       → Main JavaScript file (all interactivity)
├── images/             → (Online image links used via Unsplash)
└── README.md           → This file
```

---

## ✨ Features

### Pages (6 pages)
| Page | Description |
|------|-------------|
| `index.html` | Luxury hero with background video, featured products, split banners, promo video, testimonials carousel, newsletter |
| `about.html` | Brand story, team profiles, core values, milestone timeline table |
| `products.html` | All 12 perfumes with filter by category, sort by price/rating, live search |
| `cart.html` | Full cart with qty controls, remove, clear, promo code, order summary |
| `checkout.html` | Shipping + billing form, payment method selector, real-time validation, order success |
| `contact.html` | Contact form with validation, info section, FAQ accordion |

### Design & Visual
- 🎨 Luxury gold & cream color palette with elegant typography (Cormorant Garamond + Montserrat)
- 💫 Animated rotating glow border on all product cards (CSS `conic-gradient` + `@property`)
- 🌙 Full **Dark Mode** with neon glow effects on cards
- 🎥 Background video hero section + embedded promotional YouTube video
- 🖼️ Split banner section (For Her / For Him)
- ✨ Smooth scroll animations using IntersectionObserver
- 🎠 Bootstrap Carousel for testimonials
- 📜 Marquee animated strip

### JavaScript Features
- 🛒 **Full Shopping Cart System** — add, remove, increase/decrease quantity, clear cart
- 🔍 **Live Product Search** — search by name, brand, description
- 🗂️ **Category Filter** — Feminine / Masculine / Unisex / Oud
- 📊 **Sort by Price** (low/high) and **Rating**
- 🌍 **Language Switcher** — English ↔ Persian (Farsi) with full RTL layout support
- 🌙 **Dark Mode Toggle** — persistent via localStorage
- 📦 **Product Modal** — quick view popup with Bootstrap Modal
- ✅ **Form Validation** — real-time error messages on all forms
- 🎉 **Toast Notifications** — cart add confirmations
- 📣 **Newsletter Form** — email validation + success message
- 📦 **Promo Code** — enter `AZIMI10` or `WELCOME`

### Technical
- ✅ Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`)
- ✅ External CSS file with organized comments
- ✅ Bootstrap 5.3 (Grid, Navbar, Modal, Carousel, Accordion, Forms)
- ✅ Font Awesome 6.5 icons throughout
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ `alt` text on all images (accessibility)
- ✅ Form `label` elements for all inputs
- ✅ Keyboard navigable
- ✅ CSS keyframe animations (`rotateBorder`, `heroFadeIn`, `marqueeScroll`, etc.)
- ✅ CSS custom properties (`@property`) for animated conic-gradient
- ✅ Clean code with comments
- ✅ No broken links

---

## 🚀 How to Run

### Option 1 — Open Locally
1. Download or clone the repository
2. Open `index.html` in any modern browser
3. No build step or server required — it works out of the box!

```bash
git clone https://github.com/maryamazimi/azimi-perfumes.git
cd azimi-perfumes
# Open index.html in your browser
```

### Option 2 — Live Server (VS Code)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

### Option 3 — GitHub Pages
1. Push the project to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your site will be live at `https://maryamazimi.github.io/azimi-perfumes/`

---

## 🛍️ Product Data

All 12 perfumes are defined as JavaScript objects in `js/script.js`. Each product has:

| Property | Type | Example |
|----------|------|---------|
| `id` | Number | `1` |
| `name` | String | `"Midnight Oud"` |
| `brand` | String | `"AZIMI"` |
| `price` | Number | `189` |
| `image` | String (URL) | Unsplash link |
| `category` | String | `"masculine"` |
| `description` | String | Short fragrance description |
| `size` | String | `"100ml"` |
| `rating` | Number | `4.9` |
| `featured` | Boolean | `true` |

---

## 🌍 Language Support

| Feature | English | فارسی |
|---------|---------|-------|
| Direction | LTR | RTL |
| Navbar | ✅ | ✅ |
| Hero text | ✅ | ✅ |
| Buttons | ✅ | ✅ |
| Form labels | ✅ | ✅ |
| Error messages | ✅ | ✅ |
| Footer | ✅ | ✅ |
| Promo/Toast | ✅ | ✅ |

Switch language by clicking the 🌐 **EN / FA** button in the navbar.

---

## 🎨 Color Palette

| Variable | Color | Usage |
|----------|-------|-------|
| `--gold` | `#c9a84c` | Primary accent, borders, icons |
| `--gold-light` | `#e8c97a` | Hover states, hero title |
| `--gold-dark` | `#9a7830` | Button backgrounds, gradients |
| `--cream` | `#fdf6ec` | Light mode background |
| `--dark` | `#1a1208` | Footer background |

---

## 📦 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | — | Structure |
| CSS3 | — | Styling, animations |
| JavaScript (ES6+) | — | Interactivity, DOM |
| Bootstrap | 5.3.2 | Grid, components, responsive |
| Font Awesome | 6.5.0 | Icons |
| Google Fonts | — | Cormorant Garamond, Montserrat |
| Unsplash | — | Product images (CDN) |

---

## 📝 Academic Notes

- **Total Points:** 30  
- **Course:** Web Design  
- **Project Type:** Mini E-Commerce — Online Perfume Shop  
- **No real payment** is processed — checkout is for demonstration only  
- **No external APIs** — all product data is in JavaScript arrays  
- **Cart data** persists during the session via `sessionStorage`  
- **Theme & language** preferences persist via `localStorage`

---

## 🧑‍💻 Author

**Student Name:** Maryam Azimi 
(Student ID available upon request) 
**Course:** Web Design  
**Instructor:** *(Instructor Name)*  
**Date:** 2026

---

*AZIMI PERFUMES — Where elegance becomes identity.*