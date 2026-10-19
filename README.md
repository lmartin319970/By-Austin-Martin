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
Categories: Film, Sports, Culture, Creative, Fiction, Local, Technology, Other. Existing `Fiction` articles appear under Creative; their content and URLs stay unchanged.
- `featured: true` makes the article eligible for the homepage (up to three, newest first).
- `portfolio: true` includes the existing article in Portfolio, without copying its Markdown. Set it to `false` to keep the article only in Writing.
- `draft: true` hides it from public pages and generation.
- Writing shows all non-draft articles newest first, with subject filter buttons on the same page. Fiction and Creative articles share the Fiction filter. The homepage's featured selection is unchanged.
- Article URL is `/writing/your-article-slug/`.

Portfolio genre URLs use `film`, `sports`, `culture`, `creative`, `local`, `technology`, and `other` (for example `/portfolio/film/`). Empty Portfolio genres are omitted from the directory, but their pages are generated for future work. Writing uses filters at `/writing/` instead of separate genre pages.

## Publication metadata

Existing Markdown works without changes. Optionally add these frontmatter fields:

```yaml
publicationType: independent
paid: false
publication: ""
externalUrl: ""
displayOrder: 1
```

`publicationType` accepts `independent` (default), `commissioned`, or `external`. `paid` is stored separately and never displayed as a label. Supply only real publication names and credits. Cards, articles, and Portfolio show editorial credits such as "Independent Essay" or "Commissioned · Published in Example Magazine". An article's optional `externalUrl` adds a link to its original publication.

Portfolio sorts numbered `displayOrder` values first (ascending), then by newest publication date; omit it for date ordering. Writing always sorts by date.

## Add external work directly to Portfolio

Create a JSON file such as `src/content/portfolio/your-piece.json`. No corresponding Writing article or copied publication content is needed. This is a template only; replace the example details with your actual work before publishing:

```json
{
  "title": "Your published piece",
  "description": "A short description of your work.",
  "date": "2026-10-18",
  "category": "Film",
  "type": "Review",
  "publicationType": "external",
  "paid": false,
  "publication": "Actual publication name",
  "externalUrl": "https://example.com/your-piece",
  "draft": true,
  "visible": true
}
```

Use the same categories as Writing. `externalUrl` must be an absolute HTTP(S) URL and is the card's destination. Set `draft` to `false` when ready; `visible: false` also hides an entry. Both visibility fields default to publishing (`draft: false`, `visible: true`), so explicitly keep unfinished entries in draft. Optional `displayOrder` works just as it does for internal articles. Use `publicationType: commissioned` for client work or `independent` for a standalone sample, and link to the work you have permission to showcase. Do not copy externally published content into this collection.

Shared genre definitions live in `src/lib/genres.ts`; Writing uses them for its filters and Portfolio for its directory and genre pages. Existing sample articles remain samples; no external credits are included by default.

**Before launch:** Replace the three sample articles, About copy, and placeholder contact email. The custom domain is not verified as owned or available.

## Publish to GitHub Pages
Create a repository (for example `austin-martin-site`) and push these files. In GitHub repository Settings → Pages, select **GitHub Actions** as source. The included workflow builds and deploys automatically when you push to `main`.

For a custom domain, purchase/control `byaustinmartin.com`, configure GitHub Pages custom domain in Settings → Pages, and add the DNS records that GitHub instructs you to use. Add a `public/CNAME` file containing `byaustinmartin.com` if needed for your setup. Verify HTTPS is enabled. `astro.config.mjs` already assumes this domain.

If you deploy first at `username.github.io/repository/` instead, change `site` and set `base: '/repository'` in Astro config, and update root-relative internal links to respect that base; a custom domain avoids that extra step.
