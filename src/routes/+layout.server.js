import { env } from '$env/dynamic/private';

export async function load({ locals }) {
	const environment = env.SERVER_ENVIRONMENT;
	const commitHash = env.COMMIT_HASH ?? 'unknown';

	return {
		commitHash,
		environment,
		logUser: locals.pb?.authStore?.model
	};
}
