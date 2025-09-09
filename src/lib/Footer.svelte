<script>
	import { page } from '$app/state';
	let color = $derived(page.data.user?.color || page.data.author?.color || '#123456');
	let { commitHash, environment } = $props();
</script>

<div class="bg-navbar" style="background-color: {color};">
	<footer>
		<p>
			{environment}@<a
				href="https://github.com/AndrewDTR/yap-kitchen/commit/{commitHash}"
				target="_blank">{commitHash.substring(0, 5)}</a
			>
		</p>
	</footer>
</div>

<style>
	.bg-navbar {
		margin-top: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 0.6em;
		color: white;
	}

	a {
		text-decoration-color: white;
	}

	a:visited {
		color: inherit;
	}

	a:hover,
	a:focus {
		text-decoration-color: white;
	}
</style>
