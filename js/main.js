const state = { data: null };

function fixPath(p) {
  if (!p) return p;
  try {
    return new URL(p, document.baseURI).href;
  } catch (error) {
    return p.startsWith('/') ? p.slice(1) : p;
  }
}

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}

function iconForSocial(label) {
  const key = label.toLowerCase();
  if (key === 'linkedin') {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon-svg" fill="currentColor"><path d="M5.98 3.5A2.48 2.48 0 1 1 6 8.46 2.48 2.48 0 0 1 5.98 3.5ZM4.5 9h3v11h-3V9Zm5.5 0h2.88v1.5h.04A3.16 3.16 0 0 1 15.76 9c3.18 0 3.74 2.09 3.74 4.8V20h-3v-5.36c0-1.28-.02-2.93-1.79-2.93-1.8 0-2.08 1.4-2.08 2.83V20h-3V9Z"/></svg>';
  }
  if (key === 'github') {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon-svg" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.67c-2.77.6-3.35-1.18-3.35-1.18-.45-1.14-1.11-1.45-1.11-1.45-.91-.63.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.37 1.09 2.95.83.09-.66.35-1.09.63-1.34-2.21-.25-4.54-1.1-4.54-4.92 0-1.09.39-1.99 1.03-2.69-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.03a9.52 9.52 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.56 1.41.21 2.45.11 2.71.64.7 1.02 1.6 1.02 2.69 0 3.83-2.33 4.67-4.55 4.92.36.31.67.92.67 1.86v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>';
  }
  if (key === 'email') {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon-svg" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 3.2V18h16V7.2l-8 5.2-8-5.2Zm8 3.1 8-5.2H4l8 5.2Z"/></svg>';
  }
  if (key === 'whatsapp') {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon-svg" fill="currentColor"><path d="M19.05 4.94A9.9 9.9 0 0 0 12.03 2C6.55 2 2.08 6.46 2.08 11.95c0 1.75.46 3.47 1.33 4.98L2 22l5.22-1.37a9.93 9.93 0 0 0 4.8 1.22h.01c5.48 0 9.95-4.46 9.95-9.95a9.86 9.86 0 0 0-2.93-6.96Zm-7.02 15.23h-.01a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.1.81.83-3.02-.2-.31a8.23 8.23 0 0 1-1.28-4.37c0-4.58 3.72-8.3 8.3-8.3 2.22 0 4.31.86 5.87 2.43a8.24 8.24 0 0 1 2.42 5.87c0 4.58-3.72 8.3-8.3 8.3Zm4.55-6.21c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.17-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.37-1.69-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.06 0 1.22.89 2.39 1.01 2.55.12.16 1.75 2.67 4.23 3.74.59.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.16-.48-.29Z"/></svg>';
  }
  return '<svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon-svg" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/></svg>';
}

function setBasics(d) {
  document.getElementById('heroNameLine1').textContent = (d.name_parts?.[0] || d.name || 'INTIKHAB').toUpperCase();
  document.getElementById('heroNameLine2').textContent = (d.name_parts?.[1] || 'KHURSHEED').toUpperCase();
  document.getElementById('heroRole').textContent = d.role || 'Full Stack JavaScript Developer';
  document.getElementById('summary').textContent = d.summary || '';
  document.getElementById('aboutText').textContent = d.about || d.summary || '';
  document.getElementById('contactEmailText').textContent = d.email || '';
  document.getElementById('contactPhoneText').textContent = d.phone || '';
  document.getElementById('contactLocationText').textContent = d.location || '';
  document.getElementById('footerName').textContent = d.display_name || 'Intikhab Khursheed';
  document.getElementById('year').textContent = new Date().getFullYear();

  const resume = document.getElementById('resumeLink');
  if (d.resume_url) {
    resume.href = fixPath(d.resume_url);
    resume.target = '_self';
    resume.rel = '';
    if (d.resume_url.toLowerCase().endsWith('.pdf')) {
      try {
        const fileName = new URL(d.resume_url, document.baseURI).pathname.split('/').pop();
        resume.setAttribute('download', fileName || 'resume.pdf');
      } catch (error) {
        resume.setAttribute('download', 'resume.pdf');
      }
    } else {
      resume.removeAttribute('download');
    }
  }

  const email = document.getElementById('emailLink');
  if (d.email) {
    email.href = `mailto:${d.email}`;
  }

  const headshot = document.getElementById('headshot');
  const aboutImage = document.getElementById('aboutImage');
  if (d.headshot) {
    headshot.src = fixPath(d.headshot);
  }
  if (d.about_image) {
    aboutImage.src = fixPath(d.about_image);
  }
}

