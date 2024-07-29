<script lang="ts">
	const { authors, lang = 'en' }: { authors: string[]; lang: string } = $props();

	const lang_literals = $derived(lang === 'en' ? undefined : 'en');
	const lang_authors = $derived(lang === 'en' ? undefined : lang);

	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

	const parts = $derived(formatter.formatToParts(authors));
</script>

<span lang={lang_literals}>By</span>
{#each parts as { type, value }}
	{#if type === 'literal'}
		<span lang={lang_literals}>{value}</span>
	{:else}
		<span itemscope itemtype="https://schema.org/Person" lang={lang_authors}>
			<span itemprop="name">{value}</span>
		</span>
	{/if}
{/each}
