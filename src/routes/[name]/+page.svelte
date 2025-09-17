<script>
	import Button from '$lib/Button.svelte';
	import BlogPost from '$lib/user/BlogPost.svelte';
	import UserInfo from '$lib/user/UserInfo.svelte';
	import PocketBase from 'pocketbase';

	const pb = new PocketBase('http://127.0.0.1:8090/');

	let { data } = $props();

	async function logout() {
		pb.authStore.clear();

		const res = await fetch('/logout', { method: 'POST' });

		if (res.ok) {
			window.location.href = '/login';
		} else {
			console.error('Logout failed', await res.text());
		}
	}

	let reversedPosts = $derived([...data.posts].reverse());
</script>

<div class="content">
	{#if data.unverified}
		<div class="unverified">
			<p class="unverified-text"><b style="padding-right: 4px;">Warning:</b>You are unverified. Other people cannot see your account.</p>
		</div>
	{/if}
	<UserInfo
		color={data.user.color}
		avatarUrl={data.user.avatarUrl}
		username={data.user.username}
		description={data.user.description}
		humanReadableCreated={data.user.humanReadableCreated}
		personal_link={data.user.personal_link}
	></UserInfo>
	{#if data.logUser && data.logUser.username === data.user.username}
		<!-- <button on:click={logout}>log out</button> -->
		<div class="button-bar">
			<Button href="/post" text="post" color={data.user.color} />
			<Button text="edit profile" href="/{data.user.username}/edit" color={data.user.color} />
			<Button on:click={logout} text="logout" color={data.user.color} />
		</div>
	{/if}
	<div class="user-posts">
		{#if !data.logUser || data.logUser.username !== data.user.username}
			{#if data.posts.length > 0}
				<h3>they have the following blog posts</h3>
			{:else}
				<h3>they have no blog posts :(</h3>
			{/if}
		{:else if data.posts.length > 0}
			<h3>you have the following blog posts</h3>
		{:else}
			<h3>you have no blog posts :(</h3>
		{/if}
	</div>
	<div class="posts">
		{#each reversedPosts as post (post.slug)}
			<BlogPost
				title={post.title}
				slug={post.slug}
				author={data.user.username}
				date={post.humanReadableTime}
			></BlogPost>
		{/each}
	</div>
</div>

<svelte:head>
	<title>yap kitchen - {data.user.username}</title>
	<link rel="icon" href={data.user.avatarUrl} sizes="any" type="image/svg+xml" />
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
	<meta property="og:image" content={data.user.pngAvatarUrl} />
	<meta property="og:image:width" content="300" />
	<meta property="og:image:height" content="300" />
	<meta name="theme-color" content={data.user.color} />
</svelte:head>

<style>
	.button-bar {
		display: flex;
		gap: 1rem;
	}

	.button-bar :global(.main) {
		flex: 1 1 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.user-posts {
		padding: 1rem;
		border: 1.5px solid black;
	}

	.unverified {
		background-color: rgb(255, 151, 151);
		padding-top: 8px;
		padding-bottom: 8px;
		padding-left: 2px;
		padding-right: 2px;
	}

	.unverified-text {
		padding: 4px;
	}
</style>
