<script>
</script>

<div class="content">
	<form method="POST" action="?/post">
		<h1>Make a post</h1>

		<p>Title</p>
		<input type="text" name="title" />

		<p>Slug</p>
		<input type="text" name="slug" />

		<p>Content</p>
		<textarea name="content" id="post-content"></textarea>

		<button type="submit">Submit</button>
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