function renderSocials(d) {
  const socials = document.getElementById('heroSocials');
  socials.innerHTML = '';
  (d.socials || []).forEach((item) => {
    const a = el('a');
    const key = item.label.toLowerCase();
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.title = item.label;
    a.setAttribute('aria-label', item.label);
    a.dataset.social = key;
    a.innerHTML = iconForSocial(item.label);
    socials.append(a);
  });
}

function renderTrustedTech(d) {
  const row = document.getElementById('trustedTechRow');
  row.innerHTML = '';
  const trusted = d.trustedTechnologies || [];
  trusted.forEach((tech) => {
    const pill = el('div', 'trust-pill');
    const dot = el('span', 'trust-dot');
    pill.append(dot, el('span', null, tech));
    row.append(pill);
  });
}

function renderStats(d) {
  const stats = d.aboutStats || [];
  const row = document.getElementById('aboutStats');
  row.innerHTML = '';
  stats.forEach((item) => {
    const card = el('div', 'stat-card');
    card.append(el('strong', 'stat-value', item.value), el('span', 'stat-label', item.label));
    row.append(card);
  });

  const projects = Number.isFinite(d.projectCount) ? d.projectCount : (d.projects || []).length;
  const techCount = Number.isFinite(d.techCount) ? d.techCount : (d.skills || []).reduce((count, group) => count + (group.items?.length || 0), 0);
  const domains = Number.isFinite(d.domainCount) ? d.domainCount : (d.domainHints || []).length || 4;

  document.getElementById('impactProjects').textContent = `${projects}+`;
  document.getElementById('impactYears').textContent = d.yearsExperience || '2+';
  document.getElementById('impactTech').textContent = `${techCount}+`;
  document.getElementById('impactDomains').textContent = `${domains}+`;
}

function renderProjects(d) {
  const grid = document.getElementById('projectsGrid');
  if (!grid || grid.children.length > 0) return;

  const variants = [
    ['project-media-a', 'project-surface-a'],
    ['project-media-b', 'project-surface-b'],
    ['project-media-c', 'project-surface-c'],
    ['project-media-d', 'project-surface-d'],
  ];

  (d.projects || []).forEach((project, index) => {
    const card = el('article', 'project-card reveal');
    const [mediaClass, surfaceClass] = variants[index % variants.length];

    const media = el('div', `project-media ${mediaClass}`);
    const surface = el('div', `project-surface ${surfaceClass}`);
    const windowbar = el('div', 'project-windowbar');
    windowbar.append(el('span'), el('span'), el('span'));
    surface.append(windowbar);
    surface.append(el('h3', null, project.title));
    surface.append(el('p', null, project.subtitle || project.category || 'Featured Project'));
    media.append(surface);

    const body = el('div', 'project-body');
    body.append(media);
    body.append(el('h4', 'project-title', project.title));
    body.append(el('p', 'project-subtitle', project.subtitle || project.category || ''));
    body.append(el('p', 'project-description', project.description || ''));

    const chips = el('div', 'chip-row');
    (project.tech || []).slice(0, 8).forEach((tech) => chips.append(el('span', null, tech)));
    body.append(chips);

    const actions = el('div', 'actions-row');
    if (project.live) {
      const live = el('a', 'btn btn-primary', 'Live Demo');
      live.href = project.live;
      live.target = '_blank';
      live.rel = 'noopener';
      actions.append(live);
    }
    if (project.repo) {
      const repo = el('a', 'btn btn-outline', 'GitHub Repo');
      repo.href = project.repo;
      repo.target = '_blank';
      repo.rel = 'noopener';
      actions.append(repo);
    }
    body.append(actions);

    card.append(body);
    grid.append(card);
  });
}

