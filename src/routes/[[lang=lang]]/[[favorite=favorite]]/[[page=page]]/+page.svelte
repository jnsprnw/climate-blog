<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { type Post } from '$types/pocketbase';

	type Props = {
		posts: Post[];
		posts_count: number;
		page_current: number;
	};

	const { data }: { data: Props } = $props();
</script>

<main class="flex flex-col gap-y-12 sm:gap-y-18 md:gap-y-24">
	<PostList posts={data.posts} />
	<Pagination currentIndex={data.page_current} posts_count={data.posts_count} />
</main>
