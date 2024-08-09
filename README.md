# Artefacts of a Burning World
Opinionated collection of articles, films, podcasts and other artefacts related to the climate crisis.

This is the source code of the website [climate.jonasparnow.com](https://climate.jonasparnow.com/).

**It’s a work in progress.**

This blog is built with [SvelteKit](https://kit.svelte.dev/) and [Tailwind](https://tailwindcss.com/). Special attention was paid to minimal size, accessibility and web standards. The CMS for this blog is [Pocketbase](https://pocketbase.io/) because of its lightness. It runs on [Pockethost.io](https://pockethost.io/). The page itself is hosted on [Cloudflare Pages](https://www.cloudflare.com/).

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
npm run build
```
