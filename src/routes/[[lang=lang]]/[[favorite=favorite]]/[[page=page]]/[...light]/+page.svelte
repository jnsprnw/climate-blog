<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { type Post } from '$types/pocketbase';

	type Props = {
		posts: Post[];
		posts_total: number;
		page_current: number;
		filter: string;
		preconnectImage: boolean;
	};

	const { data }: { data: Props } = $props();

	const isFiltered = $derived(typeof data.filter === 'string');
</script>

<main
	class="flex flex-col gap-y-12 sm:gap-y-18 md:gap-y-24"
	class:-mt-12={isFiltered}
	class:sm:-mt-16={isFiltered}
	class:md:-mt-24={isFiltered}
>
	{#if isFiltered}
		<span class="text-sm">{data.filter}</span>
	{/if}
	{#if data.posts.length}
		<PostList posts={data.posts} />
		<Pagination currentIndex={data.page_current} posts_total={data.posts_total} />
	{:else}
		<p class="text-center font-semibold">
			There are currently no posts present for this combination of filter.
		</p>
	{/if}
</main>
