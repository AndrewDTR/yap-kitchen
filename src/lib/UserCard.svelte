<script>
	export let name = 'Name Placeholder';
	export let description = 'Description Placeholder';
	export let color = '#000000';
	export let avatar = '';

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

	let shadowColor;
	$: shadowColor = adjustColor(color, 0.7, 'darken');
	$: clickColor = adjustColor(color, 0.5, 'lighten');
</script>

<a href="/{name}">
	<div
		class="user"
		style="
		--base-color: {color};
		--shadow-color: {shadowColor};
		--click-color: {clickColor};
	  "
	>
		<div class="header">
			<img class="avatar" src={avatar} alt="{name}'s avatar" />
			<h2>{name}</h2>
		</div>
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
		display: flex;
		flex-direction: column;
		transition:
			transform 0.15s ease,
			box-shadow 0.2s ease,
			background-color 0.2s ease;
		align-items: flex-start;
		height: 100%;
		gap: 0.5rem;
	}

	.user:hover {
		box-shadow: 6px 6px 0px var(--shadow-color);
		transform: translate(-2px, -2px);
	}

	.user:active {
		box-shadow: 0px 0px 0px var(--shadow-color);
		transform: translate(2px, 2px);
		background-color: var(--click-color);
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

	.header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	h2 {
		margin: 0;
	}

	.avatar {
		width: 34px;
		height: 34px;
		/* border-radius: 50%; */
		object-fit: cover;
		border: 2px solid black;
		box-shadow: 2px 2px 0px var(--shadow-color);
	}

	.user p {
		word-break: normal;
		overflow-wrap: break-word;
		hyphens: auto;
	}

	.user h2 {
		overflow-wrap: normal;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
