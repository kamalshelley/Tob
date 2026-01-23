"use strict";

// =========================
// CONFIGURATION
// =========================
const RESTAURANT_EMAIL = "tob.swindon@gmail.com"; 

// 🔴 PASTE YOUR CALLMEBOT API KEY HERE (From the WhatsApp setup step)
const WHATSAPP_API_KEY = "123456"; // <--- CHANGE THIS
const MY_PHONE_NUMBER = "447771447915"; // Your number

/* NOTE: MENU_DATA, REVIEWS_DATA, SPECIAL_OFFERS come from data.js */

// =========================
// Utilities
// =========================
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// =========================
// Advanced: Live Restaurant Status
// =========================
function checkRestaurantStatus() {
  const now = new Date();
  const day = now.getDay(); 
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour + (minute / 60);
  const badge = document.getElementById("statusBadge");
  const text = document.getElementById("statusText");
  if (!badge || !text) return;

  let isOpen = false;
  // Mon: Closed | Tue-Fri: 17-22 | Sat-Sun: 12-14 & 17-22
  if (day === 1) isOpen = false;
  else if (day >= 2 && day <= 5) {
    if (currentTime >= 17 && currentTime < 22) isOpen = true;
  } else {
    if ((currentTime >= 12 && currentTime < 14) || (currentTime >= 17 && currentTime < 22)) isOpen = true;
  }

  badge.classList.remove("loading", "open", "closed");
  if (isOpen) {
    badge.classList.add("open"); text.textContent = "Open Now";
  } else {
    badge.classList.add("closed"); text.textContent = "Closed";
  }
}

// =========================
// Render Offers
// =========================
function renderOffers() {
  const grid = document.getElementById('offersGrid');
  if(!grid || typeof SPECIAL_OFFERS === 'undefined') return;
  
  // Clean render - no link injection
  grid.innerHTML = SPECIAL_OFFERS.map(offer => `
    <div class="offer"><b>${offer.title}</b><span>${offer.description}</span></div>
  `).join('');
}

// =========================
// Mobile Menu Logic
// =========================
const mobileMenu = $("#mobileMenu");
const hamburger = $("#hamburger");
const closeMenu = $("#closeMenu");

function setMenu(open) {
  mobileMenu.classList.toggle("active", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  hamburger.setAttribute("aria-expanded", String(open));
  if (open) closeMenu.focus(); else hamburger.focus();
}
hamburger.addEventListener("click", () => setMenu(true));
closeMenu.addEventListener("click", () => setMenu(false));
$$(".mLink").forEach(a => a.addEventListener("click", () => setMenu(false)));

// =========================
// Menu Rendering
// =========================
const grouped = new Map();
if (typeof MENU_DATA !== 'undefined') {
  for (const item of MENU_DATA) {
    const cat = item.category || "General";
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat).push(item);
  }
}

const categories = Array.from(grouped.keys());
const categoryList = $("#categoryList");
const menuGrid = $("#menuGrid");
const searchInput = $("#menuSearch");
let activeCategory = categories.includes("Non-Veg Starters") ? "Non-Veg Starters" : categories[0];
let activeFilters = new Set();
let menuExpanded = false; 

