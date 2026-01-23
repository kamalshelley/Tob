

# 🍛 Taste of Bharat - Modern Restaurant Website

A fully responsive, modern frontend website for **Taste of Bharat**, an Indian restaurant in Swindon. This project features dynamic menu rendering, gamification, live opening status, and automated E2E testing.

![Version](https://img.shields.io/badge/version-2.0.0-orange.svg)
![Status](https://img.shields.io/badge/status-Live-green.svg)

## ✨ Key Features

* **⚡️ Dynamic Content System:** All menu items, reviews, and offers are stored in `data.js`, allowing non-technical users to update the site without touching HTML logic.
* **🕒 Live Restaurant Status:** A real-time "Open Now / Closed" badge that checks the current time against restaurant hours.
* **📱 Mobile-First Design:** Fully responsive navigation, touch-friendly menus, and optimized layouts for phones.
* **🎡 Gamification:** "Spin & Win" game with local storage persistence (Daily Reset).
* **🛒 Shopping Cart:** Client-side cart logic with quantity management and total calculation.
* **📨 Smart Notifications:**
    * Orders & Bookings sent via **Email** (FormSubmit).
    * Instant **WhatsApp Alerts** to the owner (CallMeBot).
* **🗺️ Premium Map:** Custom-styled Google Maps overlay.
* **✅ Automated Testing:** Full End-to-End test suite using **Playwright**.

---

## 🛠️ Configuration (For Owners)

### Updating the Menu & Offers
You do not need to touch the code logic. Open `data.js`:
1.  **Special Offers:** Update the text inside the quotes in the `SPECIAL_OFFERS` list.
2.  **Menu Items:** Add or remove items in the `MENU_DATA` list.
3.  **Reviews:** Add new Google reviews in the `REVIEWS_DATA` list.

### Setup Notifications
To enable WhatsApp alerts, open `app.js`:
```javascript
// app.js - Line 8
const WHATSAPP_API_KEY = "YOUR_KEY_HERE";


*Get your key by messaging `I allow callmebot to send me messages` to the CallMeBot number on WhatsApp.*

---

## 🚀 Installation & Local Development

1. **Clone the repository:**
git clone [https://github.com/kamalshelley/Tob.git](https://github.com/kamalshelley/Tob.git)
cd Tob


2. **Run the website:**
* Simply open `index.html` in your browser.
* Or use the **Live Server** extension in VS Code.



---

## 🧪 Running Automated Tests

This project uses **Playwright** to ensure the menu, cart, and games work perfectly.

1. **Install Dependencies:**
```bash
npm install

```


2. **Run Tests (Headless):**
```bash
npx playwright test

```


3. **Run Tests (Visual Mode):**
```bash
npx playwright test --ui

```



---

## 📂 Project Structure

* `index.html` - The main structure and layout.
* `style.css` - Custom styling, animations, and responsive rules.
* `data.js` - **Static Data** (Menu, Offers, Reviews).
* `app.js` - **Application Logic** (Cart, Forms, Game, Status).
* `tests/` - Playwright E2E automation scripts.

## © License

All rights reserved. Taste of Bharat.

```

---

### 2. Release Notes (for GitHub Releases)
When you click "Create a new release" on GitHub, use this text.

**Tag version:** `v2.0.0`
**Release title:** `v2.0.0 - The "Ease of Use" Update`

```markdown
### 🚀 Major Update: Version 2.0

This release focuses on separating content from code to make management easier, fixing mobile UI issues, and introducing automated testing reliability.

#### 🌟 New Features
* **`data.js` Implementation:** Menu items, offers, and reviews are now decoupled from `app.js`. Owners can update prices and text without risk of breaking the site logic.
* **Dynamic Status Badge:** Added a badge in the header that automatically toggles between `OPEN NOW` (Green) and `CLOSED` (Red) based on specific Swindon opening hours.
* **Premium Map UI:** Replaced the default map with a desaturated, professional style and a floating "Get Directions" interaction card.
* **Automated Testing Suite:** Integrated **Playwright** for E2E testing of the Cart, Menu, and Spin functionality.

#### 💅 UI & UX Improvements
* **Logo Fixed:** Resolved mobile alignment issues. The logo now sits perfectly inside its container without clipping the orange border or becoming oval on small screens.
* **Flexbox Offers:** Special Offers now center-align perfectly regardless of the number of active offers (fixed the "hanging left" issue).
* **Menu Truncation:** Added a "View All" button to long categories to prevent infinite scrolling on mobile.
* **Spin & Win:** Logic updated to reset **Daily** instead of once-per-lifetime.

#### 🔧 Technical Changes
* Added `object-fit: contain` and padding to logo CSS.
* Implemented `.gitignore` to keep the repo clean.
* Refactored `app.js` to support dual-notification (Email + WhatsApp).

```
