<script lang="ts">
	import Favorite from '$lib/icons/Favorite.svelte';
	import Authors from '$lib/components/Authors.svelte';
	import { type Post } from '$types/pocketbase';

	const { post, isSingle = false }: { post: Post; isSingle?: boolean } = $props();

	const {
		authors,
		content,
		formats,
		image,
		isFavorite,
		language,
		quote_author,
		quote_content,
		schemas,
		slug,
		title
	} = post;
</script>

<article
	class="mt-12 mb-16 grid grid-cols-3 border-b-2 border-slate-700 pb-16 dark:border-neutral-700 md:mb-24 md:pb-24"
	itemscope
	itemtype={`https://schema.org/${schemas.key}`}
	id={slug}
	role={isSingle ? '' : 'listitem'}
>
	<meta itemprop="inLanguage" content={language.key} />
	<header class="col-span-3">
		<div class="flex justify-between">
			<span
				class="col-span-3 pb-2 text-xs font-semibold uppercase tracking-wider text-accent"
				lang="en-GB"
			>
				{formats.at(0).label}
			</span>
			{#if isFavorite}
				<Favorite />
			{/if}
		</div>
		<a href={`/${slug}`} class="transition-colors hover:text-accent" itemprop="url">
			<h1
				class="mb-2 text-3xl leading-tight md:text-4xl lg:text-5xl"
				itemprop="name"
				lang={language.key}
			>
				{title}
			</h1>
			<span class="text-sm">
				<Authors authors={authors.map((author) => author.label)} lang={language.key} />
			</span>
		</a>
	</header>
	<main class="col-span-3 my-6 border-y border-slate-200 py-6 flex flex-col gap-y-4">
		{#if image}
			<figure class="flex flex-col gap-y-1" itemscope itemtype="https://schema.org/ImageObject">
				<img
					class="w-full h-auto"
					src={image.url}
					width={image.width}
					height={image.height}
					alt={title}
					itemprop="contentUrl"
				/>
				{#if image.caption}
					<figcaption itemprop="author" class="text-xs place-self-end text-neutral-400">
						{image.caption}
					</figcaption>
				{/if}
			</figure>
		{/if}
		{#if quote_content}
			<figure class="flex gap-y-2 flex-col" itemscope itemtype="https://schema.org/Quotation">
				<blockquote class="italic font-serif text-xl" lang={language.key}>
					{#if language.key === 'de'}„{quote_content}“{:else}“{quote_content}”{/if}
				</blockquote>
				{#if quote_author}
					<figcaption class="place-self-end">
						— <span itemprop="author" itemscope itemtype="https://schema.org/Person"
							>{quote_author}<span></span></span
						>
					</figcaption>
				{/if}
			</figure>
		{/if}
		{#if content}
			<div itemprop="description">
				{@html content}
			</div>
		{/if}
	</main>
</article>
