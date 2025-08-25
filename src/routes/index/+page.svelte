<script lang="ts">
	type Props = {
		tags: any;
	};

	const { data }: { data: Props } = $props();
</script>

<ul>
	{#each data.tags as [slug, { label, count }]}
		<li>
			<a href={`/tags/${slug}`}>{label} ({count})</a>
		</li>
	{/each}
</ul>
