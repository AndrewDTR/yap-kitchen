<script>
	let { data } = $props();
	import UserCard from '$lib/UserCard.svelte';
</script>

<div class="content">
	<h1>user directory</h1>

	<div class="user-list">
		{#each data.users as user}
			<UserCard name={user.username} description={user.description} color={user.color} />
		{/each}
	</div>
</div>

<style>
	.user-list {
		display: grid;
		/* Set up a responsive grid layout */
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}
</style>