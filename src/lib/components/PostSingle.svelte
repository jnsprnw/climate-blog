<script lang="ts">
	import Favorite from '$lib/icons/Favorite.svelte';
	import Link from '$lib/icons/Link.svelte';
	import Authors from '$lib/components/Authors.svelte';
	import DateTag from '$lib/components/Date.svelte';
	import { formatDate } from '$utils/format';
	import type { PostsRecord } from '$types/pocketbase-types';
	import { getAbsoluteURL } from '$utils/url';
	import { isSameDay, checkValidDate } from '$utils/date';
	import { getContext } from 'svelte';
	import ConditionalLink from '$lib/components/ConditionalLink.svelte';
	import type { IsModeLight } from '$types/ui';

	const isModeLight = getContext<IsModeLight>('isModeLight');

	const {
		post,
		isSingle = false,
		isFirst = false
	}: { post: PostsRecord; isSingle?: boolean; isFirst?: boolean } = $props();

	const {
		authors,
		content,
		formats,
		image,
		image_alt,
		isFavorite,
		language,
		quote_author,
		quote_content,
		schemas,
		slug,
		title,
		publisher,
		url,
		reference,
		related
	} = post;
	const hasReference = $derived(typeof reference !== 'undefined');

	const formatterList = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<article
	class="grid grid-cols-3 gap-y-6"
	itemscope
	itemtype={`https://schema.org/${schemas.key}`}
	id={slug}
