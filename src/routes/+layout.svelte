<script>
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { page } from '$app/state';
	let { data } = $props();

	function adjustColor(hex, factor, mode = 'lighten') {
		let r = parseInt(hex.slice(1, 3), 16);
		let g = parseInt(hex.slice(3, 5), 16);
		let b = parseInt(hex.slice(5, 7), 16);

		if (mode === 'lighten') {
			r = Math.min(255, Math.floor(r + (255 - r) * factor));
			g = Math.min(255, Math.floor(g + (255 - g) * factor));
			b = Math.min(255, Math.floor(b + (255 - b) * factor));
		} else if (mode === 'darken') {
			r = Math.max(0, Math.floor(r * (1 - factor)));
			g = Math.max(0, Math.floor(g * (1 - factor)));
			b = Math.max(0, Math.floor(b * (1 - factor)));
		} else {
			throw new Error('invalid mode');
		}

		return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
	}

	let color = $derived(page.data.user?.color || page.data.author?.color || '#123456');

	let shadowColor = $derived(adjustColor(color, 0.85, 'lighten'));
    // let shadowColor = $derived('white');
</script>

<div class="page-wrapper" style="background-color: {shadowColor};">
	<Navbar />
	<div class="main-content">
		<slot></slot>
	</div>
	<Footer commitHash={data.commitHash} environment={data.environment} />
</div>

<style>
	.page-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.main-content {
		flex: 1;
	}
</style>
