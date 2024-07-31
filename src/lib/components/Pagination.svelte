<script lang="ts">
	import { getPageList } from '$utils/posts';
	type Props = {
		currentIndex: string;
		posts_count: number;
	};

	const { currentIndex, posts_count }: Props = $props();
</script>

{currentIndex}
{posts_count}

<nav class="flex justify-center text-sm pb-16">
	{#each getPageList(posts_count, currentIndex) as { label, path, isCurrent }}{#if isCurrent}<span
				class="text-gray-400 px-2">{label}</span
			>{:else}<a class="px-2 hover:text-accent" href="/{path}">{label}</a>{/if}{/each}
</nav>
