<script lang="ts">
	import PostSingle from '$lib/components/PostSingle.svelte';
	import { type Post } from '$types/pocketbase';

	type Props = {
		post: Post;
	};

	const { data }: { data: Props } = $props();
</script>

<PostSingle post={data.post} isSingle={true} />
