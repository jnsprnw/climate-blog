<fieldset class="theme-switch flex flex-row gap-x-2">
	<label>
		<input
			class="sr-only"
			type="radio"
			name="theme"
			value="system"
			aria-label="System theme"
			title="System theme"
		/>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="icon icon-tabler icons-tabler-outline icon-tabler-brightness"
			><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
			/><path d="M12 3l0 18" /><path d="M12 9l4.65 -4.65" /><path d="M12 14.3l7.37 -7.37" /><path
				d="M12 19.6l8.85 -8.85"
			/></svg
		>
	</label>

	<label>
		<input
			class="sr-only"
			type="radio"
			name="theme"
			value="light"
			aria-label="Light theme"
			title="Light theme"
		/>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			class="icon icon-tabler icons-tabler-filled icon-tabler-brightness-up"
			><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M12 8a4 4 0 1 1 -3.995 4.2l-.005 -.2l.005 -.2a4 4 0 0 1 3.995 -3.8z"
			/><path
				d="M12 2a1 1 0 0 1 .993 .883l.007 .117v2a1 1 0 0 1 -1.993 .117l-.007 -.117v-2a1 1 0 0 1 1 -1z"
			/><path
				d="M17.693 4.893a1 1 0 0 1 1.497 1.32l-.083 .094l-1.4 1.4a1 1 0 0 1 -1.497 -1.32l.083 -.094l1.4 -1.4z"
			/><path
				d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-2a1 1 0 0 1 -.117 -1.993l.117 -.007h2z"
			/><path
				d="M16.293 16.293a1 1 0 0 1 1.32 -.083l.094 .083l1.4 1.4a1 1 0 0 1 -1.32 1.497l-.094 -.083l-1.4 -1.4a1 1 0 0 1 0 -1.414z"
			/><path
				d="M12 18a1 1 0 0 1 .993 .883l.007 .117v2a1 1 0 0 1 -1.993 .117l-.007 -.117v-2a1 1 0 0 1 1 -1z"
			/><path
				d="M6.293 16.293a1 1 0 0 1 1.497 1.32l-.083 .094l-1.4 1.4a1 1 0 0 1 -1.497 -1.32l.083 -.094l1.4 -1.4z"
			/><path
				d="M6 11a1 1 0 0 1 .117 1.993l-.117 .007h-2a1 1 0 0 1 -.117 -1.993l.117 -.007h2z"
			/><path
				d="M4.893 4.893a1 1 0 0 1 1.32 -.083l.094 .083l1.4 1.4a1 1 0 0 1 -1.32 1.497l-.094 -.083l-1.4 -1.4a1 1 0 0 1 0 -1.414z"
			/></svg
		>
	</label>

	<label>
		<input
			class="sr-only"
			type="radio"
			name="theme"
			value="dark"
			aria-label="Dark theme"
			title="Dark theme"
		/>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"
			><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"
			/></svg
		>
	</label>
</fieldset>

<style>
	label {
		padding-left: 4px;
		padding-right: 4px;
		width: 26px;
		height: 26px;
		border-radius: 4px;

		svg {
			width: 100%;
			height: 100%;
		}
	}

	label:focus-within {
		outline: 2px solid oklch(0.55 0.2 250);
		outline-offset: 2px;
	}

	label:not(:has(input:checked)) {
		transition: color 0.3s ease-in-out;
		color: var(--color-mute);
		cursor: pointer;
	}

	label:hover:not(:has(input:checked)),
	label:has(input:checked) {
		color: var(--color-fg);
	}
</style>
