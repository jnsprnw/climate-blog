<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getIsModeLight } from '#lib/context.ts';
	import { getAbsoluteURL } from '#utils/url';

	const {
		slug,
		children,
		isSingle = false
	}: { slug: string; isSingle?: boolean; children: Snippet } = $props();

	const isModeLight = getIsModeLight();
</script>

{#if isSingle}
	{@render children()}
{:else}
	<a
		href={getAbsoluteURL(slug, isModeLight())}
		class="transition-colors hover:text-accent"
		itemprop="url"
	>
		{@render children()}
	</a>
{/if}
