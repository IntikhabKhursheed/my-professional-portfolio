const state = {
  data: null,
  activeFilter: "All",
  filterTimer: null,
};

function createElement(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

function fixPath(path) {
  if (!path) return path;
  try {
    return new URL(path, document.baseURI).href;
  } catch (error) {
    return path;
  }
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function iconSvg(name) {
  const icons = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.98 3.5A2.48 2.48 0 1 1 6 8.46 2.48 2.48 0 0 1 5.98 3.5ZM4.5 9h3v11h-3V9Zm5.5 0h2.88v1.5h.04A3.16 3.16 0 0 1 15.76 9c3.18 0 3.74 2.09 3.74 4.8V20h-3v-5.36c0-1.28-.02-2.93-1.79-2.93-1.8 0-2.08 1.4-2.08 2.83V20h-3V9Z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.67c-2.77.6-3.35-1.18-3.35-1.18-.45-1.14-1.11-1.45-1.11-1.45-.91-.63.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.37 1.09 2.95.83.09-.66.35-1.09.63-1.34-2.21-.25-4.54-1.1-4.54-4.92 0-1.09.39-1.99 1.03-2.69-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.03a9.52 9.52 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.56 1.41.21 2.45.11 2.71.64.7 1.02 1.6 1.02 2.69 0 3.83-2.33 4.67-4.55 4.92.36.31.67.92.67 1.86v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 3.2V18h16V7.2l-8 5.2-8-5.2Zm8 3.1 8-5.2H4l8 5.2Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.05 4.94A9.9 9.9 0 0 0 12.03 2C6.55 2 2.08 6.46 2.08 11.95c0 1.75.46 3.47 1.33 4.98L2 22l5.22-1.37a9.93 9.93 0 0 0 4.8 1.22h.01c5.48 0 9.95-4.46 9.95-9.95a9.86 9.86 0 0 0-2.93-6.96Zm-7.02 15.23h-.01a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.1.81.83-3.02-.2-.31a8.23 8.23 0 0 1-1.28-4.37c0-4.58 3.72-8.3 8.3-8.3 2.22 0 4.31.86 5.87 2.43a8.24 8.24 0 0 1 2.42 5.87c0 4.58-3.72 8.3-8.3 8.3Zm4.55-6.21c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.17-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.37-1.69-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.06 0 1.22.89 2.39 1.01 2.55.12.16 1.75 2.67 4.23 3.74.59.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.16-.48-.29Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.1.4 2.2.6 3.4.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9 21 3 15 3 7c0-.6.4-1 1-1h2.5c.6 0 1 .4 1 1 0 1.2.2 2.3.6 3.4.1.4 0 .8-.3 1.1l-2.2 2.3Z"/></svg>',
    location: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C7.6 2 4 5.6 4 10c0 5.7 8 12 8 12s8-6.3 8-12c0-4.4-3.6-8-8-8Zm0 11.2A3.2 3.2 0 1 1 12 6.8a3.2 3.2 0 0 1 0 6.4Z"/></svg>',
    hospital: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 21V5h10v16" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.5 13h5M12 10.5v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M4 21h16" stroke="currentColor" stroke-width="1.8"/></svg>',
    crm: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V5M4 19h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M7 15l3-3 3 2 4-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="round"/></svg>',
    brain: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6a3 3 0 0 1 6 0v12a3 3 0 0 1-6 0V6Z" stroke="currentColor" stroke-width="1.8"/><path d="M9 8H7a2 2 0 0 0 0 4h2M15 8h2a2 2 0 0 1 0 4h-2M9 16H7a2 2 0 0 1 0-4h2M15 16h2a2 2 0 0 0 0-4h-2" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 21h16M6 21V5h8v16M14 10h4v11" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="round"/><path d="M8 8h1M10 8h1M8 11h1M10 11h1M8 14h1M10 14h1M8 17h1M10 17h1" stroke="currentColor" stroke-width="1.8"/></svg>',
    megaphone: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 12h5l10-5v10l-10-5H3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 12l1.5 5h2L10 12" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M18.5 9.5a3.5 3.5 0 0 1 0 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>',
    kanban: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5h6v14H4zM14 5h6v14h-6z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 8h0M7 11h0M7 14h0M17 8h0M17 11h0M17 14h0" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    invoice: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3h10v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5V3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>',
    desktop: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="11" stroke="currentColor" stroke-width="1.8"/><path d="M9 19h6M12 16v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 5h5v5M10 14 19 5M19 14v5H5V5h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>',
  };
  return icons[name] || icons.external;
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value ?? "";
}

function renderHero(data) {
  const nameParts = data.nameParts || ["Intikhab", "Khursheed"];
  setText("heroNameLine1", nameParts[0]);
  setText("heroNameLine2", nameParts[1]);
  setText("heroSummary", data.summary || "");
  setText("heroStatusText", data.statusText || "");
  setText("availabilityLabel", data.availabilityLabel || "// AVAILABLE FOR HIRE");
  setText("aboutText", data.about || "");
  setText("contactIntro", data.contactIntro || "");
  setText("currentYear", String(new Date().getFullYear()));

  const resumeLink = document.getElementById("resumeLink");
  if (resumeLink && data.resumeUrl) {
    resumeLink.href = fixPath(data.resumeUrl);
    resumeLink.setAttribute("download", "Intikhab_Resume.pdf");
  }

  const heroSocials = document.getElementById("heroSocials");
  heroSocials.innerHTML = "";
  (data.socials || []).forEach((social) => {
    const link = createElement("a");
    link.href = social.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", social.label);
    link.title = social.label;
    link.innerHTML = iconSvg(social.label.toLowerCase());
    heroSocials.append(link);
  });

  const heroStats = document.getElementById("heroStats");
  heroStats.innerHTML = "";
  (data.heroStats || []).forEach((stat) => {
    const cell = createElement("div", "hero-stat");
    cell.append(
      createElement("strong", "hero-stat-number", stat.number),
      createElement("span", "hero-stat-label", stat.label)
    );
    heroStats.append(cell);
  });
}

function renderSkills(data) {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = "";

  (data.skills || []).forEach((group) => {
    const card = createElement("article", "skill-card");
    card.dataset.accent = group.accent || "cyan";

    const head = createElement("div", "skill-head");
    const title = createElement("h3", null, group.category || "");
    const mark = createElement("span", "skill-mark");
    head.append(title, mark);
    card.append(head);

    if (group.mode === "progress") {
      const list = createElement("div", "skill-progress-list");
      (group.items || []).forEach((item) => {
        const row = createElement("div", "skill-row");
        const rowHead = createElement("div", "skill-row-head");
        rowHead.append(
          createElement("span", "skill-row-name", item.name),
          createElement("span", "skill-row-value", `${item.value}%`)
        );
        const meter = createElement("div", "skill-meter");
        const bar = createElement("span");
        bar.dataset.width = String(item.value || 0);
        bar.style.setProperty("--skill-width", `${item.value || 0}%`);
        meter.append(bar);
        row.append(rowHead, meter);
        list.append(row);
      });
      card.append(list);
    } else {
      const tags = createElement("div", "skill-tags");
      (group.items || []).forEach((item) => {
        tags.append(createElement("span", null, item));
      });
      card.append(tags);
    }

    grid.append(card);
  });
}

function projectIcon(name) {
  return iconSvg(name);
}

function categoryColor(category) {
  switch (category) {
    case "AI":
      return "var(--accent-cyan)";
    case "Full Stack":
      return "var(--accent-purple)";
    case "Frontend":
      return "var(--accent-green)";
    case "Desktop":
      return "var(--accent-orange)";
    default:
      return "var(--text-secondary)";
  }
}

function labelForProjectLink(project, type) {
  if (type === "live") return "Live Demo";
  if (project.pageUrl && project.pageUrl === project.githubUrl && !project.liveUrl) return "Project Page";
  return "GitHub Repo";
}

function renderProjects(data) {
  const projects = (data.projects || []).slice().sort((a, b) => Number(b.featured) - Number(a.featured));
  setText("projectCountLabel", `${projects.length} Projects`);

  const filters = ["All", ...new Set(projects.map((project) => project.category).filter(Boolean))];
  const filterRow = document.getElementById("projectFilters");
  filterRow.innerHTML = "";

  filters.forEach((filter) => {
    const button = createElement("button", `filter-btn${filter === "All" ? " is-active" : ""}`, filter);
    button.type = "button";
    button.dataset.filter = filter;
    button.addEventListener("click", () => setProjectFilter(filter));
    filterRow.append(button);
  });

  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";

  projects.forEach((project) => {
    const card = createElement("article", `project-card reveal-item${project.featured ? " featured" : ""}`);
    card.dataset.category = project.category || "All";

    const top = createElement("div", "project-top");
    const left = createElement("div", "project-meta-left");
    const metaRow = createElement("div");
    metaRow.style.display = "flex";
    metaRow.style.alignItems = "center";
    metaRow.style.gap = "12px";
    metaRow.append(
      Object.assign(createElement("span", "project-type"), { innerHTML: projectIcon(project.icon) }),
      createElement("span", "project-category", project.category || "")
    );
    metaRow.querySelector(".project-category").style.color = categoryColor(project.category);
    left.append(metaRow);

    const links = createElement("div", "project-links");
    if (project.liveUrl) {
      const link = createElement("a", "icon-link");
      link.href = project.liveUrl;
      link.target = "_blank";
      link.rel = "noopener";
      link.innerHTML = `${iconSvg("external")} <span>${labelForProjectLink(project, "live")}</span>`;
      links.append(link);
    }
    if (project.githubUrl) {
      const link = createElement("a", "icon-link");
      link.href = project.githubUrl;
      link.target = "_blank";
      link.rel = "noopener";
      link.innerHTML = `${iconSvg("external")} <span>${labelForProjectLink(project, "github")}</span>`;
      links.append(link);
    }
    top.append(left, links);

    const title = createElement("h3", "project-title", project.title || "");
    const subtitle = createElement("p", "project-subtitle", project.subtitle || "");
    const description = createElement("p", "project-description", project.description || "");

    const techTags = createElement("div", "tech-tags");
    (project.techTags || []).forEach((tag) => {
      techTags.append(createElement("span", "tech-tag", tag));
    });

    card.append(top, title, subtitle, description, techTags);
    grid.append(card);
  });

  state.activeFilter = "All";
}

function setProjectFilter(filter) {
  state.activeFilter = filter;
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });

  const grid = document.getElementById("projectsGrid");
  grid.classList.add("is-filtering");

  if (state.filterTimer) {
    window.clearTimeout(state.filterTimer);
  }

  state.filterTimer = window.setTimeout(() => {
    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => {
      const matches = filter === "All" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !matches);
    });
    window.requestAnimationFrame(() => grid.classList.remove("is-filtering"));
  }, 150);
}

