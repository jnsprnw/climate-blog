<script lang="ts">
	import { getPagination } from '$utils/posts';
	import { getAbsoluteURL } from '$utils/url';
	import { getContext } from 'svelte';
	import { KEY_ALL_POSTS } from '$config';
	import type { IsModeLight } from '$types/ui';

	type Props = {
		currentIndex: number | string;
		posts_total: number;
	};

	const { currentIndex, posts_total }: Props = $props();
	const { count, list, prev, next } = $derived(getPagination(posts_total, currentIndex));
	const isModeLight = getContext<IsModeLight>('isModeLight');
</script>

<svelte:head>
	<link rel="first" href={getAbsoluteURL('', isModeLight)} />
	<link rel="last" href={getAbsoluteURL(String(count), isModeLight)} />
	{#if prev}
		<link rel="prev" href={getAbsoluteURL(String(prev), isModeLight)} />
	{/if}
	{#if next}
		<link rel="next" href={getAbsoluteURL(String(next), isModeLight)} />
	{/if}
</svelte:head>

{#if count > 1}
	<nav class="flex flex-wrap justify-center text-sm gap-x-3">
		{#each list as { label, path, isCurrent, isPrev, isNext }}
			{#if isCurrent}
				<a
					href={getAbsoluteURL(path, isModeLight)}
					class="text-mute dark:text-gray-300 p-2"
					aria-current="page"
				>
					{label}
				</a>
			{:else}
				<a
					class="link p-2"
					class:link-preload={isNext}
					href={getAbsoluteURL(path, isModeLight)}
					rel={isPrev ? 'prev' : isNext ? 'next' : undefined}>{label}</a
				>
			{/if}
		{/each}
		<a
			class="p-2 basis-full text-center"
			class:text-mute={currentIndex === KEY_ALL_POSTS}
			class:dark:text-gray-300={currentIndex === KEY_ALL_POSTS}
			class:link={currentIndex !== KEY_ALL_POSTS}
			aria-current={currentIndex === KEY_ALL_POSTS ? 'page' : undefined}
			href={getAbsoluteURL(KEY_ALL_POSTS, isModeLight)}
		>
			View all {posts_total} posts on a single page
		</a>
	</nav>
{/if}
