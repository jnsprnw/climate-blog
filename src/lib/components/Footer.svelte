<script lang="ts">
	import { formatDate, formatDateFull } from '$utils/format';
	import { getAbsoluteURL, getRelativeURL } from '$utils/url';
	import type { IsModeLight } from '$types/types';

	const {
		buildDateTime,
		version,
		currentPath,
		isModeLight
	}: { buildDateTime: Date; version: string; currentPath: string; isModeLight: IsModeLight } =
		$props();
</script>

<footer
	class="flex justify-between mb-6 sm:mb-8 md:mb-12 text-sm mt-6 sm:mt-12 md:mt-16 border-t-2 border-dark pt-6 sm:pt-12 md:pt-16"
>
	<time title={formatDateFull(buildDateTime)} datetime={buildDateTime.toISOString()}>
		Updated {formatDate(buildDateTime, true)}
	</time>
	{#if isModeLight}
		<a href={getRelativeURL(currentPath, false)} class="link">Display images</a>
	{:else}
		<a href={getRelativeURL(currentPath, true)} class="link">Hide images</a>
	{/if}
	<span>v {version}</span>
	<a class="link" href={getAbsoluteURL('about', isModeLight)}>About</a>
</footer>
