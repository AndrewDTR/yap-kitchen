<script>
	import Button from '$lib/Button.svelte';
	let { data } = $props();
</script>

<div class="content">
	<h1>Editing user "{data.logUser.username}"</h1>
	<form method="POST" action="?/edit">
		<p>Username</p>
		<input type="text" name="username" value={data.logUser.username} minlength="3" maxlength="16" />

		<p>Description</p>
		<input type="text" name="description" value={data.logUser.description} maxlength="100" />

		<p>Link</p>
		<input type="text" name="personal-link" value={data.logUser.personal_link} />

		<div class="button-padding" type="submit">
			<Button color={data.logUser.color} text="edit"></Button>
		</div>
	</form>
</div>

<style>
	.content input[type='text'] {
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
		font-size: 16px;
		margin-bottom: 15px;
	}
</style>
