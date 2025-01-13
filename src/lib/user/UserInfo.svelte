<script>
	export let color = '#000000';
	export let avatarUrl = 'https://yap.kitchen';
	export let username = 'Username';
	export let description = 'Description';
	export let humanReadableCreated = 'January 1st, 1900';
	export let personal_link = 'https://yap.kitchen';

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
</script>

<div class="hero" style="--user-color: {color}; --shadow-color: {shadowColor};">
	<div class="pfp">
		<img src={avatarUrl} alt="{username}'s pfp" />
	</div>
	<div class="info">
		<h1 class="username">{username}</h1>
		<p class="member-since">member since {humanReadableCreated}</p>
		<p class="description"><i>{description}</i></p>
		<div class="color-showcase">
			<div class="color-square"></div>
			<p>{color}</p>
		</div>
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
		align-items: stretch;
		padding: 1rem;
		border-style: solid;
		border-color: black;
		border-width: 2px;
		background-color: var(--user-color);
		box-shadow: 7px 7px 0px var(--shadow-color);
	}

	.pfp {
		margin-right: 1rem;
		width: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pfp img {
		height: 100%;
		width: auto;
		object-fit: cover;
		border-style: solid;
		border-color: black;
		border-width: 2px;
		box-shadow: 4px 4px 0px var(--shadow-color);
	}

	.info {
		flex: 1;
	}

	.info i {
		display: block;
		margin-top: 8px;
	}

	.color-showcase {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.color-square {
		width: 10px;
		height: 10px;
		background-color: var(--user-color);
		flex-shrink: 0;
		border-style: solid;
		border-color: black;
		border-width: 2px;
	}

	.color-showcase p {
		margin: 0;
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
		padding-bottom: 6px;
	}
</style>
