<script>
	let { data } = $props();
</script>

<div class="content">
	<h1 class="title">{data.post.title}</h1>
	<p><a href="/{data.author.username}">{data.author.username}</a> | {data.post.createdHumanReadable}</p>

	<div>{@html data.result}</div>
</div>
