<script lang="ts">
	type Props = {
		tags: any;
		combinations: any;
	};

	const { data }: { data: Props } = $props();
</script>

<ul>
	{#each data.tags as { slug, label, count }}
		<li>
			<a href={`/tags/${slug}`}>{label} ({count})</a>
		</li>
	{/each}
</ul>

<ul>
	{#each data.combinations as { labels, count, slugs }}
		<li>
			<a href={`/tags/${slugs.join('+')}`}>{labels.join(', ')} ({count})</a>
		</li>
	{/each}
</ul>
