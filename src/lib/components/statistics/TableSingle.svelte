<script lang="ts">
	import type { PropertyCount } from '$utils/statistics';

	const { arr }: { arr: PropertyCount[] } = $props();
</script>

<table class="w-full">
	<tbody>
		{#each arr as { label, count }}
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
