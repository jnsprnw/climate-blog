<script lang="ts">
	import { type Post } from '$types/pocketbase';

	const { posts }: { posts: Post[] } = $props();
</script>

{#each posts as { title, id, language } (id)}
	<h1>{title}</h1>
	<small>{language.label}</small>
{/each}
