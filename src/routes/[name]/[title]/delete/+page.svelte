<script>
	import Button from '$lib/Button.svelte';
	let { data } = $props();
	console.log(data);
</script>

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
