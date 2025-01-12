<script>
	export let name = 'Name Placeholder';
	export let description = 'Description Placeholder';
	export let color = '#000000';

	function darkenColor(hex, factor) {
		let r = parseInt(hex.slice(1, 3), 16);
		let g = parseInt(hex.slice(3, 5), 16);
		let b = parseInt(hex.slice(5, 7), 16);

		r = Math.max(0, Math.floor(r * factor));
		g = Math.max(0, Math.floor(g * factor));
		b = Math.max(0, Math.floor(b * factor));

		return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
	}

	let shadowColor;
	$: shadowColor = darkenColor(color, 0.7);
</script>

<a href="/{name}">
	<div
		class="user"
		style="
      --base-color: {color};
      --shadow-color: {shadowColor};
    "
	>
		<h2>{name}</h2>
		<p>{description}</p>
	</div>
</a>

<style>
	.user {
		border-style: solid;
		border-color: black;
		border-width: 2px;
		max-width: 500px;
		padding: 7px;
		background-color: var(--base-color);
		box-shadow: 4px 4px 0px var(--shadow-color);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		height: 100%;
		gap: 0.5rem;
	}

	.user:hover {
		box-shadow: 6px 6px 0px var(--shadow-color);
		transform: translate(-2px, -2px);
		transition:
			transform 0.05s ease,
			box-shadow 0.05s ease;
	}

	.user:active {
		box-shadow: 0px 0px 0px var(--shadow-color);
		transform: translate(2px, 2px);
	}

	a {
		text-decoration: none;
		color: black;
	}
	a:visited {
		text-decoration: none;
	}
	a:hover {
		text-decoration: none;
	}
	a:focus {
		text-decoration: none;
	}
	a:hover,
	a:active {
		text-decoration: none;
	}
</style>
