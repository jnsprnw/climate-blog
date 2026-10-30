<script lang="ts">
	import { KEY_ALL_POSTS } from '#config';
	import PageLink from '#lib/components/PageLink.svelte';
	import { getIsModeLight } from '#lib/context.ts';
	import { getPagination, type PageNumber } from '#utils/posts';
	import { getAbsoluteURL } from '#utils/url';

	type Props = {
		currentIndex: PageNumber;
		posts_total: number;
		basePath?: string;
	};

	const { currentIndex, posts_total, basePath = '' }: Props = $props();
	const pagination = $derived(getPagination(posts_total, currentIndex, basePath));
	const isModeLight = getIsModeLight();
	const isAll = $derived(currentIndex === KEY_ALL_POSTS);
</script>

<svelte:head>
	<link rel="first" href={getAbsoluteURL(pagination.first, isModeLight())} />
	<link rel="last" href={getAbsoluteURL(pagination.last, isModeLight())} />
	{#if pagination.prev !== undefined}
		<link rel="prev" href={getAbsoluteURL(pagination.prev, isModeLight())} />
	{/if}
	{#if pagination.next !== undefined}
		<link rel="next" href={getAbsoluteURL(pagination.next, isModeLight())} />
	{/if}
</svelte:head>

{#if pagination.count > 1}
	<nav class="flex flex-wrap justify-center text-sm gap-x-3">
		{#each pagination.list as { label, path, isCurrent, isPrev, isNext } (label)}
			{#if isCurrent}
				<a
					href={getAbsoluteURL(path, isModeLight())}
					class="text-mute dark:text-gray-300 p-2"
					aria-current="page"
				>
					{label}
				</a>
			{:else}
				<PageLink class="p-2" {path} {label} {isPrev} {isNext} isModeLight={isModeLight()} />
			{/if}
		{/each}
		<a
			class="p-2 basis-full text-center"
			class:text-mute={isAll}
			class:dark:text-gray-300={isAll}
			class:link={!isAll}
			aria-current={isAll ? 'page' : undefined}
			href={getAbsoluteURL(pagination.all, isModeLight())}
		>
			View all {posts_total} posts on a single page
		</a>
	</nav>
{/if}
