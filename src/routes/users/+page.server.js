import { error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

export async function load({ params }) {
	const pb = new PocketBase(env.POCKETBASE_URL);

	const users = await pb
		.collection('users')
		.getFullList({ fields: 'username, description, color' });
	return { users };
}
