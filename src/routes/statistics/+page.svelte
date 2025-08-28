<script lang="ts">
	import type { TagCombination, TagCount } from '$utils/statistics';

	type Props = {
		tags: TagCount[];
		combinations: TagCombination[];
	};

	const { data }: { data: Props } = $props();
	const { tags, combinations } = $derived(data);
</script>

<ul>
	{#each tags as { slug, label, count }}
		<li>
			<a href={`/tags/${slug}`}>{label} ({count})</a>
		</li>
	{/each}
</ul>

<ul>
	{#each combinations as { labels, count, slugs }}
		<li>
			<a href={`/tags/${slugs.join('+')}`}>{labels.join(', ')} ({count})</a>
		</li>
	{/each}
</ul>
