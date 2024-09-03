<script lang="ts">
	import { formatDate, formatDateFull } from '$utils/format';
	import { getAbsoluteURL } from '$utils/url';
	import { getContext } from 'svelte';
	const {
		buildDateTime,
		version,
		currentPath
	}: { buildDateTime: Date; version: string; currentPath: string } = $props();

	const isLightMode = getContext('isLightMode');
</script>

<footer
	class="flex justify-between mb-6 sm:mb-8 md:mb-12 text-sm mt-6 sm:mt-12 md:mt-16 border-t-2 border-dark pt-6 sm:pt-12 md:pt-16"
>
	<time title={formatDateFull(buildDateTime)} datetime={buildDateTime.toISOString()}>
		Updated {formatDate(buildDateTime, true)}
	</time>
	{#if isLightMode}
		<a href={getAbsoluteURL(currentPath, false)} class="link">Non-light mode</a>
	{:else}
		<a href={getAbsoluteURL(currentPath, true)} class="link">Light mode</a>
	{/if}
	<span>v {version}</span>
	<a class="link" href={getAbsoluteURL('about', isLightMode)}>About</a>
</footer>
