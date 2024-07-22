<script lang="ts">
	import { title, description } from '$config';
	import { getAbsoluteURL } from '$utils/url';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	const { data, children }: { data: LayoutData; children: Snippet } = $props();

	import '../app.css';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta name="robots" content="index, follow, noimageindex" />

	<meta property="og:type" content="website" />
	<meta property="og:image" content={getAbsoluteURL('apple-touch-icon.png')} />
	<meta property="og:image:alt" content="Green circle on a white background." />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:locale" content="en_GB" />

	<meta itemprop="name" content={title} />
	<meta itemprop="description" content={description} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:creator" content="@zeto" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={getAbsoluteURL('apple-touch-icon.png')} />
	<meta name="twitter:image:alt" content="Green circle on a white background." />

	{#each [['en', 'English'], ['de', 'German']] as [lang, label]}
		<link
			rel="alternate"
			type="application/rss+xml"
			href={getAbsoluteURL(`${lang}/rss.xml`)}
			title="Posts ({label})"
		/>
		<link
			rel="alternate"
			type="application/rss+xml"
			href={getAbsoluteURL(`${lang}/favorites/rss.xml`)}
			title="Favorite posts ({label})"
		/>
	{/each}

	<link rel="author nofollow" href="https://jonasparnow.com/humans.txt" />

	<link rel="me" href="https://climatejustice.social/@jonas" />
</svelte:head>

<div class="mx-auto max-w-3xl px-6 pt-20">
	<Header />
	{@render children()}
	<Footer />
</div>
