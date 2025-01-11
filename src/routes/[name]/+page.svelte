<script>
	let { data } = $props();
</script>

<h1>welcome to the name page</h1>
<h2>some info about the current user:</h2>
<p>their username is {data.user.username}</p>
{#if data.user.description}
	<p>their description is {data.user.description}</p>
{/if}
{#if data.user.personal_link}
	<p>their personal link is <a href={data.user.personal_link}>{data.user.personal_link}</a></p>
{/if}

{#if data.posts.length > 0}
    <h3>they have the following blog posts</h3>
	<div>
		{#each data.posts as post}
			<p><a href="/{data.user.username}/{post.slug}">{post.title}</a> - {post.humanReadableTime}</p>
		{/each}
	</div>{:else}
	<h3>they have no blog posts :&#40;</h3>
{/if}
