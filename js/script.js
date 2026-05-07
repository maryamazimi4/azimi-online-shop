/*  AZIMI PERFUMES Shop
   Core Interactive Store Logic*/

/* 1. AZIMI PRODUCT COLLECTION*/
const products = [
  {
    id: 1,
    name: "Midnight Oud",
    brand: "AZIMI",
    price: 189,
    image: "images/perfume1.jpg",
    category: "masculine",
    description: "A bold nocturnal fragrance of black oud, smoked vetiver, and dark amber. Mysterious, intense, and unforgettable.",
    size: "100ml",
    rating: 4.9,
    featured: true
  },
  {
    id: 2,
    name: "Velvet Rose",
    brand: "AZIMI",
    price: 215,
    image: "images/perfume2.jpg",
    category: "feminine",
    description: "An eternal bouquet of Bulgarian rose, white peony, and warm musk. Romantic, radiant, and deeply feminine.",
    size: "75ml",
    rating: 4.8,
    featured: true
  },
  {
    id: 3,
    name: "White Sandal",
    brand: "AZIMI",
    price: 165,
    image: "images/perfume3.jpg",
    category: "unisex",
    description: "Creamy white sandalwood intertwined with cardamom, vanilla, and cedar. A warm, sensuous, gender-free signature.",
    size: "50ml",
    rating: 4.7,
    featured: true
  },
  {
    id: 4,
    name: "Royal Oud",
    brand: "AZIMI",
    price: 320,
    image: "images/perfume5.jpg",
    category: "oud",
    description: "The finest Cambodian oud blended with saffron, rose attar, and aged patchouli. Pure royal opulence.",
    size: "100ml",
    rating: 5.0,
    featured: true
  },
  {
    id: 5,
    name: "Aqua Lumineuse",
    brand: "AZIMI",
    price: 145,
    image: "images/perfume6.jpg",
    category: "unisex",
    description: "Fresh sea breeze, bergamot, and white tea create a luminous aquatic journey. Light and effortlessly elegant.",
    size: "100ml",
    rating: 4.6,
    featured: false
  },
  {
    id: 6,
    name: "Jasmin Impérial",
    brand: "AZIMI",
    price: 198,
    image: "images/perfume7.jpg",
    category: "feminine",
    description: "A voluptuous jasmine sambac heart surrounded by ylang-ylang and sensual benzoin. Imperial and intoxicating.",
    size: "75ml",
    rating: 4.8,
    featured: false
  },
  {
    id: 7,
    name: "Ambre Mystique",
    brand: "AZIMI",
    price: 175,
    image: "images/perfume8.jpg",
    category: "unisex",
    description: "Golden amber, labdanum, and sweet tonka bean wrapped in a spiced woody base. Warm, mysterious, timeless.",
    size: "100ml",
    rating: 4.7,
    featured: false
  },
  {
    id: 8,
    name: "Bois Sauvage",
    brand: "AZIMI",
    price: 155,
    image: "images/perfume9.jpg",
    category: "masculine",
    description: "Raw cedarwood, black pepper, and smoky guaiac wood. A rugged, earthy scent for the modern gentleman.",
    size: "100ml",
    rating: 4.5,
    featured: false
  },
  {
    id: 9,
    name: "Velours de Nuit",
    brand: "AZIMI",
    price: 245,
    image: "images/perfume10.jpg",
    category: "feminine",
    description: "Velvety iris, violet, and precious musks laced with Tahitian vanilla. Soft, luxurious, and deeply sensual.",
    size: "50ml",
    rating: 4.9,
    featured: false
  },
  {
    id: 10,
    name: "Oud Sultan",
    brand: "AZIMI",
    price: 380,
    image: "images/perfume11.jpg",
    category: "oud",
    description: "The rarest Hindi oud fused with aged rose, amber musk, and precious resins. A sultan's private collection.",
    size: "50ml",
    rating: 5.0,
    featured: false
  },
  {
    id: 11,
    name: "Citrus Soleil",
    brand: "AZIMI",
    price: 125,
    image: "images/perfume12.jpg",
    category: "unisex",
    description: "Vibrant Amalfi lemon, mandarin, and neroli over a warm vetiver base. Sunshine captured in a bottle.",
    size: "100ml",
    rating: 4.5,
    featured: false
  },
  {
    id: 12,
    name: "Musc Précieux",
    brand: "AZIMI",
    price: 168,
    image: "images/perfume13.jpg",
    category: "unisex",
    description: "The purest white musks, cashmere wood, and a whisper of powdery iris. Skin-close, intimate, addictive.",
    size: "75ml",
    rating: 4.6,
    featured: false
  }
];

