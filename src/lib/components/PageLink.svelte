<script lang="ts">
	import type { IsModeLight } from '#types/ui';
	import { getAbsoluteURL } from '#utils/url';

	type Props = {
		isNext?: boolean;
		isPrev?: boolean;
		label: string;
		path: string;
		isModeLight: IsModeLight;
		class?: string;
	};

	const {
		isNext = false,
		isPrev = false,
		path,
		isModeLight,
		label,
		class: className = ''
	}: Props = $props();
</script>

<a
	class={['link', className, { 'link-preload': isNext }]}
	href={getAbsoluteURL(path, isModeLight)}
	rel={isPrev ? 'prev' : isNext ? 'next' : undefined}>{label}</a
>
