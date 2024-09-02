<script lang="ts">
	import { getPagination } from '$utils/posts';
	import { getAbsoluteURL } from '$utils/url';
	import { getContext } from 'svelte';

	type Props = {
		currentIndex: number;
		posts_count: number;
	};

	const { currentIndex, posts_count }: Props = $props();
	const { count, list, prev, next } = $derived(getPagination(posts_count, currentIndex));
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

<nav class="flex justify-center text-sm gap-x-3">
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
</nav>
