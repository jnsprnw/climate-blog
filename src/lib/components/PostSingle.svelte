<script lang="ts">
	import Favorite from '$lib/Icons/Favorite.svelte';
	import { type Post } from '$types/pocketbase';

	const { post, isSingle = false }: { post: Post; isSingle: boolean } = $props();

	const { title, image, language, slug, schemas, formats, isFavorite, content } = post;
</script>

<article
	class="mt-12 mb-16 grid grid-cols-3 border-b-2 border-slate-700 pb-16 dark:border-neutral-700 md:mb-24 md:pb-24"
	itemscope
	itemtype={`https://schema.org/${schemas}`}
	id={slug}
	role={isSingle ? '' : 'listitem'}
	lang={language.key}
>
	<meta itemprop="inLanguage" content={language.key} />
	<header class="col-span-3">
		<div class="flex justify-between">
			<span
				class="col-span-3 pb-2 text-xs font-semibold uppercase tracking-wider text-accent"
				lang="en-GB"
			>
				{formats}
			</span>
			{#if isFavorite}
				<Favorite />
			{/if}
		</div>
		<a href={`/${slug}`} class="transition-colors hover:text-accent" itemprop="url">
			<h1 class="mb-2 text-3xl leading-tight md:text-4xl lg:text-5xl" itemprop="name">
				{title}
			</h1>
			<span class="text-sm">
				<!--<Authors authors={authors.map((author) => author.label)} lang={language.key} />-->
			</span>
		</a>
	</header>
	<main class="col-span-3 my-6 border-y border-slate-200 py-6 dark:border-neutral-700">
		{#if post.image}
			<figure>
				<img
					style="width: 300px; height: auto;"
					src={post.image.url}
					width={post.image.width}
					height={post.image.height}
					alt={post.title}
				/>
				{#if post.image.caption}
					<figcaption>{post.image.caption}</figcaption>
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
