const defaultData = {
  site: {
    brand_name: "Knollwood",
    brand_subtitle: "Design Company",
    business_name: "Knollwood Design Company",
    meta_description: "Knollwood Design Company — handmade sewn goods and seasonal crafts made with care.",
    hero_eyebrow: "Handmade in small batches",
    hero_title: "Useful things, thoughtfully made.",
    hero_text: "Handmade sewn goods and seasonal crafts created with practical details, cozy character, and a little bit of personality.",
    hero_primary_label: "Browse handmade goods",
    hero_primary_url: "#shop",
    hero_secondary_label: "Ask about a custom order",
    hero_secondary_url: "#custom",
    trust_points: ["Small-batch", "Handmade", "Craft-fair friendly", "Custom requests welcome"],
    shop_eyebrow: "What we make",
    shop_heading: "Made for everyday use — and a little fun.",
    shop_intro: "Browse current products below. Photos, prices, descriptions, and purchase links can all be changed from Pages CMS.",
    about_eyebrow: "About Knollwood",
    about_heading: "Handmade should feel personal.",
    about_paragraph_1: "Knollwood Design Company creates handmade sewn goods and related crafts in small batches. The goal is simple: make useful, giftable pieces that feel more special than something pulled from a warehouse shelf.",
    about_paragraph_2: "Because pieces are made in limited runs, fabrics, colors, and seasonal designs can change throughout the year.",
    about_quote: "Made carefully. Sold simply. Designed to be used and enjoyed.",
    custom_eyebrow: "Custom orders",
    custom_heading: "Looking for something a little different?",
    custom_text: "Made-to-order requests, color preferences, personalized gifts, and small custom batches may be available depending on the project and schedule.",
    custom_button_label: "Start a custom request",
    custom_button_url: "#contact",
    custom_steps: [
      {title: "Tell us the idea", text: "Item, style, color, quantity, and timing."},
      {title: "Confirm details", text: "Availability, price, and expected completion."},
      {title: "Make it", text: "Your piece is created and prepared for pickup or delivery."}
    ],
    events_eyebrow: "Find us in person",
    events_heading: "Craft fairs & local events",
    events_intro: "Upcoming fairs and markets will appear here.",
    contact_eyebrow: "Contact",
    contact_heading: "Questions, availability, or custom orders?",
    contact_text: "Use your preferred contact link below. You can also add your shop and social profiles.",
    contact_label: "Preferred contact method",
    contact_link_text: "Add your email or social link in Pages CMS",
    contact_url: "",
    contact_note: "This is a placeholder until you add your real contact link.",
    shop_url: "",
    instagram_url: "",
    facebook_url: "",
    faq_eyebrow: "Good to know",
    faq_heading: "Frequently asked questions"
  },
  products: [
    {title:"Bags & Totes",category:"Sewn Goods",description:"Practical handmade bags for errands, gifts, markets, and everyday carry.",price:0,image:"",button_label:"Ask what’s available",button_url:"#contact",available:true,show:true},
    {title:"Mugs & Giftables",category:"Related Crafts",description:"Seasonal and personality-driven designs made for gifting or keeping.",price:0,image:"",button_label:"Ask what’s available",button_url:"#contact",available:true,show:true},
    {title:"Holiday & Fall",category:"Seasonal",description:"Small-batch seasonal pieces for autumn, Halloween, holidays, and craft fairs.",price:0,image:"",button_label:"Ask what’s available",button_url:"#contact",available:true,show:true}
  ],
  events: [
    {label:"NEXT EVENT",name:"Craft fair dates coming soon",date_and_time:"",location:"",description:"Add your confirmed craft fairs from Pages CMS.",button_label:"Get event updates",button_url:"#contact",show:true}
  ],
  faqs: [
    {question:"Are all items handmade?",answer:"Update this answer in Pages CMS to explain which pieces you make yourself and whether any components are commercially sourced.",show:true},
    {question:"Do you accept custom orders?",answer:"Yes — subject to availability. Update this answer with your preferred lead time and any limitations.",show:true},
    {question:"Where can I buy?",answer:"List your current craft fairs, direct-order options, and online shop links here once they are active.",show:true}
  ]
};

const $ = (id) => document.getElementById(id);

