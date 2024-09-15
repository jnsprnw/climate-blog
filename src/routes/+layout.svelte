<script lang="ts">
	import { page } from '$app/stores';
	import { version } from '$app/environment';
	import { SITE_TITLE } from '$config';
	import { getAbsoluteURL } from '$utils/url';
	import { getPageDescription } from '$utils/posts';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';

	const { data, children }: { data: LayoutData; children: Snippet } = $props();

	import '../app.css';

	const isLightMode: boolean = data.isLightMode ?? false;

	const preview = $derived(
		$page.data?.post?.image?.url_preview ?? getAbsoluteURL('apple-touch-icon.png')
	);
	const preview_alt = $derived(
		$page.data?.post?.image_alt ?? 'Green circle on a white background.'
	);
	const path = $derived($page.data?.path);
	const title = $derived($page.data?.post?.title ?? SITE_TITLE);
	const type = $derived($page.data?.type ?? 'website');
	const url = $derived(getAbsoluteURL(path));
	const urlLightMode = $derived(getAbsoluteURL(path, isLightMode));
	const lastModified = $derived($page.data?.post?.updated ?? $page.data?.lastMod);
	const description = getPageDescription();
	setContext('isLightMode', isLightMode);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta name="robots" content="index, follow, noimageindex" />

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

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@zeto" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={preview} />
	<meta name="twitter:image:alt" content={preview_alt} />

	<link rel="canonical" href={url} />

	<link rel="alternate" type="application/rss+xml" href={getAbsoluteURL('rss.xml')} title="RSS" />
	{#if isLightMode}
		<link rel="alternate" href={urlLightMode} title="Hide images" />
	{:else}
		<link rel="alternate" href={url} title="Display images" />
	{/if}

	<link rel="me" href="https://climatejustice.social/@jonas" />

	<meta name="version" content={version} />
	<meta name="build" content={data.buildDateTime.toISOString()} />
</svelte:head>

<div
	class="mx-auto max-w-3xl px-3 pt-6 sm:pt-16 md:pt-20 flex flex-col gap-y-6 sm:gap-y-10 md:gap-y-12"
>
	<Header />
	{@render children()}
	<Footer buildDateTime={data.buildDateTime} {version} currentPath={path} />
</div>