function renderCategories() {
  const frag = document.createDocumentFragment();
  categoryList.innerHTML = "";
  for (const cat of categories) {
    const b = document.createElement("button");
    b.className = "cat" + (cat === activeCategory ? " active" : "");
    b.textContent = cat;
    b.addEventListener("click", () => {
      activeCategory = cat;
      menuExpanded = false; 
      searchInput.value = "";
      renderCategories();
      renderMenu();
      if (window.innerWidth < 900) {
        menuGrid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    frag.appendChild(b);
  }
  categoryList.appendChild(frag);
}

function renderMenu() {
  const q = searchInput.value.trim().toLowerCase();
  menuGrid.innerHTML = "";

  if (q) {
    const list = MENU_DATA.filter(it => (it.name + " " + (it.desc || "")).toLowerCase().includes(q));
    if (!list.length) {
      menuGrid.innerHTML = '<div style="color:var(--text-muted);font-weight:800;grid-column:1/-1;text-align:center;">No items found.</div>';
      return;
    }
    const frag = document.createDocumentFragment();
    list.forEach(item => frag.appendChild(createCard(item)));
    menuGrid.appendChild(frag);
    return;
  }

  const list = grouped.get(activeCategory) || [];
  const initialDisplayCount = 6;
  const itemsToShow = menuExpanded ? list : list.slice(0, initialDisplayCount);

  const sectionTitle = document.createElement("div");
  sectionTitle.style.gridColumn = "1 / -1";
  sectionTitle.style.marginTop = "0.5rem";
  sectionTitle.style.marginBottom = "0.5rem";
  sectionTitle.innerHTML = `<h4 style="color:var(--color-accent); border-bottom:1px solid #eee; padding-bottom:5px;">${activeCategory}</h4>`;
  menuGrid.appendChild(sectionTitle);

  const frag = document.createDocumentFragment();
  itemsToShow.forEach(item => frag.appendChild(createCard(item)));
  menuGrid.appendChild(frag);

  if (list.length > initialDisplayCount && !menuExpanded) {
    const btnContainer = document.createElement("div");
    btnContainer.className = "view-more-container";
    const btn = document.createElement("button");
    btn.className = "btn-view-more";
    btn.innerHTML = `View All ${activeCategory} (${list.length}) <span>↓</span>`;
    btn.onclick = () => { menuExpanded = true; renderMenu(); };
    btnContainer.appendChild(btn);
    menuGrid.appendChild(btnContainer);
  }
}

function createCard(item) {
  const dim = activeFilters.size > 0 && item.codes && item.codes.some(c => activeFilters.has(c));
  const idx = MENU_DATA.indexOf(item);
  const card = document.createElement("div");
  card.className = "card" + (dim ? " dim" : "");
  let tagHtml = item.codes && item.codes.length ? `<div class="tags">${item.codes.map(c => `[${c}]`).join(" ")}</div>` : "";

  card.innerHTML = `
    <div style="flex-grow:1;">
      <div class="card-head"><div class="name">${item.name}</div><div class="price">${item.price}</div></div>
      <div class="desc">${item.desc || ""}</div>
      ${tagHtml}
    </div>
    <button class="add" type="button" onclick="addToCart(${idx})">+ Add to Order</button>
  `;
  return card;
}

$$(".fbtn").forEach(b => {
  b.addEventListener("click", () => {
    const f = b.getAttribute("data-filter");
    if (activeFilters.has(f)) activeFilters.delete(f); else activeFilters.add(f);
    renderMenu();
  });
});
searchInput.addEventListener("input", () => renderMenu());

// =========================
// Spin & Win
// =========================
const codeKeys = ["MASALA", "ROGAN", "KORMA", "BALTI", "MADRAS", "VINDALOO", "TANDOORI"];
let spinCount = 0;

const today = new Date();
const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
const todaysCode = codeKeys[dayIndex] + today.getDate();
const savedCode = localStorage.getItem('tob_discount');

if (savedCode && savedCode !== todaysCode) localStorage.removeItem('tob_discount');

if (localStorage.getItem('tob_discount') === todaysCode) {
  const msg = $("#spinMessage");
  msg.innerHTML = `🎉 DISCOUNT UNLOCKED! Use Code: <strong>${todaysCode}</strong><br><span style="font-size:.9rem;color:#666;font-weight:800">Call the restaurant to order & quote this code!</span>`;
  msg.classList.add("unlocked");
  $("#spinBtn").disabled = true;
  $("#spinBtn").textContent = "You've already won!";
}

function spinDinner() {
  const slots = [$("#slotStarter"), $("#slotMain"), $("#slotSide")];
  slots.forEach(slot => { slot.classList.remove("spin-placeholder"); slot.innerHTML = ""; });

  const pools = [
    MENU_DATA.filter(i => ["Snack Bites", "Tandoori Khazana", "Non-Veg Starters"].includes(i.category)),
    MENU_DATA.filter(i => ["Veg Curries", "Non-Veg Curries", "Biryanis", "Combo Meals"].includes(i.category)),
    MENU_DATA.filter(i => ["Tandoor Breads", "Sides"].includes(i.category))
  ];
  let ticks = 0;
  const timer = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      if (pools[i].length) {
        const r = pools[i][Math.floor(Math.random() * pools[i].length)];
        slots[i].textContent = r.name;
      }
    }
    ticks++;
    if (ticks > 14) {
      clearInterval(timer);
      spinCount++;
      $("#spinCount").textContent = String(spinCount);
      if (spinCount >= 3 && !localStorage.getItem('tob_discount')) {
        localStorage.setItem('tob_discount', todaysCode);
        const msg = $("#spinMessage");
        msg.innerHTML = `🎉 DISCOUNT UNLOCKED! Use Code: <strong>${todaysCode}</strong><br><span style="font-size:.9rem;color:#666;font-weight:800">Call the restaurant to order & quote this code!</span>`;
        msg.classList.add("unlocked");
        $("#spinBtn").disabled = true;
        $("#spinBtn").textContent = "You've already won!";
      }
    }
  }, 90);
}
$("#spinBtn").addEventListener("click", spinDinner);