function text(id, value) {
  const el = $(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

function safeUrl(value, fallback = "#") {
  if (!value) return fallback;
  const v = String(value).trim();
  if (v.startsWith("#")) return v;
  if (/^(https?:|mailto:|tel:)/i.test(v)) return v;
  return fallback;
}

function assetUrl(value) {
  if (!value) return "";
  let v = String(value).trim();
  if (/^https?:\/\//i.test(v)) return v;
  v = v.replace(/^\/+/, "");
  return new URL(v, document.baseURI).href;
}

function setLink(id, label, url, fallback = "#") {
  const el = $(id);
  if (!el) return;
  if (label) el.textContent = label;
  el.href = safeUrl(url, fallback);
}

async function loadJson(path, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.info(`Using built-in preview content for ${path}.`, error);
    return fallback;
  }
}

function productIcon(category) {
  const key = (category || "").toLowerCase();
  if (key.includes("sewn") || key.includes("bag")) {
    return `<svg viewBox="0 0 220 180" aria-hidden="true"><path d="M58 64h104l-8 88H66z"/><path d="M82 70c0-28 12-42 28-42s28 14 28 42"/><path d="M78 101c17 7 47 7 64 0"/></svg>`;
  }
  if (key.includes("mug") || key.includes("craft")) {
    return `<svg viewBox="0 0 220 180" aria-hidden="true"><path d="M64 48h86v83c0 18-14 31-31 31H95c-17 0-31-13-31-31z"/><path d="M150 68h13c21 0 21 43 0 43h-13"/><path d="M82 91c18-17 35-17 52 0"/></svg>`;
  }
  return `<svg viewBox="0 0 220 180" aria-hidden="true"><circle cx="110" cy="103" r="48"/><path d="M96 48V29h28v19M110 29V14"/><path d="M82 103c18-19 37-19 56 0M92 121h36"/></svg>`;
}

function categoryClass(category) {
  const key = (category || "").toLowerCase();
  if (key.includes("sewn") || key.includes("bag")) return "tote";
  if (key.includes("mug") || key.includes("craft")) return "mug";
  return "ornament";
}

function renderProducts(products) {
  const grid = $("product-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const visible = products.filter(p => p.show !== false);
  if (!visible.length) {
    grid.innerHTML = `<p class="load-note">No products are currently listed.</p>`;
    return;
  }

  visible.forEach(product => {
    const article = document.createElement("article");
    article.className = `product-card${product.available === false ? " is-unavailable" : ""}`;

    const visual = document.createElement("div");
    if (product.image) {
      visual.className = "product-visual has-image";
      const img = document.createElement("img");
      img.src = assetUrl(product.image);
      img.alt = product.title || "Product photo";
      img.loading = "lazy";
      visual.appendChild(img);
    } else {
      visual.className = `product-visual ${categoryClass(product.category)}`;
      visual.innerHTML = productIcon(product.category);
    }

    const copy = document.createElement("div");
    copy.className = "product-copy";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = product.category || "Handmade";

    const title = document.createElement("h3");
    title.textContent = product.title || "Product";

    copy.append(tag, title);

    if (Number(product.price) > 0) {
      const price = document.createElement("p");
      price.className = "product-price";
      price.textContent = new Intl.NumberFormat("en-US", {style:"currency", currency:"USD"}).format(Number(product.price));
      copy.appendChild(price);
    }

    if (product.available === false) {
      const unavailable = document.createElement("span");
      unavailable.className = "availability-note";
      unavailable.textContent = "Currently unavailable";
      copy.appendChild(unavailable);
    }

    const description = document.createElement("p");
    description.textContent = product.description || "";
    copy.appendChild(description);

    const link = document.createElement("a");
    link.href = safeUrl(product.button_url, "#contact");
    link.textContent = product.button_label || "Learn more";
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = " →";
    link.appendChild(arrow);
    copy.appendChild(link);

    article.append(visual, copy);
    grid.appendChild(article);
  });
}

function renderEvents(events) {
  const list = $("events-list");
  if (!list) return;
  list.innerHTML = "";

  const visible = events.filter(event => event.show !== false);
  if (!visible.length) {
    list.innerHTML = `<p class="load-note">No upcoming events are listed yet.</p>`;
    return;
  }

  visible.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    const content = document.createElement("div");
    const label = document.createElement("span");
    label.className = "event-date";
    label.textContent = event.label || "EVENT";

    const heading = document.createElement("h3");
    heading.textContent = event.name || "Upcoming event";

    content.append(label, heading);

    const metaBits = [event.date_and_time, event.location].filter(Boolean);
    if (metaBits.length) {
      const meta = document.createElement("p");
      meta.className = "event-meta";
      meta.textContent = metaBits.join(" • ");
      content.appendChild(meta);
    }

    if (event.description) {
      const description = document.createElement("p");
      description.textContent = event.description;
      content.appendChild(description);
    }

    card.appendChild(content);

    if (event.button_label) {
      const link = document.createElement("a");
      link.className = "button secondary";
      link.href = safeUrl(event.button_url, "#contact");
      link.textContent = event.button_label;
      card.appendChild(link);
    }

    list.appendChild(card);
  });
}

function renderFaqs(faqs) {
  const list = $("faq-list");
  if (!list) return;
  list.innerHTML = "";
  faqs.filter(f => f.show !== false).forEach(faq => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = faq.question || "Question";
    const answer = document.createElement("p");
    answer.textContent = faq.answer || "";
    details.append(summary, answer);
    list.appendChild(details);
  });
}