function renderExperience(data) {
  const timeline = document.getElementById("experienceTimeline");
  timeline.innerHTML = "";

  (data.experience || []).forEach((item) => {
    const card = createElement("article", `timeline-item ${item.color || "cyan"}`);
    const head = createElement("div", "timeline-head");
    const title = createElement("h3", null, item.title || "");
    const date = createElement("div", "timeline-date");
    date.textContent = `${item.dates || ""}\n${item.location || ""}`;
    const company = createElement("div", "timeline-company", item.company || "");
    const list = createElement("ul");
    (item.bullets || []).forEach((bullet) => {
      list.append(createElement("li", null, bullet));
    });
    head.append(title, date);
    card.append(head, company, list);
    timeline.append(card);
  });

  const stats = document.getElementById("experienceStats");
  stats.innerHTML = "";
  (data.experienceStats || []).forEach((stat) => {
    const mini = createElement("div", "stat-mini");
    mini.append(
      createElement("strong", "stat-mini-number", stat.number),
      createElement("span", "stat-mini-label", stat.label)
    );
    stats.append(mini);
  });

  const feedback = document.getElementById("feedbackCard");
  feedback.innerHTML = "";
  feedback.append(
    createElement("div", "feedback-label", "CLIENT FEEDBACK"),
    createElement("p", "feedback-quote", data.testimonial?.quote || ""),
    createElement("div", "feedback-author", `- ${data.testimonial?.author || ""}`),
    createElement("div", "feedback-pill", data.testimonial?.tag || "")
  );
}

