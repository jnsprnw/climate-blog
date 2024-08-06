<script lang="ts">
	import { formatDate, formatDateFull } from '$utils/format';

	const { date }: { date: string } = $props();
	const obj = $derived(new Date(date));
	const label = $derived(formatDate(obj));
	const title = $derived(formatDateFull(obj));
</script>

<time {title} datetime={date}>{label}</time>
