<script>
	import Button from '$lib/Button.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>edit post</title>
</svelte:head>

<div class="content">
	<form method="POST" action="?/edit">
		<input type="hidden" name="id" value={data.post.id} />

		<h1>Editing "{data.post.title}"</h1>

		<p>Title</p>
		<input type="text" name="title" value={data.post.title} />

		<p>Slug</p>
		<input type="text" name="slug" value={data.post.slug} />

		<p>Content</p>
		<textarea name="content" id="post-content">{data.post.content}</textarea>

		<div class="button-padding" type="submit">
			<Button color={data.logUser.color} text="edit it!"></Button>
		</div>
	</form>
</div>

<style>
	.content input[type='text'],
	.content textarea {
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
		font-size: 16px;
		margin-bottom: 15px;
	}

	.content textarea {
		height: 200px;
		resize: vertical;
	}
</style>
