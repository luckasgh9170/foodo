const data = {
  categories: [
    { id: "cafe-hot-coffee", titleFa: "قهوه گرم", titleEn: "Hot Coffee" },
    { id: "cafe-cold-coffee", titleFa: "قهوه سرد", titleEn: "Cold Coffee" },
    { id: "cafe-tea-herbal", titleFa: "چای و دمنوش", titleEn: "Tea & Herbal Drinks" },
    { id: "cafe-cold-beverages", titleFa: "نوشیدنی سرد", titleEn: "Cold Beverages" },
    { id: "cafe-milkshakes", titleFa: "میلک‌شیک", titleEn: "Milkshakes" },
    { id: "cafe-cakes-desserts", titleFa: "کیک و دسر", titleEn: "Cakes & Desserts" },
    { id: "cafe-breakfast-light-meals", titleFa: "صبحانه و غذای سبک", titleEn: "Breakfast & Light Meals" },
    { id: "fastfood-burgers", titleFa: "برگر", titleEn: "Burgers" },
    { id: "fastfood-pizza", titleFa: "پیتزا", titleEn: "Pizza" },
    { id: "fastfood-sandwiches-hotdogs", titleFa: "ساندویچ و هات‌داگ", titleEn: "Sandwiches & Hotdogs" },
    { id: "fastfood-fried-chicken", titleFa: "مرغ سوخاری", titleEn: "Fried Chicken" },
    { id: "fastfood-fries-snacks", titleFa: "سیب‌زمینی و اسنک", titleEn: "Fries & Snacks" },
    { id: "fastfood-salads", titleFa: "سالاد", titleEn: "Salads" },
    { id: "fastfood-sauces-addons", titleFa: "سس و افزودنی", titleEn: "Sauces & Add-ons" },
    { id: "fastfood-soft-drinks", titleFa: "نوشابه", titleEn: "Soft Drinks" }
  ],
  products: [
    { id: "espresso", categoryId: "cafe-hot-coffee", titleFa: "اسپرسو کلاسیک", titleEn: "Classic Espresso", shortDescFa: "شات اسپرسو با کرمای غلیظ", shortDescEn: "Single-shot espresso with rich crema", price: 85000, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80", tags: ["Popular"], isAvailable: true },
    { id: "latte", categoryId: "cafe-hot-coffee", titleFa: "لاته وانیل", titleEn: "Vanilla Latte", shortDescFa: "لاته با سیروپ وانیل", shortDescEn: "Latte with vanilla syrup", price: 140000, image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=800&q=80", tags: ["Popular"], isAvailable: true },
    { id: "cappuccino", categoryId: "cafe-hot-coffee", titleFa: "کاپوچینو", titleEn: "Cappuccino", shortDescFa: "کاپوچینو با فوم شیر", shortDescEn: "Cappuccino with silky foam", price: 130000, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80", tags: ["Classic"], isAvailable: true },

    { id: "iced-latte", categoryId: "cafe-cold-coffee", titleFa: "آیس لاته", titleEn: "Iced Latte", shortDescFa: "لاته خنک با یخ", shortDescEn: "Chilled latte over ice", price: 150000, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80", tags: ["Cold"], isAvailable: true },
    { id: "cold-brew", categoryId: "cafe-cold-coffee", titleFa: "کلد برو", titleEn: "Cold Brew", shortDescFa: "قهوه سرد دم با طعم ملایم", shortDescEn: "Slow-brewed cold coffee", price: 145000, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80", tags: ["Smooth"], isAvailable: true },
    { id: "iced-americano", categoryId: "cafe-cold-coffee", titleFa: "آیس آمریکانو", titleEn: "Iced Americano", shortDescFa: "اسپرسو با آب سرد", shortDescEn: "Espresso with chilled water", price: 120000, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80", tags: ["Cold"], isAvailable: true },

    { id: "mint-tea", categoryId: "cafe-tea-herbal", titleFa: "چای سبز با نعنا", titleEn: "Mint Green Tea", shortDescFa: "چای سبز تازه و معطر", shortDescEn: "Freshly brewed green tea", price: 90000, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80", tags: ["Herbal"], isAvailable: true },
    { id: "chamomile", categoryId: "cafe-tea-herbal", titleFa: "دمنوش بابونه", titleEn: "Chamomile Tea", shortDescFa: "دمنوش آرام‌بخش بابونه", shortDescEn: "Calming chamomile infusion", price: 95000, image: "https://images.unsplash.com/photo-1451748266016-1b5c2b915b49?auto=format&fit=crop&w=800&q=80", tags: ["Relax"], isAvailable: true },
    { id: "hibiscus", categoryId: "cafe-tea-herbal", titleFa: "چای ترش", titleEn: "Hibiscus Tea", shortDescFa: "چای ترش خنک", shortDescEn: "Tart hibiscus tea", price: 98000, image: "https://images.unsplash.com/photo-1451748266016-1b5c2b915b49?auto=format&fit=crop&w=800&q=80", tags: ["Herbal"], isAvailable: true },

    { id: "mojito", categoryId: "cafe-cold-beverages", titleFa: "موهیتو کلاسیک", titleEn: "Classic Mojito", shortDescFa: "نوشیدنی خنک نعنا و لیمو", shortDescEn: "Mint and lime cooler", price: 135000, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", tags: ["Refreshing"], isAvailable: true },
    { id: "lemonade", categoryId: "cafe-cold-beverages", titleFa: "لیموناد تازه", titleEn: "Fresh Lemonade", shortDescFa: "لیموناد خنک", shortDescEn: "Chilled lemonade", price: 120000, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", tags: ["Cold"], isAvailable: true },
    { id: "iced-tea", categoryId: "cafe-cold-beverages", titleFa: "آیس تی", titleEn: "Iced Tea", shortDescFa: "چای سرد با طعم لیمو", shortDescEn: "Iced tea with lemon", price: 110000, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", tags: ["Cold"], isAvailable: true },

    { id: "milkshake-choc", categoryId: "cafe-milkshakes", titleFa: "میلک‌شیک شکلات", titleEn: "Chocolate Milkshake", shortDescFa: "میلک‌شیک غلیظ شکلاتی", shortDescEn: "Thick chocolate shake", price: 165000, image: "https://images.unsplash.com/photo-1511910849309-0dffb3f9f347?auto=format&fit=crop&w=800&q=80", tags: ["Sweet"], isAvailable: true },
    { id: "milkshake-vanilla", categoryId: "cafe-milkshakes", titleFa: "میلک‌شیک وانیل", titleEn: "Vanilla Milkshake", shortDescFa: "میلک‌شیک وانیلی کلاسیک", shortDescEn: "Classic vanilla milkshake", price: 155000, image: "https://images.unsplash.com/photo-1511910849309-0dffb3f9f347?auto=format&fit=crop&w=800&q=80", tags: ["Classic"], isAvailable: true },
    { id: "milkshake-straw", categoryId: "cafe-milkshakes", titleFa: "میلک‌شیک توت‌فرنگی", titleEn: "Strawberry Milkshake", shortDescFa: "میلک‌شیک با توت تازه", shortDescEn: "Milkshake with fresh strawberries", price: 160000, image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80", tags: ["Fruit"], isAvailable: true },

    { id: "cheesecake", categoryId: "cafe-cakes-desserts", titleFa: "چیزکیک نیویورکی", titleEn: "New York Cheesecake", shortDescFa: "چیزکیک خامه‌ای کلاسیک", shortDescEn: "Classic creamy cheesecake", price: 190000, image: "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=800&q=80", tags: ["Dessert"], isAvailable: true },
    { id: "brownie", categoryId: "cafe-cakes-desserts", titleFa: "براونی شکلاتی", titleEn: "Chocolate Brownie", shortDescFa: "براونی نرم با شکلات تلخ", shortDescEn: "Fudgy chocolate brownie", price: 175000, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80", tags: ["Chocolate"], isAvailable: true },
    { id: "carrot-cake", categoryId: "cafe-cakes-desserts", titleFa: "کیک هویج", titleEn: "Carrot Cake", shortDescFa: "کیک هویج با خامه پنیر", shortDescEn: "Carrot cake with cream cheese", price: 185000, image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80", tags: ["Dessert"], isAvailable: true },

    { id: "omelette", categoryId: "cafe-breakfast-light-meals", titleFa: "املت مدیترانه‌ای", titleEn: "Mediterranean Omelette", shortDescFa: "املت با سبزیجات تازه", shortDescEn: "Omelette with fresh veggies", price: 175000, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", tags: ["Breakfast"], isAvailable: true },
    { id: "avocado-toast", categoryId: "cafe-breakfast-light-meals", titleFa: "تست آووکادو", titleEn: "Avocado Toast", shortDescFa: "نان تست با آووکادو", shortDescEn: "Toast topped with avocado", price: 165000, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80", tags: ["Light"], isAvailable: true },
    { id: "french-toast", categoryId: "cafe-breakfast-light-meals", titleFa: "فرنچ تست", titleEn: "French Toast", shortDescFa: "فرنچ تست با عسل", shortDescEn: "French toast with honey", price: 170000, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80", tags: ["Breakfast"], isAvailable: true },

    { id: "burger-classic", categoryId: "fastfood-burgers", titleFa: "برگر کلاسیک", titleEn: "Classic Burger", shortDescFa: "گوشت تازه با پنیر", shortDescEn: "Fresh beef and cheese", price: 240000, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", tags: ["Popular"], isAvailable: true },
    { id: "burger-chicken", categoryId: "fastfood-burgers", titleFa: "برگر مرغ", titleEn: "Chicken Burger", shortDescFa: "فیله مرغ سوخاری", shortDescEn: "Crispy chicken burger", price: 225000, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", tags: ["Crispy"], isAvailable: true },
    { id: "burger-mushroom", categoryId: "fastfood-burgers", titleFa: "برگر قارچ و پنیر", titleEn: "Mushroom Burger", shortDescFa: "قارچ تازه و پنیر", shortDescEn: "Mushroom and cheese", price: 255000, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", tags: ["Signature"], isAvailable: true },

    { id: "pizza-margherita", categoryId: "fastfood-pizza", titleFa: "پیتزا مارگاریتا", titleEn: "Margherita Pizza", shortDescFa: "پنیر موزارلا و ریحان", shortDescEn: "Mozzarella and basil", price: 310000, image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80", tags: ["Vegetarian"], isAvailable: true },
    { id: "pizza-pepperoni", categoryId: "fastfood-pizza", titleFa: "پیتزا پپرونی", titleEn: "Pepperoni Pizza", shortDescFa: "پپرونی و پنیر", shortDescEn: "Pepperoni with cheese", price: 335000, image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80", tags: ["Popular"], isAvailable: true },
    { id: "pizza-veggie", categoryId: "fastfood-pizza", titleFa: "پیتزا سبزیجات", titleEn: "Veggie Pizza", shortDescFa: "سبزیجات تازه", shortDescEn: "Fresh veggies", price: 320000, image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80", tags: ["Vegetarian"], isAvailable: true },

    { id: "hotdog", categoryId: "fastfood-sandwiches-hotdogs", titleFa: "هات‌داگ مخصوص", titleEn: "Signature Hotdog", shortDescFa: "هات‌داگ با سس مخصوص", shortDescEn: "Hotdog with house sauce", price: 175000, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", tags: ["Classic"], isAvailable: true },
    { id: "club-sandwich", categoryId: "fastfood-sandwiches-hotdogs", titleFa: "کلاب ساندویچ", titleEn: "Club Sandwich", shortDescFa: "ساندویچ چند لایه", shortDescEn: "Layered sandwich", price: 195000, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", tags: ["Popular"], isAvailable: true },
    { id: "bbq-hotdog", categoryId: "fastfood-sandwiches-hotdogs", titleFa: "هات‌داگ باربیکیو", titleEn: "BBQ Hotdog", shortDescFa: "هات‌داگ با سس باربیکیو", shortDescEn: "Hotdog with BBQ sauce", price: 185000, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", tags: ["Smoky"], isAvailable: false },

    { id: "fried-chicken", categoryId: "fastfood-fried-chicken", titleFa: "مرغ سوخاری ترد", titleEn: "Crispy Fried Chicken", shortDescFa: "مرغ سوخاری با ادویه", shortDescEn: "Fried chicken with spices", price: 265000, image: "https://images.unsplash.com/photo-1562967916-eb82221dfb32?auto=format&fit=crop&w=800&q=80", tags: ["Spicy"], isAvailable: true },
    { id: "wings", categoryId: "fastfood-fried-chicken", titleFa: "بال مرغ تند", titleEn: "Spicy Wings", shortDescFa: "بال سوخاری با سس تند", shortDescEn: "Crispy wings with hot sauce", price: 230000, image: "https://images.unsplash.com/photo-1562967916-eb82221dfb32?auto=format&fit=crop&w=800&q=80", tags: ["Spicy"], isAvailable: true },
    { id: "tenders", categoryId: "fastfood-fried-chicken", titleFa: "استریپس مرغ", titleEn: "Chicken Tenders", shortDescFa: "تکه‌های ترد مرغ", shortDescEn: "Crispy chicken tenders", price: 220000, image: "https://images.unsplash.com/photo-1562967916-eb82221dfb32?auto=format&fit=crop&w=800&q=80", tags: ["Crispy"], isAvailable: true },

    { id: "chili-fries", categoryId: "fastfood-fries-snacks", titleFa: "سیب‌زمینی چیلی", titleEn: "Chili Fries", shortDescFa: "سیب‌زمینی با سس چیلی", shortDescEn: "Fries with chili sauce", price: 120000, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80", tags: ["Spicy"], isAvailable: true },
    { id: "truffle-fries", categoryId: "fastfood-fries-snacks", titleFa: "سیب‌زمینی ترافل", titleEn: "Truffle Fries", shortDescFa: "سیب‌زمینی با سس ترافل", shortDescEn: "Fries with truffle sauce", price: 150000, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80", tags: ["Signature"], isAvailable: true },
    { id: "onion-rings", categoryId: "fastfood-fries-snacks", titleFa: "حلقه پیاز", titleEn: "Onion Rings", shortDescFa: "حلقه‌های پیاز سوخاری", shortDescEn: "Crispy onion rings", price: 110000, image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80", tags: ["Snack"], isAvailable: true },

    { id: "caesar", categoryId: "fastfood-salads", titleFa: "سالاد سزار", titleEn: "Caesar Salad", shortDescFa: "سالاد با سس سزار", shortDescEn: "Salad with Caesar dressing", price: 195000, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", tags: ["Healthy"], isAvailable: true },
    { id: "greek", categoryId: "fastfood-salads", titleFa: "سالاد یونانی", titleEn: "Greek Salad", shortDescFa: "سالاد با زیتون و فتا", shortDescEn: "Salad with olives and feta", price: 180000, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", tags: ["Fresh"], isAvailable: true },
    { id: "quinoa", categoryId: "fastfood-salads", titleFa: "سالاد کینوا", titleEn: "Quinoa Salad", shortDescFa: "سالاد سبک با کینوا", shortDescEn: "Light salad with quinoa", price: 185000, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", tags: ["Healthy"], isAvailable: true },

    { id: "garlic-sauce", categoryId: "fastfood-sauces-addons", titleFa: "سس سیر", titleEn: "Garlic Sauce", shortDescFa: "سس سیر خانگی", shortDescEn: "House-made garlic sauce", price: 45000, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80", tags: ["Addon"], isAvailable: true },
    { id: "spicy-mayo", categoryId: "fastfood-sauces-addons", titleFa: "سس مایونز تند", titleEn: "Spicy Mayo", shortDescFa: "مایونز با ادویه تند", shortDescEn: "Mayo with spicy kick", price: 45000, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80", tags: ["Spicy"], isAvailable: true },
    { id: "cheese-dip", categoryId: "fastfood-sauces-addons", titleFa: "دیپ پنیر", titleEn: "Cheese Dip", shortDescFa: "دیپ پنیر گرم", shortDescEn: "Warm cheese dip", price: 60000, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80", tags: ["Addon"], isAvailable: true },

    { id: "cola", categoryId: "fastfood-soft-drinks", titleFa: "نوشابه کولا", titleEn: "Cola", shortDescFa: "نوشابه گازدار", shortDescEn: "Sparkling soft drink", price: 55000, image: "https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=800&q=80", tags: ["Cold"], isAvailable: true },
    { id: "lemon-soda", categoryId: "fastfood-soft-drinks", titleFa: "لیموناد گازدار", titleEn: "Lemon Soda", shortDescFa: "نوشابه لیمویی", shortDescEn: "Lemon flavored soda", price: 60000, image: "https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=800&q=80", tags: ["Cold"], isAvailable: true },
    { id: "sparkling-water", categoryId: "fastfood-soft-drinks", titleFa: "آب گازدار", titleEn: "Sparkling Water", shortDescFa: "آب گازدار ساده", shortDescEn: "Classic sparkling water", price: 50000, image: "https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=800&q=80", tags: ["Light"], isAvailable: true }
  ]
};

const i18n = {
  fa: {
    brandTag: "رستوران و کافه",
    menu: "منو",
    admin: "ادمین",
    heroTitle: "منوی پریمیوم FOODO",
    heroSubtitle: "کافه و فست‌فود با کیفیت ممتاز",
    highlight: "پیشنهاد ویژه امروز",
    highlightTitle: "لاته وانیل",
    highlightText: "تهیه شده با دانه‌های تازه عربیکا",
    allItems: "تمام آیتم‌ها",
    footerLeft: "FOODO | منوی دیجیتال رستوران و کافه",
    footerRight: "تمامی حقوق محفوظ است.",
    allCategories: "همه دسته‌ها",
    itemsSuffix: "آیتم",
    outBadge: "ناموجود"
  },
  en: {
    brandTag: "Restaurant & Cafe",
    menu: "Menu",
    admin: "Admin",
    heroTitle: "FOODO Premium Menu",
    heroSubtitle: "Cafe and fast food with premium quality",
    highlight: "Today’s highlight",
    highlightTitle: "Vanilla Latte",
    highlightText: "Crafted with fresh Arabica beans",
    allItems: "All items",
    footerLeft: "FOODO | Digital menu for restaurant & cafe",
    footerRight: "All rights reserved.",
    allCategories: "All categories",
    itemsSuffix: "items",
    outBadge: "Out of stock"
  }
};

const state = {
  lang: "fa",
  theme: "night",
  category: "all",
  query: ""
};

const categoryRow = document.getElementById("categoryRow");
const productGrid = document.getElementById("productGrid");
const itemsCount = document.getElementById("itemsCount");
const langToggle = document.getElementById("langToggle");
const themeToggle = document.getElementById("themeToggle");

const formatPrice = (value) => {
  const formatter = new Intl.NumberFormat(state.lang === "fa" ? "fa-IR" : "en-US");
  const currency = state.lang === "fa" ? "تومان" : "Toman";
  return `${formatter.format(value)} ${currency}`;
};

const t = (key) => i18n[state.lang][key];

const applyI18n = () => {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "fa" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  langToggle.textContent = state.lang === "fa" ? "EN" : "فا";
  if (themeToggle) {
    themeToggle.textContent =
      state.theme === "night"
        ? state.lang === "fa"
          ? "روز"
          : "Day"
        : state.lang === "fa"
          ? "شب"
          : "Night";
  }
};

const applyTheme = () => {
  document.documentElement.dataset.theme = state.theme;
};

const renderCategories = () => {
  categoryRow.innerHTML = "";
  const allButton = document.createElement("button");
  allButton.textContent = t("allCategories");
  allButton.className = state.category === "all" ? "active" : "";
  allButton.addEventListener("click", () => {
    state.category = "all";
    render();
  });
  categoryRow.appendChild(allButton);

  data.categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = state.lang === "fa" ? category.titleFa : category.titleEn;
    btn.className = state.category === category.id ? "active" : "";
    btn.addEventListener("click", () => {
      state.category = category.id;
      render();
    });
    categoryRow.appendChild(btn);
  });
};

const renderProducts = (products) => {
  productGrid.innerHTML = products
    .map(
      (item) => `
      <div class="card">
        <div class="card-image">
          <img src="${item.image}" alt="${item.titleEn}" />
          ${
            item.isAvailable
              ? ""
              : `<span class="badge">${t("outBadge")}</span>`
          }
        </div>
        <div class="card-body">
          <div class="card-title">${state.lang === "fa" ? item.titleFa : item.titleEn}</div>
          <div class="card-price">${formatPrice(item.price)}</div>
          <div class="card-desc">${state.lang === "fa" ? item.shortDescFa : item.shortDescEn}</div>
          <div class="tags">
            ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </div>
      </div>
    `
    )
    .join("");

  itemsCount.textContent = `${products.length} ${t("itemsSuffix")}`;
};

const filterProducts = () => {
  return data.products.filter((item) => {
    const matchesCategory = state.category === "all" || item.categoryId === state.category;
    return matchesCategory;
  });
};

const render = () => {
  applyI18n();
  applyTheme();
  renderCategories();
  const filtered = filterProducts();
  renderProducts(filtered);
};

langToggle.addEventListener("click", () => {
  state.lang = state.lang === "fa" ? "en" : "fa";
  render();
});

themeToggle.addEventListener("click", () => {
  state.theme = state.theme === "night" ? "day" : "night";
  render();
});

document.querySelectorAll("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.getAttribute("data-scroll"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

render();
