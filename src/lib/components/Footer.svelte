<script lang="ts">
	import { formatDate, formatDateFull } from '$utils/format';
	const { buildDateTime }: { buildDateTime: Date } = $props();
</script>

<footer class="grid grid-cols-2 mb-12 text-sm">
	<time title={formatDateFull(buildDateTime)} datetime={buildDateTime.toISOString()}>
		Updated {formatDate(buildDateTime)}
	</time>
	<a class="text-sm text-right link" href="https://jonasparnow.com" rel="me"> jonasparnow.com </a>
</footer>