>
	<meta itemprop="inLanguage" content={language.key} />
	<header class="col-span-3">
		<div class="flex justify-between">
			<span
				class="col-span-3 pb-2 text-xs font-semibold uppercase tracking-wider text-accent"
				lang="en-GB"
				id="formats"
			>
				{formats.at(0).label}
			</span>
			{#if isFavorite}
				<Favorite />
			{/if}
		</div>
		<ConditionalLink {slug} {isSingle}>
			<h1
				class="mb-2 text-3xl leading-tight md:text-4xl lg:text-5xl text-balance"
				itemprop="name"
				lang={language.key}
				id="title"
			>
				{title}
			</h1>

			<span class="text-sm leading-tight">
				<span>By</span>
				{#if authors.length}
					<Authors authors={authors.map((author) => author.label)} lang={language.key} />
				{:else}
					unknown author
				{/if}
			</span>
		</ConditionalLink>
	</header>
	<main class="col-span-3 border-y border-border py-6 flex flex-col gap-y-8">
		{#if image}
			<figure class="flex flex-col gap-y-1" itemscope itemtype="https://schema.org/ImageObject">
				{#if isModeLight}
					<div
						class="flex flex-col gap-y-6 items-center border border-border rounded-sm bg-gray-50 py-6 px-4"
					>
						<span class="text-gray-500 text-center text-balance"
							>You are browsing in data-saving mode, where images are disabled.</span
						>
						{#if image.alt}
							<span class="text-center text-balance">{image.alt}</span>
						{/if}
						<a class="link" href={image.sizes[1]?.[1] ?? image.sizes[0]?.[1]}
							>Click to open the image</a
						>
					</div>
				{:else}
					<img
						itemprop="contentUrl"
						style={`aspect-ratio: ${image.width} / ${image.height};`}
						class="w-full bg-gray-50 text-xs text-gray-400"
						src={image.sizes[1]?.[1] ?? image.sizes[0]?.[1]}
						srcset={image.sizes.map(([px, url]) => `${url} ${px}w`).join(',')}
						sizes="(max-width: 48rem) 100vw, 48rem"
						loading={isFirst || isSingle ? 'eager' : 'lazy'}
						decoding="async"
						alt={image.alt}
					/>
				{/if}
				{#if image.caption || (image.source_url && image.source_label)}
					<figcaption
						itemprop="author"
						class="text-xs place-self-end text-mute contrast-more:text-black"
					>
						{#if image.caption}
							{image.caption}{#if image.source_url && image.source_label}
								{', '}<a class="link" href={image.source_url}>{image.source_label}</a>
							{:else}
								{'. '}
							{/if}
						{/if}
					</figcaption>
				{/if}
			</figure>
		{/if}
		{#if post.comment}
			<div
				class="flex flex-col gap-y-6 items-center border border-border rounded-sm bg-gray-50 py-6 px-4"
			>
				<span class="text-gray-500 text-center text-balance">{post.comment}</span>
			</div>
		{/if}
		{#if quote_content}
			<figure class="flex gap-y-2 flex-col" itemscope itemtype="https://schema.org/Quotation">
				<blockquote class="italic font-serif text-xl flex gap-x-0.5" lang={language.key}>
					{#if language.key === 'de'}„{:else}“{/if}
					<span>
						{quote_content}{#if language.key === 'de'}“{:else}”{/if}
					</span>
				</blockquote>
				{#if quote_author}
					<figcaption class="place-self-end">
						— <span itemprop="author" itemscope itemtype="https://schema.org/Person">
							{quote_author}
						</span>
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
	<footer
		class="grid leading-tight justify-between w-full col-span-3 gap-x-2 text-sm"
		class:grid-cols-2={!hasReference}
		class:grid-cols-3={hasReference}
	>
		<time class="text-mute text-left contrast-more:text-black" datetime={post.published}
			>{formatDate(new Date(post.published), true)}</time
		>
		{#if hasReference}
			<span class="text-center"
				>Via <a class="link" href={post.reference_link}>{post.reference.label}</a></span
			>
		{/if}

		<a
			class="max-w-full place-self-end inline-flex items-center underline decoration-accent font-semibold hover:text-accent"
			href={url}
		>
			<span class="truncate" itemprop={publisher?.label ? 'publisher' : undefined}>
				{publisher?.label ?? 'Visit external page'}
			</span>
			<Link />
		</a>
	</footer>
	{#if isSingle}
		<aside class="text-sm col-span-3 my-12 flex flex-col gap-y-4">
			<section>
				<p>
					This post was published <DateTag date={post.published} />
					{#if !isSameDay(post.published, post.updated)}
						and last updated <DateTag date={post.updated} />{/if}. {#if checkValidDate(post.date)}
						The referenced artefact was (probably) published on
						<DateTag date={post.date} />{/if}.
				</p>
			</section>
			{#if post.topics.length}
				<section>
					<h2 class="font-semibold" id="topics">Topic{post.topics.length === 1 ? '' : 's'}</h2>
					<p>{formatterList.format(post.topics.map(({ label }) => label))}</p>
				</section>
			{/if}
			{#if post.formats.length}
				<section>
					<h2 class="font-semibold" id="formats">Format{post.formats.length === 1 ? '' : 's'}</h2>
					<p>{formatterList.format(post.formats.map(({ label }) => label))}</p>
				</section>
			{/if}
		</aside>
		<div class="col-span-3 text-base grid gap-y-4">
			<h2 class="font-semibold" id="related-artefacts">Related artefacts</h2>
			{#if related.tags}
				<dl class="flex gap-y-1 flex-col">
					<dt class="text-sm text-mute contrast-more:text-black">Same topics</dt>
					{#each related.tags as [title, slug]}
						<dd>
							<a class="link" href={getAbsoluteURL(slug, isModeLight)}>{title}</a>
						</dd>
					{/each}
				</dl>
			{/if}
			{#if related.authors.length}
				<dl class="flex gap-y-1 flex-col">
					<h4 class="text-sm text-mute contrast-more:text-black">Same authors</h4>
					{#each related.authors as [title, slug]}
						<dd>
							<a class="link" href={getAbsoluteURL(slug, isModeLight)}>{title}</a>
						</dd>
					{/each}
				</dl>
			{/if}
			{#if related.formats.length}
				<dl class="flex gap-y-1 flex-col">
					<dt class="text-sm text-mute contrast-more:text-black">Same formats</dt>
					{#each related.formats as [title, slug]}
						<dd>
							<a class="link" href={getAbsoluteURL(slug, isModeLight)}>{title}</a>
						</dd>
					{/each}
				</dl>
			{/if}
			{#if related.publisher.length}
				<dl class="flex gap-y-1 flex-col">
					<dt class="text-sm text-mute contrast-more:text-black">Same publisher</dt>
					{#each related.publisher as [title, slug]}
						<dd>
							<a class="link" href={getAbsoluteURL(slug, isModeLight)}>{title}</a>
						</dd>
					{/each}
				</dl>
			{/if}
		</div>
	{/if}
</article>