function renderSkills(d) {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = '';
  const icons = ['F', 'B', 'T', 'A', 'D'];
  (d.skills || []).forEach((group, index) => {
    const card = el('article', 'skill-card reveal');
    const head = el('div', 'skill-head');
    head.append(el('h3', null, group.category), el('div', 'skill-icon', icons[index % icons.length]));
    card.append(head);

    const list = el('div', 'skill-list');
    (group.items || []).forEach((item) => list.append(el('span', null, item)));
    card.append(list);
    grid.append(card);
  });
}

function renderExperience(d) {
  const list = document.getElementById('experienceList');
  list.innerHTML = '';
  (d.experience || []).forEach((item) => {
    const node = el('article', 'timeline-item reveal');
    const meta = el('div', 'timeline-meta');
    meta.append(el('span', null, item.dates || ''), el('span', null, item.location || ''));
    node.append(meta);
    node.append(el('h3', null, item.title || ''));
    node.append(el('div', 'timeline-meta', item.company || ''));
    const ul = el('ul');
    (item.bullets || []).forEach((bullet) => ul.append(el('li', null, bullet)));
    node.append(ul);
    list.append(node);
  });
}

function setupProjectScroll() {
  const track = document.getElementById('projectsGrid');
  const prev = document.getElementById('projectPrev');
  const next = document.getElementById('projectNext');

  if (!track || !prev || !next) return;

  const getGap = () => {
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0');
    return Number.isFinite(gap) ? gap : 18;
  };

  const getStep = () => {
    const firstCard = track.firstElementChild;
    if (!firstCard) {
      return Math.max(320, Math.min(track.clientWidth * 0.9, 760));
    }
    const width = firstCard.getBoundingClientRect().width;
    return Math.max(320, width + getGap());
  };

  const updateButtons = () => {
    const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    prev.disabled = track.scrollLeft <= 0;
    next.disabled = track.scrollLeft >= maxScrollLeft - 1;
  };

  const scrollProjects = (direction) => {
    const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    const nextLeft = Math.max(0, Math.min(track.scrollLeft + (direction * getStep()), maxScrollLeft));
    if (typeof track.scrollTo === 'function') {
      track.scrollTo({ left: nextLeft, behavior: 'smooth' });
    } else {
      track.scrollLeft = nextLeft;
    }
  };

  prev.addEventListener('click', () => scrollProjects(-1));
  next.addEventListener('click', () => scrollProjects(1));
  track.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
}

function setupContactForm(d) {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');
  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      payload.append(key, String(value));
    }

    status.textContent = 'Sending message...';
    status.className = 'form-status is-pending';

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      form.reset();
      status.textContent = 'Message sent successfully. I will get back to you soon.';
      status.className = 'form-status is-success';
    } catch (error) {
      status.textContent = 'Message could not be sent here. Please email me directly at intikhabkhursheed@gmail.com.';
      status.className = 'form-status is-error';
    }
  });
}

function setupRevealObserver() {
  const nodes = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  nodes.forEach((node) => observer.observe(node));
}

async function init() {
  let data = window.PORTFOLIO_DATA || null;
  if (!data) {
    try {
      const response = await fetch(`data/site.json?ts=${Date.now()}`);
      data = await response.json();
    } catch (error) {
      data = {};
    }
  }
  state.data = data;

  setBasics(data);
  renderSocials(data);
  renderTrustedTech(data);
  renderStats(data);
  renderProjects(data);
  renderSkills(data);
  renderExperience(data);
  setupProjectScroll();
  setupContactForm(data);
  setupRevealObserver();
}

init();
