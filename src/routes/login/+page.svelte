<script>
	function handleDiscordLogin() {
		document.getElementById('result').textContent = 'Discord login triggered';
	}

	function handleGoogleLogin() {
		document.getElementById('result').textContent = 'Google login triggered';
	}
</script>

<div class="content">
	<h1>Here's where you can log in</h1>
	<button on:click={handleDiscordLogin}>Login with Discord</button>
	<button on:click={handleGoogleLogin}>Login with Google</button>

	<form action="?/login" method="post">
		<div>
			<label>
				Username:
				<input name="username" type="text" placeholder="username" required />
			</label>
		</div>
		<div>
			<label>
				Email:
				<input name="email" type="email" placeholder="mail@example.com" required />
			</label>
		</div>
		<div>
			<label>
				Password:
				<input name="password" type="password" placeholder="******" required />
			</label>
		</div>
		<div>
			<button type="submit">Login</button>
			<button type="submit" formnovalidate formaction="?/reset">Reset Password</button>
			<button type="submit" formaction="?/register">Register</button>
		</div>
	</form>

	<div id="result" style="margin-top: 20px; font-size: 18px; font-weight: bold;"></div>
</div>

<style>
	.content {
		text-align: center;
		margin-top: 50px;
	}

	button {
		margin: 10px;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
	}
</style>
