<script>
	let { data } = $props();
</script>

<div class="user-list">
	{#each data.users as user}
		<a href="/{user.username}">
			<div class="user">
				<p>{user.username}</p>
				<p>{user.description}</p>
			</div>
		</a>
	{/each}
</div>

<style>
	.user {
		border-style: solid;
		border-color: black;
		border-width: 2px;
	}
</style>
