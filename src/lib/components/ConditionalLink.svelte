<script lang="ts">
	import { getContext } from 'svelte';
	import { getAbsoluteURL } from '$utils/url';

	const {
		slug,
		children,
		isSingle = false
	}: { slug: string; isSingle: boolean; children: Snippet } = $props();

	const isModeLight = getContext('isModeLight');
</script>

{#if isSingle}
	{@render children()}
{:else}
	<a
		title={slug}
		href={getAbsoluteURL(slug, isModeLight)}
		class="transition-colors hover:text-accent"
		itemprop="url"
	>
		{@render children()}
	</a>
{/if}
