// =========================
// DOM READY
// =========================
document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // THEME TOGGLE (LIGHT / DARK)
  // =========================
  (function initTheme() {
    const saved = localStorage.getItem("basava-theme");
    if (saved === "light") document.body.classList.add("light-mode");
  })();

  window.toggleTheme = function () {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("basava-theme", document.body.classList.contains("light-mode") ? "light" : "dark");
  };

  // =========================
  // SCROLL TO COMPANIES
  // =========================
  window.scrollToCompanies = function () {
    const section = document.getElementById("companies");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // =========================
  // PAGE TRANSITION (fade-in on load)
  // =========================
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.45s ease";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { document.body.style.opacity = "1"; });
  });

  // Intercept all internal links for smooth page transitions
  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("http") && !href.startsWith("mailto") &&
        !href.startsWith("tel") && !href.startsWith("#") && !href.startsWith("//")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.style.opacity = "0";
        setTimeout(() => { window.location.href = href; }, 400);
      });
    }
  });

  // =========================
  // SCROLL PROGRESS BAR
  // =========================
  const progressBar = document.createElement("div");
  progressBar.id = "scroll-progress";
  progressBar.style.cssText = "position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#00c3ff,#0073b7,#00c3ff);background-size:200% 100%;z-index:9999;transition:width 0.1s linear;pointer-events:none;";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
  }, { passive: true });

  // =========================
  // HEADER SCROLL SHRINK
  // =========================
  const header = document.querySelector(".main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 60);
    }, { passive: true });
  }

  // =========================
  // BACK TO TOP BUTTON
  // =========================
  const btt = document.createElement("button");
  btt.id = "back-to-top";
  btt.setAttribute("aria-label", "Back to top");
  btt.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  btt.style.cssText = "position:fixed;bottom:110px;right:28px;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#00c3ff,#0073b7);color:white;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(0,195,255,0.4);opacity:0;transform:translateY(20px) scale(0.8);transition:opacity 0.35s ease,transform 0.35s ease,box-shadow 0.3s ease;z-index:9000;pointer-events:none;";
  document.body.appendChild(btt);

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 400;
    btt.style.opacity = show ? "1" : "0";
    btt.style.transform = show ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)";
    btt.style.pointerEvents = show ? "auto" : "none";
  }, { passive: true });

  btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  btt.addEventListener("mouseenter", () => { btt.style.boxShadow = "0 10px 35px rgba(0,195,255,0.65)"; btt.style.transform = "translateY(-3px) scale(1.08)"; });
  btt.addEventListener("mouseleave", () => { btt.style.boxShadow = "0 6px 24px rgba(0,195,255,0.4)"; btt.style.transform = "translateY(0) scale(1)"; });

  // =========================
  // WHATSAPP FLOATING BUTTON
  // =========================
  const wa = document.createElement("a");
  wa.href = "https://wa.me/260966328089";
  wa.target = "_blank";
  wa.rel = "noopener noreferrer";
  wa.id = "whatsapp-btn";
  wa.setAttribute("aria-label", "Chat on WhatsApp");
  wa.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  wa.style.cssText = "position:fixed;bottom:28px;right:28px;width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#25D366,#128C7E);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 28px rgba(37,211,102,0.5);z-index:9000;transition:transform 0.3s ease,box-shadow 0.3s ease;";
  document.body.appendChild(wa);

  // =========================
  // ANIMATED HERO TAGLINE (rotating text)
  // =========================
  const tagline = document.querySelector(".hero-content .tagline");
  if (tagline) {
    const phrases = [
      "Building Businesses. Creating Impact.",
      "Engineering the Future of Zambia.",
      "Finance. Construction. Community.",
      "Excellence Across Every Sector.",
      "Trusted in Lusaka Since Day One."
    ];
    let idx = 0;
    tagline.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    setInterval(() => {
      tagline.style.opacity = "0";
      tagline.style.transform = "translateY(-10px)";
      setTimeout(() => {
        idx = (idx + 1) % phrases.length;
        tagline.textContent = phrases[idx];
        tagline.style.opacity = "1";
        tagline.style.transform = "translateY(0)";
      }, 500);
    }, 3500);
  }

  // =========================
  // PARTICLE HERO BACKGROUND
  // =========================
  const hero = document.querySelector(".hero");
  if (hero) {
    const canvas = document.createElement("canvas");
    canvas.id = "hero-particles";
    canvas.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;";
    hero.insertBefore(canvas, hero.firstChild);
    const hc = hero.querySelector(".hero-content");
    if (hc) hc.style.zIndex = "2";

    function resizeCanvas() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const ctx = canvas.getContext("2d");
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.5 + 0.1
    }));

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,195,255,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,195,255,${p.o})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  // =========================
  // ANIMATED STATS COUNTER
  // =========================
  function animateCounter(el, target, suffix) {
    const duration = 2000;
    const startTime = performance.now();
    const isFloat = String(target).includes(".");
    function update(now) {
      const eased = 1 - Math.pow(1 - Math.min((now - startTime) / duration, 1), 3);
      el.textContent = (isFloat ? (target * eased).toFixed(1) : Math.round(target * eased)) + suffix;
      if (eased < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.dataset.target || el.textContent.trim();
        const suffix = raw.replace(/[\d.]/g, "");
        const num = parseFloat(raw.replace(/[^\d.]/g, "")) || 0;
        animateCounter(el, num, suffix);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".stat h2, .impact-box h3").forEach(el => {
    el.dataset.target = el.textContent.trim();
    statObserver.observe(el);
  });

  // =========================
  // LIGHTBOX FOR IMAGES
  // =========================
  const lb = document.createElement("div");
  lb.id = "lightbox";
  lb.innerHTML = '<button id="lb-close">&#215;</button><img id="lb-img" src="" alt=""><div id="lb-caption"></div>';
  document.body.appendChild(lb);

  document.getElementById("lb-close").addEventListener("click", () => lb.classList.remove("active"));
  lb.addEventListener("click", e => { if (e.target === lb) lb.classList.remove("active"); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("active"); });

  function openLightbox(src, caption) {
    document.getElementById("lb-img").src = src;
    document.getElementById("lb-caption").textContent = caption || "";
    lb.classList.add("active");
  }

  document.querySelectorAll(".activity-gallery img").forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  document.querySelectorAll(".project-card").forEach(card => {
    const bg = card.style.backgroundImage;
    if (bg) {
      const src = bg.replace(/^url\(['"]?/, "").replace(/['"]?\)$/, "");
      const title = card.querySelector("h3")?.textContent || "";
      card.style.cursor = "zoom-in";
      card.addEventListener("click", () => openLightbox(src, title));
    }
  });

  // =========================
  // CONTACT FORM COMPANY SELECTOR
  // =========================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const botField = contactForm.querySelector('input[name="bot-field"]');
    if (botField) {
      const companyGroup = document.createElement("div");
      companyGroup.className = "form-group";
      companyGroup.innerHTML = '<label>Which company are you contacting?</label><select name="company" class="company-selector" required><option value="" disabled selected>Select a company</option><option value="Basava Enterprises Ltd">Basava Enterprises Ltd (Construction)</option><option value="Basava Business Consultants">Basava Business Consultants</option><option value="Basava Social Welfare Foundation">Basava Social Welfare Foundation</option><option value="General Inquiry">General Inquiry</option></select>';
      const firstRow = contactForm.querySelector(".form-row");
      if (firstRow) contactForm.insertBefore(companyGroup, firstRow);
    }
  }

  // =========================
  // SCROLL ANIMATION
  // =========================
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("show"); });
  }, { threshold: 0.08 });
  sections.forEach(section => { section.classList.add("hidden"); observer.observe(section); });

  // =========================
  // STAGGERED CARD ANIMATIONS
  // =========================
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".company-card,.service-card,.team-card,.why-card,.impact-box,.project-card");
        cards.forEach((card, i) => {
          card.style.transitionDelay = `${i * 80}ms`;
          card.classList.add("show");
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".company-container,.service-container,.team-container,.why-container,.impact-container,.projects-container").forEach(container => {
    container.querySelectorAll(".company-card,.service-card,.team-card,.why-card,.impact-box,.project-card").forEach(card => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease,transform 0.6s ease";
    });
    cardObserver.observe(container);
  });

  // =========================
  // CUSTOM CURSOR (desktop only)
  // =========================
  const cursor = document.querySelector(".cursor");
  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    window.addEventListener("mousemove", e => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });
    (function animateCursor() {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      cursor.style.left = curX + "px";
      cursor.style.top = curY + "px";
      requestAnimationFrame(animateCursor);
    })();
    document.querySelectorAll("a,button,.company-card,.team-card,.service-card,.why-card,.project-card,input,textarea,select").forEach(el => {
      el.addEventListener("mouseenter", () => { cursor.style.transform = "translate(-50%,-50%) scale(2)"; cursor.style.opacity = "0.6"; });
      el.addEventListener("mouseleave", () => { cursor.style.transform = "translate(-50%,-50%) scale(1)"; cursor.style.opacity = "1"; });
    });
  } else if (cursor) {
    cursor.style.display = "none";
  }

  // =========================
  // MOBILE MENU
  // =========================
  window.toggleMenu = function () {
    document.getElementById("mobileMenu")?.classList.toggle("active");
    document.querySelector(".hamburger")?.classList.toggle("active");
    document.querySelector(".menu-overlay")?.classList.toggle("active");
  };
  window.closeMenu = function () {
    document.getElementById("mobileMenu")?.classList.remove("active");
    document.querySelector(".hamburger")?.classList.remove("active");
    document.querySelector(".menu-overlay")?.classList.remove("active");
  };
  document.querySelectorAll(".mobile-nav a").forEach(link => link.addEventListener("click", closeMenu));

  // =========================
  // TEAM MODAL
  // =========================
  window.openModal = function (image, name, desc) {
    document.getElementById("teamModal")?.classList.add("active");
    document.getElementById("modalImage").src = image;
    document.getElementById("modalName").innerText = name;
    document.getElementById("modalDesc").innerText = desc;
  };
  window.closeModal = function () { document.getElementById("teamModal")?.classList.remove("active"); };
  window.outsideClick = function (event) { if (event.target.id === "teamModal") closeModal(); };

  // =========================
  // CONTACT FORM SUBMISSION
  // =========================
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("successPopup");
  const btn = document.getElementById("submitBtn");
  if (form && btn && popup) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      btn.classList.add("loading"); btn.disabled = true;
      btn.querySelector(".btn-text").innerText = "Sending...";
      fetch("/", { method: "POST", body: new FormData(form) })
        .then(() => { popup.style.display = "flex"; form.reset(); })
        .catch(() => alert("Something went wrong. Please try again."))
        .finally(() => {
          btn.classList.remove("loading"); btn.disabled = false;
          btn.querySelector(".btn-text").innerText = "Send Message";
        });
    });
  }
  window.closePopup = function () { if (popup) popup.style.display = "none"; };

});
