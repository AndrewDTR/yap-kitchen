<script>
	import { page } from '$app/state';
	let color = $derived(page.data.user?.color || page.data.author?.color || '#123456');
	let logUser = page.data.logUser;
</script>

<div class="bg-navbar" style="background-color: {color};">
	<div class="internal-nav">
		<nav>
			<a href="/"><b>yap.kitchen 👨‍🍳</b></a>
			<a href="/about">/about</a>
			<a href="/users">/users</a>

			{#if logUser}
				<a href="/{logUser.username}" class="right">/{logUser.username}</a>
			{:else}
				<a href="/login" class="right">/login</a>
			{/if}
		</nav>
	</div>
</div>

<style>
	nav {
		display: flex;
		align-items: center;
	}

	nav a {
		margin-right: 1em;
		text-decoration: none;
	}

	nav a.right {
		margin-left: auto;
	}

	.bg-navbar {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 0.6em;
		margin-bottom: 15px;
	}

	.internal-nav {
		width: 800px;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		padding-top: 6px;
		padding-bottom: 6px;
		padding-left: 15px;
		padding-right: 15px;
	}

	.internal-nav nav a {
		color: white;
		text-decoration: none;
	}

	.internal-nav nav a:hover {
		color: lightgray;
	}

	.internal-nav nav a {
		transition: transform 0.1s ease-in-out;
	}

	.internal-nav nav a:hover {
		transform: rotate(4deg);
	}

	.internal-nav nav a:active {
		color: rgb(177, 177, 177);
	}
</style>
