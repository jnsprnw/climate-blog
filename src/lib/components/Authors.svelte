<script lang="ts">
	const { authors, lang = 'en' }: { authors: string[]; lang: string } = $props();

	const lang_authors = $derived(lang === 'en' ? undefined : lang);

	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

	const parts = $derived(formatter.formatToParts(authors));
</script>

{#each parts as { type, value }}
	{#if type === 'literal'}
		<span>{value}</span>
	{:else}
		<span itemscope itemtype="https://schema.org/Person" lang={lang_authors}>
			<span itemprop="name">{value}</span>
		</span>
	{/if}
{/each}
