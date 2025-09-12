<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [color]
	 * @property {string} [avatarUrl]
	 * @property {string} [username]
	 * @property {string} [description]
	 * @property {string} [humanReadableCreated]
	 * @property {string} [personal_link]
	 */

	/** @type {Props} */
	let {
		color = '#000000',
		avatarUrl = 'https://yap.kitchen',
		username = 'Username',
		description = 'Description',
		humanReadableCreated = 'January 1st, 1900',
		personal_link = 'https://yap.kitchen'
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

<div class="hero" style="--user-color: {color}; --shadow-color: {shadowColor};">
	<div class="pfp">
		<img src={avatarUrl} alt="{username}'s pfp" />
	</div>
	<div class="info">
		<h1 class="username">{username}</h1>
		<p class="member-since">member since {humanReadableCreated}</p>
		<p class="description"><i>{description}</i></p>
		{#if personal_link}
			<p>
				<a href={personal_link}>{personal_link}</a>
			</p>
		{/if}
	</div>
</div>

<style>
	.hero {
		display: flex;
		align-items: center;
		padding: 1rem;
		border: 2px solid black;
		background-color: var(--user-color);
		box-shadow: 7px 7px 0 var(--shadow-color);
	}

	.pfp {
		width: 150px;
	}

	.pfp img {
		width: 85%;
		height: auto;
		object-fit: contain;
		border: 2px solid black;
		box-shadow: 4px 4px 0 var(--shadow-color);
	}

	.info {
		flex: 1;
	}

	.username,
	.member-since {
		margin: 0;
		padding: 0;
		line-height: 1;
		margin-bottom: 2px;
	}

	.member-since {
		margin-bottom: 10px;
	}

	.description {
		margin-top: 8px;
		margin-bottom: 6px;
		font-style: italic;
	}
</style>
