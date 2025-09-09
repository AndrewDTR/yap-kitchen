<script lang="ts">
	import { browser } from '$app/environment';
	import PocketBase from 'pocketbase';
	import { env } from '$env/dynamic/public';

	const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL ?? 'http://127.0.0.1:8090/');

	let loadingProvider: '' | 'discord' | 'github' = '';
	let error = '';
	let success = '';

	async function oauthLogin(provider: 'discord' | 'github') {
		if (!browser) return;

		if (provider === 'discord') {
			pb.collection('users').authWithOAuth2({
				provider: 'discord'
			});
		}

		if (provider === 'github') {
			pb.collection('users').authWithOAuth2({
				provider: 'github'
			});
		}
		// error = '';
		// success = '';
		// loadingProvider = provider;

		// const popup = window.open(
		// 	'about:blank',
		// 	'oauth_popup',
		// 	'width=700,height=800,left=100,top=100'
		// );

		// try {
		// 	const authData = await pb.collection('users').authWithOAuth2({
		// 		provider,
		// 		urlCallback: (oauthUrl: string) => {
		// 			if (popup) popup.location.href = oauthUrl;
		// 		}
		// 	});

		// } catch (e: any) {
		// 	error = e?.message ?? 'Login failed. Please try again.';
		// } finally {
		// 	loadingProvider = '';
		// 	if (popup && !popup.closed) popup.close();
		// }
	}
</script>

<div class="auth-page">
	<div
		class="card"
		style="
			--base-color: #8eb9ed;
			--shadow-color: #7393e3;
			--ink: #000;
		"
	>
		<h1 class="title">log in to yap.kitchen 👨‍🍳</h1>
		<div class="oauth-grid">
			<button
				class="btn oauth discord"
				on:click={() => oauthLogin('discord')}
				disabled={!!loadingProvider}
				aria-busy={loadingProvider === 'discord'}
			>
				<span>{loadingProvider === 'discord' ? 'Connecting…' : 'Continue with Discord'}</span>
			</button>

			<button
				class="btn oauth github"
				on:click={() => oauthLogin('github')}
				disabled={!!loadingProvider}
				aria-busy={loadingProvider === 'github'}
			>
				<span>{loadingProvider === 'github' ? 'Connecting…' : 'Continue with GitHub'}</span>
			</button>
		</div>

		<div class="divider" role="separator" aria-label="or email/password"><span>or</span></div>

		<form class="form" action="?/login" method="post">
			<label class="field">
				<span>Username</span>
				<input
					name="username"
					type="text"
					placeholder="username"
					autocomplete="username"
					required
				/>
			</label>

			<label class="field">
				<span>Email</span>
				<input
					name="email"
					type="email"
					placeholder="mail@example.com"
					autocomplete="email"
					required
				/>
			</label>

			<label class="field">
				<span>Password</span>
				<input
					name="password"
					type="password"
					placeholder="••••••••"
					autocomplete="current-password"
					required
				/>
			</label>

			<div class="actions">
				<button class="btn primary" type="submit">Log in</button>
				<button class="btn ghost" type="submit" formaction="?/register"> Register </button>
			</div>
		</form>

		{#if error}
			<p class="msg error" role="alert" aria-live="polite">{error}</p>
		{/if}
		{#if success}
			<p class="msg success" aria-live="polite">{success}</p>
		{/if}
	</div>
</div>

<style>
	:root {
		--radius: 14px;
	}

	.auth-page {
		min-height: 60vh;
		display: grid;
		place-items: center;
		padding: 1rem;
	}

	.card {
		border: 2px solid var(--ink);
		background: var(--base-color);
		box-shadow: 4px 4px 0 var(--shadow-color);
		max-width: 720px;
		width: 100%;
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.title {
		margin: 0;
		text-align: center;
	}

	.oauth-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;
		margin-top: 4px;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		border: 2px solid #000;
		padding: 12px 16px;
		box-shadow: 4px 4px 0 rgb(76, 98, 137);
		background: rgb(172, 195, 244);
		cursor: pointer;
		font: inherit;
		text-decoration: none;
		transition:
			transform 0.15s ease,
			box-shadow 0.2s ease,
			background-color 0.2s ease,
			opacity 0.2s ease;
	}

	.btn:hover {
		box-shadow: 6px 6px 0 rgb(76, 98, 137);
		transform: translate(-2px, -2px);
	}

	.btn:active {
		box-shadow: 0 0 0 rgb(76, 98, 137);
		transform: translate(2px, 2px);
		background-color: rgb(127, 152, 196);
	}

	.btn[disabled] {
		opacity: 0.6;
		pointer-events: none;
	}

	.btn.primary {
		background: #acd3f4;
	}

	.btn.ghost {
		background: #e6eefb;
	}

	.btn.oauth.discord {
		background: #5865f2;
		box-shadow: 4px 4px 0 #3541b8;
		color: white;
	}
	.btn.oauth.discord:hover {
		box-shadow: 6px 6px 0 #3541b8;
	}

	.btn.oauth.github {
		background: #5d5d5d;
		box-shadow: 4px 4px 0 #555;
		color: white;
	}
	.btn.oauth.github:hover {
		box-shadow: 6px 6px 0 #555;
	}

	.divider {
		display: grid;
		place-items: center;
		margin: 6px 0 2px;
		position: relative;
	}
	.divider::before {
		content: '';
		position: absolute;
		inset: 50% 0 auto;
		height: 1px;
		background: rgba(0, 0, 0, 0.15);
	}
	.divider > span {
		padding: 0 8px;
		background: var(--base-color);
		position: relative;
		border: 2px solid #000;
		box-shadow: 3px 3px 0 var(--shadow-color);
	}

	.form {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
		align-items: end;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.field span {
		font-weight: 600;
	}

	input[type='text'],
	input[type='email'],
	input[type='password'] {
		border: 2px solid #000;
		padding: 10px 12px;
		background: #f8fbff;
		box-shadow: 3px 3px 0 rgb(160, 178, 206);
		font: inherit;
	}

	input:focus {
		outline: 2px dashed #000;
		outline-offset: 2px;
	}

	.actions {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
		margin-top: 8px;
	}

	.msg {
		margin: 0;
		text-align: center;
		font-weight: 600;
	}
	.msg.error {
		color: #7a1111;
	}
	.msg.success {
		color: #0b4f1a;
	}

	@media (max-width: 700px) {
		.form {
			grid-template-columns: 1fr;
		}
	}
</style>
