<script lang="ts">
	import type { PropertyCount, TagCombination } from '$utils/statistics';

	const { arr }: { arr: PropertyCount[] | TagCombination[] } = $props();
</script>

<table class="w-full">
	<tbody>
		{#each arr as { labels, label, count }}
			<tr>
				<td>
					{labels ? labels.join(', ') : label}
				</td>
				<td class="text-right">
					{count}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
