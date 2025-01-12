import { error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

export async function load({ params }) {
	const pb = new PocketBase(env.POCKETBASE_URL);
	await pb.admins.authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);

	const users = await pb
		.collection('users')
		.getFullList({ fields: 'username, description, color' });
	return { users };
}
