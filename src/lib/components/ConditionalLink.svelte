<script lang="ts">
	import { getContext } from 'svelte';
	import { getAbsoluteURL } from '$utils/url';
	import type { Snippet } from 'svelte';
	import type { IsModeLight } from '$types/ui';

	const {
		slug,
		children,
		isSingle = false
	}: { slug: string; isSingle: boolean; children: Snippet } = $props();

	const isModeLight = getContext<IsModeLight>('isModeLight');
</script>

{#if isSingle}
	{@render children()}
{:else}
	<a
		href={getAbsoluteURL(slug, isModeLight)}
		class="transition-colors hover:text-accent"
		itemprop="url"
	>
		{@render children()}
	</a>
{/if}
