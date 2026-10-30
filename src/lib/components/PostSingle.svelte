<script lang="ts">
	import Authors from '#lib/components/Authors.svelte';
	import ConditionalLink from '#lib/components/ConditionalLink.svelte';
	import DateTag from '#lib/components/Date.svelte';
	import Favorite from '#lib/icons/Favorite.svelte';
	import Link from '#lib/icons/Link.svelte';
	import { getIsModeLight } from '#lib/context.ts';
	import type { Post } from '#types/post';
	import { checkValidDate, isSameDay } from '#utils/date';
	import { formatDate } from '#utils/format';
	import { getDimensionLabel } from '#utils/posts';
	import { getAbsoluteURL } from '#utils/url';

	const isModeLight = getIsModeLight();

	const {
		post,
		isSingle = false,
		isFirst = false
	}: { post: Post; isSingle?: boolean; isFirst?: boolean } = $props();

	const {
		authors,
		content,
		formats,
		image,
		isFavorite,
		language,
		quote_author,
		quote_content,
		quote_source_url,
		quote_source_label,
		schemas,
		slug,
		title,
		publisher,
		url,
		reference,
		reference_link,
		related,
		relationships
	} = $derived(post);
	const imageSrc = $derived(image ? (image.sizes[1]?.[1] ?? image.sizes[0]?.[1]) : undefined);

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
			>
				{formats[0]?.label}
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
	<main class="col-span-3 border-y border-border dark:border-[#99999A] py-6 flex flex-col gap-y-8">
		{#if image}
			<figure class="flex flex-col gap-y-1" itemscope itemtype="https://schema.org/ImageObject">
				{#if isModeLight()}
					<div
						class="flex flex-col gap-y-6 items-center border border-border rounded-xs bg-gray-50 py-6 px-4"
					>
						<span class="text-gray-500 text-center text-balance"
							>You are browsing in data-saving mode, where images are disabled.</span
						>
						{#if image.alt}
							<span class="text-center text-balance">{image.alt}</span>
						{/if}
						<a class="link" href={imageSrc}>Click to open the image</a>
					</div>
				{:else}
					<img
						itemprop="contentUrl"
						style={`aspect-ratio: ${image.width} / ${image.height};`}
						class="w-full bg-gray-50 text-xs text-gray-400"
						src={imageSrc}
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
						class="text-xs place-self-end text-mute dark:text-gray-300 contrast-more:text-black"
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
				class="flex flex-col gap-y-6 items-center border border-border rounded-xs bg-gray-50 py-6 px-4"
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
						</span>{#if quote_source_url && quote_source_label}
							{', '}<cite class="not-italic">
								<a class="link" href={quote_source_url}>{quote_source_label}</a>
							</cite>
						{/if}
					</figcaption>
				{/if}
			</figure>
		{/if}
		{#if content}
			<div itemprop="description">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted HTML from the own CMS -->
				{@html content}
			</div>
		{/if}
	</main>
	<footer
		class="grid leading-tight justify-between w-full col-span-3 gap-x-2 text-sm"
		class:grid-cols-2={!reference}
		class:grid-cols-3={!!reference}
	>
		<time
			class="text-mute dark:text-gray-300 text-left contrast-more:text-black"
			datetime={post.published}>{formatDate(new Date(post.published), true)}</time
		>
		{#if reference}
			<span class="text-center"
				>Via <a class="link" href={reference_link}>{reference.label}</a></span
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
						and last updated <DateTag date={post.updated} />{/if}.
					{#if checkValidDate(post.date)}
						The referenced artefact was (probably) published on
						<DateTag date={post.date} />.
					{/if}
				</p>
			</section>
			{#if post.topics.length}
				<section>
					<h2 class="font-semibold" id="topics">Topic{post.topics.length === 1 ? '' : 's'}</h2>
					<p>
						{formatterList.format(
							post.topics
								.map(({ label }) => label)
								.sort((a: string, b: string) => a.localeCompare(b))
						)}
					</p>
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
			<ul class="flex gap-y-2 flex-col">
				{#each relationships as { title, slug, relationships: edges } (slug)}
					<li>
						<a class="link" href={getAbsoluteURL(slug, isModeLight())}>{title}</a>
						<ul class="text-xs flex flex-col gap-y-0">
							{#each edges as [key, items] (key)}
								{#if items.length > 0}
									<li>
										Same {getDimensionLabel(key, items.length)}: {formatterList.format(
											items.map(({ label }) => label).sort()
										)}
									</li>
								{/if}
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
			{#if related.tags.length}
				<dl class="flex gap-y-1 flex-col">
					<dt class="text-sm text-mute dark:text-gray-300 contrast-more:text-black">Same topics</dt>
					{#each related.tags as [title, slug] (slug)}
						<dd>
							<a class="link" href={getAbsoluteURL(slug, isModeLight())}>{title}</a>
						</dd>
					{/each}
				</dl>
			{/if}
			{#if related.authors.length}
				<dl class="flex gap-y-1 flex-col">
					<dt class="text-sm text-mute dark:text-gray-300 contrast-more:text-black">
						Same authors
					</dt>
					{#each related.authors as [title, slug] (slug)}
						<dd>
							<a class="link" href={getAbsoluteURL(slug, isModeLight())}>{title}</a>
						</dd>
					{/each}
				</dl>
			{/if}
			{#if related.formats.length}
				<dl class="flex gap-y-1 flex-col">
					<dt class="text-sm text-mute dark:text-gray-300 contrast-more:text-black">
						Same formats
					</dt>
					{#each related.formats as [title, slug] (slug)}
						<dd>
							<a class="link" href={getAbsoluteURL(slug, isModeLight())}>{title}</a>
						</dd>
					{/each}
				</dl>
			{/if}
			{#if related.publisher.length}
				<dl class="flex gap-y-1 flex-col">
					<dt class="text-sm text-mute dark:text-gray-300 contrast-more:text-black">
						Same publisher
					</dt>
					{#each related.publisher as [title, slug] (slug)}
						<dd>
							<a class="link" href={getAbsoluteURL(slug, isModeLight())}>{title}</a>
						</dd>
					{/each}
				</dl>
			{/if}
		</div>
	{/if}
</article>