function renderSite(site) {
  document.title = `${site.business_name || "Knollwood Design Company"} | Handmade Goods`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && site.meta_description) meta.setAttribute("content", site.meta_description);

  text("brand-name", site.brand_name);
  text("brand-subtitle", site.brand_subtitle);
  text("footer-brand-name", site.brand_name);
  text("footer-brand-subtitle", site.brand_subtitle);
  text("copyright-name", site.business_name);

  text("hero-eyebrow", site.hero_eyebrow);
  text("hero-title", site.hero_title);
  text("hero-text", site.hero_text);
  setLink("hero-primary", site.hero_primary_label, site.hero_primary_url, "#shop");
  setLink("hero-secondary", site.hero_secondary_label, site.hero_secondary_url, "#custom");

  const points = Array.isArray(site.trust_points) ? site.trust_points : [];
  const heroPoints = $("trust-points");
  const strip = $("trust-strip");
  if (heroPoints) {
    heroPoints.innerHTML = "";
    points.slice(0, 3).forEach(point => {
      const li = document.createElement("li");
      li.textContent = point;
      heroPoints.appendChild(li);
    });
  }
  if (strip) {
    strip.innerHTML = "";
    points.slice(0, 4).forEach(point => {
      const span = document.createElement("span");
      span.textContent = point;
      strip.appendChild(span);
    });
  }

  text("shop-eyebrow", site.shop_eyebrow);
  text("shop-heading", site.shop_heading);
  text("shop-intro", site.shop_intro);

  text("about-eyebrow", site.about_eyebrow);
  text("about-heading", site.about_heading);
  text("about-p1", site.about_paragraph_1);
  text("about-p2", site.about_paragraph_2);
  text("about-quote", site.about_quote);

  text("custom-eyebrow", site.custom_eyebrow);
  text("custom-heading", site.custom_heading);
  text("custom-text", site.custom_text);
  setLink("custom-button", site.custom_button_label, site.custom_button_url, "#contact");

  const steps = $("custom-steps");
  if (steps) {
    steps.innerHTML = "";
    (site.custom_steps || []).forEach((step, i) => {
      const row = document.createElement("div");
      row.className = "step";
      const number = document.createElement("span");
      number.textContent = String(i + 1);
      const content = document.createElement("div");
      const strong = document.createElement("strong");
      strong.textContent = step.title || "";
      const p = document.createElement("p");
      p.textContent = step.text || "";
      content.append(strong, p);
      row.append(number, content);
      steps.appendChild(row);
    });
  }

  text("events-eyebrow", site.events_eyebrow);
  text("events-heading", site.events_heading);
  text("events-intro", site.events_intro);

  text("contact-eyebrow", site.contact_eyebrow);
  text("contact-heading", site.contact_heading);
  text("contact-text", site.contact_text);
  text("contact-label", site.contact_label);
  text("contact-note", site.contact_note);

  const contact = $("contact-link");
  if (contact) {
    contact.textContent = site.contact_link_text || "Contact us";
    if (site.contact_url) {
      contact.href = safeUrl(site.contact_url, "#");
      contact.classList.remove("disabled-link");
      contact.removeAttribute("aria-disabled");
      contact.removeAttribute("tabindex");
    } else {
      contact.href = "#";
      contact.classList.add("disabled-link");
      contact.setAttribute("aria-disabled", "true");
      contact.setAttribute("tabindex", "-1");
    }
  }

  const social = $("social-links");
  if (social) {
    social.innerHTML = "";
    [
      ["Shop", site.shop_url],
      ["Instagram", site.instagram_url],
      ["Facebook", site.facebook_url]
    ].forEach(([label, url]) => {
      if (!url) return;
      const a = document.createElement("a");
      a.href = safeUrl(url, "#");
      a.textContent = label;
      social.appendChild(a);
    });
  }

  text("faq-eyebrow", site.faq_eyebrow);
  text("faq-heading", site.faq_heading);
}

function setupMenu() {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");
  if (!menuButton || !nav) return;

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

async function start() {
  setupMenu();
  text("year", new Date().getFullYear());

  const [site, products, events, faqs] = await Promise.all([
    loadJson("data/site.json", defaultData.site),
    loadJson("data/products.json", defaultData.products),
    loadJson("data/events.json", defaultData.events),
    loadJson("data/faqs.json", defaultData.faqs)
  ]);

  renderSite(site);
  renderProducts(Array.isArray(products) ? products : defaultData.products);
  renderEvents(Array.isArray(events) ? events : defaultData.events);
  renderFaqs(Array.isArray(faqs) ? faqs : defaultData.faqs);
}

start();