/*2. CART STATE*/
let cart = JSON.parse(sessionStorage.getItem('azimiCart') || '[]');

function saveCart() {
  sessionStorage.setItem('azimiCart', JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartCount();
  showCartToast(product.name);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCartPage();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  renderCartPage();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  renderCartPage();
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = total;
  });
}

function getCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
}

/*3. TOAST NOTIFICATION */
function showCartToast(name) {
  // Remove Existing Notification
  const old = document.getElementById('cartToast');
  if (old) old.remove();

  const lang = document.documentElement.getAttribute('data-lang') || 'en';
  const msg = lang === 'fa'
    ? `«${name}» به سبد خرید اضافه شد`
    : `"${name}" added to cart`;

  const toast = document.createElement('div');
  toast.id = 'cartToast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
  toast.style.cssText = `
    position:fixed; bottom:2rem; right:2rem; z-index:9999;
    background:linear-gradient(135deg,#b8933f,#8b6e2d);
    color:#fff; padding:0.85rem 1.5rem; border-radius:8px;
    font-size:0.82rem; font-weight:500; display:flex;
    align-items:center; gap:0.6rem; box-shadow:0 10px 35px rgba(184,147,63,0.35);
    animation:toastIn 0.35s ease forwards;
  `;

  // RTL Position Support
  if (document.documentElement.dir === 'rtl') {
    toast.style.right = 'unset';
    toast.style.left = '2rem';
  }

  // Toast Animation Styles
  if (!document.getElementById('toastStyle')) {
    const style = document.createElement('style');
    style.id = 'toastStyle';
    style.textContent = `
      @keyframes toastIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes toastOut { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(20px)} }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.35s ease forwards';
    setTimeout(() => toast.remove(), 350);
  }, 2500);
}

/*4. DARK MODE */
function initTheme() {
  const saved = localStorage.getItem('azimiTheme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('azimiTheme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  document.querySelectorAll('#themeIcon').forEach(icon => {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });
}

/*5. LANGUAGE SWITCHER*/
const translations = {
  en: {
    dir: 'ltr',
    label: 'EN',
    addToCart: 'Add to Cart',
    quickView: 'Quick View',
    noResults: 'No perfumes found. Try a different search or filter.',
    showing: 'Showing',
    products: 'products',
    emptyCart: 'Your cart is empty',
    emptyCartSub: 'Add some luxurious fragrances to get started.',
    shopNow: 'Shop Now',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    tax: 'Tax (8%)',
    total: 'Total',
    freeShipping: 'Free shipping on orders over $100',
    promoSuccess: '🎉 Promo code applied! 10% discount added.',
    promoFail: 'Invalid promo code.',
    newsletterSuccess: '✓ Thank you for subscribing!',
    newsletterInvalid: 'Please enter a valid email address.'
  },
  fa: {
    dir: 'rtl',
    label: 'FA',
    addToCart: 'افزودن به سبد',
    quickView: 'مشاهده سریع',
    noResults: 'عطری یافت نشد. جستجو یا فیلتر دیگری را امتحان کنید.',
    showing: 'نمایش',
    products: 'محصول',
    emptyCart: 'سبد خرید شما خالی است',
    emptyCartSub: 'برای شروع، چند عطر لوکس اضافه کنید.',
    shopNow: 'خرید کنید',
    subtotal: 'جمع جزء',
    shipping: 'هزینه ارسال',
    tax: 'مالیات (۸٪)',
    total: 'جمع کل',
    freeShipping: 'ارسال رایگان برای سفارش‌های بالای ۱۰۰ دلار',
    promoSuccess: '🎉 کد تخفیف اعمال شد! ۱۰٪ تخفیف دریافت کردید.',
    promoFail: 'کد تخفیف نامعتبر است.',
    newsletterSuccess: '✓ ممنون از ثبت‌نام شما!',
    newsletterInvalid: 'لطفاً یک آدرس ایمیل معتبر وارد کنید.'
  }
};

let currentLang = localStorage.getItem('azimiLang') || 'en';

function initLang() {
  applyLang(currentLang);
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'fa' : 'en';
  localStorage.setItem('azimiLang', currentLang);
  applyLang(currentLang);
}

function applyLang(lang) {
  const t = translations[lang];
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', t.dir);
  document.documentElement.setAttribute('data-lang', lang);

  // Update all data-en / data-fa elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      // Handle elements with innerHTML (em tags etc)
      if (el.getAttribute('data-en').includes('<')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-placeholder-en]').forEach(el => {
    const ph = el.getAttribute(`data-placeholder-${lang}`);
    if (ph) el.placeholder = ph;
  });

  // Update lang toggle label
  document.querySelectorAll('#langLabel').forEach(el => {
    el.textContent = t.label;
  });

  // Re-render dynamic content with new language
  const page = detectPage();
  if (page === 'products') renderProductsPage();
  if (page === 'home') renderFeaturedProducts();
  if (page === 'cart') renderCartPage();
  if (page === 'checkout') renderCheckoutSummary();
}

function t(key) {
  return (translations[currentLang] || translations.en)[key] || key;
}

/*6. NAVBAR SCROLL EFFECT*/
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/*7. RENDER HELPERS*/
function starsHTML(rating) {
  let html = '';
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
  if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  return html;
}

function formatPrice(price) {
  return '$' + price.toFixed(2);
}

function categoryLabel(cat) {
  const labels = {
    feminine: currentLang === 'fa' ? 'برای او' : 'For Her',
    masculine: currentLang === 'fa' ? 'برای مردان' : 'For Him',
    unisex: currentLang === 'fa' ? 'یونی‌سکس' : 'Unisex',
    oud: currentLang === 'fa' ? 'عود' : 'Oud'
  };
  return labels[cat] || cat;
}

function createProductCard(product) {
  const addLabel = t('addToCart');
  const quickLabel = t('quickView');
  return `
    <div class="col-lg-3 col-md-4 col-sm-6">
      <div class="product-card" data-id="${product.id}">
        <div class="product-card-inner">
          <div class="product-img-wrap">
            <img src="${product.image}" alt="${product.name}" loading="lazy"/>
            <span class="product-category-badge">${categoryLabel(product.category)}</span>
            <div class="product-overlay">
              <button class="btn-quick-view" onclick="openProductModal(${product.id})">
                <i class="fa-solid fa-eye me-1"></i> ${quickLabel}
              </button>
            </div>
          </div>
          <div class="product-card-body">
            <span class="product-brand">${product.brand}</span>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
              <span class="stars">${starsHTML(product.rating)}</span>
              <span class="rating-count">(${product.rating})</span>
            </div>
            <p class="product-desc">${product.description}</p>
            <div class="product-footer">
              <div>
                <span class="product-price">${formatPrice(product.price)}</span>
                <span class="product-size">${product.size}</span>
              </div>
              <button class="btn-add-cart" onclick="addToCart(${product.id})">
                <i class="fa-solid fa-bag-shopping"></i>
                ${addLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/*8. PRODUCT MODAL */
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('modalImg').src = product.image;
  document.getElementById('modalImg').alt = product.name;
  document.getElementById('modalBrand').textContent = product.brand;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalRating').innerHTML =
    `<span class="stars">${starsHTML(product.rating)}</span> <small>(${product.rating})</small>`;
  document.getElementById('modalDesc').textContent = product.description;
  document.getElementById('modalSize').textContent = '📦 ' + product.size;
  document.getElementById('modalCategory').textContent = '🏷️ ' + categoryLabel(product.category);
  document.getElementById('modalPrice').textContent = formatPrice(product.price);

  const addBtn = document.getElementById('modalAddCart');
  addBtn.onclick = () => {
    addToCart(product.id);
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    if (modal) modal.hide();
  };

  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
}

/*9. DETECT PAGE*/
function detectPage() {
  const path = window.location.pathname;
  if (path.includes('products')) return 'products';
  if (path.includes('cart')) return 'cart';
  if (path.includes('checkout')) return 'checkout';
  if (path.includes('contact')) return 'contact';
  if (path.includes('about')) return 'about';
  return 'home';
}

/*10. HOME PAGE — FEATURED PRODUCTS*/
function renderFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = products.filter(p => p.featured);
  grid.innerHTML = featured.map(createProductCard).join('');
}

/*11. PRODUCTS PAGE*/
let filteredProducts = [...products];

function renderProductsPage() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const noResults = document.getElementById('noResults');
  const countEl = document.getElementById('productCount');

  if (filteredProducts.length === 0) {
    grid.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    if (countEl) countEl.textContent = '0';
  } else {
    if (noResults) noResults.style.display = 'none';
    grid.innerHTML = filteredProducts.map(createProductCard).join('');
    if (countEl) countEl.textContent = filteredProducts.length;
  }
}

