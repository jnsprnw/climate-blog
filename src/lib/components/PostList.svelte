<script lang="ts">
	import PostSingle from '$lib/components/PostSingle.svelte';
	import type { PostsRecord } from '$types/pocketbase-types';

	const { posts }: { posts: PostsRecord[] } = $props();
</script>

{#each posts as post, i (post.id)}
	<PostSingle {post} isFirst={i === 0} />
	{#if i !== posts.length - 1}<hr class="h-0.5 bg-accent border-0" />{/if}
{/each}
