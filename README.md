# Artefacts of a Burning World
Opinionated collection of articles, films, podcasts and other artefacts related to the climate crisis.

This is the source code of the website [climate.jonasparnow.com](https://climate.jonasparnow.com/).

**It’s a work in progress.**

This blog is built with [SvelteKit](https://kit.svelte.dev/) and [Tailwind](https://tailwindcss.com/). Special attention was paid to minimal size, accessibility and web standards. The CMS for this blog is [Pocketbase](https://pocketbase.io/) because of its lightness. It runs on [Pockethost.io](https://pockethost.io/). The page is built as a static site and hosted on Hetzner webhosting.

## Data fetching

Fetch the content from Pocketbase:

```bash
make fetch
```

## Developing

Once you've created a project and installed dependencies with `bun install` start a development server:

```bash
bun run dev
```

## Building

To create a production version of your app:

```bash
bun run build
```

## Deployment

Every push to `main` triggers the GitHub Action in `.github/workflows/deploy.yml`: it fetches the current content from Pocketbase, runs the tests, builds the site and uploads `build/` via FTPS. It can also be triggered manually or after content changes in Pocketbase:

```bash
gh workflow run deploy.yml
# or
gh api repos/jnsprnw/climate-blog/dispatches -f event_type=deploy
```

The required secrets (`POCKETBASE_*`, `CLOUDINARY_*`, `PUBLIC_PAGE_URL`, `FTP_*`) are stored as repository secrets.
