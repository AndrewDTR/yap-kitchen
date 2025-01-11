<script>
	let { data } = $props();
	console.log(data);
</script>

<h1>welcome to the blog post page</h1>
<h2>you are viewing a blog post made by {data.author.username}</h2>
<p>it is titled {data.post.title}</p>
<p>it was posted {data.post.createdHumanReadable}</p>
<p>the slug, as you know, is {data.post.slug}</p>

<p>here is the actual post</p>
<div>{@html data.result}</div>
