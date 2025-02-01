<script>
	export let color = '#cccccc';
	export let text = 'Hello';
	export let href;

	function adjustColor(hex, factor, mode = 'lighten') {
		let r = parseInt(hex.slice(1, 3), 16);
		let g = parseInt(hex.slice(3, 5), 16);
		let b = parseInt(hex.slice(5, 7), 16);

		if (mode === 'lighten') {
			const maxChannel = Math.max(r, g, b);
			r = Math.min(255, r + Math.floor((maxChannel - r) * factor));
			g = Math.min(255, g + Math.floor((maxChannel - g) * factor));
			b = Math.min(255, b + Math.floor((maxChannel - b) * factor));
		} else if (mode === 'darken') {
			r = Math.max(0, Math.floor(r * factor));
			g = Math.max(0, Math.floor(g * factor));
			b = Math.max(0, Math.floor(b * factor));
		} else {
			throw new Error('invalid mode');
		}

		return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
	}

	let shadowColor, clickColor;

	$: shadowColor = adjustColor(color, 0.7, 'darken');
	$: clickColor = adjustColor(color, 0.5, 'lighten');
</script>

{#if href}
	<a
		{href}
		class="main"
		style="--base-color: {color}; --shadow-color: {shadowColor}; --click-color: {clickColor};"
	>
		{text}
	</a>
{:else}
	<button
		class="main"
		style="--base-color: {color}; --shadow-color: {shadowColor}; --click-color: {clickColor};"
		on:click
	>
		<slot>{text}</slot>
	</button>
{/if}

<style>
	.main {
		border-style: solid;
		border-color: black;
		border-width: 2px;
		max-width: 500px;
		padding: 7px;
		background-color: var(--base-color);
		box-shadow: 4px 4px 0px var(--shadow-color);
		display: flex;
		flex-direction: column;
		transition:
			transform 0.15s ease,
			box-shadow 0.2s ease,
			background-color 0.2s ease;
		align-items: flex-start;
		height: 100%;
		gap: 0.5rem;
		cursor: pointer;
		text-decoration: none;
		color: inherit;
	}

	.main:hover {
		box-shadow: 6px 6px 0px var(--shadow-color);
		transform: translate(-2px, -2px);
	}

	.main:active {
		box-shadow: 0px 0px 0px var(--shadow-color);
		transform: translate(2px, 2px);
		background-color: var(--click-color);
	}
</style>
