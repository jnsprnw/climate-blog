<script lang="ts">
	import { type Post } from '$types/pocketbase';

	const { posts }: { posts: Post[] } = $props();
</script>

{#each posts as { title, id, language, image } (id)}
	<h1>{title}</h1>
	{#if image}
		<figure>
			<img
				style="width: 300px; height: auto;"
				src={image.url}
				width={image.width}
				height={image.height}
				alt={title}
			/>
			{#if image.caption}
				<figcaption>{image.caption}</figcaption>
			{/if}
		</figure>
	{/if}
	<small>{language.label}</small>
{/each}
