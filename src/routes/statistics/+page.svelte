<script lang="ts">
	import type { TagCombination, TagCount } from '$utils/statistics';

	type Props = {
		tags: TagCount[];
		combinations: TagCombination[];
	};

	const { data }: { data: Props } = $props();
	const { tags, combinations } = $derived(data);
</script>

<h1 class="font-semibold text-2xl">Statistics</h1>

<div class="flex flex-row gap-4">
	<section>
		<h2 class="text-2xl">Tags</h2>
		<table>
			<tbody>
				{#each tags as { slug, label, count }}
					<tr>
						<td>
							{label}
						</td>
						<td class="text-right">
							{count}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<ul>
		{#each combinations as { labels, count, slugs }}
			<li>
				<a href={`/tags/${slugs.join('+')}`}>{labels.join(', ')} ({count})</a>
			</li>
		{/each}
	</ul>
</div>