function filterAndSortProducts() {
  const categoryEl = document.getElementById('filterCategory');
  const sortEl = document.getElementById('sortProducts');
  const searchEl = document.getElementById('productSearch');

  const category = categoryEl ? categoryEl.value : 'all';
  const sort = sortEl ? sortEl.value : 'default';
  const query = searchEl ? searchEl.value.toLowerCase().trim() : '';

  let result = [...products];

  // Filter by category
  if (category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  // Filter by search
  if (query) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  // Sort
  if (sort === 'price-asc')  result.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (sort === 'rating')     result.sort((a, b) => b.rating - a.rating);

  filteredProducts = result;
  renderProductsPage();
}

function initProductsPage() {
  // Check for URL param ?cat=
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  const filterCat = document.getElementById('filterCategory');
  if (cat && filterCat) {
    filterCat.value = cat;
  }

  filterAndSortProducts();

  // Events
  const filterCatEl = document.getElementById('filterCategory');
  const sortEl = document.getElementById('sortProducts');
  const searchEl = document.getElementById('productSearch');

  if (filterCatEl) filterCatEl.addEventListener('change', filterAndSortProducts);
  if (sortEl) sortEl.addEventListener('change', filterAndSortProducts);
  if (searchEl) searchEl.addEventListener('keyup', filterAndSortProducts);
}

/*12. NAV SEARCH (all pages) */
function initNavSearch() {
  const navSearch = document.getElementById('navSearch');
  if (!navSearch) return;
  navSearch.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const query = navSearch.value.trim();
      if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
}

/*13. CART PAGE */
function renderCartPage() {
  const cartContent = document.getElementById('cartContent');
  const emptyCart = document.getElementById('emptyCart');
  if (!cartContent && !emptyCart) return;

  if (cart.length === 0) {
    if (cartContent) cartContent.style.display = 'none';
    if (emptyCart) emptyCart.style.display = 'block';
    renderRelatedProducts();
    return;
  }

  if (emptyCart) emptyCart.style.display = 'none';
  if (cartContent) cartContent.style.display = 'flex';

  // Render items
  const itemsList = document.getElementById('cartItemsList');
  if (itemsList) {
    itemsList.innerHTML = cart.map(item => `
      <div class="cart-item" id="cart-item-${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img"/>
        <div class="cart-item-info flex-grow-1">
          <span class="cart-item-brand">${item.brand}</span>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-size">${item.size}</div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Decrease quantity">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)" aria-label="Increase quantity">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
        <button class="btn-remove-item" onclick="removeFromCart(${item.id})" aria-label="Remove item">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');
  }

  // Update totals
  updateCartTotalsUI();
  renderRelatedProducts();
}

function updateCartTotalsUI() {
  const { subtotal, shipping, tax, total } = getCartTotals();
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('cartSubtotal', formatPrice(subtotal));
  setEl('cartShipping', shipping === 0 ? 'FREE' : formatPrice(shipping));
  setEl('cartTax', formatPrice(tax));
  setEl('cartTotal', formatPrice(total));
}

function renderRelatedProducts() {
  const grid = document.getElementById('relatedProducts');
  if (!grid) return;
  // Show 4 random products not in cart
  const cartIds = cart.map(i => i.id);
  const others = products.filter(p => !cartIds.includes(p.id)).slice(0, 4);
  grid.innerHTML = others.map(createProductCard).join('');
}

function initCartPage() {
  renderCartPage();

  // Clear cart button
  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) clearBtn.addEventListener('click', () => {
    if (confirm('Clear all items from cart?')) clearCart();
  });

  // Promo code
  const applyPromo = document.getElementById('applyPromo');
  if (applyPromo) {
    applyPromo.addEventListener('click', () => {
      const code = (document.getElementById('promoCode')?.value || '').trim().toUpperCase();
      const msg = document.getElementById('promoMsg');
      if (!msg) return;
      if (code === 'MARYAM10' || code === 'WELCOME') {
        msg.textContent = t('promoSuccess');
        msg.style.color = '#28a745';
      } else {
        msg.textContent = t('promoFail');
        msg.style.color = '#dc3545';
      }
    });
  }
}

/* 14. CHECKOUT PAGE*/
function renderCheckoutSummary() {
  const itemsEl = document.getElementById('checkoutItems');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `<p style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:1rem 0;">${t('emptyCart')}</p>`;
  } else {
    itemsEl.innerHTML = cart.map(item => `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}"/>
        <div class="checkout-item-info flex-grow-1">
          <div class="checkout-item-name">${item.name}</div>
          <div class="checkout-item-meta">${item.size} × ${item.qty}</div>
        </div>
        <div class="checkout-item-price">${formatPrice(item.price * item.qty)}</div>
      </div>
    `).join('');
  }

  const { subtotal, shipping, tax, total } = getCartTotals();
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('checkoutSubtotal', formatPrice(subtotal));
  setEl('checkoutShipping', shipping === 0 ? 'FREE' : formatPrice(shipping));
  setEl('checkoutTax', formatPrice(tax));
  setEl('checkoutTotal', formatPrice(total));
}

function initCheckoutPage() {
  renderCheckoutSummary();

  // Payment method toggle
  document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const cardFields = document.getElementById('cardFields');
      if (!cardFields) return;
      cardFields.style.display = this.value === 'card' ? 'flex' : 'none';
    });
  });

  // Card number formatting
  const cardNumberEl = document.getElementById('cardNumber');
  if (cardNumberEl) {
    cardNumberEl.addEventListener('input', function() {
      let val = this.value.replace(/\D/g, '').slice(0, 16);
      this.value = val.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  // Expiry formatting
  const expiryEl = document.getElementById('cardExpiry');
  if (expiryEl) {
    expiryEl.addEventListener('input', function() {
      let val = this.value.replace(/\D/g, '');
      if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
      this.value = val;
    });
  }

  // Form submission
  const form = document.getElementById('mainCheckoutForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateCheckoutForm()) {
        submitOrder();
      }
    });
  }
}

