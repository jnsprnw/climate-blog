<script lang="ts">
	import { getAbsoluteURL } from '$utils/url';

	type Props = {
		url: string;
	};

	const { url }: Props = $props();
</script>

<code
	class="text-xs bg-slate-50 rounded-sm p-1 place-self-start max-w-full whitespace-nowrap overflow-y-scroll"
>
	{getAbsoluteURL(url)}
</code>
