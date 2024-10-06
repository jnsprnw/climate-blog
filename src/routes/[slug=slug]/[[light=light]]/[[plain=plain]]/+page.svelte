<script lang="ts">
	import PostSingle from '$lib/components/PostSingle.svelte';
	import { type Post } from '$types/pocketbase';
	import { createBlogPostingSchema, serializeSchema } from '$utils/json-ld';

	type Props = {
		post: Post;
	};

	const { data }: { data: Props } = $props();
</script>

<svelte:head>
	{@html serializeSchema(createBlogPostingSchema(data.post))}
</svelte:head>

<PostSingle post={data.post} isSingle={true} />
