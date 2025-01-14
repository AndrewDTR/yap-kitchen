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
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css" />
	<meta
		property="og:url"
		content="https://www.yap.kitchen/{data.author.username}/{data.post.slug}"
	/>
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content="a yap.kitchen blog post by {data.author.username}" />
	<meta property="og:type" content="website" />
	<!-- <meta property="og:image:width" content="300" />
	<meta property="og:image:height" content="300" /> -->
	<meta name="theme-color" content={data.author.color} />
</svelte:head>
