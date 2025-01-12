<script>
	let { data } = $props();
</script>

<div class="content">
	<h1>welcome to the name page</h1>
	<h2>some info about the current user:</h2>
	<p>their username is {data.user.username}</p>
	{#if data.user.description}
		<p>their description is {data.user.description}</p>
	{/if}
	{#if data.user.color}
		<p>their color is {data.user.color}</p>
	{/if}
	{#if data.user.personal_link}
		<p>their personal link is <a href={data.user.personal_link}>{data.user.personal_link}</a></p>
	{/if}

	{#if data.posts.length > 0}
		<h3>they have the following blog posts</h3>
		<div>
			{#each data.posts as post}
				<p>
					<a href="/{data.user.username}/{post.slug}">{post.title}</a> - {post.humanReadableTime}
				</p>
			{/each}
		</div>{:else}
		<h3>they have no blog posts :&#40;</h3>
	{/if}
</div>

<svelte:head>
	<meta property="og:title" content="{data.user.username} - yap kitchen" />
	{#if data.posts.length === 0}
		<meta
			property="og:description"
			content="Check out {data.user
				.username}'s profile on yap.kitchen! They haven't written anything, but you still should check it out."
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
