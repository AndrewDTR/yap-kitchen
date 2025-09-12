<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [title]
	 * @property {string} [author]
	 * @property {string} [date]
	 * @property {any} editedDate
	 * @property {string} [color]
	 */

	/** @type {Props} */
	let {
		title = 'Title',
		author = 'Author',
		date = 'January 1st, 1900',
		editedDate,
		color = '#000000'
	} = $props();

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
	
</script>

<div class="blog-header" style="--user-color: {color}; --shadow-color: {shadowColor};">
	<h1 class="title">{title}</h1>
	<p>
		by <a href="/{author}">{author}</a> | posted {date}
		{#if editedDate && editedDate != date}
			| last edited {editedDate}
		{/if}
	</p>
</div>

<style>
	.blog-header {
		padding: 1rem;
		border-style: solid;
		border-color: black;
		border-width: 2px;
		background-color: var(--user-color);
		box-shadow: 7px 7px 0px var(--shadow-color);
		margin-bottom: 20px;
	}
</style>
