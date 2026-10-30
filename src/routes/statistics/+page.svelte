<script lang="ts">
	import Category from '#lib/components/statistics/Category.svelte';
	import TableSingle from '#lib/components/statistics/TableSingle.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { tags, combinations, formats, publishers, authors } = $derived(data);
</script>

<h1 class="font-semibold text-2xl">Statistics</h1>

<div class="flex flex-row gap-4 justify-between">
	<Category title="Tags" count={tags.length}>
		{#snippet table()}
			<TableSingle arr={tags} />
		{/snippet}
	</Category>

	<Category title="Tag Combinations" count={combinations.length}>
		{#snippet table()}
			<TableSingle arr={combinations} />
		{/snippet}
	</Category>

	<Category title="Formats" count={formats.length}>
		{#snippet table()}
			<TableSingle arr={formats} />
		{/snippet}
	</Category>

	<Category title="Publishers" count={publishers.length}>
		{#snippet table()}
			<TableSingle arr={publishers} />
		{/snippet}
	</Category>

	<Category title="Authors" count={authors.length}>
		{#snippet table()}
			<TableSingle arr={authors} />
		{/snippet}
	</Category>
</div>
