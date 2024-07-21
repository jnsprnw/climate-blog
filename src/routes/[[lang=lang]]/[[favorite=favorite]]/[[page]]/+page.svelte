<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import { type Post } from '$types/pocketbase';

	type Props = {
		posts: Post[];
	};

	const { data }: { data: Props } = $props();
</script>

<PostList posts={data.posts} />
