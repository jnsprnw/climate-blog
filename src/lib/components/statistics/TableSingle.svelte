<script lang="ts">
	import type { PropertyCount, TagCombination } from '#utils/statistics';

	const { arr }: { arr: (PropertyCount | TagCombination)[] } = $props();
</script>

<table class="w-full">
	<tbody>
		{#each arr as row ('slug' in row ? row.slug : row.slugs.join(','))}
			<tr>
				<td>
					{'labels' in row ? row.labels.join(', ') : row.label}
				</td>
				<td class="text-right">
					{row.count}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
