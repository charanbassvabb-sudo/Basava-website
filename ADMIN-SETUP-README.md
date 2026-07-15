# Basava Group Website — Admin Panel Guide

Your site now has a built-in **Admin Panel** at:

    https://www.basavagroup.org/admin/

(also linked quietly at the bottom of every page: "Site Admin")

From there, you (or anyone you invite) can log in and edit almost
everything on the website with no coding required:

- All page text (headings, paragraphs, descriptions)
- All images and logos (just click a photo and upload a replacement)
- Repeating sections — Team members, Services, Projects, FAQs,
  Events, Stats — where you can **add**, **remove**, or **reorder**
  entries freely (e.g. add a new team member, delete an old event,
  add a new FAQ)
- Contact details, phone numbers, emails and social links that
  appear in the footer of every page

Changes are saved through your site's GitHub repository and publish
automatically the same way the rest of the site does — usually live
within 1–2 minutes of clicking "Publish" in the admin panel.

---

## One-time setup (you or your developer does this once)

The admin panel uses **Netlify Identity + Git Gateway** — a free,
built-in Netlify feature made for exactly this (no extra hosting,
no database, no password to manage yourselves).

1. Log in to your Netlify dashboard → open this site.
2. Go to **Site configuration → Identity** → click **Enable Identity**.
3. Under Identity → **Registration**, set it to **Invite only**
   (so random people can't sign themselves up).
4. Under Identity → **Services → Git Gateway**, click **Enable Git Gateway**.
   This lets the admin panel save changes back to your site's repo.
5. Still under Identity, click **Invite users**, and invite yourself
   (and anyone else at Basava Group who should be able to edit the
   site) by email.
6. Check your email for the invite, click the link — it will land
   on `/admin/` and prompt you to set a password.
7. From then on, go to `basavagroup.org/admin/`, log in, and start
   editing.

That's the entire setup. No code changes, no command line.

**If the invite link lands on a blank/error page instead of `/admin/`**
(this can happen on custom domains): in the Netlify dashboard, copy
your site's default address (looks like `your-site-name.netlify.app`),
then add this to the top of `netlify.toml` and redeploy:

```toml
[[redirects]]
  from = "/.netlify/identity/*"
  to = "https://your-site-name.netlify.app/.netlify/identity/:splat"
  status = 200
  force = true
```

---

## How editing works, day to day

1. Go to `basavagroup.org/admin/` and log in.
2. On the left you'll see every page of the site listed
   (Home, About, Contact, Companies, each company's page, Events,
   and Site-Wide Settings for the logo/footer/contact info).
3. Click a page, edit any field, and for lists (Team, Services,
   Projects, Events, FAQs, Stats) use the **Add** button to add a
   new entry or the trash icon to remove one — you can also drag
   entries to reorder them.
4. To change a picture, click the image field and either upload a
   new photo or pick one you've uploaded before.
5. When you're happy, click **Publish** (top right) — your changes
   go live automatically within a minute or two.

A **preview** of your edit is shown as you type, so you can see the
change before publishing.

---

## Notes

- Only people you've invited through Identity can log in and edit —
  the rest of your visitors just see the normal website.
- Every change is saved as a version in your site's history, so
  nothing is ever truly lost — a developer can always roll back a
  change if needed.
- If you ever want to change *page layout or design* (not just text
  and images), that's still a code change your developer would make —
  the admin panel is for content, not structure.
