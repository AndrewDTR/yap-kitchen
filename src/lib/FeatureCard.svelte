<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [title]
	 * @property {string} [description]
	 */

	/** @type {Props} */
	let { title = 'Name Placeholder', description = 'Description Placeholder' } = $props();
	let color = '#FFFFFF';

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

	let shadowColor = $derived(adjustColor(color, 0.7, 'darken'));

	let clickColor = $derived(adjustColor(color, 0.5, 'lighten'));
</script>

<div
	class="user"
	style="
		--base-color: {color};
		--shadow-color: {shadowColor};
		--click-color: {clickColor};
	  "
>
	<div class="header">
		<h2>{title}</h2>
	</div>
	<p>{description}</p>
</div>

<style>
	.user {
		border-style: solid;
		border-color: black;
		border-width: 2px;
		max-width: 500px;
		padding: 7px;
		background-color: var(--base-color);
		box-shadow: 4px 4px 0px var(--shadow-color);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 100%;
		gap: 0.5rem;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	h2 {
		margin: 0;
	}
</style>
