<script>
	import Button from '$lib/Button.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>delete post?</title>
</svelte:head>

<div class="content">
	<form method="POST" action="?/delete">
		<h1>Delete "{data.post.title}"?</h1>
		<p>This action is permanent.</p>
		<div class="button-padding">
			<Button color={data.logUser.color} text="delete it"></Button>
		</div>
	</form>
</div>

<style>
	.button-padding {
		margin-top: 10px;
	}
</style>
