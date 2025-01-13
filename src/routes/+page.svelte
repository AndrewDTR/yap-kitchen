<script>
	let { data } = $props();
</script>

<div class="content">
	<h1>welcome to yap.kitchen 👨‍🍳</h1>
	<p>serving {data.userCount} users posting {data.postCount} posts</p>
</div>

<svelte:head>
	<meta property="og:title" content="yap kitchen" />
	<meta name="og:description" content="an ad-free, easy-to-load, minimalist blog sharing site." />
</svelte:head>
