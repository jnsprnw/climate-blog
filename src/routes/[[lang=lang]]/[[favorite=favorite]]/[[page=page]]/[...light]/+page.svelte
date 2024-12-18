<script lang="ts">
	import { getContext } from 'svelte';
	import PostList from '$lib/components/PostList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import PageLink from '$lib/components/PageLink.svelte';
	import type { IsModeLight } from '$types/ui';
	import type { PostsRecord } from '$types/pocketbase-types';

	const isModeLight = getContext<IsModeLight>('isModeLight');

	type Props = {
		posts: PostsRecord[];
		posts_total: number;
		page_current: number;
		filter: string;
		preconnectImage: boolean;
		nextPage: number | undefined;
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
		<div class="flex justify-between items-start text-sm">
			<span>{data.filter}</span>
			{#if data.nextPage}
				<PageLink path={String(data.nextPage)} isNext={true} {isModeLight} label="Next page" />
			{/if}
		</div>
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
