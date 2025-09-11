<script>
	import BlogHeader from '$lib/blog/BlogHeader.svelte';
	import Button from '$lib/Button.svelte';
	let { data } = $props();
</script>

<div class="content">
	<BlogHeader
		title={data.post.title}
		author={data.author.username}
		date={data.post.createdHumanReadable}
		editedDate={data.post.updatedHumanReadable}
		color={data.author.color}
	></BlogHeader>

	{#if data.logUser && data.logUser.username == data.author.username}
		<div class="button-bar">
			<Button
				href="/{data.author.username}/{data.post.slug}/edit"
				text="edit post"
				color={data.author.color}
			/>
			<Button
				href="/{data.author.username}/{data.post.slug}/delete"
				text="delete post"
				color={data.author.color}
			/>
		</div>
	{/if}
	<div class="user-post">{@html data.result}</div>
</div>

<svelte:head>
	<title>{data.post.title}</title>
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

<style>
	.button-bar {
		display: flex;
		gap: 1rem;
		margin-bottom: 15px;
	}

	.button-bar :global(.main) {
		flex: 1 1 0;
	}
</style>
