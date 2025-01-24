<script>
	import FeatureCard from '$lib/FeatureCard.svelte';
	let { data } = $props();
	let logUser = data.logUser;
</script>

<div class="content">
	<div class="welcome">
		{#if logUser}
			<h1>welcome back to yap.kitchen 👨‍🍳</h1>
		{:else}
			<h1>welcome to yap.kitchen 👨‍🍳</h1>
		{/if}
		<p>serving <code>{data.userCount}</code> users posting <code>{data.postCount}</code> posts</p>
		<div class="buttons">
			{#if logUser}
				<a href="/{logUser.username}">
					<p>your page</p>
				</a>
			{:else}
				<a href="/login">
					<p>log in</p>
				</a>
			{/if}

			<a href="/users">
				<p>view users</p>
			</a>
		</div>
	</div>
	<div class="feature-grid">
		<FeatureCard
			title="write about what interests you"
			description="the web used to be about xyz. Now you're limited by 240 characters. here you've got like 5000 lol"
		/>
		<FeatureCard
			title="rich text editor"
			description="you can type your yap and have it look good. supports vanilla markdown and katex for math notation"
		/>
		<FeatureCard
			title="open source"
			description="just markdown. nothing proprietary. run a yap kitchen instance if you'd like, or explore the source code"
		/>
	</div>
</div>

<svelte:head>
	<meta property="og:title" content="yap kitchen" />
	<meta name="og:description" content="an ad-free, easy-to-load, minimalist blog sharing site." />
</svelte:head>

<style>
	.welcome {
		border-style: solid;
		border-color: black;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 20px;
		margin-bottom: 20px;
		background-color: #8eb9ed;
		box-shadow: 4px 4px 0px #7393e3;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		gap: 10px;
		justify-content: center;
		margin-top: 10px;
	}

	.buttons a {
		text-decoration: none;
	}

	.buttons p {
		background-color: rgb(172, 195, 244);
		padding: 10px;
		box-shadow: 4px 4px 0px rgb(76, 98, 137);
		border-style: solid;
		border-color: black;
		border-width: 2px;
		transition:
			transform 0.15s ease,
			box-shadow 0.2s ease,
			background-color 0.2s ease;
	}

	.buttons p:hover {
		box-shadow: 6px 6px 0px rgb(76, 98, 137);
		transform: translate(-2px, -2px);
	}

	.buttons p:active {
		box-shadow: 0px 0px 0px rgb(76, 98, 137);
		transform: translate(2px, 2px);
		background-color: rgb(127, 152, 196);
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	@media (max-width: 600px) {
		.feature-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
