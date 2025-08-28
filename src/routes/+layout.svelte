<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { version } from '$app/environment';
	import { page } from '$app/stores';
	import { SITE_TITLE } from '$config';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import type { IsModeLight, IsModePlain } from '$types/ui';
	import { getPageDescription } from '$utils/posts';
	import { getAbsoluteURL } from '$utils/url';
	import type { LayoutData } from './$types';

	const { data, children }: { data: LayoutData; children: Snippet } = $props();

	import '../app.css';

	const isModeLight: IsModeLight = data.isModeLight ?? false;
	const isModePlain: IsModePlain = data.isModePlain ?? false;

	const preview = $derived(
		$page.data?.post?.image?.url_preview ?? getAbsoluteURL('apple-touch-icon.png')
	);
	const preview_alt = $derived(
		$page.data?.post?.image_alt ?? 'Green circle on a white background.'
	);
	const path = $derived($page.data?.path);
	const title = $derived($page.data?.post?.title_short ?? $page.data?.post?.title ?? SITE_TITLE);
	const type = $derived($page.data?.type ?? 'website');
	const url = $derived(getAbsoluteURL(path));
	const urlLightMode = $derived(getAbsoluteURL(path, isModeLight));
	const lastModified = $derived($page.data?.post?.updated ?? $page.data?.lastMod);
	const description = $derived($page.data?.post?.description ?? getPageDescription(false));
	setContext<IsModeLight>('isModeLight', isModeLight);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta name="robots" content="index, follow, noimageindex" />

	{#if $page.data?.preconnectImage}
		<link rel="dns-prefetch" href="https://res.cloudinary.com" />
	{/if}

	<meta property="og:url" content={url} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:image" content={preview} />
	<meta property="og:image:alt" content={preview_alt} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={SITE_TITLE} />
	<meta property="og:locale" content="en_GB" />
	<meta property="article:author" content="Jonas Parnow" />
	{#if lastModified}
		<meta property="og:updated_time" content={new Date(lastModified).toISOString()} />
	{/if}

	<meta itemprop="name" content={SITE_TITLE} />
	<meta itemprop="description" content={description} />

	<link rel="canonical" href={url} />

	<link rel="alternate" type="application/rss+xml" href={getAbsoluteURL('rss.xml')} title="RSS" />
	{#if isModeLight}
		<link rel="alternate" href={urlLightMode} title="Hide images" />
	{:else}
		<link rel="alternate" href={url} title="Display images" />
	{/if}

	<link rel="me" href="https://climatejustice.social/@jonas" />

	<meta name="version" content={version} />
	<meta name="build" content={data.buildDateTime.toISOString()} />

	<script type="speculationrules">
    {
      "prerender": [{
        "eagerness": "immediate",
        "where": {
          "selector_matches": ".link-preload",
        }
      }]
    }
	</script>
</svelte:head>

<div
	class={[
		'mx-auto max-w-3xl px-3 pt-6 sm:pt-16 md:pt-20 flex flex-col gap-y-6 sm:gap-y-10 md:gap-y-12',
		{ 'mb-6 sm:mb-8 md:mb-12': isModePlain }
	]}
>
	{#if !isModePlain}
		<Header />
	{/if}
	{@render children()}
	{#if !isModePlain}
		<Footer buildDateTime={data.buildDateTime} {version} currentPath={path} {isModeLight} />
	{/if}
</div>
