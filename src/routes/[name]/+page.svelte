<script>
	let { data } = $props();
    console.log(data)
</script>

<h1>welcome to the name page</h1>
<h2>some info about the current user:</h2>
<p>their username is {data.username}</p>

<div>
    {#each data.posts as post}
        <p>{post.title} - {post.date}</p>
    {/each}
</div>