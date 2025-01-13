import childProcess from 'child_process';
import { env } from '$env/dynamic/private';

export async function load() {
	const hash = childProcess.execSync('git rev-parse --short HEAD').toString().trim();
	const environment = env.SERVER_ENVIRONMENT;

	return { commitHash: hash, environment };
}
