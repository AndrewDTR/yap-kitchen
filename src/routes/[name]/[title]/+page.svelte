<script>
	import BlogHeader from '$lib/blog/BlogHeader.svelte';
	let { data } = $props();
</script>

<div class="content">
	<BlogHeader
		title={data.post.title}
		author={data.author.username}
		date={data.post.createdHumanReadable}
		color={data.author.color}
	></BlogHeader>

	<div>{@html data.result}</div>
</div>

<svelte:head>
	<link rel="icon" href={data.author.avatarUrl} sizes="any" type="image/svg+xml" />
</svelte:head>
