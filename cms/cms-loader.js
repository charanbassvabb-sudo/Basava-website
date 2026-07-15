/* Basava Group — CMS content loader
   Reads JSON files from /content and injects them into elements marked
   with data-cms (per-page fields) / data-cms-g (site-wide fields) /
   data-cms-list (repeatable sections such as team, projects, events...).
   This runs on every public page so edits made in /admin show up live. */
(function () {
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) {
      return o && o[k] !== undefined ? o[k] : undefined;
    }, obj);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function applyOne(el, val) {
    if (val === undefined || val === null) return;
    var kind = el.getAttribute("data-cms-kind") || (el.tagName === "IMG" ? "img" : "text");
    if (kind === "img") {
      el.src = val;
    } else if (kind === "tel") {
      el.href = "tel:" + String(val).replace(/[^\d+]/g, "");
      el.textContent = val;
    } else if (kind === "mailto") {
      el.href = "mailto:" + val;
      el.textContent = val;
    } else if (kind === "href") {
      el.href = val;
    } else if (kind === "html") {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  }

  function applyFields(root, data, attr) {
    document.querySelectorAll("[" + attr + "]").forEach(function (el) {
      var key = el.getAttribute(attr);
      applyOne(el, get(data, key));
    });
  }

  function renderItem(type, item, container) {
    var itemClass = container.getAttribute("data-cms-item-class") || "";
    switch (type) {
      case "feature":
      case "value":
        return (
          '<div class="' + itemClass + '"><h3>' + esc(item.title) + "</h3><p>" + esc(item.text) + "</p></div>"
        );
      case "stat":
        var statTag = container.getAttribute("data-cms-heading-tag") || "h2";
        return '<div class="' + itemClass + '"><' + statTag + '>' + esc(item.number) + "</" + statTag + "><p>" + esc(item.label) + "</p></div>";
      case "badge":
        return '<div class="' + itemClass + '">' + esc(item.text || item) + "</div>";
      case "project":
        return (
          '<div class="' + itemClass + '" style="background-image:url(\'' + esc(item.image) + '\')">' +
          '<div class="overlay"></div><div class="project-text"><h3>' + esc(item.title) +
          "</h3><p>" + esc(item.text) + "</p></div></div>"
        );
      case "company":
        return (
          '<a href="' + esc(item.link) + '" class="' + itemClass + '">' +
          '<div class="company-logo"><img src="' + esc(item.logo) + '" alt="' + esc(item.name) + ' Logo" loading="lazy"></div>' +
          "<h3>" + esc(item.name) + "</h3><p>" + esc(item.text) + "</p>" +
          (container.hasAttribute("data-cms-viewmore") ? '<span class="view-more">View More →</span>' : "") +
          "</a>"
        );
      case "faq":
        return '<details class="faq-item"><summary>' + esc(item.q) + "</summary><p>" + esc(item.a) + "</p></details>";
      case "team":
        return (
          '<div class="' + itemClass + (item.large ? " large-img" : "") + '" data-img="' + esc(item.image) +
          '" data-name="' + esc(item.name) + '" data-bio="' + esc(item.bio) + '">' +
          '<img src="' + esc(item.image) + '" alt="' + esc(item.name) + '" loading="lazy">' +
          "<h3>" + esc(item.name) + "</h3><p>" + esc(item.role) + "</p></div>"
        );
      case "gallery":
        return '<img src="' + esc(item.src) + '" alt="' + esc(item.alt || "") + '" loading="lazy">';
      case "event":
        return (
          '<div class="event-block"><h3>' + esc(item.title) + "</h3>" +
          (item.paragraphs || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
          '<div class="activity-gallery">' +
          (item.images || []).map(function (im) { return '<img src="' + esc(im.src) + '" alt="' + esc(im.alt || "") + '" loading="lazy">'; }).join("") +
          "</div></div>"
        );
      default:
        return "";
    }
  }

  function attachTeamHandlers(container) {
    container.querySelectorAll("[data-name]").forEach(function (card) {
      card.style.cursor = "pointer";
      card.addEventListener("click", function () {
        if (typeof window.openModal === "function") {
          window.openModal(card.getAttribute("data-img"), card.getAttribute("data-name"), card.getAttribute("data-bio"));
        }
      });
    });
  }

  function applyLists(data) {
    document.querySelectorAll("[data-cms-list]").forEach(function (el) {
      var key = el.getAttribute("data-cms-list");
      var type = el.getAttribute("data-cms-type");
      var items = get(data, key);
      if (!Array.isArray(items)) return;
      el.innerHTML = items.map(function (item) { return renderItem(type, item, el); }).join("");
      if (type === "team") attachTeamHandlers(el);
    });
  }

  function fetchJSON(url) {
    return fetch(url, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("missing " + url);
      return r.json();
    }).catch(function () { return {}; });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.getAttribute("data-cms-page");
    var base = (document.body.getAttribute("data-cms-base") || "content") + "/";

    fetchJSON(base + "global.json").then(function (global) {
      applyFields(document, global, "data-cms-g");
    });

    if (page) {
      fetchJSON(base + page + ".json").then(function (data) {
        applyFields(document, data, "data-cms");
        applyLists(data);
      });
    }
  });
})();
