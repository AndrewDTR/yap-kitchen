<script>
	export let title = 'Title';
	export let slug = 'slug';
	export let author = 'Example';
	export let date = 'January 1st, 2025';
</script>

<a href="/{author}/{slug}">
	<div class="blog-post">
		<p>
			{title}
			- {date}
		</p>
	</div>
</a>

<style>
	.blog-post {
		background-color: white;
		padding: 1em;
		border-style: solid;
		border-color: black;
		border-width: 2px;
		background-color: white;
		box-shadow: 4px 4px 0px rgba(118, 118, 118, 0.5);
		margin-bottom: 15px;
		transition:
			transform 0.15s ease,
			box-shadow 0.2s ease,
			background-color 0.2s ease;
	}

	.blog-post:hover {
		box-shadow: 6px 6px 0px rgba(118, 118, 118, 0.5);
		transform: translate(-2px, -2px);
	}

	.blog-post:active {
		box-shadow: 0px 0px 0px rgba(118, 118, 118, 0.5);
		transform: translate(2px, 2px);
	}
</style>
