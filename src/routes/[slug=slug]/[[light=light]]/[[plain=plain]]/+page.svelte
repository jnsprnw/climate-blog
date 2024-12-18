<script lang="ts">
	import PostSingle from '$lib/components/PostSingle.svelte';
	import type { PostsRecord } from '$types/pocketbase-types';
	import { createBlogPostingSchema, serializeSchema } from '$utils/json-ld';

	type Props = {
		post: PostsRecord;
	};

	const { data }: { data: Props } = $props();
</script>

<svelte:head>
	{@html serializeSchema(createBlogPostingSchema(data.post))}
</svelte:head>

<PostSingle post={data.post} isSingle={true} />
