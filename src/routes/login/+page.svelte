<script>
	import { browser } from '$app/environment';
	import PocketBase from 'pocketbase';

	const pb = new PocketBase('http://127.0.0.1:8090/');

	async function handleDiscordLogin() {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
		console.log(authData);

		console.log(pb.authStore.isValid);
		console.log(pb.authStore.token);
		console.log(pb.authStore.record.id);
	}

	async function loginWithDiscord() {
		if (!browser) return;

		const popup = window.open(
			'about:blank',
			'discord_oauth_popup',
			'width=700,height=800,left=100,top=100'
		);

		const authData = await pb.collection('users').authWithOAuth2({
			provider: 'discord',
			urlCallback: (oauthUrl) => {
				if (popup) {
					popup.location.href = oauthUrl;
				}
			}
		});

		document.cookie = `pb_auth=${JSON.stringify({
			token: authData.token,
			model: authData.record
		})}; path=/;`;

		location.reload();
	}

	async function handleGitHubLogin() {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'github' });
	}
</script>

<div class="content">
	<h1>Here's where you can log in</h1>
	<button on:click={loginWithDiscord}>Login with Discord</button>
	<button on:click={handleGitHubLogin}>Login with GitHub</button>

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
