<script lang="ts">
	import type { Snippet } from 'svelte';

	const { title, table, count }: { title: string; table: Snippet; count: number } = $props();
</script>

<section>
	<header class="flex flex-row justify-between items-end gap-x-3">
		<h3 class="text-2xl font-semibold">{title}</h3>
		<p class="text-sm text-gray-500">{count}</p>
	</header>
	{@render table()}
</section>