$("#pairingSelect").addEventListener("change", () => {
  const main = $("#pairingSelect").value;
  if (!main) { $("#pairingResult").classList.remove("active"); return; }
  $("#sugSide").textContent = "Garlic Naan";
  $("#sugStart").textContent = "Onion Bhaji";
  $("#pairingResult").classList.add("active");
});

// =========================
// Cart & Order Logic
// =========================
let cart = [];
try { cart = JSON.parse(localStorage.getItem("tob_cart") || "[]"); } catch (e) { cart = []; }
const cartFloat = $("#cartFloat");
const cartModal = $("#cartModal");
const cartItemsList = $("#cartItemsList");
const cartTotalDisplay = $("#cartTotalDisplay");
const cartCount = $("#cartCount");
const toast = $("#toast");

function saveCart() { localStorage.setItem("tob_cart", JSON.stringify(cart)); }
function showToast() { toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 2400); }

function addToCart(index) {
  const itemToAdd = MENU_DATA[index];
  const existingItem = cart.find(i => i.name === itemToAdd.name);
  if (existingItem) existingItem.qty = (existingItem.qty || 1) + 1;
  else cart.push({ ...itemToAdd, qty: 1 });
  saveCart(); updateCartUI(); showToast();
}

function removeFromCart(index) {
  if (cart[index].qty > 1) cart[index].qty--;
  else cart.splice(index, 1);
  saveCart(); updateCartUI();
  if (cart.length === 0) { cartFloat.style.display = "none"; closeCart(); }
}

function incrementItem(index) {
  cart[index].qty++; saveCart(); updateCartUI();
}

