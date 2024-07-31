<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { type Post } from '$types/pocketbase';

	type Props = {
		posts: Post[];
		posts_count: number;
	};

	const { data }: { data: Props } = $props();

	// const pages = $derived(getPages(data.posts_total, 5, data.page));
</script>

<PostList posts={data.posts} />
<Pagination currentIndex={'0'} posts_count={data.posts_count} />
