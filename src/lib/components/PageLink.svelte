<script lang="ts">
	import type { IsModeLight } from '$types/ui';
	import { getAbsoluteURL } from '$utils/url';

	// TODO: Use this component in the Pagination component

	type Props = {
		isNext?: boolean;
		isPrev?: boolean;
		label: string;
		path: string;
		isModeLight: IsModeLight;
	};

	const { isNext = false, isPrev = false, path, isModeLight, label }: Props = $props();
</script>

<a
	class="link"
	class:link-preload={isNext}
	href={getAbsoluteURL(path, isModeLight)}
	rel={isPrev ? 'prev' : isNext ? 'next' : undefined}>{label}</a
>
