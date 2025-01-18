<script>
	let { data } = $props();
	console.log(data);
</script>

<div class="content">
	<h1>Editing "{data.post.title}"</h1>

	<p>Title</p>
	<input type="text" value={data.post.title} />

	<p>Slug</p>
	<input type="text" value={data.post.slug} />

	<p>Content</p>
	<textarea>{data.post.content}</textarea>
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
