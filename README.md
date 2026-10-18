# Austin Martin — personal writing website

A lightweight, content-first Astro site. No React required for this project: Astro generates fast static pages, supports Markdown writing, and works well with GitHub Pages. You can add React later for interactive components.

## Start
1. Install Node.js 20.19+ (or current LTS).
2. Run `npm install`.
3. Run `npm run dev` and open the local URL.
4. Run `npm run build` to generate the static site in `dist/`.

## Add an article
Create `src/content/writing/your-article-slug.md` with:
```md
---
title: "Your Title"
description: "One sentence summary."
date: 2026-10-18
category: Film
type: Essay
featured: false
portfolio: true
draft: false
---
Your article here.
```
Categories: Film, Sports, Culture, Fiction, Local, Technology, Other.
- `featured: true` makes the article eligible for the homepage (up to three, newest first).
- `portfolio: true` includes it in Selected Work, grouped by subject.
- `draft: true` hides it from public pages and generation.
- Writing page includes all non-draft posts and has working subject filters.
- Article URL is `/writing/your-article-slug/`.

**Before launch:** Replace the three sample articles, About copy, and placeholder contact email. The custom domain is not verified as owned or available.

## Publish to GitHub Pages
Create a repository (for example `austin-martin-site`) and push these files. In GitHub repository Settings → Pages, select **GitHub Actions** as source. The included workflow builds and deploys automatically when you push to `main`.

For a custom domain, purchase/control `byaustinmartin.com`, configure GitHub Pages custom domain in Settings → Pages, and add the DNS records that GitHub instructs you to use. Add a `public/CNAME` file containing `byaustinmartin.com` if needed for your setup. Verify HTTPS is enabled. `astro.config.mjs` already assumes this domain.

If you deploy first at `username.github.io/repository/` instead, change `site` and set `base: '/repository'` in Astro config, and update root-relative internal links to respect that base; a custom domain avoids that extra step.
