<script lang="ts">
	import { page } from '$app/stores';
	import { version } from '$app/environment';
	import { SITE_TITLE, SITE_DESCRIPTION } from '$config';
	import { getAbsoluteURL } from '$utils/url';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	const { data, children }: { data: LayoutData; children: Snippet } = $props();

	import '../app.css';

	const preview = $derived(
		$page.data?.post?.image?.url_preview ?? getAbsoluteURL('apple-touch-icon.png')
	);
	const title = $derived($page.data?.post?.title ?? SITE_TITLE);
	const type = $derived($page.data?.type ?? 'website');
	const url = $derived(getAbsoluteURL($page.data?.path));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={SITE_DESCRIPTION} />

	<meta name="robots" content="index, follow, noimageindex" />

	<meta property="og:url" content={url} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:image" content={preview} />
	<meta property="og:image:alt" content="Green circle on a white background." />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:site_name" content={SITE_TITLE} />
	<meta property="og:locale" content="en_GB" />
	<meta property="article:author" content="Jonas Parnow" />

	<meta itemprop="name" content={SITE_TITLE} />
	<meta itemprop="description" content={SITE_DESCRIPTION} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@zeto" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={preview} />
	<meta name="twitter:image:alt" content="Green circle on a white background." />

	<link rel="canonical" href={url} />

	<link rel="alternate" type="application/rss+xml" href={getAbsoluteURL('rss.xml')} title="RSS" />

	<link rel="me" href="https://climatejustice.social/@jonas" />

	<meta name="version" content={version} />
	<meta name="build" content={data.buildDateTime.toISOString()} />
</svelte:head>

<div class="mx-auto max-w-3xl px-3 pt-20 flex flex-col gap-y-12">
	<Header />
	{@render children()}
	<Footer buildDateTime={data.buildDateTime} {version} />
</div>