function validateCheckoutForm() {
  let valid = true;

  const clearErr = (id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  };
  const setErr = (id, msg) => {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
    valid = false;
  };

  // Clear all errors
  ['fullName','email','phone','address','city','zip','country','cardName','cardNumber','cardExpiry','cardCVV'].forEach(f => clearErr(f + 'Error'));

  const lang = currentLang;
  const required = lang === 'fa' ? 'این فیلد الزامی است.' : 'This field is required.';
  const invalidEmail = lang === 'fa' ? 'آدرس ایمیل نامعتبر است.' : 'Invalid email address.';
  const invalidPhone = lang === 'fa' ? 'شماره تلفن نامعتبر است.' : 'Invalid phone number.';
  const invalidCard = lang === 'fa' ? 'شماره کارت ۱۶ رقمی وارد کنید.' : 'Enter a valid 16-digit card number.';
  const invalidExpiry = lang === 'fa' ? 'تاریخ انقضا نامعتبر است (MM/YY).' : 'Invalid expiry date (MM/YY).';
  const invalidCVV = lang === 'fa' ? 'CVV باید ۳-۴ رقم باشد.' : 'CVV must be 3-4 digits.';

  const val = (id) => (document.getElementById(id)?.value || '').trim();

  if (!val('fullName')) setErr('fullNameError', required);
  if (!val('email')) { setErr('emailError', required); }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) setErr('emailError', invalidEmail);

  if (!val('phone')) { setErr('phoneError', required); }
  else if (!/^[\+\d\s\-\(\)]{7,15}$/.test(val('phone'))) setErr('phoneError', invalidPhone);

  if (!val('address')) setErr('addressError', required);
  if (!val('city'))    setErr('cityError', required);
  if (!val('zip'))     setErr('zipError', required);
  if (!val('country')) setErr('countryError', required);

  const method = document.querySelector('input[name="paymentMethod"]:checked')?.value;
  if (method === 'card') {
    if (!val('cardName')) setErr('cardNameError', required);
    const rawCard = val('cardNumber').replace(/\s/g, '');
    if (!rawCard || rawCard.length !== 16) setErr('cardNumberError', invalidCard);
    if (!/^\d{2}\/\d{2}$/.test(val('cardExpiry'))) setErr('cardExpiryError', invalidExpiry);
    if (!/^\d{3,4}$/.test(val('cardCVV'))) setErr('cardCVVError', invalidCVV);
  }

  return valid;
}

