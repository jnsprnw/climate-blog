<script lang="ts">
	import { getPagination } from '$utils/posts';
	import { getAbsoluteURL } from '$utils/url';
	type Props = {
		currentIndex: number;
		posts_count: number;
	};

	const { currentIndex, posts_count }: Props = $props();
	const { count, list, prev, next } = $derived(getPagination(posts_count, currentIndex));
</script>

<svelte:head>
	<link rel="first" href={getAbsoluteURL()} />
	<link rel="last" href={getAbsoluteURL(String(count))} />
	{#if prev}
		<link rel="prev" href={getAbsoluteURL(String(prev))} />
	{/if}
	{#if next}
		<link rel="next" href={getAbsoluteURL(String(next))} />
	{/if}
</svelte:head>

<nav class="flex justify-center text-sm gap-x-3">
	{#each list as { label, path, isCurrent, isPrev, isNext }}
		{#if isCurrent}
			<a href="/{path}" class="text-slate-400 p-2" aria-current="page">{label}</a>
		{:else}
			<a class="link p-2" href="/{path}" rel={isPrev ? 'prev' : isNext ? 'next' : undefined}
				>{label}</a
			>
		{/if}
	{/each}
</nav>