function updateCartUI() {
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  cartCount.textContent = String(totalQty);
  cartItemsList.innerHTML = "";

  if (cart.length === 0) {
    cartItemsList.innerHTML = `<div style="text-align:center;padding:2rem 0;color:#888;"><p style="font-size:3rem;margin-bottom:.5rem;">🍛</p><p>Cart empty</p><button onclick="closeCart()" style="margin-top:1rem;color:var(--color-accent);background:none;border:none;font-weight:700;cursor:pointer;">Browse Menu</button></div>`;
    $("#cartTotalDisplay").style.display = 'none';
    $("#cartForm").style.display = 'none';
    cartFloat.style.display = "none";
    return;
  }

  $("#cartTotalDisplay").style.display = 'block';
  $("#cartForm").style.display = 'block';
  cartFloat.style.display = "flex";

  let total = 0;
  const frag = document.createDocumentFragment();
  cart.forEach((item, i) => {
    const p = parseFloat(String(item.price).replace("£", "")) || 0;
    const q = item.qty || 1;
    total += p * q;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div style="flex:1"><strong style="display:block;font-size:.95rem">${item.name}</strong><span style="color:#666;font-size:.85rem;font-weight:700">£${p.toFixed(2)}</span></div>
      <div style="display:flex;align-items:center;gap:12px;background:#f3f3f3;padding:4px 10px;border-radius:20px;">
        <button onclick="removeFromCart(${i})" style="border:none;background:transparent;color:#D9772B;font-weight:900;cursor:pointer;font-size:1.1rem;line-height:1;">−</button>
        <span style="font-weight:700;font-size:0.9rem;min-width:15px;text-align:center;">${q}</span>
        <button onclick="incrementItem(${i})" style="border:none;background:transparent;color:#D9772B;font-weight:900;cursor:pointer;font-size:1.1rem;line-height:1;">+</button>
      </div>`;
    frag.appendChild(row);
  });
  cartItemsList.appendChild(frag);
  cartTotalDisplay.textContent = `Total: £${total.toFixed(2)}`;
}

function openCart() { cartModal.classList.add("open"); cartModal.setAttribute("aria-hidden", "false"); }
function closeCart() { cartModal.classList.remove("open"); cartModal.setAttribute("aria-hidden", "true"); }
$("#closeCart").addEventListener("click", closeCart);
cartFloat.addEventListener("click", openCart);

// =======================================================
// HELPER: Send WhatsApp via CallMeBot (Background)
// =======================================================
function sendSilentWhatsApp(message) {
  const text = encodeURIComponent(message);
  const url = `https://api.callmebot.com/whatsapp.php?phone=${MY_PHONE_NUMBER}&text=${text}&apikey=${WHATSAPP_API_KEY}`;
  fetch(url, { mode: 'no-cors' }).catch(e => console.error("WhatsApp failed", e));
}

// =========================
// ORDER SUBMISSION (Email + Silent WhatsApp)
// =========================
const cartForm = $("#cartForm");
cartForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const btn = cartForm.querySelector('button[type="submit"]');
  const txt = btn.textContent;
  btn.textContent = "Sending...";
  btn.disabled = true;

  const formData = new FormData(cartForm);
  const type = formData.get("service_type");
  const name = formData.get("name");
  const phone = formData.get("phone");
  const time = formData.get("time");

  let total = 0;
  const itemsStr = cart.map(i => {
    const p = parseFloat(i.price.replace("£", ""));
    const q = i.qty || 1;
    total += p * q;
    return `${q}x ${i.name} (£${(p * q).toFixed(2)})`;
  }).join("\n");

  const fullOrderText = `NEW ORDER 🍛\nType: ${type}\nName: ${name}\nPhone: ${phone}\nTime: ${time}\n\nITEMS:\n${itemsStr}\n\nTOTAL: £${total.toFixed(2)}`;

  formData.append("_captcha", "false");
  formData.append("_subject", `New Order (${type}) - ${name}`);
  formData.append("order_details", fullOrderText);

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${RESTAURANT_EMAIL}`, {
      method: "POST", body: formData, headers: { "Accept": "application/json" }
    });

    if (res.ok) {
      sendSilentWhatsApp(fullOrderText);
      cartForm.style.display = "none";
      cartItemsList.style.display = "none";
      cartTotalDisplay.style.display = "none";
      $("#cartSuccess").style.display = "block";
      cart = [];
      saveCart();
      cartFloat.style.display = "none";
    } else {
      throw new Error("Email failed");
    }
  } catch (err) {
    alert("Error sending order. Please call the restaurant.");
    btn.textContent = txt;
    btn.disabled = false;
  }
});

// =========================
// BOOKING SUBMISSION (Email + Silent WhatsApp)
// =========================
const bookingForm = $("#bookingForm");
bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = bookingForm.querySelector('button[type="submit"]');
  const txt = btn.textContent;
  btn.textContent = "Sending...";
  btn.disabled = true;
  
  const formData = new FormData(bookingForm);
  const name = formData.get("name");
  const date = formData.get("date");
  const time = formData.get("time");
  const guests = formData.get("guests");
  
  const bookingText = `NEW BOOKING 📅\nName: ${name}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}`;

  formData.append("_captcha", "false");
  formData.append("_subject", "New Table Reservation");

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${RESTAURANT_EMAIL}`, {
      method: "POST", body: formData, headers: { "Accept": "application/json" }
    });
    
    if (res.ok) {
        sendSilentWhatsApp(bookingText);
        $("#formContainer").style.display = "none";
        $("#successMessage").style.display = "block";
    } else {
        throw new Error("Email failed");
    }
  } catch (err) {
    alert("Error sending booking. Please call us.");
    btn.textContent = txt;
    btn.disabled = false;
  }
});
$("#bookAnother").addEventListener("click", () => location.reload());
$("#closeSuccess").addEventListener("click", () => location.reload());

// =========================
// Load Static Reviews
// =========================
function loadStaticReviews() {
  const listEl = $("#googleReviews");
  const frag = document.createDocumentFragment();
  if (typeof REVIEWS_DATA !== 'undefined') {
    REVIEWS_DATA.forEach(rv => {
      const div = document.createElement("div");
      div.className = "review";
      div.innerHTML = `<strong>${rv.author}</strong><div style="color:var(--color-accent);margin-top:.25rem">${"⭐".repeat(rv.rating)}</div><p>${rv.text}</p><small>${rv.time}</small>`;
      frag.appendChild(div);
    });
  }
  setTimeout(() => { listEl.innerHTML = ""; listEl.appendChild(frag); }, 800);
}
loadStaticReviews();

// =========================
// Back To Top
// =========================
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) backToTopBtn.classList.add("visible");
    else backToTopBtn.classList.remove("visible");
  });
  backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// =========================
// Initialization
// =========================
renderOffers();
renderCategories();
renderMenu();
if (cart.length) updateCartUI();
$("#year").textContent = String(new Date().getFullYear());
checkRestaurantStatus();
setInterval(checkRestaurantStatus, 60000);