function contactIcon(name) {
  return iconSvg(name);
}

function renderContact(data) {
  const rows = document.getElementById("contactRows");
  rows.innerHTML = "";
  (data.contactRows || []).forEach((row) => {
    const link = row.href ? "a" : "div";
    const item = createElement(link, "contact-row");
    if (row.href) {
      item.href = row.href;
      if (/^https?:/i.test(row.href)) {
        item.target = "_blank";
        item.rel = "noopener";
      }
    }
    item.append(
      Object.assign(createElement("span", "contact-row-icon"), { innerHTML: contactIcon(row.icon) }),
      createElement("div", null, "")
    );
    const copy = item.lastElementChild;
    copy.append(
      createElement("strong", "contact-row-label", row.label || ""),
      createElement("span", "contact-row-value", row.value || "")
    );
    rows.append(item);
  });

  const status = document.getElementById("statusCard");
  status.innerHTML = "";
  status.append(
    createElement("div", "section-label mono", data.status?.label || "CURRENT STATUS"),
    createElement("span", "status-dot"),
    (() => {
      const copy = createElement("div", "status-copy");
      copy.append(
        createElement("strong", null, data.status?.text || "Available for new projects"),
        createElement("span", null, data.status?.helper || "")
      );
      return copy;
    })()
  );
}

