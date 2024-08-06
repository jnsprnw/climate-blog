<script lang="ts">
	import { formatDate, formatDateFull } from '$utils/format';
	import { getAbsoluteURL } from '$utils/url';
	const { buildDateTime, version }: { buildDateTime: Date; version: string } = $props();
</script>

<footer
	class="flex justify-between mb-6 sm:mb-8 md:mb-12 text-sm mt-6 sm:mt-12 md:mt-16 border-t-2 border-dark pt-6 sm:pt-12 md:pt-16"
>
	<time title={formatDateFull(buildDateTime)} datetime={buildDateTime.toISOString()}>
		Updated {formatDate(buildDateTime, true)}
	</time>
	<span>Version {version}</span>
	<a class="link" href={getAbsoluteURL('about')}>About</a>
</footer>
