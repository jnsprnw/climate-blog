<script lang="ts">
	import Favorite from '$lib/icons/Favorite.svelte';
	import Link from '$lib/icons/Link.svelte';
	import Authors from '$lib/components/Authors.svelte';
	import { formatDate } from '$utils/format';
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
		title,
		published,
		publisher,
		url
	} = post;
</script>

<article
	class="grid grid-cols-3"
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
				class="mb-2 text-3xl leading-tight md:text-4xl lg:text-5xl text-balance"
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
					itemprop="contentUrl"
					style={`aspect-ratio: ${image.width} / ${image.height};`}
					class="w-full bg-gray-50 text-xs text-gray-400"
					src={image.sizes[1]?.[1] ?? image.sizes[0]?.[1]}
					alt={title}
					srcset={image.sizes.map(([px, url]) => `${url} ${px}w`).join(',')}
					sizes="(max-width: 48rem) 100vw, 48rem"
					loading="lazy"
					decoding="async"
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
	<footer class="grid grid-cols-3 leading-none justify-between w-full col-span-3 text-sm">
		<time class="text-neutral-400 text-left" datetime={published}
			>{formatDate(new Date(published))}</time
		>
		{#if post.reference?.label}
			<span class="text-center"
				>Via <a class="link" href={post.reference_link}>{post.reference.label}</a></span
			>
		{/if}
		<span class="text-right col-start-3">
			<a
				class="inline-flex items-center underline decoration-accent font-semibold hover:text-accent"
				href={url}
			>
				<span itemprop="publisher">{publisher?.label ?? 'Visit'}</span>
				<Link />
			</a>
		</span>
	</footer>
</article>
