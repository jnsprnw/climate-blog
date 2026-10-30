<script lang="ts">
	import PostSingle from '#lib/components/PostSingle.svelte';
	import { createBlogPostingSchema, serializeSchema } from '#utils/json-ld';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- serialized and escaped JSON-LD -->
	{@html serializeSchema(createBlogPostingSchema(data.post))}
</svelte:head>

<PostSingle post={data.post} isSingle={true} />
