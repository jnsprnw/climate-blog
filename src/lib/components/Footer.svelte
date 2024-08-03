<script lang="ts">
	import { formatDate, formatDateFull } from '$utils/format';
	import { getAbsoluteURL } from '$utils/url';
	const { buildDateTime, version }: { buildDateTime: Date; version: string } = $props();
</script>

<footer class="flex justify-between mb-12 text-sm mt-16 border-t-2 border-slate-900 pt-16">
	<time title={formatDateFull(buildDateTime)} datetime={buildDateTime.toISOString()}>
		Updated {formatDate(buildDateTime, true)}
	</time>
	<span>Version {version}</span>
	<a class="link" href={getAbsoluteURL('about')}>About</a>
</footer>