function submitOrder() {
  const formEl = document.getElementById('checkoutForm');
  const successEl = document.getElementById('orderSuccess');
  const orderNumEl = document.getElementById('orderNumber');

  if (formEl) formEl.style.display = 'none';
  if (successEl) successEl.style.display = 'block';

  const orderId = 'AZ-' + Date.now().toString().slice(-6);
  if (orderNumEl) orderNumEl.textContent = orderId;

  // Clear cart after order
  clearCart();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/*15. CONTACT FORM */
function initContactPage() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateContactForm()) {
      const success = document.getElementById('contactSuccess');
      form.style.display = 'none';
      if (success) success.style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

function validateContactForm() {
  let valid = true;
  const lang = currentLang;

  const clearErr = (id) => { const el = document.getElementById(id); if (el) el.textContent = ''; };
  const setErr = (id, msg) => { const el = document.getElementById(id); if (el) el.textContent = msg; valid = false; };

  ['contactName','contactEmail','contactSubject','contactMessage'].forEach(f => clearErr(f + 'Error'));

  const required = lang === 'fa' ? 'این فیلد الزامی است.' : 'This field is required.';
  const invalidEmail = lang === 'fa' ? 'آدرس ایمیل نامعتبر است.' : 'Invalid email address.';
  const shortMsg = lang === 'fa' ? 'پیام باید حداقل ۱۰ کاراکتر باشد.' : 'Message must be at least 10 characters.';

  const val = (id) => (document.getElementById(id)?.value || '').trim();

  [
  'fullName',
  'email',
  'phone',
  'address',
  'city',
  'country',
  'cardName',
  'cardNumber',
  'cardExpiry',
  'cardCVV'
].forEach(id => {
  const input = document.getElementById(id);

  if (input) {
    input.addEventListener('input', () => {
      clearErr(id + 'Error');
    });
  }
});

  if (!val('contactName'))    setErr('contactNameError', required);
  if (!val('contactEmail'))   { setErr('contactEmailError', required); }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('contactEmail'))) setErr('contactEmailError', invalidEmail);
  if (!val('contactSubject')) setErr('contactSubjectError', required);
  if (!val('contactMessage')) { setErr('contactMessageError', required); }
  else if (val('contactMessage').length < 10) setErr('contactMessageError', shortMsg);

  return valid;
}

