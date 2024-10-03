<script lang="ts">
	import { getPagination } from '$utils/posts';
	import { getAbsoluteURL } from '$utils/url';
	import { getContext } from 'svelte';
	import { KEY_ALL_POSTS } from '$config';

	type Props = {
		currentIndex: number | string;
		posts_total: number;
	};

	const { currentIndex, posts_total }: Props = $props();
	const { count, list, prev, next } = $derived(getPagination(posts_total, currentIndex));
	const isLightMode = getContext('isLightMode');
</script>

<svelte:head>
	<link rel="first" href={getAbsoluteURL('', isLightMode)} />
	<link rel="last" href={getAbsoluteURL(String(count), isLightMode)} />
	{#if prev}
		<link rel="prev" href={getAbsoluteURL(String(prev), isLightMode)} />
	{/if}
	{#if next}
		<link rel="next" href={getAbsoluteURL(String(next), isLightMode)} />
	{/if}
</svelte:head>

{#if count > 1}
	<nav class="flex flex-wrap justify-center text-sm gap-x-3">
		{#each list as { label, path, isCurrent, isPrev, isNext }}
			{#if isCurrent}
				<a href={getAbsoluteURL(path, isLightMode)} class="text-mute p-2" aria-current="page"
					>{label}</a
				>
			{:else}
				<a
					class="link p-2"
					href={getAbsoluteURL(path, isLightMode)}
					rel={isPrev ? 'prev' : isNext ? 'next' : undefined}>{label}</a
				>
			{/if}
		{/each}
		<a
			class="p-2 basis-full text-center"
			class:text-mute={currentIndex === KEY_ALL_POSTS}
			class:link={currentIndex !== KEY_ALL_POSTS}
			aria-current={currentIndex === KEY_ALL_POSTS ? 'page' : undefined}
			href={getAbsoluteURL(KEY_ALL_POSTS, isLightMode)}>View all posts on a single page</a
		>
	</nav>
{/if}