function setupContactForm(data) {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      payload.append(key, String(value));
    }

    status.textContent = "Sending message...";
    status.className = "form-status is-pending";

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      form.reset();
      status.textContent = "Message sent successfully. I will get back to you soon.";
      status.className = "form-status is-success";
    } catch (error) {
      status.textContent = `Message could not be sent here. Please email me directly at ${data.email}.`;
      status.className = "form-status is-error";
    }
  });
}

function setupRevealObserver() {
  const sections = document.querySelectorAll(".reveal-section");
  const skillCards = document.querySelectorAll(".skill-card");
  const animatedCards = [...sections, ...skillCards];

  if (!("IntersectionObserver" in window)) {
    animatedCards.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        if (entry.target.classList.contains("skill-card")) {
          entry.target.classList.add("is-visible");
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -12% 0px" });

  animatedCards.forEach((node) => observer.observe(node));
}

function setupScrollSpy() {
  const targets = ["skills", "projects", "experience", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const links = Array.from(document.querySelectorAll("[data-nav-link]"));

  const activate = (id) => {
    links.forEach((link) => {
      const matches = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", matches);
    });
  };

  if (!("IntersectionObserver" in window)) {
    activate("skills");
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) {
      activate(visible[0].target.id);
    }
  }, { rootMargin: "-30% 0px -55% 0px", threshold: [0.2, 0.35, 0.5] });

  targets.forEach((node) => observer.observe(node));
  activate("skills");
}

async function typeHeroRoles(roles) {
  const target = document.getElementById("heroRoleText");
  if (!target) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    target.textContent = roles[0] || "";
    return;
  }

  let index = 0;

  while (true) {
    const current = roles[index % roles.length] || "";

    for (let i = 1; i <= current.length; i += 1) {
      target.textContent = current.slice(0, i);
      await sleep(55);
    }

    await sleep(2000);

    for (let i = current.length; i >= 0; i -= 1) {
      target.textContent = current.slice(0, i);
      await sleep(26);
    }

    index += 1;
  }
}

function setupMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const openButton = document.querySelector(".menu-toggle");
  const closeButton = document.querySelector(".menu-close");
  const links = menu.querySelectorAll("a");

  const open = () => {
    menu.hidden = false;
    document.body.classList.add("menu-open");
    openButton.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    menu.hidden = true;
    document.body.classList.remove("menu-open");
    openButton.setAttribute("aria-expanded", "false");
  };

  openButton.addEventListener("click", () => {
    if (menu.hidden) {
      open();
    } else {
      close();
    }
  });

  closeButton.addEventListener("click", close);
  menu.addEventListener("click", (event) => {
    if (event.target === menu) close();
  });
  links.forEach((link) => link.addEventListener("click", close));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) close();
  });
}

function setupAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const mobileMenu = document.getElementById("mobileMenu");
      if (!mobileMenu.hidden) {
        mobileMenu.hidden = true;
        document.body.classList.remove("menu-open");
        const button = document.querySelector(".menu-toggle");
        if (button) button.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function loadData() {
  if (window.PORTFOLIO_DATA) return Promise.resolve(window.PORTFOLIO_DATA);
  return fetch(`data/site.json?ts=${Date.now()}`).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load portfolio data (${response.status})`);
    }
    return response.json();
  });
}

function enhanceProjectsAfterRender() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => card.classList.add("is-visible"));
}

async function init() {
  const data = await loadData();
  state.data = data;

  renderHero(data);
  renderSkills(data);
  renderProjects(data);
  renderExperience(data);
  renderContact(data);
  setupContactForm(data);
  setupRevealObserver();
  setupScrollSpy();
  setupMobileMenu();
  setupAnchorLinks();
  enhanceProjectsAfterRender();
  typeHeroRoles(data.heroRoles || ["Full Stack Developer"]);
}

init().catch((error) => {
  console.error(error);
});