/*16. NEWSLETTER FORM */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailEl = document.getElementById('newsletterEmail');
    const msgEl = document.getElementById('newsletterMsg');
    const email = emailEl?.value.trim() || '';

    if (!msgEl) return;

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msgEl.textContent = t('newsletterSuccess');
      msgEl.style.color = 'rgba(255,255,255,0.95)';
      if (emailEl) emailEl.value = '';
    } else {
      msgEl.textContent = t('newsletterInvalid');
      msgEl.style.color = 'rgba(255,220,220,0.95)';
    }
  });
}

/*17. INIT ALL PAGES */
document.addEventListener('DOMContentLoaded', () => {
  // Global inits
  initTheme();
  initLang();
  initNavScroll();
  updateCartCount();
  initNavSearch();
  initNewsletterForm();

  // Theme toggle
  document.querySelectorAll('#themeToggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Lang toggle
  document.querySelectorAll('#langToggle').forEach(btn => {
    btn.addEventListener('click', toggleLang);
  });

  // Page-specific inits
  const page = detectPage();
  if (page === 'home')     { renderFeaturedProducts(); }
  if (page === 'products') { initProductsPage(); }
  if (page === 'cart')     { initCartPage(); }
  if (page === 'checkout') { initCheckoutPage(); }
  if (page === 'contact')  { initContactPage(); }

  // Handle URL search param on products page
  if (page === 'products') {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    if (search) {
      const el = document.getElementById('productSearch');
      if (el) { el.value = search; filterAndSortProducts(); }
    }
  }

  // Animate elements on scroll
  initScrollAnimations();
});

/*18. SCROLL ANIMATIONS */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Add initial hidden state and observe
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll(
    '.why-card, .value-card, .team-card, .product-card, .testimonial-card, .contact-info-item'
  ).forEach((el, i) => {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
    observer.observe(el);
  });
}


