<script>
	import UserInfo from '$lib/user/UserInfo.svelte';
	let { data } = $props();
</script>

<div class="content">
	<UserInfo
		color={data.user.color}
		avatarUrl={data.user.avatarUrl}
		username={data.user.username}
		description={data.user.description}
		humanReadableCreated={data.user.humanReadableCreated}
		personal_link={data.user.personal_link}
	></UserInfo>
	<div class="user-posts">
		{#if data.posts.length > 0}
			<h3>they have the following blog posts</h3>
			<div class="posts">
				{#each data.posts as post}
					<p>
						<a href="/{data.user.username}/{post.slug}">{post.title}</a>
						- {post.humanReadableTime}
					</p>
				{/each}
			</div>
		{:else}
			<h3>they have no blog posts :(</h3>
		{/if}
	</div>
</div>

<svelte:head>
	<meta property="og:title" content="{data.user.username} - yap.kitchen" />
	{#if data.posts.length === 0}
		<meta
			property="og:description"
			content="Check out {data.user
				.username}'s profile on yap.kitchen! They haven't written anything, but you still should check 'em out."
		/>
	{:else if data.posts.length === 1}
		<meta
			property="og:description"
			content="Check out {data.user
				.username}'s 1 blog post on yap.kitchen! Hey, we all start somewhere..."
		/>
	{:else}
		<meta
			property="og:description"
			content="Check out {data.user.username}'s {data.posts
				.length} blog posts on yap.kitchen! They've clearly been writing up a storm..."
		/>
	{/if}
	<meta property="og:url" content="https://www.yap.kitchen/{data.user.username}" />
	<meta property="og:type" content="website" />
	<!-- <meta property="og:image" content="https://www.yap.kitchen/{data.user.username}/avatar" />
	<meta property="og:image:width" content="300" />
	<meta property="og:image:height" content="300" /> -->
	<meta name="theme-color" content={data.user.color} />
</svelte:head>

<style>
	.content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.user-posts {
		padding: 1rem;
		border: 1px solid black;
	}
</style>
